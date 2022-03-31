import { signIn } from "next-auth/react"
const LoginBtn = (props) => {
  return (
    <div style={{width:"90%",margin:"auto",marginTop:"7px"}}>
        <button className="login_btn" style={{backgroundColor:`${props.bgColor}`,color:"#fff",height:"33px",width:"100%",fontSize:"20px",textTransform:"capitalize"}}
        onClick={()=>signIn(props.id)}>
            Sign in With {props.name}
            </button>
    </div>
  )
}

export default LoginBtn