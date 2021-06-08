const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const mongoose = require('mongoose');
const Professional = require('../models/Professional.model');
const saltRounds = 10;
const salt = 10;


//SIGN UP GET ROUTE
router.get('/', (req, res) => res.render('signup'));

//SIGNUP POST ROUTE
router.post('/', (req, res, next) => {
  const { username, email, password } = req.body;
  console.log(username, email, password);
  if (!username || !email || !password) {
    res.render('signup', { errorMessage: 'All fields are mandatory. Please provide your username, email and password.' });
    return;
  }
 
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    res
      .status(500)
      .render('signup', { errorMessage: 'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.' });
    return;
  } 
 
  const hashedPassword = bcryptjs.hashSync(password, salt);
  console.log(`Password hash: ${hashedPassword}`);
 
  bcryptjs
    .genSalt(saltRounds)
    .then(salt => bcryptjs.hash(password, salt))
    .then(hashedPassword => {
      return Professional.create({
        username, // username: username
        email,
        // passwordHash => this is the key from the User model
        passwordHash: hashedPassword //|--> this is placeholder (how we named returning value from the previous method (.hash()))
      });
    })
    .then(userFromDB => {
      console.log('Newly created user is: ', userFromDB);
      res.redirect('patients');
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(500).render('signup', { errorMessage: error.message });
      } else if (error.code === 11000) {
        res.status(500).render('signup', {
           errorMessage: 'Username and email need to be unique. Either username or email is already used.'
        });
      } else {
        next(error);
      }
    });
});

module.exports = router;
