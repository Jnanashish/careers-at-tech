import React from "react";

const styles = {
    noticeContainer: {
        backgroundColor: "#f4faff",
        padding: "22px",
        width: "92%",
        borderRadius: "8px",
        margin: "30px auto",
    },
    noticeText: {
        fontSize: "0.9rem",
        lineHeight: "1.5rem",
        color: "#3b3b3b",
    },
    noticeHeader: {
        color: "#121212",
        marginBottom: "12px",
        fontWeight: "500",
    },
};

function Notice() {
    return (
        <div style={styles.noticeContainer}>
            <p style={styles.noticeHeader}>Important !</p>
            <p style={styles.noticeText}>
                All Company names, logos and trademarks are the intellectual property of the respective owners. All company, product and service names used in this website are for identification
                purposes only. Use of these names,trademarks and brands does not imply endorsement.
                <br /> <span> We do not charge any money or commision fees from students</span>, we are just an information provider for job openings.
            </p>
        </div>
    );
}

export default Notice;
