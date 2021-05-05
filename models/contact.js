const mongoose = require('mongoose');

//creating a contact schema
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    phone: {
        type: String,
        required: true
    }
});

//storing collection Name and its schema in database
const Contact = mongoose.model('Contact',contactSchema);

//we need to export this Contact
module.exports = Contact;