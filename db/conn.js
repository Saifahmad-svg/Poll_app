const mongoose = require('mongoose');

const mongoURL = `mongodb+srv://saif_svg:9279537277@cluster0.pom7b.mongodb.net/Poll-app?retryWrites=true&w=majority`
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

