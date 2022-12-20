var express = require('express');
var router = express.Router();
let { countryData } = require("./Admin/AdminControler/Helper/countryJson");
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render("index", { countryData })
});

module.exports = router;
 