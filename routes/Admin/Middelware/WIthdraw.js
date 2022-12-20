let paypalModel = require("../../../Models/AdminModel/paypalData");
let WithdrawModel = require("../../../Models/Shopify/WithdrawRequest");
let saveOrderDataModel = require("../../../Models/Shopify/OrderDataStore");

exports.pathPaypalData = async (venderId)=> {
    try {
    let findArtistPaypal = await paypalModel.find({VendorId: venderId});
        return findArtistPaypal;
        
    } catch (error) {
        return [];
    }
}

exports.getWithdrawStatement = async (vendorId)=> {
    try{
        let waidrwaList = await WithdrawModel.find({VendorId: vendorId}).sort({Date:-1});
         if(waidrwaList.length >= 1){
             
            return waidrwaList;
         }else{
             return [];
         }
    } catch (error){
        return [];
    }
}

exports.getArtistOrderData = async (venderId)=> {
    try {
        let getAllListing = await saveOrderDataModel.find({vendor:venderId}).sort({Date: -1});
         return getAllListing;
    } catch (error) {
        return []
    }
}

exports.getTodaysOrderCount = async (venderId)=> {
    try {
        let todaysOrderCount = await saveOrderDataModel.find({vendor:venderId, Date : new Date().toISOString().slice(0, 10)});
        if(todaysOrderCount.length >= 1){
            return todaysOrderCount.length;
        }else{
            return 0;
        }
    } catch (error) {
        return 0;
    }
}