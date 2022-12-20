let express = require("express");
let router = express.Router();
let cors = require('cors');
let fs = require("fs")
;

let { musicviews } = require("./Middelware/Validations");
let { MusicDataByProductId, MostViewed, topVeiwedMusic,userEmailSave, artistDetails,artistProfile, getHandle } = require("./ShopifyControler/shopifyWebsite");

let { saveOrderDetails, deleteAllOrder } = require("./ShopifyControler/OrderManage");



router.get('/music/:productId?',cors(),MusicDataByProductId)
 
router.get('/music/visitors/download',(req,res)=>{
    let path = "https://artistdata.s3.ap-south-1.amazonaws.com/Music/9bbda14e-4960-41bb-ade1-6e373dc9230f.mp3";
  //  const filePath = fs.createWriteStream(path); 
    res.pipe(path); 
    // path.on('finish',() => { 
    //     path.close(); 
    //     console.log('Download Completed'); 
    // }) 
})



router.post('/most/viewed/music',cors(),musicviews, MostViewed);
router.get('/most/viewed/music',cors(),topVeiwedMusic)

router.get('/artist/details/:id?',cors(), artistDetails)
router.get('/artist/profile', cors(),artistProfile)

router.post('/product/handle',cors(),getHandle);

router.post("/order/create", saveOrderDetails);

router.post("/user/email/save",userEmailSave)


router.get("/delete/all/order", deleteAllOrder);

module.exports = router;