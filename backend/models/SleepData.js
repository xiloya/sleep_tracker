const mongoose = require("mongoose");

const sleepDataSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  sleepTime: {
    type: Date,
    required: true,
  },
  wakeTime: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("SleepData", sleepDataSchema);
