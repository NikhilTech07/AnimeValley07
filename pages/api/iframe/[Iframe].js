import got from "got";
import jsdom from "jsdom"
const { JSDOM } = jsdom;
const IframeReceiver = async(req,res) => {
const anime=req.query.Iframe;
const streamingChannel=req.query.iframe;
const episode=req.query.episode;
switch (streamingChannel) {
    case "gogo":
        res.status(200).json(await gogoIframe(anime,episode));
        res.end();
        break;
    case "rush":
        res.status(200).json(await rushIframe(anime,episode))
    default:
        break;
}
}
const gogoIframe=async(anime,ep)=>{
    const videoLink=[];
    const videoName=[];
    try {
        const gogo=await got(`https://gogoanime.sk/${anime}-episode-${ep}`);
        const gogoWeb=new JSDOM(gogo.body);
        gogoWeb.window.document.querySelectorAll(".anime_muti_link ul li a").forEach((val)=>{
            videoLink.push(val.getAttribute('data-video'))
        })
        gogoWeb.window.document.querySelectorAll(".anime_muti_link ul li").forEach((val)=>{
            videoName.push(val.textContent.replaceAll("Choose this server",""));
        })
        const gogoObject={videoLink,videoName}
        return gogoObject;
    } catch (error) {
        console.log("error")
    }
}
const rushIframe=async(anime,eps)=>{
    let videoData=[];
    let rushObject={
        videoLink:[],
        videoName:[]
    }
    try {
        const rush=await got(`https://www.animerush.tv/${anime}-episode-${eps}/`);
        const rushRes=new JSDOM(rush.body);
        rushRes.window.document.querySelectorAll("h3").forEach((val)=>{
            rushObject.videoName.push(val.textContent)
        })
        rushRes.window.document.querySelectorAll("h3 a").forEach((val)=>{
            videoData.push(val.href);
        });
        // console.log(videoData);
        await Promise.all(videoData.map(async(val)=>{
            const insideRushres=await got(`https:${val}`);
            const insideRush=new JSDOM(insideRushres.body);
            rushObject.videoLink.push(insideRush.window.document.querySelector(".videoembed iframe").src);
        }))
        console.log(rushObject)
        return rushObject;
    } catch (error) {
        console.log(error)
    }
}
export default IframeReceiver