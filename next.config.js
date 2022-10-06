/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images : {
    domains : ['sass-lang.com','upload.wikimedia.org',"www.w3.org",'cdn1.iconfinder.com','cdn4.iconfinder.com','www.mysql.com']
  }
}

module.exports = nextConfig
