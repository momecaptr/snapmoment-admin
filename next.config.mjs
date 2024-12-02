/** @type {import('next').NextConfig} */

const nextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: 'staging-it-incubator.s3.eu-central-1.amazonaws.com',
        pathname: '**',
        protocol: 'https'
      },
    ],
  },
};

export default nextConfig;
