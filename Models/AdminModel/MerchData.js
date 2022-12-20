let mongoose = require("mongoose");

let merchSchema = mongoose.Schema({
    VenderId:String,
    productId:String,
    title:String,
    Published:String,
    image:Array,
    description:String,
    list:String
})

let merchModel = mongoose.model('merchData',merchSchema);


module.exports = merchModel;