const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient.model');
const Professional = require('../models/Professional.model'); ///NEW


//LIST PATIENTS
router.get('/', (req, res) => { 
  Patient.find()
    .populate('professional')
    .then(patients => {
      console.log('HOLA IRENE AQUIIIII, patients route get', patients);
      res.render('patients/list-of-patients', { patients })
    })
    .catch(err => console.log(err))
});

//CREATE PATIENTS
router.get('/create', (req, res) => {
  Professional.find()
  .then((professional) => {
    res.render("patients/create-new-patient", { professional });
  })
  .catch((err) => console.log(`Err while displaying post input page: ${err}`));
  
});

router.post('/create', (req, res, next) => { 
 const { name, firstSurname, secondSurname, email, phone, address, first, professional } = req.body;

 Patient.create({ name, firstSurname, secondSurname, email, phone, address, first, professional })
    .then((patientsFromDb) => {
      return Professional.findByIdAndUpdate( professional, { $push: { patients: patientsFromDb._id } });
    }) 
    .then((pat) =>{
      console.log(pat);
      res.redirect('/patients')
    })
    .catch(error => console.log(`Error while creating a new patient:`, error));
});

//EDIT PATIENT
router.get('/:id/edit', (req, res) => {
  const { id } = req.params;
 
  Patient.findById(id)
    .then((patientToEdit) => res.render('patients/edit-patient', {patient : patientToEdit}))
    .catch(error => next(error));
});


router.post('/:id/edit', (req, res) => {
  const { id } = req.params;
  const {  name, firstSurname, secondSurname, email, phone, address, first, professional } = req.body;
 
  Patient.findByIdAndUpdate(id, {  name, firstSurname, secondSurname, email, phone, address, first, professional }, { new: true }) //WHY WE NEED THE NEW?
    .then(() => res.redirect('/patients'))
    .catch(error => next(error));
});

//DELETE PATIENT
router.post('/:id/delete', (req, res) => {
  const { id } = req.params;
 
  Patient.findByIdAndDelete(id)
    .then(() => res.redirect('/patients'))
    .catch(error => next(error)); //WHY NEXT IN HERE?
});


module.exports = router;