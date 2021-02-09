var express = require('express');
var router = express.Router();

router.get('/',(req,res,next)=>{
    res.send('auth page');
})

router.get('/login', (req,res,next)=>{
    res.render('login');
  });

router.get('/register', (req,res,next)=>{
    res.render('register');
})
module.exports = router;
