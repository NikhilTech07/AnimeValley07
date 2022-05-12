import {ManualUser} from "../../../models/schema.js";
import connectDB from "../../../config/connectDB.js";
import cookie from "cookie"
connectDB();

const manual_login=async(req,res)=>{
    const {Gmail}=req.body;
    let oldUser=await ManualUser.findOne({Gmail});
    if (oldUser) {
        const token=await oldUser.generateAuthToken();
        res.setHeader("Set-Cookie",cookie.serialize('AnimeValley_token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV !== "development",
            sameSite:"strict",
            path:"/"
        }))
        res.status(200).json({"message":"You are Login in ..."})
    } else {
        res.status(200).json({"message":"Please Sign in first"})
    }
}

export default manual_login;