import Link from "next/link";
import { GoChevronLeft } from "react-icons/go";
import {AiOutlineGoogle} from "react-icons/ai";
import { useEffect,useState } from "react";
const Login= () => {
  const [authType,setAuthType]=useState('')
  const [credential,setCredential]=useState({
    firstName:"",
    secondName:"",
    Gmail:""
    
  })
  const settingCred=(event)=>{
    const {name,value}=event.target;
    setCredential((preValue)=>{
      return{
        ...preValue,
        [name]:value
      }
    })
  }
  return (
    <>
    {/* {console.log(provider,user)} */}
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
      <div className="loginContainer" style={{ height: "50rem", display: "flex", justifyContent: "center",alignItems:"center" }}>
        <div className="loginCard" style={{color:"#fff"}}>
            <div className="websiteAccountName">
              <p >Anime Valley</p>
            </div>
            <div className="accountDetails" style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
              <p className="create">Create Account</p>
              <p className="loginOption">New to AnimeValley ?
              <Link href="/api/auth/signin">
                <a style={{marginLeft:"3px",color:"skyblue"}}>
              SignUp
                </a>
              </Link>
              </p>
              <div className="oauthOption">
                <div className="googleoauth oauthProvider">
                  <button className="oauthLink credButton" onClick={()=>signIn(provider.google.id)}>
                    <div className="oauthIcon">
                      <AiOutlineGoogle color="#e74c3c" /> 
                    </div>
                   Login In with Google
                  </button>
                </div>
              </div>
              <div className="dividerLine" style={{display:"flex",alignItems:"center",color:"grey"}}>
                <hr style={{width:"18rem"}} />
                <p className="dividerStatement" style={{fontSize:"1.3rem",margin:"0px 5px 0px 5px"}}>or</p>
                <hr style={{width:"18rem"}}/>
              </div>
              <div className="loginWithGmailOption">
                <form autoComplete="off">
                  <div className="gmailCred">
                    <input type="email" id="userGmail" className="userGmail userCredentials " name="Gmail" placeholder="Gmalil" onChange={(event)=>{settingCred(event)}} />
                  </div>
                </form>
                  <button className="credButton">Login In with Gmail</button>
              </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default Login