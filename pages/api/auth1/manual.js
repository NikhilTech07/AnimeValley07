import {ManualUser} from "../../../models/Schema.js";
import ConnectDB from "../../../config/ConnectDB.js"
ConnectDB();
const manual=async(req,res)=>{
    const {firstName,secondName,Gmail}=req.body;
    const user=new ManualUser({firstName,secondName,Gmail});
    const result=await user.save();
    res.status(200).json({"ma,e":"dhhdhd"})
}
export default manual;