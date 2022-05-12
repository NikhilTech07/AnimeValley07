const jwt=require("jsonwebtoken");
import {ManualUser} from "../../../models/schema.js";
export default async function Token_Authentication(req, res) {
    switch (req.method) {
        case "GET":
            res.status(200).json(await fetchUserInfo(req,res));
            break;
        default:
            break;
    }
  }

  const fetchUserInfo=async(req,res)=>{
    try {
        const token=req.cookies.AnimeValley_token;
        const verifyToken=jwt.verify(token,process.env.JWT_SECRET);
        const User=ManualUser.findOne({_id:verifyToken._id,"tokens.token":token});
        return User;
    } catch (error) {
        return{
            "message":error
        }
    }
}