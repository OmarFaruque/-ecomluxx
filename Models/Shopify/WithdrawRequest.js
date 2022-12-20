const mongoose = require("mongoose");
const withdrawSchema = mongoose.Schema({
    ArtistName: String,
    VendorId : String,
    Amount : String,
    Status : Number,
    AttachmentUrl : String,
    TransactionId : String,
    Date : String
})

const WithdrawModel = mongoose.model("withdrawrequest", withdrawSchema);

module.exports = WithdrawModel;