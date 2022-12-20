
const axios = require("axios");
let { aswInsertFile } = require("../../Admin/AdminControler/Helper/AwsDataHandel")
let musicModel = require("../../../Models/AdminModel/ArtistMusic");
let adminSignUpModel = require("../../../Models/AdminModel/adminSignUp");
const saveOrderDataModel = require("./../../../Models/Shopify/OrderDataStore");

let { sendEmailForRejectMusic } = require("../Helper/rejectMusicEmail");

exports.MusicPublish = async (req, res) => {
  //console.log(req.body);
  try {
    let { SongTitle, RecordingYear, ReleaseDate, Country, ArtistRole, ArtistName, Theme, Mood, ProductID, SongImage, SongFile, OldSongImage, OldSongFile, Lyrics } = req.body;
    if (SongTitle && RecordingYear && ReleaseDate && Country && ArtistRole && ArtistName && Theme && Mood && ProductID && OldSongImage && OldSongFile) {
      let tagCreate = [...Theme.split(","), ...Mood.split(",")];
      // console.log(tagCreate);
      if (SongFile != "undefined") {
        var MusicValue = await aswInsertFile(req.files.SongFile[0]);
        MusicValue = MusicValue.Location;
        //console.log(MusicValue);
      } else {
        var MusicValue = OldSongFile;
        console.log("No Music Received !")
      }
      if (SongImage != "undefined") {
        var ImageValue = await aswInsertFile(req.files.SongImage[0]);
        ImageValue = ImageValue.Location;
        // console.log(ImageValue);
      } else {
        var ImageValue = JSON.parse(OldSongImage);
        console.log("No Image Received !")
      }
      // console.log(MusicValue);
      // console.log(ImageValue);

      let productUpdateData = {
        "product": {
          "id": ProductID,
          "title": SongTitle,
          "published": true,
//           "tags": tagCreate,
          "images": ImageValue
        }
      }


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
        ProductID: ProductID,
        Published: 1,
        Lyrics: Lyrics
      }
      //  console.log(insertData);
      await musicModel.findOneAndUpdate({ ProductID: ProductID }, insertData)

      // console.log(productUpdate.data);
      res.status(200).json({
        message: "flag1"
      })
    } else {
      res.status(200).json({
        message: "flag2"
      })
    }
  } catch (error) {
    console.log(error);
    res.status(200).json({
      message: "flag0"
    })
  }




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
exports.rejectMusic = async (req, res) => {
  try {
    let { vendor_id, maildata, product_id } = req.body;
    // console.log(req.body)
    let userData = await adminSignUpModel.find({ VendorId: vendor_id }).select("Email");
    if (userData.length >= 1) {
      await musicModel.findOneAndUpdate({ ProductID: product_id }, { Published: 3 })
      let getmusicTitle = await musicModel.find({ ProductID: product_id });
      let { SongTitle } = getmusicTitle[0];
      let { Email } = userData[0];
      console.log(SongTitle);
      await sendEmailForRejectMusic(Email, maildata, SongTitle)

      res.status(200).json({
        status: 200,
        message: "flag1",
      })
    } else {
      res.status(200).json({
        status: 200,
        message: "flag0"
      })
    }

  } catch (error) {
    console.log(error)
    res.status(200).json({
      status: 200,
      message: "flag0"
    })
  }

}

exports.artistProfileData = async (req, res) => {
  try {
    let { vendor_id } = req.body;
    let artist_data = await adminSignUpModel.find({ VendorId: vendor_id }).select('fullname artistType Email mainGenre Country isProRegistered Date Address Bio City PortfolioLink Postalcode StageName Styles image');
    if (artist_data.length >= 1) {
      res.status(200).json({
        status: 200,
        message: "flag1",
        data: artist_data[0]
      })
    } else {
      res.status(200).json({
        status: 401,
        message: "flag0",
      })
    }
  } catch (error) {
    res.status(200).json({
      status: 401,
      message: "flag0",
    })
  }
}

exports.grapgOrderData = async (req, res) => {
  try {
    var start = '2021-05-01'
    var end = '2021-05-31'
    const dates = [...Array(7)].map((_, i) => {
      const d = new Date()
      d.setDate(d.getDate() - i)
      let a = d.toISOString().slice(0, 10);

      return a
    })
    console.log(dates);
    // let findOrder = await saveOrderDataModel.find({Date:{$elemMatch: {  $gte: start, $lt: end  }}})
    (async () => {
     // let allList = [];
      let orderData = [];
      for (let i = 0; i < dates.length; i++) {
        let findOrder = await saveOrderDataModel.find({ Date: dates[i] });
        // let makeO = {
        //   date: dates[i],
        //   orders: findOrder.length
        // }
       // console.log(i);
       // allList.push(makeO);
        orderData.push(findOrder.length);

      }
      //console.log(allList);
      console.log(orderData);

      res.status(200).json({
        status: 200,
        message: "flag1",
        data:{
          orderData:orderData.reverse(),
          dates:dates.reverse()
        }
      })
    })();
  } catch (error) {
    console.log(error);
    res.status(200).json({
      status: 404,
      message: "flag2"
    })
  }
}
