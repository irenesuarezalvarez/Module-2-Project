require('dotenv').config();
const path = require("path");
const cookieParser = require("cookie-parser");
const express = require("express");
//require('./config/session.config')(app);
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const favicon = require("serve-favicon");
const {authUser} = require('./routes/basicAuth');
const hbs = require("hbs");


//DATA BASE
//const DB_NAME = process.env.MONGODB_URI;
 
mongoose.connect(process.env.MONGODB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//SESSION
app.set("trust proxy", 1);
app.use(session({
  secret: process.env.SESS_SECRET,
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 365 * 1000
  },
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    ttl: 60*60*24
  })
})) 

/* app.use(
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
); */
 
app.use(passport.initialize())
// Enable authentication using session + passport
app.use(passport.session())

app.set("views", path.join(__dirname, ".", "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));
hbs.registerPartials(__dirname + "/views/partials");



// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
//require('./error-handling')(app);


app.use('/', require('./routes/index'));
app.use('/login', require('./routes/login-routes.js'));
app.use('/signup', require('./routes/signup-routes.js'));
app.use( '/patients', authUser, require('./routes/patients-routes'));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));


//const PORT = process.env.PORT || 3000;
app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}`))

