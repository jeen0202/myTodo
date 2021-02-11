var db = require('../lib/lowdb');
var nanoid = require('nanoid');
const express = require('express');

var router = express.Router();

router.get('/',(req,res,next)=>{
        console.log('todo');
        res.send('test');
    });
    
router.post('/add_list',(req,res)=>{
    var today = new Date();
    var day = today.toLocaleTimeString('ko-KR',{hour: '2-digit', minute: '2-digit' });
    var post = req.body;        
    var content = post.content;
    db.get('todolists').push({
        id : nanoid.nanoid(),            
        content : content,
        user_id : req.user.id,
        date : day
    }).write();
    res.redirect('/');
});

router.post('/delete_list', (req,res)=>{
    var post = req.body;
    var id = post.id;
    var toDoList = db.get('todolists').find({id:id}).value();
    if(toDoList.user_id !== req.user.id){
        return response.redirect('/');
    }
    db.get('todolists').remove({id:id}).write();
    res.redirect('/');
})

module.exports = router;

