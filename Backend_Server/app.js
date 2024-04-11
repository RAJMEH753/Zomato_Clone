//class29,30,31
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

const Route = require("./Route/index");

const Port = 5500;
const hostname = "localhost";
const corsOptions = {
    origin : 'http://localhost:3000',
    credentials: 'true',
    optionSuccessStatus: 200
}

//Request mangement
const app = express();
app.use(express.json());  //a body parser required to post a data
app.use(cors(corsOptions));
app.use('/',Route)

//DB
//Username-soniyasigroha001
//Password-hMJrPlfvBwwZrrn9
//mongo db atlas connection link: add databse name between / and ?

const mongoAtlas = "mongodb+srv://soniyasigroha001:hMJrPlfvBwwZrrn9@cluster0.knnmjxx.mongodb.net/SampleDB?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(mongoAtlas,{
    useNewUrlParser : true,
    useUnifiedTopology : true
})
.then(res => {
    app.listen(Port, hostname,() =>{
        console.log(`Server is running at ${hostname}:${Port}`)
    });
})
.catch (err => console.log(err));
