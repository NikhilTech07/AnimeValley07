const mongoose=require('mongoose');
const GoogleSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    img:{type:String,required:true}
})
const UserSchema=new mongoose.Schema({
    firstName:{type:String,required:true},
    secondName:{type:String,required:true},
    Gmail:{type:String,required:true}
})
const GoogleUser=mongoose.models.GoogleUserAuth || mongoose.model('GoogleUserAuth', GoogleSchema);
const ManualUser=mongoose.models.UserAuth||mongoose.model("UserAuth",UserSchema)
module.exports={GoogleUser,ManualUser}