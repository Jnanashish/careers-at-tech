import "./globals-blog.css";

const FALLBACK_SITE_URL = "https://careersat.tech";
const metadataBase = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_SITE_URL);
  } catch {
    return new URL(FALLBACK_SITE_URL);
  }
})();

export const metadata = { metadataBase };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "'Inter', sans-serif" }}>{children}</body>
    </html>
  );
}
