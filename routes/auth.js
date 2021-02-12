var db = require('../lib/lowdb');
var nanoid = require('nanoid');
var bcrypt = require('bcrypt');
const express = require('express')
var router = express.Router();

module.exports = function(passport){

router.get('/login', (req,res,next)=>{
    res.render('login');
});;

router.post('/login_process',passport.authenticate('local',
        {failureRedirect : '/auth/login'}),
        (req, res) => {
        req.session.save( () => {
        res.redirect(`/${req.user.id}`)
        })
});

router.get('/register', (req,res,next)=>{
    res.render('register');
});

router.post('/register_process',(req,res)=>{     
    var post = req.body;
    var email = post.email;  
    var pass1 = post.password1;
    var pass2 = post.password2;
    var displayName = post.displayName;
    if(pass1 !== pass2){
        //request.flash('error', 'Passwords must be same!');
        response.redirect('/auth/register');          
    }else{     
        bcrypt.hash(pass1, 10, function(err, hash) {
        var user = db.get('users').find({email:email}).value();
        if(user){
            user.password = hash;
            user.displayName = displayName;
            db.get('uesrs').find({id:user.id}).assign(user).write();
        }else{
            var user ={
            id:nanoid.nanoid(),
            email:email,
            password:hash,
            displayName:displayName
            }
        db.get('users').push(user).write();
        }   
        req.login(user, (err)=>{
            return res.redirect('/')
            })    
        });
    }          
});

router.get('/logout_process',(req,res)=>{ 
    req.logout();  
    // session을 지우는 코드   
    // request.session.destroy((err)=>{  
    //  })
    req.session.save(()=>{
      res.redirect('/');
    });
});

return router;
}

