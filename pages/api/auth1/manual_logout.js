const manual_logout=(req,res)=>{
    res.removeHeader('Set-Cookie')
   res.status(200).json({"message":"All Clear"})
}
export default manual_logout