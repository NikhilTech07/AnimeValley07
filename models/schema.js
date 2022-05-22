import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const jwt=require("jsonwebtoken");
const GoogleSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    img:{type:String,required:true},
    Favourite:{type:Array,required:true},
    WatchList:{type:Array,required:true},
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})
const UserSchema=new mongoose.Schema({
    firstName:{type:String,required:true},
    secondName:{type:String,required:true},
    img:{type:String,required:true},
    Gmail:{type:String,required:true},
    Password:{type:String,required:true},
    Favourite:{type:Array,required:true},
    WatchList:{type:Array,required:true},
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})
// generating token
UserSchema.methods.generateAuthToken= async function(){
    try {
        const token=jwt.sign({_id:this._id.toString()},process.env.JWT_SECRET);
        this.tokens=this.tokens.concat({token});
        await this.save();
        return token;
    } catch (error) {
        console.log(error)
    }
}

UserSchema.pre("save",async function(next){
    this.Password=await bcrypt.hash(this.Password,10);
    next();
})

GoogleSchema.methods.generateOAuthToken=async function(){
    try {
        const token=jwt.sign({_id:this._id.toString()},process.env.JWT_SECRET);
        this.tokens=this.tokens.concat({token});
        await this.save();
        return token;
    } catch (error) {
        console.log(error)
    }
}
const GoogleUser=mongoose.models.AnimeValley_User || mongoose.model('AnimeValley_User', GoogleSchema);
const ManualUser=mongoose.models.AnimeValley_User||mongoose.model("AnimeValley_User",UserSchema)
module.exports={ManualUser,GoogleUser}