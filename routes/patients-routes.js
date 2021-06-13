const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient.model');
const Professional = require('../models/Professional.model'); ///NEW
const { authRole } = require('./basicAuth')


//LIST PATIENTS
router.get('/', (req, res) => { 
  const userId = req.session.user._id;
  if(!userId){
    res.redirect('/')
  }else{
    Professional.findById(userId)
    .populate('patients')
    /* .then(professional.role === admin){
      Patient.find(){
        res.render('patients/list-of-patients', { professional })
      }
    } */
    .then(professional => {
      res.render('patients/list-of-patients', { professional })
    })
    .catch(err => console.log(err))
  }
  
});

//CREATE PATIENTS
router.get('/create', (req, res) => {
  Professional.find()
  .then((professional) => {
    res.render("patients/create-new-patient", { professional });
  })
  .catch((err) => console.log(`Err while displaying post input page: ${err}`));
  
});

router.post('/create', (req, res) => { 
  const { name, firstSurname, secondSurname, email, phone, address, newPatient = false, professional } = req.body;
  const isnewPatient = newPatient === "on" 
  console.log('==>',isnewPatient)
  Patient.create({ name, firstSurname, secondSurname, email, phone, address, newPatient : isnewPatient, professional })
    .then((patientsFromDb) => {
      return Professional.findByIdAndUpdate( professional, { $push: { patients: patientsFromDb._id } });
    }) 
    .then(() =>{
      res.redirect('/patients')
    })
    .catch(error => console.log(`Error while creating a new patient:`, error));
});

//EDIT PATIENT
router.get('/:id/edit', (req, res) => {
  const { id } = req.params;
  Patient.findById(id)
    .then((patientToEdit) => {
      console.log('PATIENT TO EEEEEEDIT', patientToEdit)
      res.render('patients/edit-patient', {patient : patientToEdit})
    })
    .catch(error => next(error));
});


router.post('/:id/edit', (req, res) => {
  const { id } = req.params;
  const {  name, firstSurname, secondSurname, email, phone, address, newPatient = false, professional } = req.body;
  const isnewPatient = newPatient === "on"
  Patient.findByIdAndUpdate(id, {  name, firstSurname, secondSurname, email, phone, address, newPatient : isnewPatient, professional }, { new: true })
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

//DETAILS
router.get('/:id', authRole("prof"), (req, res) => {
  const { id } = req.params;
 
  Patient.findById(id)
    .then((patient) => res.render('patients/details-patient', {patient : patient}))
    .catch(error => next(error));
});


module.exports = router;