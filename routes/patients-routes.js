const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient.model');

//LIST PATIENTS
router.get('/', (req, res, next) => { 
  console.log('Patients route', req.session);
  Patient.find()
  .then(patients => {
    res.render('patients/list-of-patients', { patients })
  })
  .catch(err => console.log(err))
});

//CREATE PATIENTS
router.get('/create', (req, res, next) => {
  res.render("patients/create-new-patient")
});

router.post('/create', (req, res, next) => { 
 console.log(req.body);
 const { name, firstSurname, secondSurname, email, phone, address, first } = req.body;

 Patient.create({ name, firstSurname, secondSurname, email, phone, address, first })
    .then((patientsFromDb) => {
      console.log(patientsFromDb);
      res.redirect("/patients")
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
  const {  name, firstSurname, secondSurname, email, phone, address, first } = req.body;
 
  Patient.findByIdAndUpdate(id, {  name, firstSurname, secondSurname, email, phone, address, first }, { new: true }) //WHY WE NEED THE NEW?
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