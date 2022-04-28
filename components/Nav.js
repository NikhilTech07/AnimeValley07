import Link from "next/link";
import { MdAccountCircle ,MdOutlineWatchLater} from "react-icons/md";
import {AiTwotoneHome} from "react-icons/ai";
import { IoNotifications } from "react-icons/io5";
import {BiBookHeart } from "react-icons/bi"
import { useRef } from "react";
import Head from "next/head";
const Nav = (props) => {
    const navToggle = useRef(null);
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
        </>
    )
}

export default Nav