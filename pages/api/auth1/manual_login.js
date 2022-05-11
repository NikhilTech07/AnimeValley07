import {ManualUser} from "../../../models/Schema.js";
import connectDB from "../../../config/ConnectDB.js";
connectDB();

const manual_login=async(req,res)=>{
    const {Gmail}=req.body;
    let oldUser=await ManualUser.findOne({Gmail});
    if (oldUser) {
        res.status(200).json({"message":"You are Login in ...",result:oldUser})
    } else {
        res.status(200).json({"message":"Please Sign in first"})
    }
}

export default manual_login;