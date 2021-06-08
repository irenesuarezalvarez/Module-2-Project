const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');

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
        maxAge: 60000
      },
      store: MongoStore.create({
        mongoUrl:`mongodb://localhost/list-of-patients-of-dr`,
        // ttl => time to live
      })
    })
  );
};
