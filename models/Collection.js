const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const CollectionSchema = new Schema({
  satellite: {
    type: Schema.Types.ObjectId,
    ref: 'satellites'
  },
  set_id: {
    type: String,
    required: true
  },
  status: {
    type: String
  },
  condition: {
    type: String
  },
  _errors: {
    type: [String]
  }
});

module.exports = Collection = mongoose.model('collections', CollectionSchema);