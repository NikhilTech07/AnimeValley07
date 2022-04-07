const mongoose=require('mongoose')
const ConnectDB = () => {
    mongoose.connect(process.env.DB_URL)
    .then(()=>{
        console.log("connection...")
    }).catch((err)=>{
        throw err;
    })
}
export default ConnectDB;