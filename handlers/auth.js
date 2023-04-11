const db=require("../models");
const jwt = require('jsonwebtoken');


exports.signin = async function(req,res,next){
   try {
    let user = await db.User.findOne({username:req.body.username});
    let {id,username} = user;
    let isMatch = await user.comparePassword(req.body.password);
   

    if(isMatch){
        let token = jwt.sign({
            id,
            username
        },
        process.env.SECRET_KEY);
        console.log("from signin function", token, username,id);
        return res.status(200).json({
            id,
            username,
            token
        });        
    }else{
        return next({status:400,
        message:"invalid email/password"});
    }
    
   } catch (error) {
    return next({status:400, message:"invalid email/password"});
   }
    
};

exports.signup = async function(req,res,next){
    try {
        // console.log('got here',db);
        let user = await db.User.create(req.body);
        // console.log('show user',user);
        let {id,username,firstname} = user;
        let token = jwt.sign({
            id:id,
            username,
            firstname
        },process.env.SECRET_KEY
        );
    return res.status(200).json({id,username,firstname,token});
    } catch (error) {
        return next({status:400,message:error.message});
    }
};