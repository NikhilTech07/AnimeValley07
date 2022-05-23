import Nav from "../components/Nav";
import Link from "next/link";
import PopularAnimeAside from "../components/PopularAnimeAside";
import SearchBar from "../components/SearchBar";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { HiDotsVertical } from "react-icons/hi";
import ReactDOMServer from 'react-dom/server';
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Autoplay, EffectCoverflow } from "swiper";
import { getSession,getProviders } from "next-auth/react";
import { FaPlay } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
let page = 1;
let newIndex = 0;
export const getServerSideProps = async (context) => {
  const url = context.req.headers.host;
  try {
    const carouselRes = await fetch(`http://${url}/api/carouselAnime`, {
      method: "Post"
    })
    const carouselData = await carouselRes.json();
    const recentAnimeRes = await fetch(`http://${url}/api/displayAnime`, {
      method: "Post"
    });
    const recentAnimeData = await recentAnimeRes.json();
    const popularAnimeAsideTodayRes = await fetch(`http://${url}/api/popularAnimeListToday`, {
      method: 'post'
    });
    const popularAnimeAsideTodayData = await popularAnimeAsideTodayRes.json();
    const popularAnimeAsideWeekRes = await fetch(`http://${url}/api/popularAnimeListWeek`, {
      method: 'post'
    });
    const popularAnimeAsideWeekData = await popularAnimeAsideWeekRes.json();
    const popularAnimeAsideMonthRes = await fetch(`http://${url}/api/popularAnimeListMonth`, {
      method: 'post'
    });
    const popularAnimeAsideMonthData = await popularAnimeAsideMonthRes.json();
    const ongoingAnimeRes = await fetch(`http://${url}/api/ongoingAnime`, {
      method: "Post"
    });
    const ongoingAnimeData = await ongoingAnimeRes.json();
    const animeMovieRes = await fetch(`http://${url}/api/animeMovie`, {
      method: "Post"
    });
    const animeMovieData = await animeMovieRes.json();
    return {
      props: {
        carouselData,
        popularAnimeAsideMonthData,
        popularAnimeAsideWeekData,
        popularAnimeAsideTodayData,
        ongoingAnimeData,
        animeMovieData,
        recentAnimeData,
        url
      }
    }
  }
  catch {
    console.log("error")
  }
}
const Index = ({ carouselData, popularAnimeAsideTodayData, popularAnimeAsideMonthData, popularAnimeAsideWeekData,animeMovieData,ongoingAnimeData,recentAnimeData,url}) => {
  const animeContainer = useRef();
  const animeText = useRef();
  const animeCarousel = useRef();
  const animeMenu = useRef();
  const moreContainer = useRef();
  const [popularAnimeType, SetPopularAnimeType] = useState("today");
  const [animeContainerContent, SetanimeContainerContent] = useState("recentAnime")
  const [animeDetails, SetanimeDetails] = useState({ recentAnime: {}, popularAnimeToday: {}, popularAnimeWeek: {}, popularAnimeMonth: {}, ongoingAnime: {}, animeMovie: {},authData:{} });
  const getUserData=async()=>{
    const authRes=await fetch(`/api/auth2/Token_Authentication`,{
      method:"GET",
      headers:{
        Accept:"application/json",
        "Content-Type":"application/json"
      }
    })
    const authNewData=await authRes.json();
    SetanimeDetails({
      recentAnime: recentAnimeData,
      ongoingAnime: ongoingAnimeData,
      animeMovie: animeMovieData,
      authData:authNewData
    })
  }
  useEffect(() => {
    getUserData();
  }, [])
  const addPage = async (name) => {
    page = page + 1;
    try {
      const container = moreContainer.current;
      const res = await fetch(`/api/pagesApi/${name}?pages=${page}`);
      const data = await res.json();
      data.map((val, index) => {
        container.innerHTML += ` 
        <div class="anime_card_details" key={val.name} style="position:relative">
         <a href=/anime/watch/${val.name.replaceAll(" ", '-').replaceAll("-Episode-", '?episode=').toLowerCase()}>
            <div class="anime_card">
              <div class="anime_image">
              <Image src=${val.img} width="100px" height="100px" alt=${val.name}></Image>
              </div>
              <div class="anime_desc">
                <p class="anime_title">${val.name}</p>
                <p class="anime_date">${val.date}</p>
              </div>
            </div>
          </a>
            <div class="button_anime_menu">
                  <button class="anime_menu_icon" onclick="document.getElementsByClassName('anime_menu')[${index + newIndex}].style.display='block' " onblur="document.getElementsByClassName('anime_menu')[${index + newIndex}].style.display='none'">
                  ${ReactDOMServer.renderToString(<HiDotsVertical />)}
                  </button>
            </div>
            <div class="anime_menu" ref={animeMenu} onmouseleave="document.getElementsByClassName('anime_menu')[${index + newIndex}].style.display='none'">
                      <ul class="anime_menu_items_widgets">
                        <li class="anime_menu_widgets">
                            <a href=/anime/watch/${val.name.replaceAll(" ", '-').replaceAll("-Episode-", '?episode=').toLowerCase()}>
                            Play
                            </a>
                        </li>
                        <li class="anime_menu_widgets">Add to Favourite</li>
                        <li class="anime_menu_widgets">Add to Watch Later</li>
                      </ul>
                </div>
      </div>`
      })
    } catch (error) {
      console.log(error)
    }
  }
  const showAnimeMenu = (Index) => {
    document.getElementsByClassName("anime_menu")[Index].style.display = "block";
  }
  const hideAnimeMenu = (Index) => {
    document.getElementsByClassName("anime_menu")[Index].style.display = "none";
  }
  const setContainer = (name) => {
    const carousel = animeCarousel.current;
    const container = moreContainer.current;
    const text = animeText.current;
    newIndex = 0;
    if (name !== 'recentAnime') {
      carousel.style.display = "none";
      container.innerHTML = ""
      page = 1;
      text.innerText = name
    }
    else {
      carousel.style.display = "block";
    }
    SetanimeContainerContent(name);
  }
  const addToFavourite=async([data_img,data_name,data_target])=>{
    console.log(animeDetails.authData)
    const anime_link=data_target.nativeEvent.path[4].getElementsByTagName("a")[0].href.replaceAll(`http://${url}`,'');
    const anime_info={
      _id:animeDetails.authData._id,
      type:"favourite",
      data_info:{ data_img,
                data_name,
                anime_link}
    }
    const res=await fetch("/api/auth2/UpdateDocument",{
      method:"POST",
      body:JSON.stringify(anime_info),
      headers:{
        "Accept":"application/json",
        "Content-Type":"application/json"
      }
    })
  }
  const addToWatchList=async([data_img,data_name,data_target])=>{
    const anime_link=data_target.nativeEvent.path[4].getElementsByTagName("a")[0].href.replaceAll(`http://${url}`,'');
    const anime_info={
      _id:animeDetails.authData._id,
      type:"watchlist",
      data_info:{ data_img,
                data_name,
                anime_link}
    }
    const res=await fetch("/api/auth2/UpdateDocument",{
      method:"POST",
      body:JSON.stringify(anime_info),
      headers:{
        "Accept":"application/json",
        "Content-Type":"application/json"
      }
    })
  }
  return (
    <>
    {console.log(url)}
      <header>
        <Nav/>
        <div className="secondNavbar">
          <div className="widgets_list">
            <ul className="widgets_link">
              <li className='widgets' onClick={() => {
                setContainer('recentAnime')
              }} >All</li>
              <li className='widgets' onClick={() => {
                setContainer("ongoingAnime")
              }} >Ongoing</li>
              <li className='widgets' onClick={() => {
                setContainer("popularAnime")
              }} >Popular</li>
              <li className='widgets' onClick={() => {
                setContainer("animeMovie")
              }} >Movie</li>
              <li className='widgets' onClick={() => {
                setContainer("animeSeries")
              }} >Series</li>
            </ul>
          </div>
        </div>
        <div className='anime_carousel' ref={animeCarousel}>
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            spaceBetween={95}
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
                    <Link  href={`/anime/watch/${val.name.replaceAll(" ", '-').replaceAll("-Episode-", '?episode=').toLowerCase()}`}>
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
            }) : <p style={{ color: "#fff", textAlign: "center" }}>Loading.....</p>}
          </Swiper>
        </div>
        <div className="input_group">
          <SearchBar/>
        </div>
      </header>
      <div className="megaContainer">
        <section>
          <div className="TextAndBox">
            <div className="box"></div>
            <p className="writtenAnimeText" ref={animeText}>Recent Anime</p>
          </div>
          <main className="animeContainer" ref={animeContainer}>
            {animeDetails[`${animeContainerContent}`] ? Array.from(animeDetails[`${animeContainerContent}`]).map((val, Index) => {
              return (
                <>
                  <div className="anime_card_details" key={val.name} style={{ position: "relative" }}>
                    <Link href={`/anime/watch/${val.name.replaceAll(" ", '-').replaceAll("-Episode-", '?episode=').toLowerCase()}`}>
                      <a>
                        <div className="anime_card">
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
                    <div className="button_anime_menu">
                      <button className="anime_menu_icon" onClick={() => { showAnimeMenu(Index) }}><HiDotsVertical /></button>
                    </div>
                    <div className="anime_menu" ref={animeMenu} onMouseLeave={() => hideAnimeMenu(Index)}>
                      <ul className="anime_menu_items_widgets">
                        <li className="anime_menu_widgets">
                          <Link href={`/anime/watch/${val.name.replaceAll(" ", '-').replaceAll("-Episode-", '?episode=').toLowerCase()}`}>
                            <a>Play</a>
                          </Link>
                        </li>
                        <li className="anime_menu_widgets">
                          <button onClick={(e)=>addToFavourite([val.img,val.name,e])}>Add to Favourite</button>
                        </li>
                        <li className="anime_menu_widgets">
                          <button onClick={(e)=>addToWatchList([val.img,val.name,e])}>Add to WatchList</button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </>
              )
            }) : <p style={{ color: "#fff", textAlign: "center" }}>Loading.....</p>}
          </main>
          <main className={`animeContainer ${animeContainerContent}Container`} ref={moreContainer}>

          </main>
          <div className="button_for_more_anime_content">
            <button className="more_anime_content" onClick={() => {
              newIndex = newIndex + 30,
                addPage(`${animeContainerContent}`)
            }}>More</button>
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
              {popularAnimeAsideTodayData ? popularAnimeAsideTodayData.map((val) => {
                return (
                  <>
                    <PopularAnimeAside name={val.name} img={val.img} views={val.views} key={val.name} />
                  </>
                )
              }) : <p style={{ color: "#fff", textAlign: "center" }}>Loading.....</p>}
            </div>}
            {popularAnimeType === "week" && <div className="popular_anime_week">
              {popularAnimeAsideWeekData ? popularAnimeAsideWeekData.map((val) => {
                return (
                  <>
                    <PopularAnimeAside name={val.name} img={val.img} views={val.views} key={val.name} />
                  </>
                )
              }) : <p style={{ color: "#fff", textAlign: "center" }}>Loading.....</p>}
            </div>}
            {popularAnimeType === "month" && <div className="popular_anime_Month" >
              {popularAnimeAsideMonthData ? popularAnimeAsideMonthData.map((val) => {
                return (
                  <>
                    <PopularAnimeAside name={val.name} img={val.img} views={val.views} key={val.name} />
                  </>
                )
              }) : <p style={{ color: "#fff", textAlign: "center" }}>Loading.....</p>}
            </div>}
          </main>
        </aside>
      </div>
    </>
  )
}

export default Index