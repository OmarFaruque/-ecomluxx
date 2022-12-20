let adminSignUpModel = require("../../../Models/AdminModel/adminSignUp");

exports.artistProfile = async (req,res,next) => {
  let { user } = req.body;
//   console.log("*************");
//   console.log(user);
//   console.log("*************");

//   next()
    let findArtistProfile = await adminSignUpModel.find({VendorId:user.VendorId});
    if(findArtistProfile.length >= 1 ){
        req.body.userData = findArtistProfile[0];
        next()
    }else{
        res.status(200).json({
            message:"flag0"
        })
    }
}   