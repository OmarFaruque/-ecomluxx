const saveOrderDataModel = require("../../../Models/Shopify/OrderDataStore");
const WithdrawModel = require("../../../Models/Shopify/WithdrawRequest");

const countTodaysOrder = async ()=> {
    try {
        let getALlCount = await saveOrderDataModel.find({Date: new Date().toISOString().slice(0, 10)});
       // console.log(getALlCount);
        return getALlCount.length;
    } catch (error) {
        return 0
    }
}

const AllOrderData = async ()=> {
    try {
        let getAlldata = await saveOrderDataModel.find().sort({Date: -1});
            return getAlldata;
    } catch (error) {
        return []
    }
}

const withdrwaRequest = async ()=> {
    try {
        let getWithdrwaRequest = await await WithdrawModel.find();
        return getWithdrwaRequest;
    } catch (error) {
        return []
    }
}

module.exports = {
    countTodaysOrder,
    AllOrderData,
    withdrwaRequest
}

