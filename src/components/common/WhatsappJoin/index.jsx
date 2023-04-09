import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { firenbaseEventHandler } from "@/core/eventHandler";

const style = {
    whatsAppJoinBtn: {
        marginTop: "15px",
        padding: "12px",
        borderRadius: "8px",
        backgroundColor: " #25d366",
        display: "flex",
        justifyContent: "space-between",
        color: "#FFF",
        fontWeight: 600,
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
};

const handleWhatsAppJoinClick = () => {
    firenbaseEventHandler("whatsAppJoinCardClikced", true);
};

const WhatsAppJoin = () => {
    return (
        <div style={style.shareContainer}>
            <div style={{ display: "flex" }}>
                <p>
                    Join our <b style={{ color: "#25d366" }}>WhastApp</b> group to stay upto date
                    with latest <b>Internship</b> and <b>Job</b> updates.
                </p>
                <Image
                    src="https://res.cloudinary.com/dvc6fw5as/image/upload/v1676743231/get-logo-whatsapp-png-pictures-1_1_1_iy5c8o.png"
                    alt="whatsapp icon"
                    height={60}
                    width={60}
                />
            </div>
            <a
                onClick={() => handleWhatsAppJoinClick()}
                href="https://chat.whatsapp.com/EQNivQSL7aQFKUqC3YXpgc">
                <div style={style.whatsAppJoinBtn}>
                    <p>Join us Now on WhatsApp</p>
                    <FontAwesomeIcon style={style.shareIcon} icon={faShare} />
                </div>
            </a>
        </div>
    );
};

export default WhatsAppJoin;
