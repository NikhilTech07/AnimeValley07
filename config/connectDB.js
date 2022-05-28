const mongoose=require('mongoose')
const connectDB = () => {
    mongoose.connect("mongodb+srv://Nikhil:Nikhil1234500000@cluster0.6ay1m.mongodb.net/UserAccount?retryWrites=true&w=majority")
    .then(()=>{
        console.log("connection...")
    }).catch((err)=>{
        throw err;
    })
}
export default connectDB;