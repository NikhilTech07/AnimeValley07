import { BsFillEyeFill } from "react-icons/bs";
import Image from "next/image";
const PopularAnimeAside = (props) => {
  return (
    <>
       <div className="popular_anime_card">
                      <div className="popular_anime_img">
                        <Image src={props.img} width="60px" height="86px" alt={props.name} />
                      </div>
                      <div className="popular_anime_desc">
                        <p className="popular_anime_title">{props.name}</p>
                        <p className="popular_anime_views"><span className="views_icon"><BsFillEyeFill /></span> {props.views}</p>
                      </div>
                    </div>
    </>
  )
}

export default PopularAnimeAside