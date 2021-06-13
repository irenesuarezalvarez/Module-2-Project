const express = require('express');
//const mongoose = require('mongoose'); //do I need this?
const router = express.Router();


//HOME PAGE
router.get("/", (req, res) => res.render("home"));


//LOG OUT ROUTES
router.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});


module.exports = router;
