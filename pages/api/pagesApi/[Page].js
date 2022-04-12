import got from "got";
import jsdom from "jsdom"
const { JSDOM } = jsdom;
const PageApi = async(req,res) => {
    const pageValue=req.query.pages
    if (req.url==`/api/pagesApi/displayAnime?pages=${pageValue}`) {
        res.status(200).json(await displayAnimePage())
    }
}
const displayAnimePage=async(pageNum)=>{
    let animePageResult=[]
    try {
        const res=await got(`https://gogoplay1.com/?page=${pageNum}`);
        const data=new JSDOM(res.body);
        data.window.document.querySelectorAll("img").forEach((val,index)=>{
            if(index!=0){
               animePageResult.push({img:val.src})
             }
        })
        data.window.document.querySelectorAll(".name").forEach((val,index)=>{
           animePageResult[index].name=val.textContent.trim();
        })
        data.window.document.querySelectorAll(".date").forEach((val,index)=>{
            animePageResult[index].date=val.textContent.trim();
        })
         return animePageResult
    } catch (error) {
        console.log(error)
    }
}
const ongoingAnimePage=async(pageNum)=>{
    let animePageResult=[]
    try {
        const res=await got(`https://gogoplay1.com/ongoing-series?page=${pageNum}`);
        const data=new JSDOM(res.body);
        data.window.document.querySelectorAll("img").forEach((val,index)=>{
            if(index!=0){
               animePageResult.push({img:val.src})
             }
        })
        data.window.document.querySelectorAll(".name").forEach((val,index)=>{
           animePageResult[index].name=val.textContent.trim();
        })
        data.window.document.querySelectorAll(".date").forEach((val,index)=>{
            animePageResult[index].date=val.textContent.trim();
        })
         return animePageResult
    } catch (error) {
        console.log(error)
    }
}
const popularAnimePage=async(pageNum)=>{
    let animePageResult=[];
    try {
        const response=await got(`https://ww1.gogoanime2.org/popular/${pageNum}`);
        const data =new JSDOM(response.body);
        data.window.document.querySelectorAll("img").forEach((val,index)=>{
            if(index>0){
               animePageResult.push({img:"https://ww1.gogoanime2.org/"+val.src})
           }
        })
        data.window.document.querySelectorAll(".name").forEach((val,index)=>{
            animePageResult[index].name=val.textContent.trim();
         })
         data.window.document.querySelectorAll(".released").forEach((val,index)=>{
             animePageResult[index].date=val.textContent.trim();
         })
         return animePageResult;
    } catch (error) {
        console.log(error)
    }
}
const animeMoviePage=async(pageNum)=>{
    let animePageResult=[]
    try {
        const res=await got(`https://gogoplay1.com/movies?page=${pageNum}`);
        const data=new JSDOM(res.body);
        data.window.document.querySelectorAll("img").forEach((val,index)=>{
            if(index!=0){
               animePageResult.push({img:val.src})
             }
        })
        data.window.document.querySelectorAll(".name").forEach((val,index)=>{
           animePageResult[index].name=val.textContent.trim();
        })
        data.window.document.querySelectorAll(".date").forEach((val,index)=>{
            animePageResult[index].date=val.textContent.trim();
        })
         return animePageResult
    } catch (error) {
        console.log(error)
    }
}
export default PageApi