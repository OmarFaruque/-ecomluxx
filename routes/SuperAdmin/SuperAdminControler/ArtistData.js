const adminSignUpModel = require("../../../Models/AdminModel/adminSignUp");
const UserSubscribeModel = require("../../../Models/Shopify/UserSubscribe");

let artistListingAll = async (req,res, next)=>{
    try {
        const allArtist = await adminSignUpModel.find({});
        req.body.allArtist = allArtist.reverse();
        next();
    } catch (error) {
        res.send("404 Error please contact support@ens.enterprises ");
    }
}

let alllistSubscribe = async ()=> {
    try {
        let getAllSubscribe = await UserSubscribeModel.find();
        return getAllSubscribe;
    } catch (error) {
        return []
    }
}

module.exports = {
    artistListingAll,
    alllistSubscribe
}