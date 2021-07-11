const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    ques : String,
    opt1 : {
        type : String,
        required : true
    },
    opt2 : {
        type : String,
        required : true
    },
    opt3 : {
        type : String
    },
    created : {
        type : Date,
        default : Date.now
    },
    day : {
        type : Boolean, 
    },
    week : {
        type : Boolean, 
    }, //here
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
    }
})

//Create New Collection
const Poll = new mongoose.model('Poll',pollSchema);
 module.exports = Poll;

 
 

