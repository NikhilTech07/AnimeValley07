import Image from "next/image";
import Nav from "../../../components/Nav";
import { BsPlayCircleFill } from "react-icons/bs";
import Link from "next/link";
export const getServerSideProps = async (context) => {
  const url=context.req.headers.host
  const anime = context.query.S1;
  const userAnime = anime.toLowerCase().replaceAll(" ", "-").replaceAll("(", "").replaceAll(")", "").replaceAll(".", "").replaceAll(":-", "-")
  const userRes = await fetch(`http://${url}/api/info/${userAnime}`, {
    method: "post"
  })
  const similarAnimeRes = await fetch(`http://${url}/api/search/gogo?name=${userAnime}`, {
    method: "post"
  })
  const userData = await userRes.json();
  const similarAnimeData = await similarAnimeRes.json();
  return {
    props: {
      userData,
      similarAnimeData,
    }
  }
}
const S1 = ({ userData, similarAnimeData }) => {
  return (
    <>
      <header>
        <Nav />
      </header>
      <div className="containerForUserAnime">
        <div className="animePoster" style={{ backgroundImage: `url('${userData[0].img}')` }}></div>
        <div className="userAnimeCard">
          <div className="userAnimeImage">
            <Image src={userData[0].img} height="250px" width="200px" alt={userData[0].name}></Image>
          </div>
          <div className="userAnimeDetails">
            <p className="userAnimeName">{userData[0].name}</p>
            <div className="playButtonContainer">
              <Link href={`/anime/S1/watch/${userData[0].name.toLowerCase()}?episode=1`}>
                <a>
                <button className="playButton">Play <BsPlayCircleFill /> </button>
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className="userAnimePlot">
          <div className="TextAndBox">
            <div className="box"></div>
            <p className="writtenAnimeText">Anime Synopsis</p>
          </div>
          <p className="animeSynopsis">{userData[0].plot}</p>
        </div>
        <div className="TextAndBox">
          <div className="box"></div>
          <p className="writtenAnimeText">Related Anime</p>
        </div>
      <div className="RelatedAnime">
        <main className="animeContainer">
        {similarAnimeData.map((val) => {
          return (
            <>
             <Link href={`/anime/S1/${val.name}`}>
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
      </div>
      </div>
    </>
  )
}

export default S1