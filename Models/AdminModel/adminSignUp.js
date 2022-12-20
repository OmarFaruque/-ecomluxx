const mongoose =  require('mongoose');

const adminSignUp = mongoose.Schema({
   fullname:String,
   artistType:String,
   Email:String,
   mainGenre:String,
   Country:String,
   isProRegistered:Boolean,
   Address:String,
   City:String,
   Postalcode:String,
   Bio:String,
   Styles:String,
   StageName:String,
   PortfolioLink:String,
   FacebookLink:String,
   YoutubeLink:String,
   WebsiteLink:String,
   image:String,
   Password:String,
   VendorId:String,
   Date:String
});
const adminSignUpModel = mongoose.model('adminSignUp',adminSignUp);

module.exports = adminSignUpModel;


