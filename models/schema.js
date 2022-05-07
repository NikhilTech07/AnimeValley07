const mongoose=require('mongoose');
const jwt=require("jsonwebtoken");
const GoogleSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    img:{type:String,required:true},
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
    Gmail:{type:String,required:true},
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
const GoogleUser=mongoose.models.GoogleUserAuth || mongoose.model('GoogleUserAuth', GoogleSchema);
const ManualUser=mongoose.models.UserAuth||mongoose.model("UserAuth",UserSchema)
module.exports={GoogleUser,ManualUser}