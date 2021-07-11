const mongoose = require('mongoose');


const voteSchema = new mongoose.Schema({
  // poll_id:{
  //   type : mongoose.Schema.Types.ObjectId(),
  // }  
  _id: mongoose.Schema.Types.ObjectId,
   ques : { type: mongoose.Schema.Types.ObjectId, ref:'Poll' },
  // opt1 : { type: mongoose.Schema.Types.ObjectId, ref:'Poll' },
  // opt2 : { type: mongoose.Schema.Types.ObjectId, ref:'Poll' },
  // opt3 : { type: mongoose.Schema.Types.ObjectId, ref:'Poll' },
  // date : { type: mongoose.Schema.Types.ObjectId, ref:'Poll' },
  opt:{
      type : String,
    },
  ansOpt1:{
    type : Number,
    default : 0
  },
  ansOpt2:{
    type : Number,
    default : 0
  },
  ansOpt3:{
    type : Number,
    default : 0
  },
  totalVote: { 
    type: Number, 
    default: 0 
  }
});

// Create collection and add schema

// module.exports = Vote;
module.exports = mongoose.model('Vote', voteSchema);
