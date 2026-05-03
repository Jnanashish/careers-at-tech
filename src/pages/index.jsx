// Homepage redirects to /jobs. Server-side 308 (permanent) so the redirect
// is followed before the JS bundle ships, which avoids a flash and gives
// crawlers a clean signal.

export async function getServerSideProps() {
    return {
        redirect: {
            destination: "/jobs",
            permanent: true,
        },
    };
}

export default function Home() {
    return null;
}
