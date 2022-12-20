let multer = require("multer");

const storage = multer.memoryStorage({
    destination:function(req,file,callback){
        callback(null, true)
    }
  })

exports.uploadAttachment = multer({storage}).fields([{ name: 'withdrawAttachment', maxCount: 1 }]);

