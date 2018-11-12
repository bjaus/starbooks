const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const SatelliteSchema = new Schema({
  satellite_id: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = Satellite = mongoose.model('satellites', SatelliteSchema);