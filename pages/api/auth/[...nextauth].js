import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
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
})