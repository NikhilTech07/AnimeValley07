const mongoose=require('mongoose');
const GoogleUserSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    img:{type:String,required:true}
})
export default mongoose.models('GoogleAuth',GoogleUserSchema);