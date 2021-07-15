const mongoose = require('mongoose');


const voteSchema = new mongoose.Schema({
  voteCount: { 
    type: Number, 
    default: 0
  }
});

// Create collection and add schema

// module.exports = Vote;
module.exports = mongoose.model('Vote', voteSchema);
