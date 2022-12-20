let merchModel = require("../../../Models/AdminModel/MerchData");
let axios  = require("axios");

exports.getMusicLicting = async (Published) => {
    try{
        let merchData = await merchModel.find({Published});
            return merchData;
    }catch(error){
        console.log(error)
        return []
    }
}

exports.updateMerchTit  = async (req,res)=> {
    try{
      let { productId , title, description} = req.body;
        let data = await axios({
            url:`${process.env.Shopify_API_Header}/products/${productId}.json`,
            method:"PUT",
            data:{
              "product": {
                "id": productId,
                "title":title,
                "body_html": description,
                "published": true,
              }
            }
        })
        await merchModel.findOneAndUpdate({productId}, { title, description, Published:1 })
        //console.log(data.data);
      res.status(200).json({
        message:"flag1"
      })
  
    }catch(error){
      console.log(error);
      res.status(200).json({
        status:400,
        message:"flag0"
      })
    }
  }