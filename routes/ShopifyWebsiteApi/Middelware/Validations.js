exports.musicviews = async (req, res, next)=>{
     try {
        let { productId } = req.body;
        if(productId){
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