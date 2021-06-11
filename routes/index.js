const express = require('express');
//const mongoose = require('mongoose'); //do I need this?
const router = express.Router();


//HOME PAGE
router.get("/", (req, res) => res.render("home"));

//SIGN UP GET ROUTE
router.get('/signup', (req, res) => res.render('signup'));

module.exports = router;
