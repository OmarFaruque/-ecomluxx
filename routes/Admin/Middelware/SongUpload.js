let multer = require("multer");

const storage = multer.memoryStorage({
    destination:function(req,file,callback){
        callback(null, true)
    }
  })

exports.upload1 = multer({storage}).fields([{ name: 'SongImage0', maxCount: 1 },
{ name: 'SongImage1', maxCount: 1 },{ name: 'SongImage2', maxCount: 1 },{ name: 'SongImage3', maxCount: 1 },{ name: 'SongImage4', maxCount: 1 }
, { name: 'SongFile', maxCount: 1 }]);
exports.upload_2 = multer({storage}).fields([{ name: 'ArtistImage', maxCount: 1 }]);
exports.upload_3 = multer({storage}).fields([{ name: 'merchImage', maxCount: 1 },{ name: 'merchImage1', maxCount: 1 },{ name: 'merchImage2', maxCount: 1 },{ name: 'merchImage3', maxCount: 1 },{ name: 'merchImage4', maxCount: 1 }]);

