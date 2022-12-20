require("dotenv").config();
let uuid = require("uuid");
const bcrypt = require('bcrypt');
const saltRounds = 10;
let jwt = require("jsonwebtoken");

let adminSignUpModel = require("../../../Models/AdminModel/adminSignUp");
let forgetPassModel = require("../../../Models/AdminModel/forgetPass");
let artistWalletModel = require("../../../Models/Shopify/ArtistWallet");

let { forgetEmailSend } = require("./Helper/forgetPasswordMail");

const { aswInsertFile } = require("./Helper/AwsDataHandel");


exports.SignUp = async (req,res) => {
    let { fullname, artistType, email, mainGenre, country, isProRegistered, password } = req.body;
    const hashPassword = bcrypt.hashSync(password, saltRounds); 
    // let vendLemgth = await adminSignUpModel.find()
    // let ra = Math.floor(100000 + Math.random() * 900000)
    var todayDate = new Date().toISOString().slice(0, 10);
    var venderidCreate = `VEND_${uuid.v4()}`;
    let dataInsert  = {
        fullname:fullname,
        artistType:artistType,
        Email:email,
        mainGenre:mainGenre,
        Country:country,
        isProRegistered:isProRegistered,
        Password:hashPassword,
        VendorId:venderidCreate,
        Date:todayDate
    }
  //  console.log(dataInsert);

    let checkUser = await adminSignUpModel.find({Email  :email});
        if(checkUser.length >= 1){
            res.status(200).json({
                message:"flag2"
            })
        }else{
            let createNewUser = await new adminSignUpModel(dataInsert);
                createNewUser.save();
                await artistWalletModel.create({ VendorId : venderidCreate,
                    Amount : 0});
                    
                res.status(200).json({
                    message:"flag1"
                })
        }
// res.status(200).json({
//                     messgae:"flag1"
//                 })

}


exports.SignIn = async (req,res) => {
    let { email, password } = req.body;
    let userFind = await adminSignUpModel.find({Email:email});
    if(userFind.length >= 1){
        let passStatus = bcrypt.compareSync(password, userFind[0].Password); // true
        console.log(passStatus);

        if(passStatus){
            let userInfo = {
                email:userFind[0].Email,
                VendorId:userFind[0].VendorId
            }
            let token = jwt.sign(userInfo,
                "jwtsecretkey", 
                {
                  expiresIn:"10h"
                }
              )
            req.session.secureRoute = token;
            res.status(200).json({
                message:"flag2"
            });
        }else{
            res.status(200).json({
                message:"flag3"
            });
        } 
    }else{
        res.status(200).json({
            message:"flag1"
        });
    }
   
}

exports.forgetPassword = async (req,res) => {
    let { email } = req.body;
    let unuid = uuid.v4();
    let userData = {
        email:email,
        verifyCode:unuid
    }
    let findUser = await adminSignUpModel.find({Email:email});
        if(findUser.length >= 1){
            let forgetUserFind = await forgetPassModel.find({email:email});
                if(forgetUserFind.length >= 1){
                    await forgetPassModel.findOneAndUpdate({email:email},userData);
                   // console.log(findUser);
                    forgetEmailSend(email, unuid, findUser[0].fullname).catch(console.error);
                    res.status(200).json({
                        message:"flag2"
                    })

                }else{
                    let newForgetPass = await new forgetPassModel(userData);
                        newForgetPass.save();
                        forgetEmailSend(email, unuid).catch(console.error);

                        res.status(200).json({
                            message:"flag3"
                        })
                }
        }else{
            res.status(200).json({
                message:"flag1"
            })  
        }
}

exports.reSavePassword = async (req,res) => {
    let {id} = req.query;
    console.log(id);
    let findId = await forgetPassModel.find({verifyCode:id});
        if(findId.length >= 1){
            let { email } = findId[0];
           // console.log("88888888");
            res.render("resetPassword",{email:email,verifyId:id})
        }else{
            res.status(200).json({
                message:"Invalid Link !"
            })
        }

}

exports.updatePasswordToDatabase = async (req,res)=> {
    let { email, password, verifycode }  = req.body;
    let userFind = await forgetPassModel.find({verifyCode:verifycode});
    const hashPassword = bcrypt.hashSync(password, saltRounds); 
        if(userFind.length >= 1){
            await adminSignUpModel.findOneAndUpdate({Email:email},{Password:hashPassword});
            await forgetPassModel.findOneAndRemove({email:email})
            res.status(200).json({ 
                message:"flag2"
            }) 
        }else{
            res.status(200).json({
                message:"flag1"
            })
        }
   
}

exports.artistProfileUpdate = async(req,res) => {
    let isSecure = req.session.secureRoute;
    var decoded = jwt.verify(isSecure, process.env.JWT_SECRET_KEY);
     // var decoded =  req.body.user;
    console.log(decoded);

  let {fullname, artistType, mainGenre, Styles, StageName, PortfolioLink,FacebookLink,YoutubeLink,WebsiteLink, Address, City, Country, Postalcode, Bio, hid_profile_image, isProRegistered, ArtistImage} = req.body;
 
var sizeImage = Object.keys(req.files).length;


    if(sizeImage != 0){
        var artistImage = await aswInsertFile(req.files.ArtistImage[0]);
            artistImage = artistImage.Location;
         //  console.log(req.files.ArtistImage[0]);
      }else{
        var artistImage = hid_profile_image;
        console.log("No Image Received !")
      } 
 
    let dataToUpdate = {
        fullname:fullname,
        artistType:artistType,
        mainGenre:mainGenre,
        Country:Country,
        isProRegistered:isProRegistered,
        Address:Address,
        City:City,
        Postalcode:Postalcode,
        Bio:Bio,
        Styles:Styles,
        StageName:StageName,
        PortfolioLink:PortfolioLink,
        FacebookLink,
        YoutubeLink,
        WebsiteLink,
        image:artistImage
    }

    console.log(dataToUpdate);
    
    await adminSignUpModel.findOneAndUpdate({VendorId:decoded.VendorId},dataToUpdate)
    
     res.status(200).json({
         message:"flag1",
         data:dataToUpdate
     })
}