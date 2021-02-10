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
  console.log(req.toDolists);  
  res.render('index', { title: 'My TODO',authstatus:authstatus, displayName: displayName, toDolists:req.toDolists});
});

module.exports = router;
