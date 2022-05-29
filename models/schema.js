import mongoose from "mongoose";
const jwt=require("jsonwebtoken");
const UserSchema=new mongoose.Schema({
    name:{type:String,required:true},
    img:{type:String,required:true},
    email:{type:String,required:true},
    Password:{type:String},
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
UserSchema.methods.generateAnimeAuthToken= async function(){
    try {
        const token=jwt.sign({_id:this._id},process.env.JWT_SECRET);
        this.tokens=this.tokens.concat({token});
        await this.updateOne(this._id);
        return token;
    } catch (error) {
        console.log(error)
    }
}
const ManualUser=mongoose.models.AnimeValley_User || mongoose.model('AnimeValley_User', UserSchema)
module.exports={ManualUser}