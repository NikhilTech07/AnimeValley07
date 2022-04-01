import Nav from "../components/Nav";
import PopularAnimeAside from "../components/PopularAnimeAside";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Autoplay, EffectCoverflow } from "swiper";
import { FaPlay } from "react-icons/fa";
import {useState} from "react";
export const getServerSideProps = async (context) => {
  const url=context.req.headers.host;
  try {
    const carouselRes = await fetch(`http://${url}/api/carouselAnime`, {
      method: "Post"
    })
    const carouselData = await carouselRes.json();
    const recentAnimeRes = await fetch(`http://${url}/api/displayAnime`, {
      method: "post"
    })
    const recentAnimeData = await recentAnimeRes.json();
    const popularAnimeAsideTodayRes = await fetch(`http://${url}/api/popularAnimeListToday`, {
      method: 'post'
    })
    const popularAnimeAsideTodayData = await popularAnimeAsideTodayRes.json()
    const popularAnimeAsideWeekRes = await fetch(`http://${url}/api/popularAnimeListWeek`, {
      method: 'post'
    })
    const popularAnimeAsideWeekData = await popularAnimeAsideWeekRes.json()
    const popularAnimeAsideMonthRes = await fetch(`http://${url}/api/popularAnimeListMonth`, {
      method: 'post'
    })
    const popularAnimeAsideMonthData = await popularAnimeAsideMonthRes.json()
    return {
      props: {
        carouselData,
        recentAnimeData,
        popularAnimeAsideWeekData,
        popularAnimeAsideTodayData,
        popularAnimeAsideMonthData
      }
    }
  } catch (error) {
    console.log(error)
  }
}
const Index = ({ carouselData, recentAnimeData, popularAnimeAsideWeekData,popularAnimeAsideMonthData,popularAnimeAsideTodayData }) => {
  const [popularAnimeType,SetPopularAnimeType]=useState("today")
  return (
    <>
      <header>
        <Nav />
        <div className='anime_carousel'>
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
            {carouselData.map((val) => {
              return (
                <>
                  <SwiperSlide key={val.name}>
                    <div className="carousel_card">
                      <div className="carousel_image">
                        <Image src={val.img} width="432px" height="286px" alt={val.name} />
                      </div>
                      <div className="carousel_anime_details">
                        <p className="carousel_anime_name">{val.name}</p>
                        <button className="carousel_play_button">Play <FaPlay style={{ color: "blue" }} /> </button>
                      </div>
                    </div>
                  </SwiperSlide>
                </>
              )
            })}
          </Swiper>
        </div>
      </header>
      <div className="megaContainer">
        <section>
        <div className="TextAndBox">
            <div className="box"></div>
            <p className="writtenAnimeText">Recent Anime</p>
          </div>
          <main className="animeContainer">
            {recentAnimeData.map((val) => {
              return (
                <>
                  <div className="anime_card" key={val.name}>
                    <div className="anime_image">
                      <Image src={val.img} width="100px" height="100px" alt={val.name}></Image>
                    </div>
                    <div className="anime_desc">
                      <p className="anime_title">{val.name}</p>
                      <p className="anime_date">{val.date}</p>
                    </div>
                  </div>
                </>
              )
            })}
          </main>
        </section>
        <aside className="popularContainer">
          <div className="TextAndBox asideBox">
            <div className="box"></div>
            <p className="writtenAnimeText">Popular Anime</p>
          </div>
          <div className="top_anime_selector">
            <button className="today popularAnimeDateSelector" onClick={()=>{SetPopularAnimeType("today")}}><u>Today</u></button>
            <button className="week popularAnimeDateSelector" onClick={()=>{SetPopularAnimeType("week")}}><u>Week</u></button>
            <button className="month popularAnimeDateSelector" onClick={()=>{SetPopularAnimeType("month")}}><u>Month</u></button>
          </div>
          <main className="popularAnimeList">
            {popularAnimeType === "today" && <div className="popular_anime_today">
              {popularAnimeAsideTodayData.map((val) => {
                return (
                  <>
                 <PopularAnimeAside name={val.name} img={val.img} views={val.views} key={val.name}/>
                  </>
                )
              })}
            </div>}
            {popularAnimeType === "week" && <div className="popular_anime_week">
              {popularAnimeAsideWeekData.map((val) => {
                return (
                  <>
                  <PopularAnimeAside name={val.name} img={val.img} views={val.views} key={val.name}/>
                  </>
                )
              })}
            </div>}
            {popularAnimeType === "month" && <div className="popular_anime_Month" >
              {popularAnimeAsideMonthData.map((val) => {
                return (
                  <>
                 <PopularAnimeAside name={val.name} img={val.img} views={val.views} key={val.name}/>
                  </>
                )
              })}
            </div>}
          </main>
        </aside>
      </div>
    </>
  )
}

export default Index