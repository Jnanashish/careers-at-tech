import { Html, Head, Main, NextScript } from "next/document";
export default function Document() {
    return (
        <Html lang="en">
            <Head>
                {/* google ad sence script  */}
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5689754827429199" crossorigin="anonymous"></script>
                {/* V3 fonts: Geist + Geist Mono (not yet in next/font/google for Next 14.2). Instrument Serif loaded via next/font in _app.js. */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500;600&display=swap"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
