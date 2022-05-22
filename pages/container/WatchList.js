import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import {GoChevronLeft} from "react-icons/go";
import { useState, useEffect } from "react";
const Favourite = () => {
  const [favouriteAnime,setFavouriteAnime]=useState();
  const getFavouriteAnime=async()=>{
    const res=await fetch("/api/auth2/Token_Authentication",{
      method:"GET",
      headers:{
        Accept:"application/json",
        "Content-Type":"application/json"
      }
    })
    const data=await res.json();
    setFavouriteAnime(data.WatchList)
  }
  useEffect(()=>{
    getFavouriteAnime();
  },[])
  return (
    <> 
    {console.log(favouriteAnime)}
    <Head>
      <title>Anime Valley</title>
    </Head>
      <header style={{ height: "7rem" }}>
        <Link href="/">
          <a>
            <button className="homeButton">
              <div className="homeButtonIcon">
              <GoChevronLeft/>
              </div>
              Back to Home
            </button>
          </a>
        </Link>
      </header>
      <main className="animeContainer">
            {favouriteAnime?favouriteAnime.map((val) => {
              return (
                <>
                  <div className="anime_card_details" key={val.data_name} style={{ position: "relative" }}>
                    <Link href={`/anime/watch/${val.data_name.replaceAll(" ", '-').replaceAll("-Episode-", '?episode=').toLowerCase()}`}>
                      <a>
                        <div className="anime_card">
                          <div className="anime_image">
                            <Image src={val.data_img} width="100px" height="100px" alt={val.data_name}></Image>
                          </div>
                          <div className="anime_desc">
                            <p className="anime_title">{val.data_name}</p>
                          </div>
                        </div>
                      </a>
                    </Link>
                  </div>
                </>
              )
            }) : <div className=" info" style={{color:"#fff",fontSize:"3rem",width:"100%",height:"50vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
            <p>UFavourite List is empty</p>
            </div>}
          </main>
    </>
  )
}

export default Favourite