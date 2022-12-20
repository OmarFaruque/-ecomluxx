let express = require("express");
let router = express.Router();
// aws file insert required 
let { upload1  } = require("../Admin/Middelware/SongUpload");
let { uploadAttachment } = require("./Middelware/WithdrawAttachment");
//Validations
let { varientPriceUpdate, musicPublishDataCheck, rejectMusicCheck, checkAttachment } = require("./Middelware/Validations");
//Middelware
let { loginCheckSuperAdmin } = require("./Middelware/Authentication");
let { getArtistPaypalDetails, paidWalletAmmount } = require("./SuperAdminControler/Wallet");
//Authen
let { loginCheck, superadminLogOut } = require("./SuperAdminControler/Auth");
// Auth Middelware
let { adminDetails } = require("./Middelware/loginValidation");
let { MusicPublish, musicVarientUpdate, rejectMusic, artistProfileData, grapgOrderData } = require("./SuperAdminControler/SuperAdminApi");
let { updateMerchTit } = require("./SuperAdminControler/Merch");


router.post('/login',adminDetails, loginCheck);
router.get('/logout', superadminLogOut);





router.post("/music/publish",loginCheckSuperAdmin, upload1,MusicPublish);
router.post("/music/varient/price/update",loginCheckSuperAdmin, varientPriceUpdate, musicVarientUpdate);
router.post("/music/rejected",rejectMusicCheck,rejectMusic);


router.post("/artist/profile", artistProfileData);

router.post("/artist/paypal/data",loginCheckSuperAdmin,getArtistPaypalDetails);

router.post("/artist/paid",uploadAttachment, paidWalletAmmount);


router.get("/order/graph", grapgOrderData);

router.put("/merch/upload", updateMerchTit)


module.exports = router; 
