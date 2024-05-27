/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    API_URL: process.env.API_URL,
    MARVEL_PUBLIC_KEY: process.env.MARVEL_PUBLIC_KEY,
    MARVEL_PRIVATE_KEY: process.env.MARVEL_PRIVATE_KEY,
  },
  images: {
    domains: ["i.annihil.us"],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
