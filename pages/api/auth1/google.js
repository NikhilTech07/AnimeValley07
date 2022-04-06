const google=async(req,res)=>{
    console.log(req.body)
    res.status(200).json(req.body)
}
export default google;