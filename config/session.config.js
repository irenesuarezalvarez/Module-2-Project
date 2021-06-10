//FILE NOT USED FOR NOW
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');

// since we are going to USE this middleware in the app.js,
// let's export it and have it receive a parameter
module.exports = app => {
  app.use(
    session({
      secret: process.env.SESS_SECRET,
      resave: true,
      saveUninitialized: false,
      cookie: {
        sameSite: 'none',
        httpOnly: true,
        maxAge: 60000,
        secure: true
      },
      store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        ttl: 60*60*24
      })
    })
  );
};