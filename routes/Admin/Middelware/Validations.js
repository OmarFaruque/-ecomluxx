exports.varientPriceUpdate = async (req,res,next)=>{
     try {
         let { varient_id, price} = req.body;
         if(varient_id && price){
             next()
         }else{
            return  res.status(200).json({
                        status:401,
                        message:"flag0"
                    })
         }
     } catch (error) {
        return  res.status(200).json({
                    status:401,
                    message:"flag0"
                })
     }
}

exports.payPalDataSaveValidate = async(req, res, next)=> {
     try {
         let { paypalId } = req.body;
         if(paypalId){
             next();
         }else{
            res.status(200).json({
                status:401,
                message:"flag0"
            })
         }
     } catch (error) {
        res.status(200).json({
            status:401,
            message:"flag0"
        })
     }
}

exports.ArtistWithdrwaRequestValidation = async (req, res, next) => {
    try {
        let { Amount } = req.body;
        if(Amount && !isNaN(Amount)){
            next();
        }else {
            res.status(200).json({
                status : 401,
                message : "flag0"
            })
        }
    } catch (error) {
        res.status(200).json({
            status : 401,
            message : "flag0"
        })
    }
}