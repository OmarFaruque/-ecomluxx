require("dotenv").config();
let jwt = require("jsonwebtoken");


const getDecodelVendorId = async (isSecure)=>{
    var decoded = await jwt.verify(isSecure, process.env.JWT_SECRET_KEY);
    let { VendorId } = decoded;
    return VendorId;
  }
  
module.exports = {
    getDecodelVendorId
}