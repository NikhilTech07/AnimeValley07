/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    domains:["cdnimg.xyz",'ww1.gogoanime2.org','ani-img.api-web.site','ww.9anime2.com','img.bunnycdnn.ru','www.animelandtv.me'
    ,'gogocdn.net','i.ibb.co','lh3.googleusercontent.com']
  },
  env:{
    JWT_SECRET:process.env.JWT_SECRET,
    DB_URL:process.env.DB_URL,
    NEXTAUTH_URL:process.env.NEXTAUTH_URL,
    NEXT_PUBLIC_SECRET:process.env.NEXT_PUBLIC_SECRET,
    GOOGLE_ID:process.env.GOOGLE_ID,
    GOOGLE_SECRET:process.env.GOOGLE_SECRET
  }
}

module.exports = nextConfig
