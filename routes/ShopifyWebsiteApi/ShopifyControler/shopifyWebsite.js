let musicModel = require("../../../Models/AdminModel/ArtistMusic");
let mostViewedModel = require("../../../Models/Shopify/MostViewdMusic");
let UserSubscribeModel = require("../../../Models/Shopify/UserSubscribe");
let adminSignUpModel = require("../../../Models/AdminModel/adminSignUp");
let merchModel = require('../../../Models/AdminModel/MerchData');
let axios = require('axios');
require('dotenv').config();

exports.MusicDataByProductId = async (req, res) => {
    let { productId } = req.params;
    console.log(productId);
    if (productId != "" && productId != undefined && productId != null) {
        let findMusicbyId = await musicModel.find({ ProductID: productId }).select('MusicFile')
        if (findMusicbyId.length >= 1) {
            res.status(200).json({
                message: "flag1",
                data: findMusicbyId[0]
            })
        } else {
            res.status(200).json({
                message: "flag0"
            })
        }
    } else {
        res.status(200).json({
            message: "flag0"
        })
    }
}

exports.MostViewed = async (req, res) => {
    try {
        let { productId } = req.body;
        let findProductId = await mostViewedModel.find({ productId: productId });
        if (findProductId.length >= 1) {
            let updateViews = await mostViewedModel.findOneAndUpdate({ productId: productId }, { Views: Number(findProductId[0].Views) + 1 })
            res.status(200).json({
                status: 200,
                message: "flag1 update"
            })
        } else {
            console.log("yeeess")
            let newMusic = await mostViewedModel.create({ productId: productId, Views: 1 })
            res.status(200).json({
                status: 200,
                message: "flag1"
            })
        }
    } catch (error) {
        // console.log(error)
        res.status(200).json({
            status: 401,
            message: "flag0"
        })
    }
}

exports.topVeiwedMusic = async (req, res) => {
    try {
        let findTopData = await mostViewedModel.find().sort({ Views: "desc" }).limit(10).select('productId Views');
        if (findTopData.length >= 1) {
            let arrOfId = findTopData.map((element) => {
                return element.productId
            })
            let findMusicData = await musicModel.find({ ProductID: arrOfId }).select('MusicImage MusicFile ProductID ArtistName Country SongTitle')
            let filterdData = [];
            findMusicData.forEach((element, inde) => {
                let seq = findMusicData.find((element) => element.ProductID == arrOfId[inde]);
                filterdData = [...filterdData, seq]
            })
            res.status(200).json({
                status: 200,
                message: "flag1",
                data: filterdData
            })
        } else {
            res.status(200).json({
                status: 401,
                message: "flag0"
            })
        }


    } catch (error) {
        console.log(error)
        res.status(200).json({
            status: 401,
            message: "flag0"
        })
    }
}

exports.userEmailSave = async (req, res) => {
    try {
        let { email } = req.body;
        let data = {
            Date: new Date().toISOString().slice(0, 10),
            Email: email
        }
        let findEmail = await UserSubscribeModel.find({ Email: email });
        if (findEmail.length >= 1) {
            res.status(200).json({
                status: 200,
                message: 'flag2'
            })
        } else {

            await UserSubscribeModel.create(data);
            res.status(200).json({
                status: 200,
                message: 'flag1'
            })
        }

    } catch (error) {
        console.log(error);
        res.status(200).json({
            status: 500,
            message: "flag0"
        })
    }
}

exports.artistDetails = async (req, res)=>{
    try {
    let { id } = req.params;
        console.log(id);
        if(id){
            let profileData = await adminSignUpModel.find({VendorId:id}).select('fullname artistType Email mainGenre Country isProRegistered Date Address Bio City FacebookLink PortfolioLink Postalcode StageName Styles WebsiteLink YoutubeLink image');
            let musics = await musicModel.find({VendorId:id});
            let merch = await merchModel.find({VenderId:id});
            res.status(200).json({
                status:200,
                message:'flag1',
                data:{
                    "profile data":profileData[0],
                    "merchProduct":merch,
                    "musicProducts":musics,
                }

            })
        }
    } catch (error) {
        res.status(200).json({
            status:500,
            message:'flag0'
        })
    }
}

exports.artistProfile = async (req, res)=>{
    try {
  
            let profileData = await adminSignUpModel.find({}).select('VendorId fullname artistType Email mainGenre Country isProRegistered Date Address Bio City FacebookLink PortfolioLink Postalcode StageName Styles WebsiteLink YoutubeLink image');
            res.status(200).json({
                status:200,
                message:'flag1',
                data:{
                    "profile data":profileData,
                }

            })
        
    } catch (error) {
        res.status(200).json({
            status:500,
            message:'flag0'
        })
    }
}

exports.getHandle = async(req, res)=>{
    console.log(req.body)
    try {   
        if(req.body?.id){
            let { data } = await axios(`${process.env.Shopify_API_Header}/products/${req.body?.id}.json`)
            let { product : { handle } } = data;
            console.log(handle);
            res.status(200).send({
                status:500,
                message:"flag1",
                handle:handle 
            })   
        }else{
            res.status(200).send({  
                status:401,
                message:"Please pass the product id !"
            })  
            console.log("handle");
        }
    } catch (error) {
        res.status(200).json({
            status:500,
            message:error.message
        })  
        console.log("0");

    }
     
}   