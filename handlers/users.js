const db = require('../models')
const jwt = require('jsonwebtoken');


exports.getUsers= async function(req,res,next){
    try {
        let user = await db.User.find({});
        console.log("user",user);
        let {firstname, lastname } = user;
        return res.status(200).json({user});
    } catch (error) {
        return next({status:400, message:error.message});
        
    }
}

exports.updateUser= async function(req,res,next){
    try {
        let user = await db.User.findById(req.body._id);      
        console.log("old user", user);
        if(user.role==='user'){
            user.role="admin"
        }else user.role="user";
        await user.save();
        console.log("new user",user)

        
    //     user.role =role;
    //     await user.save();
    //     console.log("new user values",user )

        return res.status(200).json({user});
    } catch (error) {
        return next({status:400, message:error.message});
        
    }
}



exports.deleteUser= async function(req,res,next){
    try {
        // const id1 = '_'+req.params.id;
        let user = await db.User.findByIdAndDelete(req.params.id);
        console.log(user,"deleted");
       
        return res.status(200);
    } catch (error) {
        return next({status:400, message:error.message});
        
    }
}