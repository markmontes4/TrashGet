const mongoose = require('mongoose');

const targetSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  coords: {
    type: Array,
    required: true    
  },
  date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('target', targetSchema)