import cookie from "cookie";
import connectDB from "../../../config/connectDB";
connectDB();
const manual_logout=(req,res)=>{
   res.setHeader("Set-Cookie",cookie.serialize("AnimeValley_token","",{
       httpOnly:true,
       sameSite:"strict",
       path:"/"
   }))
   res.status(200).json({"message":"Successfully logged out"})
   res.end();
}
export default manual_logout