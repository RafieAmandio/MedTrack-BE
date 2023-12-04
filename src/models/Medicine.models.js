const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
  medicineName: {
    type: String,
    required: false,
  },
  schedule: {
    type: String, // Assuming Schedule is a string, you can adjust the type as needed
    required: false,
  },
  dose: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
});

const Medicine = mongoose.model("Medicine", medicineSchema);

module.exports = Medicine;
