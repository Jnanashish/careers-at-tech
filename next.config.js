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
        domains: ["res.cloudinary.com", "i.ibb.co"],
    },
    async redirects() {
        return [
            {
                source: "/toolkit",
                destination: "/resume-prompts",
                permanent: true,
            },
            {
                source: "/toolkit/:slug",
                destination: "/resume-prompts/:slug",
                permanent: true,
            },
        ];
    },
};

module.exports = nextConfig;
