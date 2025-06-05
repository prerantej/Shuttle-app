const mongoose = require('mongoose');

const shuttleSchema = new mongoose.Schema({
  name: String,
  route: [String], // array of stop names
  fare: Number,     // fare in wallet points
  time: String      // optional: "10:30 AM"
});

module.exports = mongoose.model('Shuttle', shuttleSchema);
