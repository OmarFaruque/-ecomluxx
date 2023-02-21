require("dotenv").config();
let jwt = require("jsonwebtoken"); 

exports.loginCheck = async (req,res,next) => {
   let isSecure = req.session.secureRoute;
   console.log(isSecure)
   if(isSecure){
      var decoded = await jwt.verify(isSecure, process.env.JWT_SECRET_KEY);
      // console.log("yesss");
      // console.log(decoded)
      // console.log("yesss");
      req.body.user = decoded;
     return  next();
   }else{
     // res.send("Authorizatiuon Failed !")
     res.redirect("/")
   }

}

exports.jwtAuthCheck = (req, res, next) => {
   try {
      let token = req.headers.authorization.split(" ")[1];
     // console.log(token);
      let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
     // req.isSecure = decoded;
    
      next();
   } catch (error) {
      return res.status(401).json({
         message:"Invalid_Token"
      })
   }
}
  