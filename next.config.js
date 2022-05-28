/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    domains:["cdnimg.xyz",'ww1.gogoanime2.org','ani-img.api-web.site','ww.9anime2.com','img.bunnycdnn.ru','www.animelandtv.me'
    ,'gogocdn.net','i.ibb.co','lh3.googleusercontent.com']
  },
  env:{
    JWT_SECRET:"thisisanimevalleywebsitefreeanimestreamingplatformforanimelovers",
    DB_URL:"mongodb+srv://Nikhil:Nikhil1234500000@cluster0.6ay1m.mongodb.net/UserAccount?retryWrites=true&w=majority",
    NEXTAUTH_URL:"http://animevalley07.herokuapp.com",
    NEXT_PUBLIC_SECRET:"ece4ecec4901bc8e09af65f5c178e82b",
    GOOGLE_ID:"765641074683-j2derr75ji44vtogj6nprj56v9g7p71s.apps.googleusercontent.com",
    GOOGLE_SECRET:"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"
  }
}

module.exports = nextConfig
