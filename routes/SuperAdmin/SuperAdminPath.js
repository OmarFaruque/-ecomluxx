const express = require("express");
// Middelware
const { loginCheckSuperAdmin, dashboardRedirect } = require("./Middelware/Authentication");
const router = express.Router();

//
let { artistListingAll, alllistSubscribe } = require("./SuperAdminControler/ArtistData");

let { AllMusicCount, AllDraftMusic, LiveMusic, viewMusic ,rejectedMusic} = require("./SuperAdminControler/Music");

let { viewAllvarientByProduct } = require("./SuperAdminControler/SuperAdminApi");
//Helper
let { countTodaysOrder, AllOrderData, withdrwaRequest } = require("./Helper/WithdrawThings");

let { todayOrderAmount } = require("./SuperAdminControler/Wallet");
let {countryData} = require("../Admin/AdminControler/Helper/countryJson");
const { get } = require("mongoose");
 
let {
  getMusicLicting
} = require("./SuperAdminControler/Merch");
//let { viewAllvarientByProduct } =  require("../Admin/AdminControler/Music");
let { 
  getProductDataByIdDataBase
} = require("../Admin/AdminControler/Merch");

router.get('/', loginCheckSuperAdmin, async (req,res) => {  
    let allmusicCount = await AllMusicCount()
    let allTodaysCount = await countTodaysOrder();
    let todaysSelling = await todayOrderAmount();
    // console.log(allTodaysCount);
    // console.log(todaysSelling);
    let sendData = {
        publishedMusicCount:allmusicCount.published,
        unpublishedmusicCount:allmusicCount.unpublished,
        allTodaysCount,
        todaysSelling

    }
    res.render("SuperAdminDashboard",{ data : sendData });
})

router.get('/draft',loginCheckSuperAdmin, async (req,res) => {
    let allDraft = await AllDraftMusic();
    let sendData = {
        allDraftMusic : allDraft
    }
    res.render("SuperAdminDraft",{data : sendData});
})

router.get('/live',loginCheckSuperAdmin, async (req,res) => {
    let liveMusic = await LiveMusic();
    console.log(liveMusic);
    let sendData = {
        liveMusic : liveMusic 
    }
    res.render("SuperAdminLiveMusic", { data : sendData });
})
router.get('/rejected',loginCheckSuperAdmin, async (req,res) => {
  let rejectedMusi = await rejectedMusic();
  let sendData = {
    rejectedMusi 
  }
  res.render("SuperAdminRejectedMusic", { sendData });
})

router.get('/draft/:id?',loginCheckSuperAdmin, async (req,res) => {
    let { id } = req.params;
    let perticularMusic = await viewMusic(id);
    if(perticularMusic.length >= 1){
      let allVarients = await viewAllvarientByProduct(id);
          allVarients = allVarients.variants; 
      let sendData = {
        musicData : perticularMusic[0],
        allVarients
      }
      //console.log(perticularMusic);
      res.render("SuperAdmin_View_Draft_Music",{ data : sendData, countryData });
  
    }else{
      res.status(401).json({
        message:"Wrong Product Id this message is only for Testing !"
      })
    }
})

router.get('/all/artist',loginCheckSuperAdmin,artistListingAll,async (req,res)=>{
  let { allArtist } = req.body;
  let data = {
    allArtist
  }
  console.log(allArtist.length);
  res.render('SuperAdmin_Artist_Listing',{ data });
})

router.get('/orders',loginCheckSuperAdmin, async (req,res)=> {
  let allData = await AllOrderData();
  //console.log(allData);
  res.render("SuperAdmin_Orders", { allData });
})

router.get('/withdraw-request', loginCheckSuperAdmin, async (req, res)=>{
  let getWithData = await withdrwaRequest();
      getWithData = getWithData.reverse();
  console.log(getWithData);
  res.render("SuperAdmin_Withdraw_Request", { getWithData });
})

router.get("/subscribe",loginCheckSuperAdmin, async(req,res)=> {
  let AllSubscribbe = await alllistSubscribe();
  //console.log(AllSubscribbe);
  res.render("SuperAdmin_Subscribe",{AllSubscribbe})
})

router.get("/merch-draft", async (req, res)=> {
  let merchData = await getMusicLicting(0);
  console.log(merchData);
  res.render("SuperAdmin_View_Draft_Merch", {merchData})
})

router.get("/merch-live", async (req, res)=> {
  let merchData = await getMusicLicting(1);
  console.log(merchData);
  res.render("SuperAdmin_View_Live_Music", {merchData})
})

router.get("/merch-rejected", async (req, res)=> {
  let merchData = await getMusicLicting(2);
  console.log(merchData);
  res.render("SuperAdmin_View_Reject_Music", {merchData})
})

router.get("/merch/:id?", async (req, res)=> {
  let { id } = req.params;

    let allVarients = await viewAllvarientByProduct(id);
    let productData = await getProductDataByIdDataBase(id)
     allVarients = allVarients.variants;
     console.log(allVarients);
     let data = {
      allVarients,
      productData
     }
    res.render("SuperAdmin_Merch_view", {data})
    
 
})




router.get('/superadmin', loginCheckSuperAdmin,(req,res)=>{
  res.send(" I am Super Admin !")
})



router.get('/login',dashboardRedirect, async (req,res) => {
    res.render("SuperAdminLogin");
})


module.exports = router;