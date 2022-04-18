import Link from "next/link";
import { MdAccountCircle ,MdOutlineWatchLater} from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import {AiTwotoneHome} from "react-icons/ai";
import { IoCloseSharp ,IoNotifications } from "react-icons/io5";
import {BiBookHeart } from "react-icons/bi"
import { useRef } from "react";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Head from "next/head";
const Nav = (props) => {
    const router = useRouter()
    const [searchAnime, setSearchAnime] = useState([]);
    const openButton = useRef(null);
    const closeButton = useRef(null);
    const searchValue = useRef(null);
    const navToggle = useRef(null);
    const openToggle = () => {
        const button = openButton.current;
        button.classList.add("active");
        document.body.style.overflow = "hidden";
    }
    const closeToggle = () => {
        const button = openButton.current;
        button.classList.remove("active");
        document.body.style.overflow = "auto"
    }
    const search = async () => {
        const fetchValue = searchValue.current.value;
        const res = await fetch(`/api/search/gogo?name=${fetchValue}`, {
            method: "post"
        })
        const data = await res.json();
        setSearchAnime(data)
    }
    const transport = () => {
        closeToggle();
        let transportValue = searchValue.current.value;
        router.push(`/search/${transportValue}`)
    }
    return (
        <>
            <Head>
                <title>Anime Valley</title>
            </Head>
            <nav style={{backgroundColor:`${props.bg}`}}>
                <div className="firstNavbar">
                    <div className="website_title">
                        Anime<span>Valley</span>
                        <Link href="/">
                           <a>
                           <AiTwotoneHome/> Home
                            </a>
                        </Link>
                        </div>
                    <div className="navbarToggle" ref={navToggle}>
                        <div className="other_widgets_list">
                            <ul className="other_widgets_list">
                                <li className="search_widgets" >
                                    <button className="search_bar_button widgets_button" onClick={() => { openToggle() }} > <FiSearch /></button>
                                </li>
                                <li className="favourite_widgets">
                                    <button className="favourite_icon widgets_button"><BiBookHeart /></button>
                                </li>
                                <li className="watch_later_widgets">
                                    <button className="watch_later_icon widgets_button"><MdOutlineWatchLater /></button>
                                </li>
                                <li className="notification_widgets">
                                    <button className="bell_icon widgets_button"><IoNotifications /></button>
                                </li>
                                <li className="account_widgets">
                                    <button className="account_widgets widgets_button"><MdAccountCircle /></button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="search_bar " ref={openButton}>
                <div className="input_box">
                    <input type='text' className="userInput" id="navSearchBar" placeholder="Search" autoComplete="off" onChange={() => { search() }} ref={searchValue} onKeyUp={event => {
                        if (event.key === "Enter") {
                            closeToggle()
                            router.push(`/search/${event.target.value}`)
                        }
                    }}></input>
                    <div className="search_bar_icon" onClick={() => { transport() }}><FiSearch className="search_bar_inside_icon" /></div>
                </div>
                <div className="close_button">
                    <button className="close_button_inside_div" ref={closeButton} onClick={() => { closeToggle() }}><IoCloseSharp /></button>
                </div>
                <div className="searchAnimeResult">
                    <main>
                        {searchAnime.length > 0 && searchAnime.map((val) => {
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
                </div>
            </div>
        </>
    )
}

export default Nav