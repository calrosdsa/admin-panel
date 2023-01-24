/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    facebook_url: process.env.facebook_url,
    PUBLIC_URL :process.env.PUBLIC_URL
  },
  images:{
    domains:["portal.teclumobility.com","teclu-portal.s3.sa-east-1.amazonaws.com"]
  }
}

module.exports = nextConfig
