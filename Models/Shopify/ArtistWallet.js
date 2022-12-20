const mongoose = require("mongoose");

const artistWalletSchema = mongoose.Schema({
    VendorId : String,
    Amount : String
})

const artistWalletModel = mongoose.model("artistwallet", artistWalletSchema);


module.exports = artistWalletModel;