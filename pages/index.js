import Nav from "../components/Nav";
import Link from "next/link";
import PopularAnimeAside from "../components/PopularAnimeAside";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Autoplay, EffectCoverflow } from "swiper";
import { FaPlay } from "react-icons/fa";
import { useState, useRef,useEffect } from "react";
export const getServerSideProps = async (context) => {
  const url=context.req.headers.host;
  try {
    const carouselRes = await fetch(`http://${url}/api/carouselAnime`, {
      method: "Post"
    })
    const carouselData = await carouselRes.json();
    return{
      props:{
        carouselData
      }
    }
  }
  catch{
    console.log("error")
  }
}
const Index = ({carouselData}) => {
  const animeContainer = useRef();
  const animeCarousel=useRef();
  const animeText=useRef();
  const [animeDetails,SetanimeDetails]=useState({recentAnime:{},popularAnimeToday:{},popularAnimeWeek:{},popularAnimeMonth:{},ongoingAnime:{},animeMovie:{}});
  const [popularAnimeType, SetPopularAnimeType] = useState("today");
  const [animeContainerContent,SetanimeContainerContent]=useState("recentAnime")
  useEffect(async()=>{
    const recentAnimeRes=await fetch("/api/displayAnime",{
      method:"Post"
    });
    const recentAnimeData=await recentAnimeRes.json();
    const ongoingAnimeRes=await fetch("/api/ongoingAnime",{
      method:"Post"
    });
    const ongoingAnimeData=await ongoingAnimeRes.json();
    const animeMovieRes=await fetch("/api/animeMovie",{
      method:"Post"
    });
    const animeMovieData=await animeMovieRes.json();
    const popularAnimeAsideTodayRes = await fetch(`/api/popularAnimeListToday`, {
      method: 'post'
    });
    const popularAnimeAsideTodayData = await popularAnimeAsideTodayRes.json();
    const popularAnimeAsideWeekRes = await fetch(`/api/popularAnimeListWeek`, {
      method: 'post'
    });
    const popularAnimeAsideWeekData = await popularAnimeAsideWeekRes.json();
    const popularAnimeAsideMonthRes = await fetch(`/api/popularAnimeListMonth`, {
      method: 'post'
    });
    const popularAnimeAsideMonthData = await popularAnimeAsideMonthRes.json();
    SetanimeDetails({
      recentAnime:recentAnimeData,
      popularAnimeToday:popularAnimeAsideTodayData,
      popularAnimeWeek:popularAnimeAsideWeekData,
      popularAnimeMonth:popularAnimeAsideMonthData,
      ongoingAnime:ongoingAnimeData,
      animeMovie:animeMovieData
    })
  },[])
  const addPage = async () => {
    try {
      const res = await fetch("/api/pagesApi/displayAnime?pages=2");
      const container=animeContainer.current;
      const data = await res.json();
      console.log(data)
      data.map((val) => {
        let newAnimeCard=document.createElement('div');
        newAnimeCard.className='anime_card'
        newAnimeCard.setAttribute("key",`${val.name}`)
        newAnimeCard.innerHTML = ` 
                           <a href="/anime/S1/watch/${val.name.replaceAll(" ", '-').replaceAll("-Episode-", '?episode=').toLowerCase()}">
                           <div className="anime_image">
                           <Image src=${val.img} width="100px" height="100px" alt={val.name}></Image>
                         </div>
                         <div className="anime_desc">
                           <p className="anime_title">${val.name}</p>
                           <p className="anime_date">${val.date}</p>
                         </div>
                           <a/>
                          `
              container.appendChild(newAnimeCard)
      })
    } catch (error) {
      console.log(error)
    }
  }
  const setContainer=(name)=>{
    const carousel=animeCarousel.current;
    const text=animeText.current;
    if (name!=='recentAnime') {
      carousel.style.display="none";
      text.innerText=name
    }
    else{
      carousel.style.display="block";
    }
    SetanimeContainerContent(name);
  }
  return (
    <>
      <header>
        <Nav />
        <div className="secondNavbar">
                    <div className="widgets_list">
                        <ul className="widgets_link">
                        <li className='widgets' onClick={()=>{
                            setContainer('recentAnime')
                            }} >All</li>
                            <li className='widgets' onClick={()=>{
                               setContainer("ongoingAnime")
                            }} >Ongoing</li>
                            <li className='widgets' onClick={()=>{
                              setContainer("popularAnime")
                            }} >Popular</li>
                            <li className='widgets' onClick={()=>{
                              setContainer("animeMovie")
                            }} >Movie</li>
                            <li className='widgets' onClick={()=>{
                              setContainer("animeSeries")
                            }} >Series</li>
                        </ul>
                    </div>
          </div>
        <div className='anime_carousel' ref={animeCarousel}>
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            spaceBetween={30}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 40,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={true}
            modules={[EffectCoverflow, Autoplay]}
            className="mySwiper"
          >
            {carouselData ? carouselData.map((val) => {
              return (
                <>
                  <SwiperSlide key={val.name}>
                  <Link href={`/anime/S1/watch/${val.name.replaceAll(" ", '-').replaceAll("-Episode-", '?episode=').toLowerCase()}`}>
                    <a>
                    <div className="carousel_card">
                      <div className="carousel_image">
                        <Image src={val.img} width="432px" height="286px" alt={val.name} />
                      </div>
                      <div className="carousel_anime_details">
                        <p className="carousel_anime_name">{val.name}</p>
                        <button className="carousel_play_button">Play <FaPlay style={{ color: "blue" }} /> </button>
                      </div>
                    </div>
                    </a>
                  </Link>
                  </SwiperSlide>
                </>
              )
            }):<p style={{color:"#fff",textAlign:"center"}}>Loading.....</p>} 
          </Swiper>
        </div>
      </header>
         <div className="megaContainer">
        <section>
          <div className="TextAndBox">
            <div className="box"></div>
            <p className="writtenAnimeText" ref={animeText}>Recent Anime</p>
          </div>
          <main className="animeContainer" ref={animeContainer}>
            {animeDetails[`${animeContainerContent}`] ? Array.from(animeDetails[`${animeContainerContent}`]).map((val) => {
              return (
                <>
                  <Link href={`/anime/S1/watch/${val.name.replaceAll(" ", '-').replaceAll("-Episode-", '?episode=').toLowerCase()}`}>
                    <a>
                      <div className="anime_card" key={val.name}>
                        <div className="anime_image">
                          <Image src={val.img} width="100px" height="100px" alt={val.name}></Image>
                        </div>
                        <div className="anime_desc">
                          <p className="anime_title">{val.name}</p>
                          <p className="anime_date">{val.date}</p>
                        </div>
                      </div>
                    </a>
                  </Link>
                </>
              )
            }):<p style={{color:"#fff",textAlign:"center"}}>Loading.....</p>}
          </main>
          <div className="button_for_more_anime_content">
            <button className="more_anime_content" onClick={() => addPage()}>More</button>
          </div>
        </section>
        <aside className="popularContainer">
          <div className="TextAndBox asideBox">
            <div className="box"></div>
            <p className="writtenAnimeText">Popular Anime</p>
          </div>
          <div className="top_anime_selector">
            <button className="today popularAnimeDateSelector" onClick={() => { SetPopularAnimeType("today") }}><u>Today</u></button>
            <button className="week popularAnimeDateSelector" onClick={() => { SetPopularAnimeType("week") }}><u>Week</u></button>
            <button className="month popularAnimeDateSelector" onClick={() => { SetPopularAnimeType("month") }}><u>Month</u></button>
          </div>
          <main className="popularAnimeList">
            {popularAnimeType === "today" && <div className="popular_anime_today">
              {animeDetails.popularAnimeToday?Array.from(animeDetails.popularAnimeToday).map((val) => {
                return (
                  <>
                    <PopularAnimeAside name={val.name} img={val.img} views={val.views} key={val.name} />
                  </>
                )
              }):<p style={{color:"#fff",textAlign:"center"}}>Loading.....</p>}
            </div>}
            {popularAnimeType === "week" && <div className="popular_anime_week">
              {animeDetails.popularAnimeWeek?Array.from(animeDetails.popularAnimeWeek).map((val) => {
                return (
                  <>
                    <PopularAnimeAside name={val.name} img={val.img} views={val.views} key={val.name} />
                  </>
                )
              }):<p style={{color:"#fff",textAlign:"center"}}>Loading.....</p>}
            </div>}
            {popularAnimeType === "month" && <div className="popular_anime_Month" >
              {animeDetails.popularAnimeMonth?Array.from(animeDetails.popularAnimeMonth).map((val) => {
                return (
                  <>
                    <PopularAnimeAside name={val.name} img={val.img} views={val.views} key={val.name} />
                  </>
                )
              }):<p style={{color:"#fff",textAlign:"center"}}>Loading.....</p>}
            </div>}
          </main>
        </aside>
      </div>
    </>
  )
}

export default Index