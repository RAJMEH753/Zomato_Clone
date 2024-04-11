const mongoose = require("mongoose");
const Schema = mongoose.Schema
const MealtypeSchema = new Schema({
  name:String,
  _id:String
})

    module.exports = mongoose.model('Mealtypes', MealtypeSchema, 'mealtype')
    