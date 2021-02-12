const { request } = require('express');
const db = require('./lowdb');

module.exports ={
    todolists:(req,res,next)=>{    
        console.log(req.params.pageId)   
        req.toDolists = db.get('todolists').find({user_id:req.params.pageId}).value();
        next();
    }
    ,users:(req,res,next)=>{
        req.users = db.get('users').value();
        next();
    }
}