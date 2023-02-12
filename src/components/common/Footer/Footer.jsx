import { useState, useEffect } from "react";
import styles from "./footer.module.scss";

const Footer = () => {
    const [count, setCount] = useState("");
    useEffect(() => {
        pageview();
    }, []);

    const pageview = () => {
        fetch(
            "https://api.countapi.xyz/update/interviewprep/ca0e20b7-5690-4571-a2b0-b45d4c26ec3d/?amount=1"
        )
            .then((res) => res.json())
            .then((data) => {
                setCount(data.value);
            });
    };

    return (
        <div className={styles.footer}>
            <p>Total Page view 🔎 {count}</p>
            <p>
                Made with ❤️ in India by
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://bit.ly/jsh_linkedin_footer">
                    @JSH
                </a>
            </p>
        </div>
    );
};

export default Footer;
