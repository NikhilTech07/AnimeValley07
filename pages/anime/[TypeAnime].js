import Nav from "../../components/Nav";
import Image from "next/image";
import Link from "next/link";
import PopularAnimeAside from "../../components/PopularAnimeAside";
import { useState } from "react";
export const getServerSideProps = async (context) => {
  const url = context.req.headers.host
  try {
    const animeType = context.query.TypeAnime;
    const res = await fetch(`http://${url}/api/${animeType}`, {
      method: "post"
    })
    const resData = await res.json()
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
const addPage=async()=>{
  try {
    
  } catch (error) {
    console.log(error)
  }
}
const TypeAnime = ({ resData, animeType, popularAnimeAsideMonthData, popularAnimeAsideTodayData, popularAnimeAsideWeekData }) => {
  const [popularAnimeType, setPopularAnimeType] = useState("today")
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
            })}
          </main>
            <div className="button_for_more_anime_content">
              <button className="more_anime_content" onClick={()=>addPage()}>More</button>
            </div>
        </section>
        <aside>
          <div className="TextAndBox asideBox">
            <div className="box"></div>
            <p className="writtenAnimeText">Popular Anime</p>
          </div>
          <div className="top_anime_selector">
            <button className="today popularAnimeDateSelector" onClick={() => { setPopularAnimeType("today") }}><u>Today</u></button>
            <button className="week popularAnimeDateSelector" onClick={() => { setPopularAnimeType("week") }}><u>Week</u></button>
            <button className="month popularAnimeDateSelector" onClick={() => { setPopularAnimeType("month") }}><u>Month</u></button>
          </div>
          <main className="popularAnimeList">
            {popularAnimeType === "today" && <div className="popular_anime_today">
              {popularAnimeAsideTodayData.map((val) => {
                return (
                  <>
                    <PopularAnimeAside name={val.name} img={val.img} views={val.views} />
                  </>
                )
              })}
            </div>}
            {popularAnimeType === "week" && <div className="popular_anime_week">
              {popularAnimeAsideWeekData.map((val) => {
                return (
                  <>
                    <PopularAnimeAside name={val.name} img={val.img} views={val.views} />
                  </>
                )
              })}
            </div>}
            {popularAnimeType === "month" && <div className="popular_anime_Month">
              {popularAnimeAsideMonthData.map((val) => {
                return (
                  <>
                    <PopularAnimeAside name={val.name} img={val.img} views={val.views} />
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