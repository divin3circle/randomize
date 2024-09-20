/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_KEY: process.env.API_KEY,
  },
  images: {
    domains: ["preview.redd.it", "i.imgur.com", "i.redd.it"],
  },
};

export default nextConfig;
