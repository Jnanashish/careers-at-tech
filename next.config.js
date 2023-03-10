/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    experimental: {
        fontLoaders: [
            {
                loader: "@next/font/google",
                options: {
                    subsets: ["latin"],
                },
            },
        ],
    },
    images: {
        domains: ["res.cloudinary.com"],
    },
};

module.exports = nextConfig;
