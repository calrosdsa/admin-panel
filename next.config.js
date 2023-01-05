/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    facebook_url: process.env.facebook_url,
  },
}

module.exports = nextConfig
