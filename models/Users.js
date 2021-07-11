const mongoose = require('mongoose');


const usersSchema = new mongoose.Schema({
   email: String,
   password: String
})

//Create New Collection
const User = new mongoose.model('User',usersSchema);

 module.exports = User;

 
 

 