/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Enables static export
  trailingSlash: true, // Fixes routing issues
  images: {
    unoptimized: true, // Disables Next.js image optimization (needed for static export)
  },
};

module.exports = nextConfig;
