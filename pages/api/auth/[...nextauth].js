import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from "next-auth/providers/twitter";

export default NextAuth({
    providers:[
        // OAuth authentication providers...
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
          }),
          FacebookProvider({
            clientId: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET
          }),
          TwitterProvider({
            clientId: process.env.TWITTER_API_ID,
            clientSecret: process.env.TWITTER_API_SECRET,
          })
    ],
    database:process.env.DB_URL,
    pages:{
      signIn:'/credentials/SignUp'
    },
})