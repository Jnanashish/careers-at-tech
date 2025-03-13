/** @type {import('next').NextConfig} */
const path = require('path');
const fontVariable = path.resolve(__dirname, "src/scss/font-variables.scss").replace(/\\/g, '/').replace(/ /g, "\\ ");
const colorVariable = path.resolve(__dirname, "src/scss/color-variables.scss").replace(/\\/g, '/').replace(/ /g, "\\ ");
const variables = path.resolve(__dirname, "src/scss/variables.scss").replace(/\\/g, '/').replace(/ /g, "\\ ");
const sassPath = `@import "${colorVariable}"; @import "${fontVariable}"; @import "${variables}";`

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
    sassOptions: {
        additionalData: sassPath,
    },
    images: {
        domains: ["res.cloudinary.com"],
    },
};

module.exports = nextConfig;
