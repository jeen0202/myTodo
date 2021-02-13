const { request } = require('express');
const db = require('./lowdb');

module.exports ={
    todolists:(req,res,next)=>{    
        console.log(req.params.pageId)
        var toDolists= db.get('todolists')
        .filter({user_id:req.params.pageId}).value()   
        req.toDolists = toDolists;
        if(toDolists === undefined){
            req.toDolists = "";
        }
        next();
    }
    ,users:(req,res,next)=>{
        req.users = db.get('users').value();
        next();
    }
}