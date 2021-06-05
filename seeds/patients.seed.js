const mongoose = require('mongoose');
const Patient = require('../models/Patient.model');


//Establish a connection to the database. You can use the same code in db/index.js.
const DB_NAME = process.env.MONGODB_URI || "list-of-patients";
 
mongoose.connect(`mongodb://localhost/${DB_NAME}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//HEEEEEEEELP

  
  Patient.create(patients)
  .then(patientsFromDB => {
    console.log(`Created ${patientsFromDB.length} patients`);
    mongoose.connection.close();
  })
  .catch(err => console.log(`An error occurred while creating patients list from the DB: ${err}`));