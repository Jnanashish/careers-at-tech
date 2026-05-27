import React from "react";

const Badge = ({ children, variant = "blue", className = "" }) => {
    const styles = {
        blue: "bg-cat-blue-bg text-cat-primary",
        warm: "bg-cat-warm-bg text-cat-warm-ink",
        green: "bg-cat-green-bg text-cat-green-ink",
        teal: "bg-cat-accent-teal-bg text-cat-accent-teal",
        terracotta: "bg-cat-accent-warm-bg text-cat-accent-warm",
        plum: "bg-cat-accent-plum-bg text-cat-accent-plum",
    };
    return (
        <span
            className={`inline-block px-[10px] py-[4px] rounded-full text-[12px] font-medium leading-[1.4] tracking-[0.14px] ${styles[variant] || styles.blue} ${className}`}
        >
            {children}
        </span>
    );
};

export default Badge;
