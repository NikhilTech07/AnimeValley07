import { useState, useEffect } from "react";
import {signOut} from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/router'
import { GoChevronLeft } from "react-icons/go";
import Head from "next/head";
import swal from 'sweetalert';
const Account = () => {
  const router=useRouter();
  const deleteCooke=async()=>{
    const res=await fetch("/api/auth1/manual_logout",{
      method:"POST"
    })
    const data=await res.json();
    console.log(data);
    if(data.message==="Successfully logged out"){
      swal({
        title:"You are Log out ..",
        buttons:"Okkk"
      }).then(()=>{
        router.push("/")
      })
    }
    else{
      swal({
        title:"Some error has been occured",
        buttons:"Okkk"
      })
    }
  }
  const [userData, setUserData] = useState();
  const [isLoggin,setIsLoggin]=useState();
  const userAuth = async () => {
    const authRes = await fetch("/api/auth2/Token_Authentication", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    const authData = await authRes.json();
    if (authData.message!=="invalid") {
      setUserData(authData)
      setIsLoggin(true)
    }
    else{
      setIsLoggin(false)
    }
  }
  useEffect(() => {
    userAuth()
  }, [])
  return (
    <>
      <Head>
        <title>Anime Valley</title>
      </Head>
      <header style={{ height: "7rem" }}>
        <Link href="/">
          <a>
            <button className="homeButton">
              <div className="homeButtonIcon">
                <GoChevronLeft />
              </div>
              Back to Home
            </button>
          </a>
        </Link>
      </header>
      {isLoggin==true && <div className="userDatacontainer">
        <div className="userImg">
          <Image src={userData.img} height="100px" width="100px" alt={userData.img} />
        </div>
        <div className="userDataInfoContainer">
          <div className="userDataName">
            Name : {userData.firstName + " " + userData.secondName}
          </div>
          <div className="userDataGmail">
            Gmail : {userData.Gmail}
          </div>
          <div className='userAnimeInfo'>
            <div className="userFavouriteListContainer">
              Total Anime in Favourite List : 0
            </div>
            <div className="userWatchListContainer">
              Total Anime in Watch List : 0
            </div>
          </div>
        </div>
        <div className="signOutButtonContainer">
          <button className="signOut credButton" style={{width:"200px"}} onClick={()=>deleteCooke()}>Sign Out</button>
        </div>
      </div>}
      {isLoggin=="auth" && <div className="userDatacontainer">
        <div className="userImg">
          <Image src={user.image} height="100px" width="100px" alt={user.image} />
        </div>
        <div className="userDataInfoContainer">
          <div className="userDataName">
            Name : {user.name}
          </div>
          <div className="userDataGmail">
            Gmail : {user.email}
          </div>
          <div className='userAnimeInfo'>
            <div className="userFavouriteListContainer">
              Total Anime in Favourite List : 0
            </div>
            <div className="userWatchListContainer">
              Total Anime in Watch List : 0
            </div>
          </div>
        </div>
        <div className="signOutButtonContainer">
          <button className="signOut credButton" style={{width:"200px"}} onClick={()=>signOut()}>Sign Out</button>
        </div>
      </div>}
      {isLoggin==false && 
      <div className="notAccount" style={{color:"#fff",fontSize:"3rem",width:"100%",height:"50vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
        <p>User is not log in with AnimeValley.</p>
        <p style={{marginTop:"20px"}}>Please <Link href="/credentials/Login"><a style={{color:"blue"}}><u>Log in</u></a></Link></p>
        </div>}
    </>
  )
}
export default Account;
