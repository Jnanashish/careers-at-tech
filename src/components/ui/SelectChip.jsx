import React, { useEffect, useRef, useState } from "react";

const SelectChip = ({ label, value, opts, onChange }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const onDoc = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        const onKey = (e) => {
            if (e.key === "Escape") setOpen(false);
        };
        document.addEventListener("mousedown", onDoc);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("mousedown", onDoc);
            document.removeEventListener("keydown", onKey);
        };
    }, []);

    return (
        <div className="relative" ref={ref}>
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="v3-focus-ring inline-flex items-center gap-1.5 rounded-full cursor-pointer"
                style={{
                    height: 42,
                    padding: "0 14px",
                    border: "1px solid var(--v3-line)",
                    background: "var(--v3-paper)",
                    fontSize: 12.5,
                    fontWeight: 500,
                    color: "var(--v3-ink-2)",
                }}
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                <span style={{ color: "var(--v3-mute)" }}>{label}</span>
                <span>·</span>
                <span>{value}</span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </button>
            {open && (
                <div
                    role="listbox"
                    className="absolute left-0 z-30 shadow-v3-dropdown"
                    style={{
                        top: "calc(100% + 6px)",
                        background: "var(--v3-paper)",
                        border: "1px solid var(--v3-line)",
                        borderRadius: 12,
                        padding: 6,
                        minWidth: 180,
                    }}
                >
                    {opts.map((o) => {
                        const selected = o === value;
                        return (
                            <div
                                key={o}
                                role="option"
                                aria-selected={selected}
                                onClick={() => {
                                    onChange(o);
                                    setOpen(false);
                                }}
                                className="cursor-pointer"
                                style={{
                                    padding: "8px 10px",
                                    borderRadius: 8,
                                    fontSize: 13,
                                    background: selected ? "var(--v3-accent-soft)" : "transparent",
                                    color: selected ? "var(--v3-accent-deep)" : "var(--v3-ink-2)",
                                    fontWeight: selected ? 600 : 400,
                                }}
                            >
                                {o}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default SelectChip;
