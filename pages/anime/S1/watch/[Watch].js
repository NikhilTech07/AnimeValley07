import Nav from "../../../../components/Nav";
import Link from "next/link";
import Image from "next/image";
import {GiNextButton,GiPreviousButton} from "react-icons/gi"
export const getServerSideProps = async ( context ) => {
    const url=context.req.headers.host
    try {
        const watchAnime = context.query.Watch.toLowerCase().replaceAll(" ", "-").replaceAll("(", "").replaceAll(")", "").replaceAll(".", "").replaceAll(":-", "-");
        const Episode = context.query.episode;
        const animeIfameRes = await fetch(`http://localhost:3000/api/iframe/${watchAnime}?episode=${Episode}`, {
            method: "post"
        })
        const totalAnimeEpisodeRes = await fetch(`http://localhost:3000/api/info/episode/${watchAnime}`, {
            method: "post"
        })
        const recommendedAnimeRes = await fetch(`http://localhost:3000/api/search/gogo?name=${watchAnime}`, {
            method: "post"
        })
        const animeIfameData = await animeIfameRes.json()
        const totalAnimeEpisodeData = await totalAnimeEpisodeRes.json()
        const recommendedAnimeData = await recommendedAnimeRes.json()
        return {
            props: {
                animeIfameData,
                totalAnimeEpisodeData,
                recommendedAnimeData,
                watchAnime
            }
        }
    } catch (error) {
        console.log(error)
    }
}

const Watch = ({ animeIfameData, totalAnimeEpisodeData, recommendedAnimeData, watchAnime }) => {
    return (
        <>
            <header>
                <Nav />
            </header>
          <div className="megaContainer megaWatchContainer">
          <section className="animeWatchContainer">
                <div className="TextAndBox">
                    <p className="writtenAnimeText watchAnimeText">{watchAnime}</p>
                </div>
                <div className="animeWatchAndEpisodeContainer">
                    <div className="iframeContainer">
                        <iframe id="iframe" rel="nofollow" src={animeIfameData[0]} style={{ width: "95%", height: "100%" }} allowFullScreen="true" frameBorder="0" marginWidth="0" marginHeight="0" scrolling="no" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                    </div>
                    <div className="player_func">
                        <div className="streaming_service">
                            <p>Stream:<span className="streaming_namw"></span>Gogo</p>
                        </div>
                        <div className="previous_episode_button">
                            <GiPreviousButton/>
                        </div>
                        <div className="next_episode_button">
                            <GiNextButton/>
                        </div>
                        <div className="change_streaming_service">
                            <p>Server</p>
                            <select>
                                <option value="0">VIDSTREAMING</option>
                                <option value="0">GOGO SERVER</option>
                                <option value="0">STREAMSB</option>
                                <option value="0">XSTREAMCDN</option>
                                <option value="0">DOODSTREAM</option>
                            </select>
                        </div>
                    </div>
                    <div className="episodeList">
                        <ul className="episode_list">
                            {Array.from(Array(totalAnimeEpisodeData[0].Episode), (e, i) => {
                                return <>
                                    <li key={i + 1}>
                                        <Link href={`/anime/S1/watch/${watchAnime}?episode=${i + 1}`} passHref>
                                            <a className="episode_number">
                                                <p>{i + 1}</p>
                                            </a>
                                        </Link>
                                    </li>
                                </>
                            })}
                        </ul>
                    </div>
                </div>
            </section>
            <aside className="recommededAnimeMegaContainer">
                <div className="TextAndBox recommededAnimeBox">
                    <div className="box"></div>
                    <p className="writtenAnimeText recommededAnimeText">Recommended Anime</p>
                </div>
                <div className="recommendedAnimeContainer">
                    <div className="recommendedContainer">
                        {recommendedAnimeData.slice(1).map((val) => {
                            return (
                                <>
                                    <Link href={`/anime/${val.name}?server=Gogo`} passHref>
                                        <div className="recommended_anime_card" key={val.name}  style={{cursor:"pointer"}}>
                                            <div className="recommended_anime_image">
                                                <Image src={val.img} width="100px" height="100px" alt={val.name}></Image>
                                            </div>
                                            <div className="recommended_anime_desc">
                                                <p className="recommended_anime_title">{val.name}</p>
                                                <p className="recommended_anime_date">{val.date}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </>
                            )
                        })}
                    </div>
                </div>
            </aside>
          </div>
        </>
    )
}

export default Watch