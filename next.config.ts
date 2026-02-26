/** @type {import('next').NextConfig} */
const nextConfig = {
  // kill client-side router cache — always re-fetch on navigation
  experimental: {
    staleTimes: {
      dynamic: 0,
      static: 30,
    },
  },
}
export default nextConfig;
