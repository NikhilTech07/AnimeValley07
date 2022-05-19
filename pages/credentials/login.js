import Link from "next/link";
import { GoChevronLeft } from "react-icons/go";
import {AiOutlineGoogle} from "react-icons/ai";
import { useState } from "react";
import { useRouter } from 'next/router'
import Head from "next/head";
import swal from 'sweetalert';
const Login= () => {
  const router=useRouter();
  const [credential,setCredential]=useState({
    Gmail:"",
    Password:null
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
  const setLoginData=async()=>{
      if (credential.Gmail===""||credential.Password==null) {
        alert("Please fill the form correctly")
      }
      else{
        const res=await fetch("/api/auth1/manual_login",{
          method:"POST",
          body:JSON.stringify(credential),
          headers:{
            "Accept":"application/json",
            "Content-Type":"application/json"
          }
        })
        const data=await res.json();
        if (data.message=='You are Login in ...') {
          swal({
            title:`You are Login in ...`,
            buttons:"Okk"
          }).then(()=>{
            router.push("/")
          })
        }
        else if(data.message=="Incorrect Password"){
          swal({
            title:`Incorrect Password`,
            text:"Please write correct password",
            buttons:"Click Here"
          })
        }
        else if(data.message=='Please Sign in first'){
          swal({
            title:`Please Sign in to Anime Valley`,
            text:"Navigate To Sign Up Page",
            buttons:"Click Here"
          }).then(()=>{
            router.push("/api/auth/signin")
          })
        }
        else{
          swal({
            title:`Error Has Occured`,
            text:"Please try again after Some time",
            buttons:"okkk"
          })
        }
      }
  }
  return (
    
    <>
    {/* {console.log(provider,user)} */}
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
      <div className="loginContainer" style={{ height: "50rem", display: "flex", justifyContent: "center",alignItems:"center" }}>
        <div className="loginCard" style={{color:"#fff"}}>
            <div className="websiteAccountName">
              <p >Anime Valley</p>
            </div>
            <div className="accountDetails" style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
              <p className="create">Login</p>
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
                    <input type="email" id="userGmail" className="userGmail userCredentials extendInputArea " name="Gmail" placeholder="Gmalil" onChange={(event)=>{settingCred(event)}} />
                  </div>
                  <div className="passwordCred">
                    <input type="password" id="userPassword" className="userPassword userCredentials extendInputArea" name="Password" placeholder="Password" onChange={(event)=>{settingCred(event)}}/>
                  </div>
                </form>
                  <button className="credButton" onClick={()=>setLoginData()}>Login In with Gmail</button>
              </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default Login