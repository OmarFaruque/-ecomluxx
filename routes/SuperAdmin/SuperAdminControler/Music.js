require("dotenv").config();
let uuid = require('uuid');
const AWS = require('aws-sdk');
const axios = require("axios");
const musicModel = require("../../../Models/AdminModel/ArtistMusic");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_Id,
  secretAccessKey: process.env.AWS_SECRET
})


exports.AllMusicCount = async () => {
  let unpublishedMusicListing = await musicModel.find({Published:2});
  let publishedMusicListing = await musicModel.find({Published:1});

  return {
      unpublished:unpublishedMusicListing,
      published:publishedMusicListing
  }
}

exports.AllDraftMusic = async () => {
    let allMusicListing = await musicModel.find({Published:2}).select('SongTitle ArtistName MusicImage MusicFile ProductID Published')
    return allMusicListing;
}

exports.LiveMusic = async () => {
    let allLiveMusicListing = await musicModel.find({Published:1}).select('SongTitle ArtistName MusicImage MusicFile ProductID Published')
    return allLiveMusicListing;
}

exports.viewMusic  = async (productid) => {
  let findPerticularMusic = await musicModel.find({ProductID:productid})
  return findPerticularMusic;
}
exports.rejectedMusic = async () => {
  let allrejectedMusicListing = await musicModel.find({Published:3}).select('SongTitle ArtistName MusicImage MusicFile ProductID Published')
  return allrejectedMusicListing;
}



// exports.publishMusic = async (req,res) => {
//   let { productId } = req.
// }