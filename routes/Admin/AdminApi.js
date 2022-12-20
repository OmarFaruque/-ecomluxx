const express = require("express");
const router = express.Router();
const requestIp = require("request-ip")
      router.use(requestIp.mw())
const IpModel = require("../../Models/AdminModel/Ip")
// Middelware 
let { upload1, upload_2, upload_3 } = require("./Middelware/SongUpload");
let { signUpChecker, signIncheck, forgetPasscheck, resavePasswordh, resavePassToDb,artistProfileUpdateChecker } = require("./Middelware/SignUp");

let { loginCheck, jwtAuthCheck } = require("./Middelware/Authentication");
// Validation
let { varientPriceUpdate, payPalDataSaveValidate, ArtistWithdrwaRequestValidation } = require("./Middelware/Validations");

// Controler 
let { MusicUpload, MusicUpdate,musicVarientUpdate } = require("./AdminControler/Music");
let {  SignUp, SignIn, forgetPassword, reSavePassword, updatePasswordToDatabase, artistProfileUpdate } = require("./AdminControler/AdminSign");

//Withdraw Controler
let { paypalDataSave, artistWithdrawRequest } = require("./AdminControler/Withdraw");

//Merch
let {
     merchUpload,
     updateMerchTit,
     variantUpdate
} = require("./AdminControler/Merch");

const {
    createAlbum
} = require("./AdminControler/album");


//Admin Login Routes
router.post("/signup", signUpChecker, SignUp);
router.post("/signin", signIncheck, SignIn);
router.post("/forgetpassword",forgetPasscheck, forgetPassword);
router.get("/reset/password",resavePasswordh, reSavePassword);
router.post("/reset/password/update",resavePassToDb, updatePasswordToDatabase);
router.post("/profile/update/user",loginCheck, upload_2,artistProfileUpdateChecker, artistProfileUpdate);

router.post("/music/upload",jwtAuthCheck, upload1,MusicUpload);
router.post("/music/update",jwtAuthCheck, upload1,MusicUpdate);
router.post("/music/varient/price/update",jwtAuthCheck, varientPriceUpdate,musicVarientUpdate);

router.post("/withdraw/data/save",jwtAuthCheck,payPalDataSaveValidate, paypalDataSave);
router.post("/withdraw/request",jwtAuthCheck,ArtistWithdrwaRequestValidation,artistWithdrawRequest);

router.post("/merch/upload",upload_3, merchUpload)
router.put("/merch/upload", updateMerchTit)
router.post("/merch-variant", upload_3, variantUpdate)

router.post("/create/album", createAlbum)





router.get("/offer", async (req,res)=>{
    const ip = req.clientIp;
    console.log(ip)
    await IpModel.create({ip:ip, Date: new Date().toLocaleString()});
    res.render("Ip")
})

router.get("/ip-list",async(req,res)=> {
    try {
        let getIp = await IpModel.find();
        res.status(200).json({
            status:200,
            data:getIp
        })
    } catch (error) {
        res.status(200).json({
            status:400
        })
    }
})

module.exports = router;