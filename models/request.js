const mongoose = require('mongoose');

// Define the schema for the 'request' collection
const requestSchema = new mongoose.Schema({
    mobile: { type: Number, required: true },
    service: { type: String, required: true },
    amt: { type: Number, required: true },
    type: { type: String, required: true },
    msg: { type: String },
    code: { type: String },
    remarks: { type: String }
});

// Create the model
const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
