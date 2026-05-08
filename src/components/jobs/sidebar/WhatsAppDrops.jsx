import React from "react";

const WHATSAPP_LINK = "https://chat.whatsapp.com/H2NYOSbdwqd6JVV8ABEHjE";

const WhatsAppDrops = () => (
    <div
        className="relative overflow-hidden"
        style={{
            background: "linear-gradient(135deg, #128C7E 0%, #25D366 100%)",
            color: "#fff",
            borderRadius: 16,
            padding: 20,
        }}
    >
        <div
            aria-hidden="true"
            style={{
                position: "absolute",
                top: -30,
                right: -30,
                width: 130,
                height: 130,
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.2)",
            }}
        />
        <div
            className="font-v3-mono"
            style={{
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.85)",
                fontWeight: 500,
                marginBottom: 8,
            }}
        >
            WhatsApp drops
        </div>
        <div className="font-v3-serif" style={{ fontSize: 26, lineHeight: 1.05, marginBottom: 6 }}>
            24,000 members
        </div>
        <div className="font-v3-sans" style={{ fontSize: 12.5, opacity: 0.9, marginBottom: 16, position: "relative" }}>
            Every Mon 7AM · curated drop of new roles before they hit the board.
        </div>
        <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center cursor-pointer v3-focus-ring"
            style={{
                background: "#fff",
                color: "#128C7E",
                border: "none",
                padding: "10px 14px",
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 600,
            }}
        >
            Join community →
        </a>
    </div>
);

export default WhatsAppDrops;
