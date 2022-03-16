const mongoose = require('mongoose');
//add mongo url

// const mongoURL = "mongodb://localhost:27017/poll"

mongoose.connect(mongoURL,{
    useCreateIndex : true,
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(()=>{
    console.log("Connection Established");
}).catch((e) => {
    console.log("No connection");
    console.log(e)
})

