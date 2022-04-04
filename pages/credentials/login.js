import {getSession,getProviders} from "next-auth/react";
import LoginBtn from "../../components/LoginBtn";
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

const Login = ({provider,user}) => {
  console.log(provider,user)
  return (
    <>
    <div className="login_container" style={{color:'#fff',height:"100vh",width:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div className="login_innerPart" style={{height:"40vh",width:"50rem",border:"2px solid red"}}>
       <p className="login_website_name" style={{fontSize:"25px",letterSpacing:"2px",textAlign:"center"}}>Anime Valley</p>
        <div className="login_button_menu">
          <LoginBtn name={provider.google.name} bgColor="#f2573f" id={provider.google.id}/>
          <LoginBtn name={provider.twitter.name} bgColor="#0404be" id={provider.twitter.id}/>
        </div>
      </div>
    </div>
    </>
  )
}
// Login.getInitialProps=async(context)=>{
//     return{
//         provider:await getProviders(context),
//         session:await getSession(context),
//     }
// }
export default Login