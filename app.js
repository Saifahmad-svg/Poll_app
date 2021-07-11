const express =  require('express');
require("./db/conn");
const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/poll',{userNewUrlParser:true});

const password = '9279537277'

const mongoURL = `mongodb+srv://saif_svg:${password}@cluster0.fwxl9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(mongoURL,{userNewUrlParser:true});
var db = mongoose.connection;
const Poll = require("./models/polls");
const cookieSession = require("cookie-session");
const User = require("./models/Users")
const Vote = require("./models/vote");
const app = express();
const port = 80;
const cors = require('cors');
const path = require('path');
var ques = Poll.find({});
var user = User.find({});
const bcrypt = require('bcrypt');
let multer = require('multer');
let upload = multer();
const ObjectId = require(`mongodb`).ObjectID;

// Inbuilt in express to recognise incoming object as json object
const authenticateUser = require("./middlewares/authenticateUsers");
const { findById } = require('./models/vote');
const { Mongoose } = require('mongoose');
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Setting file location for templates|static files
app.set('views', path.join(__dirname, 'templates')); //1
app.set('view engine','ejs');
app.use( express.static("public") );
app.engine('html', require('ejs').renderFile);
app.use(cors());
mongoose.set('useFindAndModify', false);

//Routing
app.get('/polls',(req,res)=>{
      req.body.created_at = new Date();
      let todayDate = new Date();
let beforeDate = new Date();
beforeDate.setDate(beforeDate.getDate() - 7);
Poll.find({"created":{"$gt":beforeDate, "$lte":todayDate}})
.exec(function(err,docs){
    ques.exec(function(err,data){
    if(err) throw err;
    res.render('polls', {title : "Polls", records:data, records:docs});
  })
})
});
 
app.get('/login',(req,res)=>{
    res.render('index.html');
});

app.get('/register',(req,res)=>{
  res.render('registration.html');

});
// cookie session
app.use(
  cookieSession({
    keys: ["randomStringASyoulikehjudfsajk"],
  })
);
  
app.post("/login", async (req, res)=>{
  const { email, password } = req.body;

  // check for missing filds
  if (!email || !password) {
    res.send("Please enter all the fields");
    return;
  }

  const doesUserExits = await User.findOne({ email });
  // const existPassword = await User.findOne({ password });

  if (!doesUserExits) {
    res.send("Invalid username");
    return;
  }

    const doesPasswordMatch = await bcrypt.compare(
    password,
    doesUserExits.password
  );

  if (!doesPasswordMatch) {
    res.send("Password incorrect");
    return;
  }
  // else he\s logged in
  req.session.User = {
    email,
  }
   res.redirect("dashboard");
  });

  app.post("/register", async (req, res) => {
    const { email, password } = req.body;

    // check for missing filds
    if (!email || !password) {
      res.send("Please enter all the fields");
      return;
    }

    const doesUserExitsAlreay = await User.findOne({ email });

    if (doesUserExitsAlreay) {
      res.send("A user with that email already exits please try another one!");
      return;
    }

    // lets hash the password
    const hashedPassword = await bcrypt.hash(password, 12);
    const latestUser = new User({ email, password: hashedPassword });

    latestUser
      .save()
      .then(() => {
        res.send("registered account!");
        return;
      })
      .catch((err) => console.log(err));
  });

app.get("/logout", authenticateUser, (req, res) => {
  req.session.User = null;
  res.redirect("login");
});

app.get('/dashboard',authenticateUser, (req,res)=>{
  user.exec(function(err,docs){
    if(err) throw err;
  ques.exec(function(err,data){
      if(err) throw err;
  res.render('dashboard',
  {title : "Completed Polls", records:data, info:docs})
   })
   })
})

app.get('/new',authenticateUser,(req,res)=>{
    res.render('new_poll.html');
})

app.post('/new',authenticateUser,async(req,res)=>{  
    const ques = new Poll(req.body)
    // console.log(req.body)
    if (ques.day == true){
      // for(var i= (Poll.length-2); i < Poll.length; i++){
      //   const bom = Poll.findOne[i];
      //   console.log(bom)
       Poll.updateMany(
        {"day":1},
        {"$set": { "day": 0 , "week":1}},
        function(err,data){
        if(err) throw err;
        console.log(data)
      })
    }
     ques.save().then(() => {
        res.render("new_poll.html");
    }).catch((e) =>{
        res.send(e);
        console.log(e)
    })
});

app.get('/comp',authenticateUser,(req,res,next)=>{
  ques.exec(function(err,data){
    if(err) throw err
    res.render('comp', {title : "Polls", records:data});
  })
});

app.post('/polls',(req,res)=>{
    let opt = req.body.opt;
    let qids = mongoose.Types.ObjectId(req.body.id);
   const newVote = Poll({
     _id : mongoose.Types.ObjectId(),
     ques : req.body.id,
     opt :req.body.opt,
   })

   if (opt == "opt1"){
    Poll.findOneAndUpdate(
     {_id: qids},
     {"$inc": {"ansOpt1":1}},
     function(err,data){
      if(err) throw err;
     }
    )}
    else if (opt == "opt2"){
    Poll.findOneAndUpdate(
      {_id: qids},
      {"$inc": {"ansOpt2":1}},
      function(err,data){
        if(err) throw err;
       }
    )}
    else if (opt == "opt3"){
    Poll.findOneAndUpdate(
      {_id: qids},
      {"$inc": {"ansOpt3":1}}, 
     function(err,data){
     if(err) throw err;
    }
    )}
  ques.exec(function(err,data){
    if(err) throw err;
    // res.send("Vote Casted")
    res.render('polls', {title : "Polls", records:data}); 
  })
});

            
app.listen(port,()=>{
    console.log(`App is running on ${port}`);
})