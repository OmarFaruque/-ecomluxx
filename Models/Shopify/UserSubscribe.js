const mongoose = require("mongoose");

const UserSubscribeSchema = mongoose.Schema({
    Date : String,
    Email : String
})

const UserSubscribeModel = mongoose.model('usersubscribe',UserSubscribeSchema)

 module.exports = UserSubscribeModel;