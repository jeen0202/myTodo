const { request } = require('express');
const db = require('./lowdb');

module.exports ={
    todolists:(req,res,next)=>{       
        req.list = db.get('todolists').value();
        next();
    }
    ,users:(req,res,next)=>{
        req.author = db.get('users').value();
        next();
    }
}