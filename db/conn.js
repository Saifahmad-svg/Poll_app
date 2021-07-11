const mongoose = require('mongoose');

const password = '9279537277'

const mongoURL = `mongodb+srv://saif_svg:${password}@cluster0.fwxl9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`


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

