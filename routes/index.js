const express = require('express');
const mongoose = require('mongoose'); //do I need this?
const router = express.Router();


/* GET home page */
router.get("/", (req, res) => res.render("home"));
router.get("/login",(req, res) => {
    console.log('you are in log in');
    res.render("login")
})

module.exports = router;
