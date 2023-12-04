const mongoose = require("mongoose");

const medicalRecordSchema = new mongoose.Schema({
  DateOfAppointment: {
    type: String,
    required: false,
  },
  diagnose: {
    type: Date,
    required: false,
  },
  medicine_list: {
    type: [String], // Assuming medicine is a list of strings
    required: false,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor", // Assuming you have a Doctor model defined
    required: false,
  },
  File: {
    type: String, // Assuming you store the file path as a string
    required: false,
  },
});

const MedicalRecord = mongoose.model("MedicalRecord", medicalRecordSchema);

module.exports = MedicalRecord;
