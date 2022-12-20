require("dotenv").config();
const albumModel = require("../../../Models/AdminModel/album");
const axios = require("axios");
const jwt = require("jsonwebtoken");

exports.createAlbum = async (req, res) => {
    try {
        let { albumname } = req.body;
        let isSecure = req.session.secureRoute;
        var decoded = await jwt.verify(isSecure, process.env.JWT_SECRET_KEY);
        let { VendorId, email } = decoded;
        let { data: { smart_collection } } = await axios({
            url: `${process.env.Shopify_API_Header}/smart_collections.json`,
            method: "POST",
            data: {
                "smart_collection": {
                    "title": albumname,
                    "rules": [{
                        "column": "tag",
                        "relation": "equals",
                        "condition": `${albumname}`
                    },
                    {
                        "column": "vendor",
                        "relation": "equals",
                        "condition": "VEND_8946222"
                    }]
                }
            }
        });
        const { id } = smart_collection;
        await albumModel.create({
            VenderId: VendorId,
            albumName: albumname,
            collectionId: id
        })
      //  console.log(smart_collection);
        res.status(200).json({
            message: "flag1",
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