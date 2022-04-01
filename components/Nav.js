import Link from "next/link";
import {MdAccountCircle} from "react-icons/md";
import {FiSearch} from "react-icons/fi";
import {IoCloseSharp} from "react-icons/io5"
import {AiOutlineMenu} from "react-icons/ai";
import { useRef } from "react";
import {IoNotifications} from "react-icons/io5";
import { useState } from "react";
import Image from "next/image";
import {useRouter} from "next/router"; 
import Head from "next/head";
const Nav = () => {
    const router=useRouter()
    const [searchAnime,setSearchAnime]=useState([]);
    const openButton=useRef(null);
    const closeButton=useRef(null);
    const searchValue=useRef(null);
    const navToggle=useRef(null);
    const openToggle=()=>{
        const button=openButton.current;
        button.classList.add("active");
        document.body.style.overflow="hidden";
    }
    const closeToggle=()=>{
        const button=openButton.current;
        button.classList.remove("active");
        document.body.style.overflow="auto"
    }
    const openNavToggle=()=>{
        const toggle=navToggle.current;
        toggle.classList.add("activeNavtoggle")
        document.body.style.overflow="hidden";
    }
    const closeNavToggle=()=>{
        const toggle=navToggle.current;
        toggle.classList.remove("activeNavtoggle")
        document.body.style.overflow="auto";
    }
    const search=async()=>{
        const fetchValue=searchValue.current.value;
        const res=await fetch(`/api/search/gogo?name=${fetchValue}`,{
            method:"post"
        })
        const data=await res.json();
        setSearchAnime(data)
    }
    const transport=()=>{
        closeToggle();
        let transportValue=searchValue.current.value;
        router.push(`/search/${transportValue}`)
    }
  return (
    <>
    <Head>
        <title>Anime Valley</title>
    </Head>
    <nav >
        <div className="website_title">Anime<span>Valley</span></div>
        <div className="navbarToggle" ref={navToggle}>
        <div className="widgets_list">
            <div className="closeIconHams" onClick={()=>{closeNavToggle()}}>
                <IoCloseSharp/>
            </div>
                <ul className="widgets_link">
                    <li className='widgets' onClick={()=>{closeNavToggle()}}><Link href="/"><a>Home</a></Link></li>
                    <li className='widgets' onClick={()=>{closeNavToggle()}}><Link href="/anime/ongoingAnime"><a>Ongoing</a></Link></li>
                    <li className='widgets popularWidgets' style={{display:"none"}} onClick={()=>{closeNavToggle()}}><Link href="/anime/popular"><a>Popular Anime</a></Link></li>
                    <li className='widgets' onClick={()=>{closeNavToggle()}}><Link href="/anime/animeMovie"><a>Movie</a></Link></li>
                    <li className='widgets' onClick={()=>{closeNavToggle()}}><Link href="/anime/series"><a>Series</a></Link></li>
                    <li className='widgets' onClick={()=>{closeNavToggle()}}>favourite</li>
                    <li className='widgets' onClick={()=>{closeNavToggle()}}>Watch-later</li>
                </ul>
        </div>
        <div className="other_widgets_list">
            <ul className="other_widgets_list">
                <li className="search_widgets">
                   <button className="search_bar_button widgets_button" onClick={()=>{openToggle(),closeNavToggle()}} > <FiSearch/></button>
                </li>
                <li className="notification_widgets">
                    <button className="bell_icon widgets_button" onClick={()=>{closeNavToggle()}}><IoNotifications/></button>
                </li>
                <li className="account_widgets">
                    <button className="account_widgets widgets_button" onClick={()=>{closeNavToggle()}}><MdAccountCircle/></button>
                </li>
            </ul>
        </div>
        </div>
        <div className="hamburgerIcon" onClick={()=>{openNavToggle()}}>
            <AiOutlineMenu/>
        </div>
    </nav>
        <div className="search_bar " ref={openButton}>
            <div className="input_box">
                <input type='text' className="userInput" id="navSearchBar" placeholder="Search" autoComplete="off" onChange={()=>{search()}} ref={searchValue} onKeyUp={event=>{
                    if (event.key==="Enter") {
                        closeToggle()
                        router.push(`/search/${event.target.value}`)
                    }
                }}></input>
            <div className="search_bar_icon" onClick={()=>{transport()}}><FiSearch className="search_bar_inside_icon"/></div>
            </div>
            <div className="close_button">
                <button className="close_button_inside_div" ref={closeButton} onClick={()=>{closeToggle()}}><IoCloseSharp/></button>
            </div>
            <div className="searchAnimeResult">
                <main>
                    {searchAnime.length>0 && searchAnime.map((val)=>{
                        return(
                            <>
                            <div className="searchInput_anime_card">
                                <div className="searchInput_anime_Image">
                                <Image src={val.img} height="46px" width="40px" alt={val.name}/>
                                </div>
                                <div className="searchInput_anime_details">
                                    <p className="searchInput_anime_name">{val.name}</p>
                                </div>
                            </div>
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