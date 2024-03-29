// /** @type {import('next').NextConfig} */
// // const nextConfig = {
// //   reactStrictMode: true,
// // }
// const nextTranslate = require('next-translate-plugin')

// // module.exports = nextConfig

// module.exports = nextTranslate({
//   webpack: (config, { isServer, webpack }) => {
//     return config;
//   },
//   reactStrictMode:true,
//   env: {
//     facebook_url: process.env.facebook_url,
//     PUBLIC_URL :process.env.PUBLIC_URL
//   },
//   images:{
//     domains:[
//     "portal.teclumobility.com",
//     "teclu-portal.s3.sa-east-1.amazonaws.com",
//     "scontent.fsrz3-1.fna.fbcdn.net",
//     "graph.facebook.com",
//     "platform-lookaside.fbsbx.com",
//     ],
//     writeToCacheDir: false,
//   },
// })
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  env:{
      facebook_url: process.env.facebook_url,
      PUBLIC_URL :process.env.PUBLIC_URL
  },
  images:{
      remotePatterns: [
          {
            protocol: "https",
            hostname: "**",
          },
        ],
  },
  headers: () => [
    {
      source: '/splash/edit',
      headers: [
        {
          key: 'Cache-Control',
          value: 'no-store',
        },
      ],
    },
  ],

}

module.exports = nextConfig
