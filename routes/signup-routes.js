const express = require('express');
const router = express.Router();

//SIGN UP GE ROUTE
router.get('/', (req, res) => res.render('signup'));
router.post('/', (req, res, next) => {
    console.log('The form data: ', req.body);
  });

module.exports = router;
