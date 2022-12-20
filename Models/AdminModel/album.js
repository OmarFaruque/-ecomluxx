let mongoose = require("mongoose");

let merchSchema = mongoose.Schema({
    VenderId: String,
    albumName: String,
    collectionId: String
})

let albumModel = mongoose.model('albumData', merchSchema);


module.exports = albumModel;