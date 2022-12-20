const mongoose = require("mongoose");

const IpSchema = mongoose.Schema({
    ip:String,
    Date: String
});

const IpModel = mongoose.model("ipAddress", IpSchema);

module.exports = IpModel;