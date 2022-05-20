import {ManualUser} from "../../../models/schema.js";
import connectDB from "../../../config/connectDB.js";
connectDB();
const manual=async(req,res)=>{
    const {firstName,secondName,Gmail,img,Password}=req.body;
    let oldUser=await ManualUser.findOne({Gmail});
    let passwordExist=oldUser.Password;
    if (oldUser) {
        if (passwordExist) {
            res.status(200).json({"message":"User Already Exist"})
        }
        else{
            res.status(200).json({"message":"User Already Exist please use Google Login Auth"})
        }
    } else {
        const user=new ManualUser({firstName,secondName,Gmail,img,Password});
        const token=await user.generateAuthToken();
        const result=await user.save();
        res.status(200).json({"message":"Successful SignUp...."});
    }
    res.end();
}
export default manual;