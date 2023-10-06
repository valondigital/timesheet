const mongoose = require('mongoose');

const publicHolidaySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  country: {
    name: {
      type: String,
      required: true,
    },
    flagUrl: {
      type: String,
      required: true,
    },
  },
  notes: {
    type: String, // Additional notes or description about the holiday
  },
});

const PublicHoliday = mongoose.model('PublicHoliday', publicHolidaySchema);

module.exports = PublicHoliday;
