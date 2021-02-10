var db = require('../lib/lowdb');
var nanoid = require('nanoid');
var bcrypt = require('bcrypt');
const express = require('express');
const { response } = require('express');
var router = express.Router();

module.exports = function(){
    
    router.post('/add_list',(req,res)=>{
        var post = req.body;
        console.log(post);
        var content = post.content;
        db.get('todolists').push({            
            content : content,
            user_id : req.user.id
        }).write();
        res.redirect('/');
    })

return router;
}
