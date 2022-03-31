import Nav from "../../components/Nav";
import Image from "next/image";
import PopularAnimeAside from "../../components/PopularAnimeAside";
import { useState } from "react";
export const getServerSideProps = async ({ query }) => {
    try {
      const animeType = query.TypeAnime;
      const res = await fetch(`http://localhost:3000/api/${animeType}`, {
        method: "post"
      })
      const resData = await res.json()
      const popularAnimeAsideTodayRes = await fetch('http://localhost:3000/api/popularAnimeListToday', {
      method: 'post'
    })
    const popularAnimeAsideTodayData = await popularAnimeAsideTodayRes.json()
    const popularAnimeAsideWeekRes = await fetch('http://localhost:3000/api/popularAnimeListWeek', {
      method: 'post'
    })
    const popularAnimeAsideWeekData = await popularAnimeAsideWeekRes.json()
    const popularAnimeAsideMonthRes = await fetch('http://localhost:3000/api/popularAnimeListMonth', {
      method: 'post'
    })
    const popularAnimeAsideMonthData = await popularAnimeAsideMonthRes.json()
      return {
        props: {
          resData,
          animeType,
          popularAnimeAsideWeekData,
        popularAnimeAsideTodayData,
        popularAnimeAsideMonthData
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
const TypeAnime = ({resData,animeType,popularAnimeAsideMonthData,popularAnimeAsideTodayData,popularAnimeAsideWeekData}) => {
    const [popularAnimeType,setPopularAnimeType]=useState("today")
  return (
    <>
     <header>
        <Nav />
    </header>
    <div className="megaContainer">
        <section>
          <div className="TextAndBox">
            <div className="box"></div>
            <p className="writtenAnimeText">{animeType}</p>
          </div>
          <main className="animeContainer">
            {resData.map((val) => {
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
        <aside>
          <div className="TextAndBox asideBox">
            <div className="box"></div>
            <p className="writtenAnimeText">Popular Anime</p>
          </div>
          <div className="top_anime_selector">
            <button className="today popularAnimeDateSelector" onClick={()=>{setPopularAnimeType("today")}}><u>Today</u></button>
            <button className="week popularAnimeDateSelector" onClick={()=>{setPopularAnimeType("week")}}><u>Week</u></button>
            <button className="month popularAnimeDateSelector" onClick={()=>{setPopularAnimeType("month")}}><u>Month</u></button>
          </div>
          <main className="popularAnimeList">
            {popularAnimeType === "today" && <div className="popular_anime_today">
              {popularAnimeAsideTodayData.map((val) => {
                return (
                  <>
                 <PopularAnimeAside name={val.name} img={val.img} views={val.views}/>
                  </>
                )
              })}
            </div>}
            {popularAnimeType === "week" && <div className="popular_anime_week">
              {popularAnimeAsideWeekData.map((val) => {
                return (
                  <>
                  <PopularAnimeAside name={val.name} img={val.img} views={val.views}/>
                  </>
                )
              })}
            </div>}
            {popularAnimeType === "month" && <div className="popular_anime_Month">
              {popularAnimeAsideMonthData.map((val) => {
                return (
                  <>
                 <PopularAnimeAside name={val.name} img={val.img} views={val.views}/>
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

export default TypeAnime;