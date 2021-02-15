var db = require('../lib/lowdb');
var nanoid = require('nanoid');

exports.add_list = (req,res)=>{
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
    res.redirect(`/${req.user.id}`);
}

exports.delete_list = (req,res)=>{
    var post = req.body;
    var id = post.id;
    var toDoList = db.get('todolists').find({id:id}).value();
    if(toDoList.user_id !== req.user.id){
        return response.redirect('/');
    }
    db.get('todolists').remove({id:id}).write();
    res.redirect(`/${req.user.id}`);
}