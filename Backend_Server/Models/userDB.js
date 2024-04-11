const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Userschema = new Schema({
    
        email:{
            type:String,
            required:true
        },
        password:{
            type:Number,
            required:true
        },
        name:{
            type:String,
            required:true
        }
    });

    module.exports = mongoose.model('userdetails', Userschema ,'user');

