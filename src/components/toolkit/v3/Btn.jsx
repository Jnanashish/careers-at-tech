import React from "react";
import Link from "next/link";

const Btn = ({
    variant = "primary",
    children,
    href,
    onClick,
    type = "button",
    className = "",
    external = false,
    ...rest
}) => {
    const base =
        "inline-flex items-center justify-center gap-2 min-h-[44px] px-[20px] py-[12px] rounded-[8px] text-[15px] font-medium tracking-[0.14px] whitespace-nowrap transition-colors duration-200 ease-out cursor-pointer no-underline";

    const variants = {
        primary:
            "bg-cat-primary text-white border border-cat-primary hover:bg-cat-primary-light",
        secondary:
            "bg-white text-cat-ink border border-cat-border hover:bg-cat-surface-soft hover:border-cat-fg-dim",
        whatsapp:
            "bg-cat-success text-white border border-cat-success hover:opacity-90 shadow-[0_2px_8px_rgba(37,211,102,0.25)]",
    };

    const classes = `${base} ${variants[variant] || variants.primary} ${className}`;

    if (href) {
        if (external) {
            return (
                <a href={href} className={classes} onClick={onClick} {...rest}>
                    {children}
                </a>
            );
        }
        return (
            <Link href={href} className={classes} onClick={onClick} {...rest}>
                {children}
            </Link>
        );
    }

    return (
        <button type={type} className={classes} onClick={onClick} {...rest}>
            {children}
        </button>
    );
};

export default Btn;
