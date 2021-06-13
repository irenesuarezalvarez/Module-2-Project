const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const mongoose = require('mongoose');
const Professional = require('../models/Professional.model');
const saltRounds = 10;
const salt = 10;


//SIGN UP GET ROUTE
router.get('/', (req, res) => res.render('authentication/signup'));

//SIGNUP POST ROUTE
router.post('/', (req, res, next) => {
  const { username, email, password, role } = req.body;
  if (!username || !email || !password || !role) {
    res.render('authentication/signup', { errorMessage: 'All fields are mandatory. Please provide your username, role, email and password.' });
    return;
  }
 
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    res
      .status(500)
      .render('authentication/signup', { errorMessage: 'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.' });
    return;
  } 
 
  const hashedPassword = bcryptjs.hashSync(password, salt);
 
  bcryptjs
    .genSalt(saltRounds)
    .then(salt => bcryptjs.hash(password, salt))
    .then(hashedPassword => {
      return Professional.create({
        username,
        role,
        email,
        // passwordHash => this is the key from the User model
        passwordHash: hashedPassword //|--> this is placeholder (how we named returning value from the previous method (.hash()))
      });
    })
    .then(userFromDB => {
      console.log('Newly created user is: ', userFromDB);
      req.session.user = userFromDB;
      res.redirect("/patients") //('/patients');
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(500).render('authentication/signup', { errorMessage: error.message });
      } else if (error.code === 11000) {
        res.status(500).render('authentication/signup', {
           errorMessage: 'Username and email need to be unique. Either username or email is already used.'
        });
      } else {
        next(error);
      }
    });
});

module.exports = router;
