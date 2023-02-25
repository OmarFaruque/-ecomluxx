require("dotenv").config();
const albumModel = require("../../../Models/AdminModel/album");
let { aswInsertFile } = require("./Helper/AwsDataHandel");
const axios = require("axios");
const jwt = require("jsonwebtoken");

exports.createAlbum = async (req, res) => {
    try {
        let { albumname } = req.body;
        let {album_art} = req.files;
        let isSecure = req.session.secureRoute;
        var decoded = await jwt.verify(isSecure, process.env.JWT_SECRET_KEY);
        let { VendorId, email } = decoded;

        //process images
        let ImageValue = req.files;
        let allObj = []
        for (va in ImageValue) {
            allObj.push(ImageValue[va][0]);
        }

        var promises = [];
        for (var i = 0; i < allObj.length; i++) {
          var file = allObj[i];
          promises.push(aswInsertFile(file));
        }
        let allImage = await Promise.all(promises);

        let allImagedata = allImage.map(item => {
            return { src: item.Location }
        })

        // console.log('all image: ', allImage)


        let { data: { smart_collection } } = await axios({
            url: `${process.env.Shopify_API_Header}/smart_collections.json`,
            method: "POST",
            data: {
                "smart_collection": {
                    "title": `${albumname}`,
                    "images": allImagedata,
                    "rules": [{
                        "column": "tag",
                        "relation": "equals",
                        "condition": `${albumname}`
                    },
                    {
                        "column": "vendor",
                        "relation": "equals",
                        "condition": VendorId
                    }]
                }
            }
        });
        const { id } = smart_collection;
        await albumModel.create({
            VenderId: VendorId,
            albumName: albumname,
            collectionId: id, 
            albumArt: allImagedata
        })
      //  console.log(smart_collection);
        res.status(200).json({
            message: "flag1",
            files: album_art,
            smart_collection
        })
    } catch (error) {
        console.log(error);
        res.status(200).json({
            status: 500,
            message: "flag0"
        })
    }
}

exports.getAlbum = async (VenderId)=>{
    try {
        let albumData = await albumModel.find({VenderId});
        return albumData;
    } catch (error) {
        return []
    }
}

exports.deleteAlbum = async (req, res) => {
    try {
        let {id} = req.body

        await albumModel.remove({collectionId: id}, function(err, obj){
            if(err) throw err;
            console.log('sucessfully remove album')
        })
        
        await axios({
            url: `${process.env.Shopify_API_Header}/smart_collections/${id}.json`,
            method: "DELETE"
        });


        res.status(200).json({
            msg: "success",
        })
    } catch (error){
        res.status(200).json({
            error: error,
            req: req.id
        })
    }
}