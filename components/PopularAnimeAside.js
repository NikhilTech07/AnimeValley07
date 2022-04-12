import { BsFillEyeFill } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
const PopularAnimeAside = (props) => {
  return (
    <>
        <Link href={`/anime/S1/watch/${props.name.replaceAll(" ", '-').replaceAll("-Episode-", '?episode=').toLowerCase()}`}>
          <a>
          <div className="popular_anime_card">
                      <div className="popular_anime_img">
                        <Image src={props.img} width="60px" height="86px" alt={props.name} />
                      </div>
                      <div className="popular_anime_desc">
                        <p className="popular_anime_title">{props.name}</p>
                        <p className="popular_anime_views"><span className="views_icon"><BsFillEyeFill /></span> {props.views}</p>
                      </div>
                    </div>
          </a>
        </Link>
    </>
  )
}

export default PopularAnimeAside