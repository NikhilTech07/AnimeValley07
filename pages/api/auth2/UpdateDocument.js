import {ManualUser} from "../../../models/schema.js";
const UpdateDocument = async(req,res) => {
  const _id=req.body._id;
  const dataInfo=req.body.data_info;
  const type=req.body.type;
  switch (type) {
    case "favourite":
      try {
        const result=await ManualUser.updateOne({_id},{
          $push:{Favourite:dataInfo}
        })
       } catch (error) {
         console.log(error)
       }
      break;
    case "watchlist":
      try {
        const result=await ManualUser.updateOne({_id},{
          $push:{WatchList:dataInfo}
        })
      } catch (error) {
        console.log(error)
      }
    default:
      break;
  }
  res.end();
}
export default UpdateDocument;