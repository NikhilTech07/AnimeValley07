import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { FiSearch } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
const SearchBar = () => {
    const router = useRouter()
    const [searchAnime, SetSearchAnime] = useState([]);
    const searchValue = useRef(null);
    const search = async () => {
        const fetchValue = searchValue.current.value;
       try {
        const res = await fetch(`/api/search/gogo?name=${fetchValue}`, {
            method: "post"
        })
        const data = await res.json();
        SetSearchAnime(data)
       } catch (error) {
        console.log(error)   
       }
    }
    const transport = () => {
        let transportValue = searchValue.current.value;
        router.push(`/search/${transportValue}`)
    }
    return (
        <>
            <div className="search_bar ">
               <div className="input_group_box">
               <div className="input_box">
                    <input type='text' className="userInput" id="navSearchBar" placeholder="Search" autoComplete="off" onChange={() => { search() }} ref={searchValue} onKeyUp={event => {
                        if (event.key === "Enter") {
                            router.push(`/search/${event.target.value}`)
                        }
                    }}></input>
                    <div className="search_bar_icon" onClick={() => { transport() }}><FiSearch className="search_bar_inside_icon" /></div>
                </div>
               </div>
            {searchAnime.length > 0 ?                 <div className="searchAnimeResult">
                    <main>
                        {searchAnime.length > 0 && searchAnime.slice(0,10).map((val) => {
                            return (
                                <>
                                    <Link href={`/anime/${val.name}`}>
                                        <a>
                                            <div className="searchInput_anime_card">
                                                <div className="searchInput_anime_Image">
                                                    <Image src={val.img} height="46px" width="40px" alt={val.name} />
                                                </div>
                                                <div className="searchInput_anime_details">
                                                    <p className="searchInput_anime_name">{val.name}</p>
                                                </div>
                                            </div>
                                        </a>
                                    </Link>
                                </>
                            )
                        })}
                    </main>
                </div>:<div></div>}
            </div>
        </>
    )
}

export default SearchBar