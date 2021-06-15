const express = require('express');
const router = express.Router();
const Professional = require('../models/Professional.model');
//const Patient = require('../models/Patient.model'); //NEW
const bcryptjs = require('bcryptjs');

//LOG-IN GET ROUTE
router.get('/', (req, res) => res.render('authentication/login')); 

//LOG-IN POST ROUTE
router.post('/', (req, res, next) => {
    const { email, password, role } = req.body;
   
    if (email === '' || password === '') {
      res.render('authentication/login', {
        errorMessage: 'Please enter both, email and password to login.'
      });
      return;
    }
   
    Professional.findOne({ email })
      .then(professional => {
        if (!professional) {
            res.render('authentication/login', { errorMessage: 'Email is not registered. Try with other email.' });
            return;
        } else if (bcryptjs.compareSync(password, professional.passwordHash)) {
          req.session.user = professional;
          res.redirect('/patients');
        } else {
            res.render('authentication/login', { errorMessage: 'Incorrect password.' });
        }
      })
      .catch(error => next(error));
  });


module.exports = router;