const express = require('express');
const mongoose = require('mongoose'); //do I need this?
const router = express.Router();


/* GET home page */
router.get("/", (req, res) => res.render("home"));

//SIGN UP GE ROUTE
router.get('/signup', (req, res) => res.render('signup'));

module.exports = router;
