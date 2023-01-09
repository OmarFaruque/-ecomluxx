require("dotenv").config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let ejsLayout = require('express-ejs-layouts');
var app = express();
var session = require('express-session');
const mongoose = require('mongoose');


mongoose.connect(process.env.MONGODB_URL,{useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify:false});

// Test mongos connection 
// mongoose.connection.on('connected', () => {
//   console.log('connected');
//   console.log(mongoose.connection.readyState); //logs 1
// });

// Shopifywebsite routes
let shopifyWebsiteApi = require("./routes/ShopifyWebsiteApi/ShopifyWebsitesApi");

// Shopifywebsite routes end 
/*


*Index Routes
*/
let indexRouter = require("./routes/index");
/*
*Index Routes End
*/
/*
*Admin Routes
*/
let AdminPathRouter = require('./routes/Admin/AdminPath');
let dummyRouter = require("./routes/Admin/dummyApi");
let AdminRouter = require("./routes/Admin/AdminApi")

/*
*Admin Routes End
*/
/*
* Super Admin Routes
*/
let SuperAdminPath = require("./routes/SuperAdmin/SuperAdminPath");
let SuperAdminApiRouter = require("./routes/SuperAdmin/SuperAdminApi");

/*
* Super Admin Routes End
*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout','./Layout/Layout.ejs')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(ejsLayout);

var sess = {
  name:"session-id",
  secret: 'anyHashvalue',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}
app.use(session(sess));

// ShopifyWebsite Route Use
app.use('/shopify',shopifyWebsiteApi)
// ShopifyWebsite Route Use End 

app.use(indexRouter);
/*
*Admin Routes Use
*/
app.use('/artist', AdminPathRouter);
app.use('/artist',AdminRouter)
app.use('/dummy/api',dummyRouter);

/*
*Admin Routes Use End
*/
/*
* Super Admin Routes Use 
*/
app.use('/admin',SuperAdminPath);
app.use('/admin',SuperAdminApiRouter);

/*
* Super Admin Routes Use End
*/


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error
app.use((req,res,next)=>{
  const error = new Error("No route found");
         error.status = 404;
         next(error);
});

app.use((error,req,res,next)=>{
   res.status(error.status || 500);
    res.json({
        error:{
          message:error.message
        }
    })
})

// error end
// error handler
app.use(function(err, req, res, next) {
  console.log('in local')
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
