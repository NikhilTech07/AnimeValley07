import {ManualUser} from "../../../models/schema.js";
import bcrypt from "bcryptjs";
import connectDB from "../../../config/connectDB.js";
connectDB();
const manual=async(req,res)=>{
    let {name,email,img,Password}=req.body;
    let oldUser=await ManualUser.findOne({email}).exec();
    if (oldUser) {
        let passwordExist=oldUser.Password;
        if (passwordExist) {
            res.status(200).json({"message":"User Already Exist"})
        }
        else{
            res.status(200).json({"message":"User Already Exist please use Google Login Auth"})
        }
    } else {
        Password=await bcrypt.hash(Password,10);
        const user=new ManualUser({name,email,img,Password});
        const token=await user.generateAnimeAuthToken();
        const result=await user.save();
        res.status(200).json({"message":"Successful SignUp...."});
    }
    res.end();
}
export default manual;