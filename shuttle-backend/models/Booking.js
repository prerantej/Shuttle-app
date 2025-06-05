const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  shuttle: { type: mongoose.Schema.Types.ObjectId, ref: 'Shuttle' },
  timestamp: { type: Date, default: Date.now },
  fare: Number
});

module.exports = mongoose.model('Booking', bookingSchema);
     