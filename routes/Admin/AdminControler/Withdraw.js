require("dotenv").config();

let paypalModel = require("../../../Models/AdminModel/paypalData");
let jwt = require("jsonwebtoken");
let WithdrawModel = require("../../../Models/Shopify/WithdrawRequest");
let artistWalletModel = require("../../../Models/Shopify/ArtistWallet");
let adminSignUpModel = require('../../../Models/AdminModel/adminSignUp');

let { getDecodelVendorId } = require("./Helper/TokenDecode");

exports.paypalDataSave = async (req, res) => {
    try {
        let { paypalId } = req.body;
        let isSecure = req.session.secureRoute;
        var decoded = await jwt.verify(isSecure, process.env.JWT_SECRET_KEY);
        let { VendorId } = decoded;
        let findArtistPaypal = await paypalModel.find({ VendorId: VendorId });
        if (findArtistPaypal.length >= 1) {
            await paypalModel.findOneAndUpdate({ VendorId: VendorId }, { paypalId: paypalId });
            res.status(200).json({
                status: 200,
                message: "flag1"
            })
        } else {
            await paypalModel.create({ VendorId: VendorId, paypalId: paypalId });
            res.status(200).json({
                status: 200,
                message: "flag2"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(200).json({
            status: 401,
            message: "flag0"
        })
    }


}

exports.artistWithdrawRequest = async (req, res) => {

    // let dec = getDecodelVendorId(isSecure);
    // console.log(dec);
    try {
        let isSecure = req.session.secureRoute;
         let vendorId = await getDecodelVendorId(isSecure);
        // let bb = 'VEND_8946222';
        // let vendorId = "VEND_85038196-6c10-41b3-9220-120c9c4bf37e"
        // console.log(vendorId)
        let { Amount } = req.body;
        let findArtistPaypal = await paypalModel.find({ VendorId: vendorId });
        if (findArtistPaypal.length >= 1) {

            let getCurrentWalletAmmount = await artistWalletModel.find({ VendorId: vendorId });
            let getCurrentUserData = await adminSignUpModel.find({ VendorId: vendorId });
            var { fullname } = getCurrentUserData[0];
            if (getCurrentWalletAmmount.length >= 1) {
                let currentWalletBal = getCurrentWalletAmmount[0].Amount;
                if (Number(Amount) <= Number(currentWalletBal)) {
                    let restAmmount = Number(currentWalletBal) - Number(Amount);
                    await artistWalletModel.findOneAndUpdate({ VendorId: vendorId }, { Amount: restAmmount.toFixed(2) });
                    let saveRequest = {
                        ArtistName: fullname,
                        VendorId: vendorId,
                        Amount: Number(Amount).toFixed(2),
                        Status: 1,
                        Date: new Date().toISOString().slice(0, 10)
                    }
                    await WithdrawModel.create(saveRequest);

                    res.status(200).json({
                        status: 200,
                        message: "flag1"
                    })
                } else {
                    res.status(200).json({
                        status: 401,
                        message: "flag0"
                    })
                }
            } else {
                res.status(200).json({
                    status: 401,
                    message: "flag0"
                })
            }
        }else{
            console.log("yes");
            res.status(200).json({
                status: 401,
                message: "flag"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(200).json({
            status: 401,
            message: "flag0"
        })
    }

}