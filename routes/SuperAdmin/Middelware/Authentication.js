let jwt = require("jsonwebtoken"); 


exports.loginCheckSuperAdmin = (req,res,next) => {
    let isSecure = req.session.secureRouteSuperAdmin;
    console.log(isSecure)
    if(isSecure){
       next();
    }else{
       res.redirect("/admin/login")
    }
}

exports.jwtAuthCheck = (req, res, next) => {
    try {
       let token = req.headers.authorization.split(" ")[1];
       console.log(token);
       let decoded = jwt.verify(token, "jwtsecretkey" );
       req.userData = decoded;
     
       next();
    } catch (error) {
       return res.status(401).json({
          message:"Auth Failed !"
       })
    }
 }
   
exports.dashboardRedirect = (req,res, next)=> {
   let isSecure = req.session.secureRouteSuperAdmin;
   console.log(isSecure)
   if(isSecure){
      res.redirect("/admin")
   }else{
      next();
   }
}