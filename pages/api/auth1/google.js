import {GoogleUser} from "../../../models/Schema.js";
import ConnectDB from "../../../config/ConnectDB.js"
ConnectDB();
const google=async(req,res)=>{
    const {name,email,image}=req.body;
    const user=new GoogleUser({name,email,img:image});
    const result=await user.save();
    res.status(200).json(result)
}
export default google;