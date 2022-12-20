const mongoose = require("mongoose");

const saveOrderSchema = mongoose.Schema({
    vendor: String,
    title: String,
    name: String,
    quantity: String,
    price: String,
    product_id: String,
    variant_id: String,
    variant_title: String, 
    Date:String
})
const saveOrderDataModel = mongoose.model("orderData", saveOrderSchema);

module.exports = saveOrderDataModel;
