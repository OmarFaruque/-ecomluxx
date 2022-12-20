let loginCheck = async (req,res)=>{
    let { email, password } = req.body;
    if(email == "testensmail@gmail.com" && password == "321"){
        req.session.secureRouteSuperAdmin = true;
        res.status(200).json({
           status:200,
           message:"flag1"
        })
    }else{
        res.status(200).json({
            status:200,
            message:"flag0"
         })
    }
}

let superadminLogOut = async(req,res)=>{
    req.session.secureRouteSuperAdmin = false;
    res.redirect("/admin/login");
}

module.exports = {
    loginCheck,
    superadminLogOut
}