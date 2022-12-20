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

exports.musicPublishDataCheck = async(req,res,next)=>{
    try {
        console.log(req.body)
        
        let { SongTitle, RecordingYear, ReleaseDate, Country, ArtistRole, ArtistName, Theme,  Mood, ProductID, OldSongImage, OldSongFile } = req.body;
        console.log(req.body.SongTitle)

        if( SongTitle && RecordingYear && ReleaseDate && Country && ArtistRole && ArtistName && Theme && Mood && ProductID && OldSongImage && OldSongFile){
            return  res.status(200).json({
                status:401,
                message:"flag2"
            })
        }else{
            return  res.status(200).json({
                status:401,
                message:"flag2"
            })
        }
    } catch (error) {
        return  res.status(200).json({
            status:401,
            message:"flag2"
        })
    }
}

exports.rejectMusicCheck = async(req,res,next)=>{
    try {
        let {vendor_id, product_id ,maildata} = req.body;
    if(vendor_id && maildata && product_id){
        next();
    }else{
        return res.status(200).json({
            status:401,
            message:"flag0"
        })
    }
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            status:401,
            message:"flag0"
        })
    }
}
exports.checkAttachment  = async(req,res,next)=>{
    try {
        
        let { venderId, transactionID } = req.body;
        console.log(req.body);
        if(venderId  && transactionID){
            next();
        }else{
            res.status(200).json({
                status:401,
                message:"flag0"
            })
        }
        } catch (error) {
         console.log(error);   
        }
    }
    