var db = require('../lib/lowdb');
var nanoid = require('nanoid');
const todo = require('../lib/todo');
const express = require('express');
var router = express.Router();

router.get('/',(req,res,next)=>{
        console.log('todo');
        res.send('test');
    });
    
router.post('/add_list',(req,res)=>todo.add_list(req,res));

router.post('/delete_list',(req,res)=>todo.delete_list(req,res));

module.exports = router;

