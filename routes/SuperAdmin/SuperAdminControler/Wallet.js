const saveOrderDataModel = require("./../../../Models/Shopify/OrderDataStore");
const paypalModel = require("../../../Models/AdminModel/paypalData");
const WithdrawModel = require("../../../Models/Shopify/WithdrawRequest");

const { aswInsertAttachment } = require("../Helper/AwsAttachment");

const todayOrderAmount = async (venderId) => {

    let todayDate = new Date().toISOString().slice(0, 10);
    let fintodaysOrder = await saveOrderDataModel.find({ $and: [{ Date: todayDate }] }).select(`price quantity`);
    console.log(fintodaysOrder);
    if (fintodaysOrder.length >= 1) {
        let sum = fintodaysOrder.reduce((n, { price, quantity }) => Number(n) + (Number(quantity) * Number(price)), 0);
        //  console.log(sum);
        return sum
    } else {
        return 0
    }



}

const getArtistPaypalDetails = async (req, res) => {
    try {
        let { venderId } = req.body;
        let getPaypalData = await paypalModel.find({ VendorId: venderId });
        if (getPaypalData.length >= 1) {
            res.status(200).json({
                status :200,
                message:"flag1",
                data : getPaypalData[0]
            })
        } else {
            res.status(200).json({
                status:404,
                message:"flag0"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(200).json({
            status:500,
            message:"flag0"
        })
    }
}

const paidWalletAmmount = async (req, res) => {
    try {
        let { venderId, transactionID } = req.body;
            if(venderId && transactionID){
                console.log(req.body);
               let attach = await aswInsertAttachment(req.files.withdrawAttachment[0]);

              await WithdrawModel.findOneAndUpdate({_id:venderId},{
                Status : 2,
                AttachmentUrl : attach.Location,
                TransactionId : transactionID
               })
               res.status(200).json({
                   status:200,
                   message:"flag1",
               })
            }else{
                res.status(200).json({
                    status:401,
                    message:"flag0"
                })
            }

        console.log(req.files.withdrawAttachment[0]);

    } catch (error) {
        console.log(error);
        res.status(200).json({
            status:500,
            message:"flag0",
            data:error
        })
    }
}

module.exports = {
    todayOrderAmount,
    getArtistPaypalDetails,
    paidWalletAmmount
}