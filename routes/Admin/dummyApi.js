let express = require("express");
let router = express.Router();
let { dummyData } = require("./AdminControler/dummyApi");
let { loginCheck  } = require("./Middelware/Authentication");


router.get('/music',(req,res)=>{
     res.status(200).json({
         message:"flag1",
         data:dummyData
     })
}) 

module.exports = router;