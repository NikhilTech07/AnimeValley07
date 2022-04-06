import {getSession,getProviders,signIn} from "next-auth/react";
import connectDB from "../../config/connectDB";
import Link from "next/link";
import { GoChevronLeft } from "react-icons/go";
import {AiOutlineGoogle} from "react-icons/ai";
import {BsInstagram} from "react-icons/bs";
import { useEffect } from "react";
import {FaFacebookF} from "react-icons/fa";
export async function getServerSideProps(context) {
  const session = await getSession(context)
  const provider=await getProviders(context)
  if (!session) {
    return {
      props: {provider}
    }
  }
  const { user } = session;
  return {
    props: { user,provider },
  }
}
const SignUp = ({provider,user}) => {
  useEffect(async()=>{
    document.title="Anime Valley"
    if (user) {
      const res=await fetch('http://localhost:3000/api/auth1/google',{
        method:'POST',
        body:JSON.stringify(user),
        headers:{
          "Accept":"application/json",
          "Content-Type":"application/json"
        }
      })
    }
  })
  return (
    <>
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
              <p className="loginOption">Already have an account ?
              <Link href="/credientials/Login">
                <a style={{marginLeft:"3px",color:"skyblue"}}>
              login
                </a>
              </Link>
              </p>
              <div className="oauthOption">
                <div className="googleoauth oauthProvider">
                  <button className="oauthLink credButton" onClick={()=>signIn(provider.google.id)}>
                    <div className="oauthIcon">
                      <AiOutlineGoogle color="#e74c3c" /> 
                    </div>
                   Sign Up with Google
                  </button>
                </div>
                <div className="facebookoauth oauthProvider">
                  <button className="oauthLink credButton">
                  <div className="oauthIcon">
                      <FaFacebookF color="#130f40" /> 
                    </div>
                    Sign Up with Facebook
                  </button>
                </div>
                <div className="instagramoauth oauthProvider">
                  <button className="oauthLink credButton">
                  <div className="oauthIcon">
                  <BsInstagram color="#f1c40f"/>
                    </div>
                   Sign Up With Instagram
                  </button>
                </div>
              </div>
              <div className="dividerLine" style={{display:"flex",alignItems:"center",color:"grey"}}>
                <hr style={{width:"18rem"}} />
                <p className="dividerStatement" style={{fontSize:"1.3rem",margin:"0px 5px 0px 5px"}}>or</p>
                <hr style={{width:"18rem"}}/>
              </div>
              <div className="loginWithGmailOption">
                <form>
                  <div className="nameCred">
                  <input type="name" id="userFirstName" className="userName userCredentials" placeholder="First name"/>
                  <input type="name" id="userSecondName" className="userName userCredentials"  placeholder="second name"/>
                  </div>
                  <div className="gmailCred">
                    <input type="email" id="userGmail" className="userGmail userCredentials" placeholder="Gmalil"/>
                  </div>
                  <button className="credButton">Sign Up with Gmail</button>
                </form>
              </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default SignUp