import {ManualUser} from "../../../models/schema.js";
import connectDB from "../../../config/connectDB.js";
import bcyrpt from "bcryptjs";
import cookie from "cookie"
connectDB();

const manual_login=async(req,res)=>{
    const {Gmail,Password}=req.body;
    let oldUser=await ManualUser.findOne({Gmail});
    if (oldUser) {
        const isMatched=bcyrpt.compare(Password,oldUser.Password);
         if (isMatched) {
            const token=await oldUser.generateAuthToken();
            const _date=new Date();
            res.setHeader("Set-Cookie",cookie.serialize('AnimeValley_token',token,{
                httpOnly:true,
                secure:process.env.NODE_ENV !== "development",
                expires:new Date(_date.getFullYear()+3,_date.getMonth(),_date.getDate()),
                sameSite:"strict",
                path:"/"
            }))
            res.status(200).json({"message":"You are Login in ..."})
         } else {
             res.status(200).json({"message":"Incorrect Password"})
         }
        } else {
        res.status(200).json({"message":"Please Sign in first"})
    }
    res.end();
}

export default manual_login;