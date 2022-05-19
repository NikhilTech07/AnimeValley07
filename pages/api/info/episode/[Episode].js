import got from "got";
import jsdom from "jsdom"
const { JSDOM } = jsdom;
const Episode = async(req,res) => {
    const query = req.query.Episode.replaceAll(" ", "%20");
    res.status(200).json(await totalEpisode(query))
    res.end();
}
const totalEpisode=async(anime)=>{
    let animeInfo=[]
    try {
        const res=await got(`https://ww1.gogoanime2.org/anime/${anime}`);
        const data=new JSDOM(res.body);
        const totalEp=data.window.document.querySelectorAll("#episode_related>li").length;
        animeInfo.push({Episode:totalEp})
        return animeInfo
    } catch (error) {
        console.log(error)
    }
}
export default Episode