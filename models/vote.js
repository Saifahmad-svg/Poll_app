const mongoose = require('mongoose');


const voteSchema = new mongoose.Schema({
  session:{
    type:String,
    default: "Unique voter"
  },
  voteCount: { 
    type: Number
  }
});

// Create collection and add schema

// module.exports = Vote;
module.exports = mongoose.model('Vote', voteSchema);
