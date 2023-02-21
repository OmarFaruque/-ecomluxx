require("dotenv").config();
let uuid = require('uuid');
const axios = require("axios");
const musicModel = require("../../../Models/AdminModel/ArtistMusic");
const artistWalletModel = require("../../../Models/Shopify/ArtistWallet");
const { aswInsertFile } = require("./Helper/AwsDataHandel");
const jwt = require("jsonwebtoken");

exports.MusicUpload = async (req, res) => {
  try {

    let isSecure = req.session.secureRoute;
    var decoded = await jwt.verify(isSecure, process.env.JWT_SECRET_KEY);
    let { VendorId, email } = decoded;
    let { SongTitle, RecordingYear, ReleaseDate, Country, ArtistRole, ArtistName, SongPricing, Theme, Mood, Lyrics, license_prices, Tag } = req.body;

    // let tagCreate = [...Theme.split(","), ...Mood.split(",")];
    let tagCreate = [...Theme.split(","), ...Mood.split(","), Tag];

    //REvert join for license price 
    license_prices = license_prices.split(",")
    
    console.log('tags omar: ', tagCreate);

    let ImageValue = req.files;
    let MusicValue = req.files.SongFile[0];
    let allObj = []
    for (va in ImageValue) {
      allObj.push(ImageValue[va][0]);
    }
    allObj.shift(1)
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
    // let awsImageResult = await aswInsertFile(ImageValue);
    let awsMusicResult = await aswInsertFile(MusicValue);


    console.log(allImagedata[0]);
    console.log("***********************");
    console.log(awsMusicResult.Location);
    //***********************Image Upload**TODO:****************************** */


    //
    // Buy mp3, Non-exclusive, Exclusive, TV/FILM, free download, Royalty free

    let productCreateData = {
      "product": {
        "title": SongTitle,
        "vendor": VendorId,
        "published": false,
        "tags": tagCreate,
        "variants": [
          {
            "option1": "Buy mp3",
            "price": license_prices[0] && license_prices[0] != '' ? license_prices[0] : SongPricing
          },
          {
            "option1": "Non-exclusive",
            "price": license_prices[1] && license_prices[1] != '' ? license_prices[1] : SongPricing
          },
          {
            "option1": "Exclusive",
            "price": license_prices[2] && license_prices[2] != '' ? license_prices[2] : SongPricing
          },
          {
            "option1": "TV/FILM",
            "price": license_prices[3] && license_prices[3] != '' ? license_prices[3] : SongPricing
          },
          {
            "option1": "free download",
            "price": license_prices[4] && license_prices[4] != '' ? license_prices[4] : SongPricing
          },
          {
            "option1": "Royalty free",
            "price": license_prices[5] && license_prices[5] != '' ? license_prices[5] : SongPricing
          },

        ],
        "images": allImagedata
      }
    }


    let productCreate = await axios({
      url: `${process.env.Shopify_API_Header}/products.json`,
      method: "POST",
      data: productCreateData
    });
    let insertData = {
      SongTitle: SongTitle,
      RecordingYear: RecordingYear,
      ReleaseDate: ReleaseDate,
      Country: Country,
      ArtistRole: ArtistRole,
      ArtistName: ArtistName,
      SongPricing: SongPricing,
      Theme: Theme,
      Mood: Mood,
      MusicImage: allImagedata,
      MusicFile: awsMusicResult.Location,
      VendorId: VendorId,
      ProductID: productCreate.data.product.id,
      Published: 2,
      Email: email,
      Lyrics, 
      Tag
    }
    // console.log(insertData);
    let newData = await new musicModel(insertData)
    newData.save();

    //  console.log(productCreate.data);
    console.log("++++++++++++++++++++++++")
    res.status(200).json({
      message: "flag1", 
    })
  } catch (error) {
    console.log(error);
    res.status(200).json({
      message: "flag0", 
      error: error
    })
  }


}

