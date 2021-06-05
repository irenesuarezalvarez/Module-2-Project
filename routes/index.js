const express = require('express');
const mongoose = require('mongoose'); //do I need this?
const router = express.Router();


/* GET home page */
router.get("/", (req, res) => res.render("home"));
router.get("/login",(req, res) => {
    console.log('you are in log in');
    res.render("login")
})


/* GET home page */
/* router.get('/', (req, res, next) => res.render('index'));
router.get('/movies', (req, res, next) => {
    Movie.find({}, (err, movies)=>{
        if(err){
            console.log(err)
        }else{
            console.log('aqui', movies);
            res.render('movies', { movies })
        }
    })
});

router.get('/movie/movieId', (req, res, next) => {
    console.log(req.params.movieId)
    res.render('movie')
});
 */

module.exports = router;
