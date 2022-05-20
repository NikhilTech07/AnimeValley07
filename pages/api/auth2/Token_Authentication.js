const jwt=require("jsonwebtoken");
import connectDB from "../../../config/connectDB"
import {ManualUser} from "../../../models/schema.js";
connectDB();
export default async function Token_Authentication(req, res) {
    switch (req.method) {
        case "GET":
            res.status(200).json(await fetchUserInfo(req,res));
            break;
        default:
            break;
    }
    res.end();
  }

  const fetchUserInfo=async(req,res)=>{
    try {
        const token=req.cookies.AnimeValley_token;
        const verifyToken=jwt.verify(token,process.env.JWT_SECRET);
        const User=ManualUser.findOne({_id:verifyToken._id});
        return User;
    } catch (error) {
        return{
            "message":"invalid"
        }
    }
}