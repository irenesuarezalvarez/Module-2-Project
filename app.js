require('dotenv').config()
const express = require('express');
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const favicon = require("serve-favicon");
const mongoose = require('mongoose');
require('./config/session.config')(app);


const DB_NAME = process.env.MONGODB_URI || "list-of-patients";
 
mongoose.connect(`mongodb://localhost/${DB_NAME}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//HERE
 // In development environment the app logs
 //app.use(logger("dev"));

 // To have access to `body` property in the request
 app.use(express.json());
 app.use(express.urlencoded({ extended: false }));
 app.use(cookieParser());

 // Normalizes the path to the views folder
 app.set("views", path.join(__dirname, ".", "views"));
 // Sets the view engine to handlebars
 app.set("view engine", "hbs");
 // Handles access to the public folder
 app.use(express.static(path.join(__dirname, "..", "public")));

 app.use(express.static(__dirname + '/public')); //NEEDED????
 // Handles access to the favicon
 //app.use(favicon(path.join(__dirname, "..", "public", "images", "favicon.ico")));
/* const droneRoutes = require('./routes/drones')
app.use('/', droneRoutes) */

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
//require('./error-handling')(app);


//to access to the routes
app.use('/', require('./routes/index'));
app.use('/login', require('./routes/login-routes.js'));
app.use('/signup', require('./routes/signup-routes.js'));
app.use('/patients', require('./routes/patients-routes'));



//FIN HERE
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
