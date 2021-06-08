const express = require('express');
const router = express.Router();
const Professional = require('../models/Professional.model');

//LOG-IN GET ROUTE
router.get('/', (req, res) => res.render('login'));

//LOG-IN POST ROUTE
router.post('/', (req, res, next) => {
    console.log('SESSION =====> ', req.session);
    const { email, password } = req.body;
   
    if (email === '' || password === '') {
      res.render('login', {
        errorMessage: 'Please enter both, email and password to login.'
      });
      return;
    }
   
    Professional.findOne({ email })
      .then(professional => {
        if (!professional) {
            res.render('login', { errorMessage: 'Email is not registered. Try with other email.' });
            return;
        } else if (bcryptjs.compareSync(password, professional.passwordHash)) {
            //******* SAVE THE USER IN THE SESSION ********//
            /* req.session.currentUser = user;
            res.redirect('/userProfile'); */
          res.render('/patients', { professional });
        } else {
            res.render('login', { errorMessage: 'Incorrect password.' });
        }
      })
      .catch(error => next(error));
  });

module.exports = router;