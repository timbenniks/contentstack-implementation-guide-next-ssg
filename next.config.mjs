/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        hostname: "eu-images.contentstack.com",
      },
    ],
  },
};

export default nextConfig;
