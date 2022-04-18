import Nav from "../../components/Nav";
import PopularAnimeAside from "../../components/PopularAnimeAside";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
export const getServerSideProps = async (context) => {
  const url=context.req.headers.host
  try {
    const userSearch = context.query.Search;
    const gogoRes = await fetch(`http://${url}/api/search/gogo?name=${userSearch}`, {
      method: "post"
    })
    const GogoData = await gogoRes.json();
    const data = GogoData[0].name.toLowerCase().replaceAll(" ", "%20").replaceAll("(Dub)", "")
    const rushRes = await fetch(`http://${url}/api/search/rush?name=${userSearch}`, {
      method: "post"
    })
    const RushData = await rushRes.json()
    const animeLandRes = await fetch(`http://${url}/api/search/animeLand?name=${data}`, {
      method: "post"
    })
    const animeLandData = await animeLandRes.json();
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
        GogoData,
        RushData,
        animeLandData,
        popularAnimeAsideMonthData,
        popularAnimeAsideTodayData,
        popularAnimeAsideWeekData
      }
    }
  } catch (error) {
    console.log(error)
  }
}
const Search = ({ GogoData, RushData, animeLandData, popularAnimeAsideMonthData, popularAnimeAsideTodayData, popularAnimeAsideWeekData }) => {
  const [popularAnimeType, SetPopularAnimeType] = useState("today")
  return (
    <>
      <header>
        <Nav />
      </header>
      <div className="megaContainer">
        <section>
          <div className="TextAndBox">
            <div className="box"></div>
            <p className="writtenAnimeText">Gogo</p>
          </div>
          <main className="animeContainer gogoContainer">
            {GogoData.map((val) => {
              return (
                <>
                  <Link href={`/anime/${val.name}`}>
                    <a key={val.name}>
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
          <div className="TextAndBox">
            <div className="box"></div>
            <p className="writtenAnimeText">Rush</p>
          </div>
          <main className="animeContainer rushContainer">
            {RushData.map((val) => {
              return (
                <>
                  <Link href={`/anime/${val.name}`}>
                    <a key={val.name}>
                      <div className="anime_card">
                        <div className="anime_image">
                          <object data={val.data} alt="Anime" width="100" height="130">
                            <Image src="/images/image-soon-large.jpg" width="100" height="180" alt={val.name}/>
                          </object>
                        </div>
                        <div className="anime_desc">
                          <p className="anime_title">{val.name}</p>
                        </div>
                      </div>
                    </a>
                  </Link>
                </>
              )
            })}
          </main>
          <div className="TextAndBox">
            <div className="box"></div>
            <p className="writtenAnimeText">Land</p>
          </div>
          <main className="animeContainer landContainer">
            {animeLandData.map((val) => {
              return (
                <>
                  <Link href={`/anime/${val.name}`}>
                    <a key={val.name}>
                      <div className="anime_card">
                        <div className="anime_image">
                          <Image src={val.img} width="100px" height="100px" alt={val.name}></Image>
                        </div>
                        <div className="anime_desc">
                          <p className="anime_title">{val.name}</p>
                        </div>
                      </div>
                    </a>
                  </Link>
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
            <button className="today popularAnimeDateSelector" onClick={() => { SetPopularAnimeType("today") }}><u>Today</u></button>
            <button className="week popularAnimeDateSelector" onClick={() => { SetPopularAnimeType("week") }}><u>Week</u></button>
            <button className="month popularAnimeDateSelector" onClick={() => { SetPopularAnimeType("month") }}><u>Month</u></button>
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

export default Search