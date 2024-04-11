const mongoose = require("mongoose");
const Schema = mongoose.Schema
const RestaurantSchema = new Schema({
   id:Number,
   city:Number
})

    module.exports = mongoose.model('locationData1', RestaurantSchema, 'res')
    //res is the collection name search for restaurant