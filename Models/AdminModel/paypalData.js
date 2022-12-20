const moongose = require("mongoose");

const paypalData = moongose.Schema({
    VendorId : String,
    paypalId : String,
})

const paypalModel = moongose.model("artistPaypalData", paypalData);

module.exports = paypalModel;