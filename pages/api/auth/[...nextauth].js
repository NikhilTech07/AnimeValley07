// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from "next-auth/providers/twitter";
// import GitHubProvider from "next-auth/providers/github";
// import InstagramProvider from "next-auth/providers/instagram";
import GoogleProvider from "next-auth/providers/google";
// import LinkedInProvider from "next-auth/providers/linkedin";
// import EmailProvider from "next-auth/providers/email"

export default NextAuth({
  secret: process.env.SECRET,
  database:process.env.DB_URL,
  session:{
      jwt:true
  },
  providers: [
    // OAuth authentication providers
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    TwitterProvider({
      clientId:process.env.TWITTER_CLIENT_ID,
      clientSecret:process.env.TWITTER_CLIENT_SECRET
    })
    // FacebookProvider({
    //     clientId: process.env.FACEBOOK_CLIENT_ID,
    //     clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    //   }),
    //   InstagramProvider({
    //     clientId: process.env.INSTAGRAM_CLIENT_ID,
    //     clientSecret: process.env.INSTAGRAM_CLIENT_SECRET
    //   }),
    //   LinkedInProvider({
    //     clientId: process.env.LINKEDIN_CLIENT_ID,
    //     clientSecret: process.env.LINKEDIN_CLIENT_SECRET
    //   })
    
    // Sign in with passwordless email link
    // EmailProvider({
    //   server: process.env.MAIL_SERVER,
    //   from: "<no-reply@example.com>",
    // }),
  ],
  pages:{
      signIn:"/login"
  },
})