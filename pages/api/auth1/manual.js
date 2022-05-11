import {ManualUser} from "../../../models/Schema.js";
import ConnectDB from "../../../config/ConnectDB.js";
ConnectDB();
const manual=async(req,res)=>{
    const {firstName,secondName,Gmail}=req.body;
    let oldUser=await ManualUser.findOne({Gmail});
    if (oldUser) {
        console.log('user exist')
        res.status(200).json({"message":"User Already Exist"})
    } else {
        const user=new ManualUser({firstName,secondName,Gmail});
        const token=await user.generateAuthToken();

        const result=await user.save();
        res.status(200).json({"message":"Successful SignUp...."});
    }
}
export default manual;