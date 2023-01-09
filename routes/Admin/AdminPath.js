require("dotenv").config();
let express = require('express');
let router = express.Router();
// Middelware 
let { loginCheck, jwtAuthCheck } = require("./Middelware/Authentication");
let { artistProfile } = require("./Middelware/artistPathData");
let { pathPaypalData, getWithdrawStatement, getArtistOrderData, getTodaysOrderCount } = require("./Middelware/WIthdraw");

let jwt = require("jsonwebtoken");

let { MusicListingAll, MusicCount, viewMusic, viewAllvarientByProduct, walletAmount } = require("./AdminControler/Music");

let { countryData, genreList, artistTypee } = require("./AdminControler/Helper/countryJson");

let {
  getPerticularMerch,
  getProductDataByIdDataBase,
  getMerchDataView
} = require("./AdminControler/Merch");

const {
  getAlbum
} = require("./AdminControler/album");

async function getVenderId(isSecure) {
  var decoded = await jwt.verify(isSecure, process.env.JWT_SECRET_KEY);
  let { VendorId } = decoded;
  return VendorId;
}


router.get('/', loginCheck, async function (req, res, next) {
  let { user } = req.body;
  let unpublishedMusic = await MusicCount(user, 2);
  let publishedMusic = await MusicCount(user, 1);
  let { VendorId } = user;
  let walletBalance = await walletAmount(VendorId);
  let countTodaysOrder = await getTodaysOrderCount(VendorId);
  //console.log(req.session.secureRoute);
  console.log("****************");
  console.log(user);
  console.log(walletBalance);
  console.log("****************");


  let sendData = {
    publishMusicCount: publishedMusic.length,
    unpublishedMusicCount: unpublishedMusic.length,
    walletBalance, countTodaysOrder
  }
  //console.log(unpublishedMusic.length);
  res.render('AdminDashboard', { data: sendData });
});

router.get('/profile', loginCheck, artistProfile, function (req, res, next) {

  let { userData } = req.body;

  //console.log(isSecure);
  res.render('AdminProfile', { userData, genreList, countryData, artistTypee });
});

router.get('/music', loginCheck, async function (req, res, next) {
  let isSecure = req.session.secureRoute;
  var decoded = await jwt.verify(isSecure, process.env.JWT_SECRET_KEY);
  let { VendorId } = decoded;
  let allListing = await MusicListingAll(VendorId)
  res.render('AdminMusic', { allMusicData: allListing });
});

router.get('/upload-music', loginCheck, function (req, res, next) {
  let isSecure = req.session.secureRoute;
  console.log("*******-------------------*********");
  console.log(isSecure);
  console.log("*******-------------------*********");

  res.render('AdminUpload', { user: isSecure, countryData });
});
router.get('/upload-merch', loginCheck, (req, res) => {
  res.render('Admin_Upload_Merch')
})
router.get('/music/:id?', loginCheck, async (req, res) => {
  let isSecure = req.session.secureRoute;
  var decoded = await jwt.verify(isSecure, process.env.JWT_SECRET_KEY);
  let { VendorId, email } = decoded;
  let { id } = req.params;
  let perticularMusic = await viewMusic(id, VendorId, email);
  if (perticularMusic.length >= 1) {
    let allVarients = await viewAllvarientByProduct(id);
    allVarients = allVarients.variants;
    console.log(allVarients);
    let sendData = {
      musicData: perticularMusic[0],
      user: isSecure,
      allVarients
    }
    //console.log(perticularMusic);
    res.render("Admin_View_Music", { data: sendData, countryData });

  } else {
    res.status(401).json({
      message: "Wrong Product Id this message is only for Testing !"
    })
  }

})

router.get("/withdraw", loginCheck, async (req, res) => {
  let isSecure = req.session.secureRoute;
  let VendorId = await getVenderId(isSecure);
  let payData = await pathPaypalData(VendorId);
  let walletBalance = await walletAmount(VendorId);
  let withdrawData = await getWithdrawStatement(VendorId);

  console.log(withdrawData);
  res.render("Admin_Withdraw", { user: isSecure, payData, walletBalance, withdrawData });
})

router.get("/orders", loginCheck, async (req, res) => {

  let isSecure = req.session.secureRoute;
  let VendorId = await getVenderId(isSecure);
  let allListOrder = await getArtistOrderData(VendorId);
  console.log(allListOrder);
  res.render("AdminOrder", { allListOrder });
})

router.get("/terms-and-conditions", (req, res) => {
  res.render("Terms_And_Conditions_Sign_Up");
})

router.get("/vari/:id?", async (req, res) => {
  try {
    let { id } = req.params;
    let allVarients = await viewAllvarientByProduct(id);
    console.log(allVarients);

    res.status(200).json({
      message: allVarients
    })
  } catch (error) {
    res.status(401).json({
      message: error
    })
  }

})
router.get("/merch", loginCheck, async (req, res) => {
  let isSecure = req.session.secureRoute;
  let vendorId = await getVenderId(isSecure)
  let getMerchData = await getMerchDataView(vendorId);
  res.render("Admin_Merch_List", { getMerchData })

})
router.get("/merch/:id?", loginCheck, async (req, res) => {

  console.log('omar admin test');
  // let isSecure = req.session.secureRoute;
  // var decoded = await jwt.verify(isSecure, process.env.JWT_SECRET_KEY);
  // let { VendorId, email} = decoded;
  let { id } = req.params;
  let getProductAvilable = await getPerticularMerch(id);
  console.log(getProductAvilable);
  if (getProductAvilable >= 1) {
    let allVarients = await viewAllvarientByProduct(id);
    let productData = await getProductDataByIdDataBase(id)
    allVarients = allVarients.variants;
    console.log(allVarients);
    let data = {
      allVarients,
      productData
    }
    res.render("Admin_Merch_View", { data })

  } else {
    res.status(401).json({
      message: "Wrong Product Id this message is only for Testing !"
    })
  }
})

router.get("/create/album", loginCheck, async (req, res) => {
  // let isSecure = req.session.secureRoute;
  // let vendorId = await getVenderId(isSecure)

  res.render("Admin_Create_Album",)

})
router.get("/list/album",loginCheck, async (req, res) => {
  // let isSecure = req.session.secureRoute;
  // let vendorId = await getVenderId(isSecure)
  let albu = await getAlbum("VEND_8946222");
 // console.log(albu);
  res.render("Admin_list_album", { albu })

})







/*
* Testing Routes
*/



router.get('/login', (req, res) => {
  let { value } = req.query;
  if (value == 1) {
    let token = jwt.sign({
      email: "onkarphp@gmail.com",
      VendorId: "VEND_8946222"
    },
      "jwtsecretkey",
      {
        expiresIn: "1h"
      }
    )
    req.session.secureRoute = token;
    res.status(200).json({
      message: "Auth Successfull !",
      token: token
    })

  } else if (value == 2)
    req.session.secureRouteSuperAdmin = true;
  res.send("Session Super Admin Set !")
})

router.get("/logout", loginCheck, (req, res) => {
  //  req.session.destroy(function(err) {
  req.session.secureRoute = false;
  // res.send("<h1> Session Destroyed ! </h1>");
  res.redirect("/");
  // })
})

router.post('/profile/update', jwtAuthCheck, (req, res) => {
  console.log(req.userData);
  res.send(req.body)

})

/*
* Testing Routes End
*/

module.exports = router;
