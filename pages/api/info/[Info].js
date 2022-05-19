import got from "got";
import jsdom from "jsdom"
const { JSDOM } = jsdom;
const Info = async(req,res) => {
  const query=req.query.Info.toLowerCase().replaceAll(" ", "-").replaceAll("(", "").replaceAll(")", "").replaceAll(".", "").replaceAll(":-", "-")
  res.status(200).json(await InfoAnime(query))
  res.end();
}
const InfoAnime=async(anime)=>{
    const AnimeInformation=[];
   try {
    const res=await got(`https://gogoanime.fi/category/${anime}`)
    const data=new JSDOM(res.body);
    const anime_img=data.window.document.querySelector(".anime_info_body_bg > img").src;
    const anime_name=data.window.document.querySelector("h1").textContent.trim();
    const anime_type=data.window.document.querySelectorAll(".type")[0].textContent.trim();
    const anime_plot=data.window.document.querySelectorAll(".type")[1].textContent.replace("Plot Summary:","").trim();
    const anime_genres=data.window.document.querySelectorAll(".type")[2].textContent.trim();
    const anime_status=data.window.document.querySelectorAll(".type")[3].textContent.trim();
    AnimeInformation.push({img:anime_img,name:anime_name,plot:anime_plot,type:anime_type,genres:anime_genres,status:anime_status})
    return AnimeInformation;
   } catch (error) {
       console.log(error)
   }
}

export default Info