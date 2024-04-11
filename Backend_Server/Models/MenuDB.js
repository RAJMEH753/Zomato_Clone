const mongoose = require("mongoose");
const Schema = mongoose.Schema
const MenuSchema = new Schema({
   name:String
})

    module.exports = mongoose.model('MenuData', MenuSchema, 'menu')
    //res is the collection name search for restaurant