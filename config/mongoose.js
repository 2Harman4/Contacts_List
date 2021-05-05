const mongoose = require('mongoose');

// contacts_list_db has been set as our db name
mongoose.connect('mongodb://localhost/contacts_list_db');

// acquire the connection(to check)
const db = mongoose.connection;

//error
db.on('error',console.error.bind(console,'error connecting to db'));

//up and running then print the message
db.once('open',function(){
    console.log("Succesfully connected to the database");
});