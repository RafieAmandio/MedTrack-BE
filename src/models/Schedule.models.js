const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  schedule: {
    type: String,
    required: false,
  },
  notes: {
    type: String,
    required: false,
  },
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;
