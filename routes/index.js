var express = require('express');
var router = express.Router();



router.get('/', function(req, res, next) {
  var authstatus = false;
  var displayName = '';
  if(req.user){
    authstatus = true;
    displayName = req.user.displayName;
  }else{
    authstatus = false;
  }  
  res.render('index', { title: 'My Todo',authstatus:authstatus, message: displayName});
});

module.exports = router;
