const jwt=require("jsonwebtoken");
import {ManualUser} from "../../../models/Schema.js";
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
    const token=req.cookies.jwt;
    const verifyToken=jwt.verify(token,process.env.JWT_SECRET);
    const User=ManualUser.findOne({_id:verifyToken._id,"tokens.token":token});
    return User;
}