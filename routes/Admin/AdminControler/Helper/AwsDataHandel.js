require("dotenv").config();
let uuid = require('uuid');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_Id,
  secretAccessKey: process.env.AWS_SECRET
})


exports.aswInsertFile = async (fileValue) => {
  try {
      let myFile = fileValue.originalname.split(".");
      let myFileType = myFile[myFile.length - 1];   
      var storagePath;
      if(myFileType == "jpg" || myFileType == "png"){
            storagePath = "Images";
      }else if(myFileType == "mp3"){
            storagePath = "Music";
      }
      const params = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: `${storagePath}/${uuid.v4()}.${myFileType}`,
          Body: fileValue.buffer,
          ContentType:fileValue.mimetype
        }
    let result =  await s3.upload(params).promise();
    return result;

  } catch (err) {
    console.error(err);
    // res.status(200).json({
    //   message:"flag0"
    // }) 
    return "Error in image insert music.js file admin side !"
  }
};