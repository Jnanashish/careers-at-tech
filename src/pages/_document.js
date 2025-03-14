import { Html, Head, Main, NextScript } from "next/document";
export default function Document() {
    return (
        <Html lang="en">
            <Head>
                {/* google ad sence script  */}
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5689754827429199" crossorigin="anonymous"></script>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
