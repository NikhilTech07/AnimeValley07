import {getSession,getProviders,signIn} from "next-auth/react";
import Link from "next/link";
import { useRouter } from 'next/router'
import { GoChevronLeft } from "react-icons/go";
import {AiOutlineGoogle} from "react-icons/ai";
import Image from "next/image";
import Head from "next/head";
import { useEffect,useState } from "react";
import swal from 'sweetalert';
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
  const [isLoggin,setIsLoggin]=useState(false);
  const router = useRouter();
  const [credential,setCredential]=useState({
    name:"",
    img:"",
    email:"",
    Password:null,
    ConfirmPassword:null
    
  })
  const ImageArray=["https://i.ibb.co/3pqsrTy/gundam.png","https://i.ibb.co/HCsPms5/icons8-kakashi-hatake-48.png","https://i.ibb.co/5nDMy3z/icons8-naruto-48.pngV",
                    "https://i.ibb.co/nszDrM7/kakashi.png","https://i.ibb.co/6wp5fMq/otaku.png"
                    ,"https://i.ibb.co/t2CDRFQ/ghost.png","https://i.ibb.co/xq6KkQb/Dragonball-Goku.png"]
  const settingCred=(event)=>{
    const {name,value}=event.target;
    setCredential((preValue)=>{
      return{
        ...preValue,
        [name]:value
      }
    })
  }
  async function pushData(){
    document.title="Anime Valley"
    if (user) {
      const res=await fetch('/api/auth1/google',{
        method:'POST',
        body:JSON.stringify(user),
        headers:{
          "Accept":"application/json",
          "Content-Type":"application/json"
        }
      })
      const data=await res.json();
      console.log(data)
      if (data.message=="Please use manual method to login"){
        swal({
          title:`Anime Valley`,
          text:`${data.message}`,
          buttons:"Click Here"
        })
      }
      else{
        setIsLoggin(true);
      }
    }
  }
  async function getUserData(){
    const authRes=await fetch("/api/auth2/Token_Authentication",{
      method:"GET",
      headers:{
        Accept:"application/json",
        "Content-Type":"application/json"
      }
    })
    const authNewData=await authRes.json();
    if (authNewData.message!=="invalid") {
      setIsLoggin(true)
    }
    else{
      setIsLoggin(false)
    }
  }
  useEffect(()=>{
    pushData();
    getUserData();
  })
  const postChange=async(e)=>{
    if (credential.firstName===""||credential.secondName===""||credential.Gmail===""||credential.img=="") {
      alert("please Submit form correctly .....")
    }
    else if(credential.Password!==credential.ConfirmPassword){
      alert("password doesn't matched")
    }
    else{
      const res=await fetch('/api/auth1/manual',{
        method:'POST',
        body:JSON.stringify(credential),
        headers:{
          "Accept":"application/json",
          "Content-Type":"application/json"
        }
      })
      const data=await res.json();
      if (data.message) {
        swal({
          title:`${data.message}`,
          text:"Please Navigate To login Page",
          buttons:"Click Here"
        })
        .then(()=>{
          router.push("/credentials/Login")
        })
      }
      else{
        swal({
          title:`Error Has Occured`,
          text:"Please Navigate To login Page",
          buttons:"Click Here"
        })
      }
    }
  }
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
              <GoChevronLeft/>
              </div>
              Back to Home
            </button>
          </a>
        </Link>
      </header>
      {isLoggin==false && <div className="loginContainer" style={{ height: "50rem", display: "flex", justifyContent: "center",alignItems:"center" }}>
        <div className="loginCard" style={{color:"#fff"}}>
            <div className="websiteAccountName">
              <p >Anime Valley</p>
            </div>
            <div className="accountDetails" style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
              <p className="create">Create Account</p>
              <p className="loginOption">Already have an account ?
              <Link href="/credentials/login">
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
              </div>
              <div className="dividerLine" style={{display:"flex",alignItems:"center",color:"grey"}}>
                <hr style={{width:"18rem"}} />
                <p className="dividerStatement" style={{fontSize:"1.3rem",margin:"0px 5px 0px 5px"}}>or</p>
                <hr style={{width:"18rem"}}/>
              </div>
              <div className="loginWithGmailOption">
                <form autoComplete="off">
                  <div className="nameCred">
                  <input type="name" id="userFirstName" className="userName userCredentials extendInputArea" name="name" placeholder="First name" onChange={(event)=>{settingCred(event)}}/>
                  </div>
                  <div className="gmailCred">
                    <input type="email" id="userGmail" className="userGmail userCredentials extendInputArea " name="email" placeholder="Gmalil" onChange={(event)=>{settingCred(event)}} />
                  </div>
                  <div className="passwordCred">
                    <input type="password" id="userPassword" className="userPassword userCredentials extendInputArea" name="Password" placeholder="Password" onChange={(event)=>{settingCred(event)}}/>
                  </div>
                  <div className="confirmPasswordCred">
                  <input type="password" id="userConfirmPassword" className="userConfirmPassword userCredentials extendInputArea"  name="ConfirmPassword" placeholder="Confirm Password" onChange={(event)=>{settingCred(event)}}/>
                  </div>
                </form>
                <div className="icon_section">
                  <p style={{fontSize:"1.3rem",margin:"8px 0px 15px 0px",textAlign:"center",letterSpacing:"1px",fontWeight:"bold"}}>Please Select Any Icon</p>
                    <div className="icon_box" style={{display:"flex",justifyContent:"space-around"}}>
                      {ImageArray.map((val)=>{
                        return(
                          <>
                            <div className="Image_option">
                              <Image src={val} alt={val} height="40x" width="40px" onClick={(val)=>setCredential((preValue)=>{
                                  return{
                                    ...preValue,
                                    img:val.target.alt
                                  }
                              })}/>
                            </div>
                          </>
                        )
                    })}
                    </div>
                </div>
                  <button className="credButton" onClick={(e)=>{postChange(e)}}>Sign Up with Gmail</button>
              </div>
            </div>
        </div>
      </div>}
      {isLoggin==true &&
        <div className=" Account" style={{color:"#fff",fontSize:"3rem",width:"100%",height:"50vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
        <p>User is already login with AnimeValley.</p>
        <p style={{marginTop:"20px"}}>Please click here to visit <Link href="/credentials/Account"><a style={{color:"blue"}}><u>Account</u></a></Link></p>
        </div>
      }
    </>
  )
}

export default SignUp