const mongoose = require("mongoose");
const { medicalRecordSchema } = require("./MedicalRecord.models");

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  dateOfBirth: {
    type: Date,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  phoneNumber: {
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
  medicalRecord: [medicalRecordSchema],
  file: {
    type: String,
    required: false,
  },
});

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
