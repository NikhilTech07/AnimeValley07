import Link from "next/link";
import { MdAccountCircle, MdOutlineWatchLater } from "react-icons/md";
import { AiTwotoneHome } from "react-icons/ai";
import { IoNotifications } from "react-icons/io5";
import { useEffect, useState } from "react";
import { BiBookHeart } from "react-icons/bi"
import { useRef } from "react";
import swal from "sweetalert";
import Head from "next/head";
import Image from "next/image";
const Nav = (props) => {
    useEffect(() => {
        const newUserData = async () => {
            const authRes = await fetch("/api/auth2/Token_Authentication", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            })
            const authData = await authRes.json();
            setUserData(authData)
            if (authData.message!=="invalid") {
                setLoggin(true)
            }
            else if(props.img){
                setLoggin("auth")
            }
        }
        newUserData();
    }, []);
    const showAccountAlert=(text)=>{
        swal({
            title:"User is Not login",
            text:`please login to Anime Valley to access ${text} list`,
            buttons:"Okk"
        })
    }
    const [userData, setUserData] = useState();
    const [isLoggin, setLoggin] = useState(false)
    const navToggle = useRef(null);
    return (
        <>
            <Head>
                <title>Anime Valley</title>
            </Head>
            <nav style={{ backgroundColor: `${props.bg}` }}>
                <div className="firstNavbar">
                    <div className="website_title">
                        Anime<span>Valley</span>
                        <Link href="/">
                            <a>
                                <AiTwotoneHome /> Home
                            </a>
                        </Link>
                    </div>
                    <div className="navbarToggle" ref={navToggle}>
                        <div className="other_widgets_list">
                            <ul className="other_widgets_list">
                                <li className="favourite_widgets">
                                    {isLoggin==true && <Link href={"/container/Favourite"}>
                                    <a>
                                    <button className="favourite_icon widgets_button"><BiBookHeart /></button>
                                    </a>
                                    </Link>}
                                    {isLoggin==false &&
                                   <button className="watch_later_icon widgets_button" onClick={()=>showAccountAlert("Favourite")}><BiBookHeart /></button>}
                                </li>
                                <li className="watch_later_widgets">
                                   {isLoggin==true && <Link href={"/container/WatchList"}>
                                   <a>
                                   <button className="watch_later_icon widgets_button"><MdOutlineWatchLater /></button>
                                   </a>
                                   </Link>}
                                   {isLoggin==false && <button className="watch_later_icon widgets_button" onClick={()=>showAccountAlert('Watch')}><MdOutlineWatchLater /></button>}

                                </li>
                                <li className="notification_widgets">
                                    <button className="bell_icon widgets_button"><IoNotifications /></button>
                                </li>
                                <li className="account_widgets">
                                   {isLoggin==true && <Link href="/credentials/Account">
                                        <a>
                                            <div className="userAccount img" > 
                                             <Image src={userData.img} width="80px" height="80px" alt="Account img" className="rounded_accountImg"/>
                                            </div>
                                        </a>
                                    </Link>}
                                    {isLoggin==false && <Link href="/api/auth/signin">
                                        <a>
                                            <button className="account_widgets widgets_button"><MdAccountCircle /></button>
                                        </a>
                                    </Link>}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Nav