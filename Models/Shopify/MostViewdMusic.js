const mongose = require('mongoose');

const mostViewedMusic = mongose.Schema({
    productId:Number,
    Views:Number
})

const mostViewedModel = mongose.model('mostViewsMusic', mostViewedMusic);

module.exports = mostViewedModel;