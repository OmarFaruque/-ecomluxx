require("dotenv").config();
const jwt = require("jsonwebtoken");

let { aswInsertFile } = require("./Helper/AwsDataHandel");
let merchModel = require("../../../Models/AdminModel/MerchData");
let axios = require("axios");

exports.merchUpload = async (req, res) => {
  let isSecure = req.session.secureRoute;
  var decoded = await jwt.verify(isSecure, process.env.JWT_SECRET_KEY);
  let { VendorId, email } = decoded;
  try {
    console.log(req.body);
    //  console.log(req.files.merchImage[0]);
    let {
      title,
      description,
      variantAvailable,
      getoptions,
      getoptionsValue,
      list
    } = req.body;
    getoptions = JSON.parse(getoptions);
    getoptionsValue = JSON.parse(getoptionsValue);

    // let ImageValue = req.files.merchImage[0];
    // let awsImageResult = await aswInsertFile(ImageValue);
    let ImageValue = req.files;
    let allObj = []
    for (va in ImageValue) {
      allObj.push(ImageValue[va][0]);
    }
   // allObj.shift(1)
    console.log(allObj)
    var promises = [];
    for (var i = 0; i < allObj.length; i++) {
      var file = allObj[i];
      promises.push(aswInsertFile(file));
    }
    let allImage = await Promise.all(promises);
    let allImagedata = allImage.map(item => {
      return { src: item.Location }
    })
    console.log(allImagedata)
    console.log(allImagedata[0]);

    // console.log("ap",getoptions);
   // console.log({ awsImageResult, VendorId });

    let productCreateData = {
      "product": {
        "title": title,
        "body_html": description,
        "vendor": VendorId,
        "published": false,
        "tags":list,
        "variants": [
          {
            "option1": title,
            "price": 0,
            "inventory_management":"shopify",
            "inventory_quantity":0
          }
        ],
        "images": allImagedata
      }
    }

    if (variantAvailable == "true") {

      let options = getoptions.map((element, index) => {
        return {
          "name": element,
          "values": getoptionsValue[index]
        }
      })

      console.log("options=>", options);
      var result, parts;
      parts = getoptionsValue;
      if (options.length > 1) {
        result = parts.reduce((a, b) => a.reduce((r, v) => r.concat(b.map(w => [].concat(v, w))), []));
      } else {
        result = parts[0].map(element => {
          return [element]
        })
      }
      let filterVariants = result.map((element, index) => {
        let temp = {}
        let nn = result[index].map((element, i) => {
          let name = `option${i + 1}`; null
          temp[name] = element
        })
        temp['price'] = 0
        temp['inventory_management'] = 'shopify'
        temp['inventory_quantity'] = 0

        return temp
      })
      productCreateData.product.variants = filterVariants;
      productCreateData.product.options = options;
      // console.log(filterVariants)
      callSHopifyAPI(productCreateData)
    } else {
      console.log("No Variants");
      callSHopifyAPI(productCreateData)
    }

    console.log(productCreateData);
    async function callSHopifyAPI(productCreateData) {

      let productCreate = await axios({
        url: `${process.env.Shopify_API_Header}/products.json`,
        method: "POST",
        data: productCreateData
      });
      let { title, vendor, id } = await productCreate.data.product;
      let saveToDataBase = {
        title: title,
        VenderId: vendor,
        productId: id,
        Published: 0,
        image: allImagedata,
        description,
        list
      }
     // console.log(productCreate.data);
      await merchModel.create(saveToDataBase)
      res.status(200).json({
        message: "flag1",
        data: productCreate.data.product.id
      })
    }

  } catch (error) {
    console.log(error);
    res.staus(200).json({
      message:"flag3"
    })
  }


}

exports.getPerticularMerch = async (productId) => {
  try{
    let getPro = await merchModel.find({productId});
    return getPro.length
  }catch(error){
    return []
  }
}
exports.getProductDataByIdDataBase = async(productId) => {
  try{
    let data = await merchModel.find({productId})
      if(data.length >=1){
        return data;
      }else{
        return []
      }
  }catch(error){
    return 0
  }
}

exports.updateMerchTit  = async (req,res)=> {
  try{
    let { productId , title, description, list} = req.body;
      let data = await axios({
          url:`${process.env.Shopify_API_Header}/products/${productId}.json`,
          method:"PUT",
          data:{
            "product": {
              "id": productId,
              "title":title,
              "body_html": description,
              "published": false,
              "tags":list,
            }
          }
      })
      await merchModel.findOneAndUpdate({productId}, { title, description, Published:0, list })
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

exports.getMerchDataView = async(VenderId)=> {
  try{
    let getMerch = await merchModel.find({VenderId});
        return getMerch;
  }catch(error){
    return 0
  }
}

exports.variantUpdate = async(req,res)=> {
  try{
    let {   
      varientid,
      productId,
      price,
      quantity,
      sku,
      barcode } = req.body;
      
    let ImageValue = req.files?.merchImage ? req.files?.merchImage[0] : null;
    let productJsonData = {
          "variant": {
            "id": varientid,
            "price": price,
            "sku":sku,
            "barcode":barcode
          }
        }
    if(ImageValue){
      console.log(ImageValue);
     let awsImageResult = await aswInsertFile(ImageValue);
     let imageUpdate = await axios({
       url:`${process.env.Shopify_API_Header}/products/${productId}/images.json`,
       method:"POST",
       data:{
        "image": {
          "src":awsImageResult.Location
        }
      }
     })
     productJsonData.variant.image_id = await imageUpdate.data.image.id;
     //console.log(imageUpdate.data)
    }else{
      console.log("no - image");
    }


    console.log(productJsonData);

      let updateVariant = await axios({
        url:`${process.env.Shopify_API_Header}/variants/${varientid}.json`,
        method:"PUT",
        data:productJsonData
      })

      console.log("variant-Update=>", updateVariant.data);
      let updateQuantity = await axios({
        url:`${process.env.Shopify_API_Header}/inventory_levels/set.json`,
        method:"POST",
        data:{
          "location_id": 60923314382,
          "inventory_item_id": updateVariant.data.variant.inventory_item_id,
          "available": quantity
        }
      })
      res.status(200).json({
        status:200,
        message:"flag1"
      })
  }catch(error){
    console.log(error)
    res.status(200).json({
      status:400,
      message:"flag0"
    })
  }
}