const { request } = require('express');
const db = require('./lowdb');

module.exports ={
    todolists:(req,res,next)=>{       
        req.toDolists = db.get('todolists').value();
        next();
    }
    ,users:(req,res,next)=>{
        req.users = db.get('users').value();
        next();
    }
}