const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: false,
  },
  specialist: {
    type: String,
    required: false,
  },
  Address: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: false,
  },
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
