const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,        
    },
    firstname:{
        type:String,
        required:true,        
    },
    lastname:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:'user'
    }
})

userSchema.pre("save", async function(next){
    try {
        if(!this.isModified("password")){
                return next();
        }
        let hashedPassword =await bcrypt.hash(this.password,10);
        this.password = hashedPassword;
        return next();
    } catch (err) {
        return next(err);
        
    }
})


userSchema.methods.comparePassword = async function(userPassword, next){
    try {
        let isMatch = await bcrypt.compare(userPassword, this.password);
        return isMatch;
    } catch (error) {
        return next(err);
    }
}

const User = mongoose.model("User", userSchema);

module.exports=User;