import got from "got";
import jsdom from "jsdom"
const { JSDOM } = jsdom;
const IframeReceiver = async(req,res) => {
const anime=req.query.Iframe
const episode=req.query.episode
  res.status(200).json(await gogoIframe(anime,episode))
}
const gogoIframe=async(anime,ep)=>{
    const videoLink=[]
    try {
        const gogo=await got(`https://gogoanime.fi/${anime}-episode-${ep}`);
        const gogoWeb=new JSDOM(gogo.body);
        gogoWeb.window.document.querySelectorAll(".anime_muti_link ul li a").forEach((val)=>{
            videoLink.push(val.getAttribute('data-video'))
        })
        return videoLink;
    } catch (error) {
        console.log(error)
    }
}
const rushIframe=async(anime,eps)=>{
    const videoLink=[];
    try {
        const rush=await got(`https://www.animerush.tv/${anime}-episode-${eps}/`);
        const rushRes=new JSDOM(rush.body);
        const videoSrc=rushRes.window.document.querySelectorAll("iframe").forEach((val)=>{
            if (val.title=='MP4Upload') {
                videoLink.push(val.src)
            }
         });
         console.log(videoLink)
        return videoLink;
    } catch (error) {
        console.log(error)
    }
}
export default IframeReceiver