exports.MusicUpdate = async (req, res) => {
  //console.log(req.body);
  let isSecure = req.session.secureRoute;
  var decoded = await jwt.verify(isSecure, process.env.JWT_SECRET_KEY);
  let { VendorId, email } = decoded;
  let { SongTitle, RecordingYear, ReleaseDate, Country, ArtistRole, ArtistName, Theme, Mood, ProductID, SongImage0, SongFile, OldSongImage, OldSongFile, Lyrics, Tag } = req.body;
  let tagCreate = [...Theme.split(","), ...Mood.split(","), Tag];
   console.log('update Tags: ', tagCreate); 
  if (req.files?.SongFile) {
    var MusicValue = await aswInsertFile(req.files.SongFile[0]);
    MusicValue = MusicValue.Location;
    //console.log(MusicValue);
  } else {
    var MusicValue = OldSongFile;
    console.log("No Music Received !")
  }
  console.log(req.files)
  if (req.files?.SongImage0) {
    // var ImageValue = await aswInsertFile(req.files.SongImage[0]);
    // ImageValue = ImageValue.Location;
    // console.log(ImageValue);
    // ************************
    var ImageValue = req.files;
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
    ImageValue = allImagedata;
    console.log("$$$$$$$$$$666666666666666$$$$$$$$$$$");

    console.log(allImagedata)
    console.log("$$$$$$$$$$66666666666666$$$$$$$$$$");

    //************ */
  } else {
    ImageValue = JSON.parse(OldSongImage);
    console.log("No Image Received !")
  }
  console.log("$$$$$$$$$$$$$$$$$$$$$");
  console.log(MusicValue);
  console.log(ImageValue);
  console.log("$$$$$$$$$$$$$$$$$$$$$");


  let productUpdateData = {
    "product": {
      "id": ProductID,
      "title": SongTitle,
      "vendor": VendorId,
      "published": false,
      "tags": tagCreate,
      "images": ImageValue
    }
  }

  try {
    let productUpdate = await axios({
      url: `${process.env.Shopify_API_Header}/products/${ProductID}.json`,
      method: "PUT",
      data: productUpdateData
    });
    let insertData = {
      SongTitle: SongTitle,
      RecordingYear: RecordingYear,
      ReleaseDate: ReleaseDate,
      Country: Country,
      ArtistRole: ArtistRole,
      ArtistName: ArtistName,
      Theme: Theme,
      Mood: Mood,
      MusicImage: ImageValue,
      MusicFile: MusicValue,
      VendorId: VendorId,
      ProductID: ProductID,
      Published: 2,
      Lyrics: Lyrics,
      Tag
    }
    // console.log(insertData);
    await musicModel.findOneAndUpdate({ $and: [{ VendorId: VendorId, ProductID: ProductID }] }, insertData)

    // console.log(productUpdate.data);
    res.status(200).json({
      message: "flag1"
    })

  } catch (error) {
    console.log("*******************************");
    console.log(error);
    console.log("*******************************");

    res.status(200).json({
      message: error
    })
  }




}


exports.MusicListingAll = async (VendorId) => {

  let allMusicListing = await musicModel.find({ VendorId: VendorId }).select('SongTitle ArtistName MusicImage MusicFile ProductID Published')
  return allMusicListing;

}
exports.MusicCount = async (user, publishStatus) => {
  let unpublishedMusicListing = await musicModel.find({ $and: [{ VendorId: user.VendorId, Published: publishStatus }] })
  return unpublishedMusicListing;
}


exports.viewMusic = async (productid, VendorId) => {
  let findPerticularMusic = await musicModel.find({ ProductID: productid, VendorId: VendorId })
  return findPerticularMusic;
}

exports.viewAllvarientByProduct = async (productid) => {
  let allVarients = await axios({
    url: `${process.env.Shopify_API_Header}/products/${productid}/variants.json`,
    method: "GET"
  });
  return allVarients.data;
}

exports.musicVarientUpdate = async (req, res) => {
  try {
    let { varient_id, price } = req.body;
    await axios({
      url: `${process.env.Shopify_API_Header}/variants/${varient_id}.json`,
      method: "PUT",
      data: {
        "variant": {
          "id": varient_id,
          "price": price
        }
      }
    })
    return res.status(200).json({
      status: 200,
      message: "flag1"
    })
  } catch (error) {
    return res.status(200).json({
      status: 401,
      message: "flag0"
    })
  }
}

exports.walletAmount = async (venrdorId) => {
  try {
    let artistWal = await artistWalletModel.find({ VendorId: venrdorId });
    if (artistWal.length >= 1) {
      return artistWal
    }
  } catch (error) {
    return []
  }
}