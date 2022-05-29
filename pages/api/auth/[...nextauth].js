import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
console.log(process.env.NEXTAUTH_URL);
export default NextAuth({
    secret:process.env.NEXT_PUBLIC_SECRET,
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
          }),
    ],
    database:process.env.DB_URL,
    pages:{
      signIn:'/credentials/SignUp'
    },
    session: {
      maxAge: 15,
    },
    NEXTAUTH_URL:process.env.NEXTAUTH_URL,
})