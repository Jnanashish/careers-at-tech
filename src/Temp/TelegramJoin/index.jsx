import Image from "next/image";
import { firenbaseEventHandler } from "@/core/eventHandler";

const style = {
    whatsAppJoinBtn: {
        marginTop: "15px",
        padding: "12px 16px",
        borderRadius: "8px",
        backgroundColor: " #229ED9",
        display: "flex",
        justifyContent: "space-between",
        color: "#FFF",
        fontWeight: 600,
        fontSize: "16px",
    },
    shareContainer: {
        backgroundColor: " #f9f9fb",
        padding: "20px",
        borderRadius: "8px",
        marginTop: "18px",
        border: "0.8px solid rgba(218, 223, 231, 1)",
    },
    shareIcon: {
        height: "15px",
        width: "15px",
    },
    title: {
        fontWeight: "500",
        fontSize: "18px",
        lineHeight: "22px",
    },
};

const handleWhatsAppJoinClick = () => {
    firenbaseEventHandler("telegram_default_ad_clikced", true);
};

const TelegramJoin = () => {
    return (
        <div style={style.shareContainer}>
            <div style={{ display: "flex" }}>
                <p style={style.title}>
                    Get FREE resources and guides for your interview preparation
                </p>
                <Image
                    src="https://res.cloudinary.com/dvc6fw5as/image/upload/v1681295048/Telegram_2019_Logo.svg_1_zyw0oz.png"
                    alt="whatsapp icon"
                    height={40}
                    width={40}
                />
            </div>
            <a onClick={() => handleWhatsAppJoinClick()} href="https://openinapp.co/interviewprep">
                <div style={style.whatsAppJoinBtn}>
                    <p>Join us on Telegram</p>
                </div>
            </a>
        </div>
    );
};

export default TelegramJoin;
