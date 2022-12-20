const mongoose = require("mongoose");

const forgetPassSchema = mongoose.Schema({
    email:String,
    verifyCode:String
})

const forgetPassModel = mongoose.model("forgetPassword", forgetPassSchema);

module.exports = forgetPassModel;