import Nav from "../../../components/Nav";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import {AiFillHeart,AiFillForward,AiFillBackward} from "react-icons/ai";
import {MdOutlinePlaylistAdd} from "react-icons/md";
import swal from "sweetalert";
import { useRef,useEffect,useState } from "react";
export const getServerSideProps = async ( context ) => {
    const streamingChannel=context.query.channel;
    const url=context.req.headers.host;
    try {
        const watchAnime = context.query.Watch.toLowerCase().replaceAll(" ", "-").replaceAll("(", "").replaceAll(")", "").replaceAll(".", "").replaceAll(":-", "-");
        const Episode = context.query.episode;
        const animeIfameRes = await fetch(`http://${url}/api/iframe/${watchAnime}?episode=${Episode}&&channel=${streamingChannel}`, {
            method: "post"
        })
        const totalAnimeEpisodeRes = await fetch(`http://${url}/api/info/episode/${watchAnime}`, {
            method: "post"
        })
        const recommendedAnimeRes = await fetch(`http://${url}/api/search/gogo?name=${watchAnime}`, {
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
                watchAnime,
                Episode,
                streamingChannel
            }
        }
    } catch (error) {
        console.log(error)
    }
}

const Watch = ({ animeIfameData, totalAnimeEpisodeData, recommendedAnimeData, watchAnime,Episode,streamingChannel }) => {
    const videoLink=animeIfameData.videoLink;
    const videoName=animeIfameData.videoName;
    const [animeIframeIndex,setAnimeIframeIndex]=useState(0);
    const [userData,setUserData]=useState();
    const getUserData=async()=>{
        const authRes=await fetch(`/api/auth2/Token_Authentication`,{
            method:"GET",
            headers:{
              Accept:"application/json",
              "Content-Type":"application/json"
            }
          })
          const authData=await authRes.json();
          setUserData(authData);
    }
    useEffect(()=>{
        getUserData();
    },[])
    const router=useRouter();
    const TargetIframe=useRef();
    // const removeAdds=()=>{
    //     const iframe=TargetIframe.current;
    //     iframe.setAttribute("sandbox",'allow-scripts')
    // }
    
  const addToFavourite=async(data)=>{
    const {watchAnime,Episode}=data;
    const data_name=`${watchAnime} episode:${Episode}`
    const anime_link=`/anime/watch/${watchAnime}?episode-${Episode}&channel=gogo`;
    const data_img=recommendedAnimeData[0].img;
    const anime_info={
        _id:userData._id,
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
  const addtoWatchList=async(data)=>{
      const {watchAnime,Episode}=data;
      const data_name=`${watchAnime} episode:${Episode}`
    const anime_link=`/anime/watch/${watchAnime}?episode-${Episode}&channel=gogo`;
    const data_img=recommendedAnimeData[0].img;
    const anime_info={
        _id:userData._id,
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
            const playPreviousEpisode=(ep)=>{
                const currentEpisode=parseInt(ep);
                if (currentEpisode!=1) {
                    router.push(`/anime/watch/${watchAnime}?episode=${currentEpisode-1}&channel=gogo`);
                }
                else{
                    swal({
                        title:"Your are on the First episode",
                        buttons:"ok"
                    }) 
    }
  }
  const playNextEpisode=(ep)=>{
      const currentEpisode=parseInt(ep);
      const totalEpisode=totalAnimeEpisodeData[0].Episode;
      if (currentEpisode<totalEpisode) {
          router.push(`/anime/watch/${watchAnime}?episode=${currentEpisode+1}&channel=gogo`);
        }
        else{
            swal({
                title:"Your are on the last episode",
                buttons:"ok"
            })
        }
    }
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
                        <iframe id="iframe" ref={TargetIframe} rel="nofollow" src={videoLink[animeIframeIndex]} sandboxscrolling="no" style={{ width: "95%", height: "100%" }} allowFullScreen={true} frameBorder="0" marginWidth="0" marginHeight="0" scrolling="no" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                    </div>
                    <div className="player_func" style={{backgroundColor:"gray"}}>
                        <div className="streaming_service">
                                <p><span className="stream" style={{color:"#e74c3c"}}>Stream</span>:<span className="streaming_name" style={{color:"#3498db"}}>Gogo</span></p>
                        </div>
                        <div className="previous_episode_button" style={{fontSize:"25px",cursor:"pointer"}} onClick={()=>playPreviousEpisode(Episode)}>
                            <AiFillBackward/>
                        </div>
                        <div className="next_episode_button" style={{fontSize:"25px",cursor:"pointer"}} onClick={()=>playNextEpisode(Episode)}>
                            <AiFillForward/>
                        </div>
                        <div className="Add_to_favourite"style={{fontSize:"20px",cursor:"pointer"}} onClick={()=>addToFavourite({watchAnime,Episode})}>
                            <AiFillHeart/>
                        </div>
                        <div className="Add_to_watchList"style={{fontSize:"24px",cursor:"pointer"}} onClick={()=>addtoWatchList({watchAnime,Episode})}>
                            <MdOutlinePlaylistAdd/>
                        </div>
                        <div className="change_streaming_service" style={{marginTop:"12px",cursor:"pointer"}}>
                            <p>Server</p>
                            <select onChange={(e)=>setAnimeIframeIndex(parseInt(e.target.value))}>
                                {videoName.map((val,index)=>{
                                    return(
                                        <>
                                            <option value={index}>{val}</option>
                                        </>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="episodeList">
                        <ul className="episode_list">
                            {Array.from(Array(totalAnimeEpisodeData[0].Episode), (e, i) => {
                                return <>
                                    <li key={i + 1}>
                                        <Link href={`/anime/watch/${watchAnime}?episode=${i + 1}&channel="gogo"`} passHref>
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
                                    <Link href={`/anime/${val.name}`} passHref>
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