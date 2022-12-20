
exports.signUpChecker = (req,res,next)=>{
    let { fullname, artistType, email, mainGenre, country, isProRegistered, password } = req.body;
    if(fullname !== "" && artistType !== "" && email !== "" && mainGenre !== "" && country !== "" && isProRegistered !== "" && password !== ""){
        next();
    //console.log("Yes here me !");

    }else{
        res.status(200).json({
            message:"flag0"
        })
    }

}
exports.signIncheck = (req,res,next) => {
     let { email, password } = req.body;
     if(email !== "" && password !== ""){
         next();
     }else{
        res.status(200).json({
            message:"flag0"
        })
     }
}
exports.forgetPasscheck = (req,res,next) => {
    let { email } = req.body;
    if(email !== ""){
        next();
    }else{
       res.status(200).json({
           message:"flag0"
       })
    }
}

exports.resavePasswordh = (req,res,next) => {
    let { id }  = req.query;
    if(id !== "" && id !== undefined){
        console.log("1111111111111");

        next();
    }else{
        console.log("************");
        res.status(200).json({
            message:"Invalid link !"
        })
    }
}

exports.resavePassToDb = (req,res,next) => {
    let { email, password, verifycode }  = req.body;
    if(verifycode !== "" && verifycode !== undefined && email !== "" && email !== undefined && password !== "" && password !== undefined ){
        next();
    }else{
        res.status(200).json({
            message:"flag0"
        })
    }
}

exports.artistProfileUpdateChecker = async (req,res,next) => {
    let { fullname, artistType, mainGenre, Country } = req.body;
    if(fullname !== "" && artistType !== "" && mainGenre !== "" && Country !== "" && fullname !== undefined && artistType !== undefined && mainGenre !== undefined && Country !== undefined){
        next();
    }else{
        res.status(200).json({
            message:"flag0"
        })
    }
}