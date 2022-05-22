import got from "got";
import jsdom from "jsdom"
const { JSDOM } = jsdom;

const ManualApi = async(req,res) => {
  if (req.url==="/api/displayAnime") {
    res.status(200).json(await displayAnime())
  }
  else if (req.url==="/api/popularAnimeListToday") {
      res.status(200).json(await popularAnimeAsideToday())
  }
  else if (req.url==="/api/popularAnimeListWeek") {
      res.status(200).json(await popularAnimeAsideWeek())
  }
  else if (req.url==="/api/popularAnimeListMonth") {
      res.status(200).json(await popularAnimeAsideMonth())
  }
  else if(req.url==="/api/animeMovie"){
        res.status(200).json(await animeMovie())
  }
  else if(req.url==="/api/ongoingAnime"){
      res.status(200).json(await ongoingSeries())
  }
  else if(req.url==="/api/carouselAnime"){
      res.status(200).json(await carouselAnimeInfo())
  }
  res.end();
}

// api list

const displayAnime=async()=>{
    const DisplayAnimeList=[];
    const name="nikhil";
    try {
        const response=await got('https://gogoplay1.com');
        const data=new JSDOM(response.body);
        data.window.document.querySelectorAll("img").forEach((val,index)=>{
            if(index!=0){
               DisplayAnimeList.push({img:val.src})
             }
        })
        data.window.document.querySelectorAll(".name").forEach((val,index)=>{
           DisplayAnimeList[index].name=val.textContent.trim();
        })
        data.window.document.querySelectorAll(".date").forEach((val,index)=>{
            DisplayAnimeList[index].date=val.textContent.trim();
        })
        return DisplayAnimeList
    } catch (error) {
        console.log(error)
    }
}

const popularAnimeAsideToday=async()=>{
    const popularAnimeAsideListToday=[];
    try {
        const response=await got('https://9anime.vc/home');
        const data=new JSDOM(response.body)
        data.window.document.querySelectorAll("#top-viewed-day img").forEach((val)=>{
            popularAnimeAsideListToday.push({img:val.getAttribute("data-src")})
        })
        data.window.document.querySelectorAll("#top-viewed-day .dynamic-name").forEach((val,index)=>{
            popularAnimeAsideListToday[index].name=val.textContent.trim();
        })
        data.window.document.querySelectorAll("#top-viewed-day .fd-infor").forEach((val,index)=>{
            popularAnimeAsideListToday[index].views=val.textContent.trim();
        })
        return popularAnimeAsideListToday
    } catch (error) {
        console.log(error)
    }
}
const popularAnimeAsideMonth=async()=>{
    const popularAnimeAsideListMonth=[]
    try {
        const response=await got('https://9anime.vc/home');
        const data=new JSDOM(response.body)
        data.window.document.querySelectorAll("#top-viewed-month img").forEach((val)=>{
            popularAnimeAsideListMonth.push({img:val.getAttribute("data-src")})
        })
        data.window.document.querySelectorAll("#top-viewed-month .dynamic-name").forEach((val,index)=>{
            popularAnimeAsideListMonth[index].name=val.textContent.trim();
        })
        data.window.document.querySelectorAll("#top-viewed-month .fd-infor").forEach((val,index)=>{
            popularAnimeAsideListMonth[index].views=val.textContent.trim();
        })
        return popularAnimeAsideListMonth;
    } catch (error) {
        console.log(error)
    }
}
const popularAnimeAsideWeek=async()=>{
    const popularAnimeAsideListWeek=[]
    try {
        const response=await got('https://9anime.vc/home');
        const data=new JSDOM(response.body)
        data.window.document.querySelectorAll("#top-viewed-week img").forEach((val)=>{
            popularAnimeAsideListWeek.push({img:val.getAttribute("data-src")})
        })
        data.window.document.querySelectorAll("#top-viewed-week .dynamic-name").forEach((val,index)=>{
            popularAnimeAsideListWeek[index].name=val.textContent.trim();
        })
        data.window.document.querySelectorAll("#top-viewed-week .fd-infor").forEach((val,index)=>{
            popularAnimeAsideListWeek[index].views=val.textContent.trim();
        })
        return popularAnimeAsideListWeek;
    } catch (error) {
        console.log(error)
    }
}
const animeMovie=async()=>{
    const AnimeMovieList=[];
    try {
        const response=await got('https://gogoplay1.com/movies');
        const data=new JSDOM(response.body);
        data.window.document.querySelectorAll("img").forEach((val,index)=>{
            if(index!=0){
               AnimeMovieList.push({img:val.src})
             }
        })
        data.window.document.querySelectorAll(".name").forEach((val,index)=>{
           AnimeMovieList[index].name=val.textContent.trim();
        })
        data.window.document.querySelectorAll(".date").forEach((val,index)=>{
            AnimeMovieList[index].date=val.textContent.trim();
        })
        return AnimeMovieList
    } catch (error) {
        console.log(error)
    }
}
const ongoingSeries=async()=>{
    const OngoingSeriesList=[];
    try {
        const response=await got('https://gogoplay1.com/ongoing-series');
        const data=new JSDOM(response.body);
        data.window.document.querySelectorAll("img").forEach((val,index)=>{
            if(index!=0){
               OngoingSeriesList.push({img:val.src})
             }
        })
        data.window.document.querySelectorAll(".name").forEach((val,index)=>{
           OngoingSeriesList[index].name=val.textContent.trim();
        })
        data.window.document.querySelectorAll(".date").forEach((val,index)=>{
            OngoingSeriesList[index].date=val.textContent.trim();
        })
        return OngoingSeriesList;
    } catch (error) {
        console.log(error)
    }
}
const carouselAnimeInfo=async()=>{
    const carouselAnime=[]
    try {
        const res=await got("https://9anime.vc/home");
        const data=new JSDOM(res.body);
        data.window.document.querySelectorAll(".deslide-cover-img img").forEach((val)=>{
            carouselAnime.push({img:val.src})
        })
        data.window.document.querySelectorAll(".desi-head-title").forEach((val,index)=>{
            carouselAnime[index].name=val.textContent.trim();
        })
        return carouselAnime;
    } catch (error) {
        console.log(error)
    }
}
export default ManualApi;