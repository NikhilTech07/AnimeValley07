import {ManualUser} from "../../../models/Schema.js";
import ConnectDB from "../../../config/ConnectDB.js";
ConnectDB();

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