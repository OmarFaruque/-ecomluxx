let adminDetails = async (req,res,next)=>{
    try {
        let { email, password } = req.body;
        if(email && password){
           next();
        }else{
            res.status(200).json({
                status:200,
                message:"flag0"
            })
        }
    } catch (error) {
        res.status(200).json({
            status:200,
            message:"flag0"
        })
    }
}

module.exports = {
    adminDetails
}