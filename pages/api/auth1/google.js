import {ManualUser} from "../../../models/schema";
import connectDB from "../../../config/connectDB.js";
import cookie from "cookie";
connectDB();
const google=async(req,res)=>{
    const {name,email,image}=req.body;
    let oldUser=await ManualUser.findOne({email}).exec();
    if (oldUser) {
        if (oldUser.Password) {
            res.status(200).json({"message":"Please use manual method to login"});
        } else {
            const token=await oldUser.generateAnimeAuthToken();
            const _date=new Date();
            res.setHeader("Set-Cookie",cookie.serialize('AnimeValley_token',token,{
                expires:new Date(_date.getFullYear()+3,_date.getMonth(),_date.getDate()),
                sameSite:"strict",
                path:"/"
            }))
            res.status(200).json({"message":"User Already Exist"});
        }
    } else {
        const user=new ManualUser({name,email,img:image});
        const token=await user.generateAnimeAuthToken();
        const _date=new Date();
            res.setHeader("Set-Cookie",cookie.serialize('AnimeValley_token',token,{
                httpOnly:true,
                secure:process.env.NODE_ENV !== "development",
                expires:new Date(_date.getFullYear()+3,_date.getMonth(),_date.getDate()),
                sameSite:"strict",
                path:"/"
        }))
        const result=await user.save();
        res.status(200).json({"message":"Successful SignUp...."})
    }
    res.end();
}
export default google;