import React, { useEffect, useRef } from "react";
import { TYPE_OPTS, LOCATION_OPTS, BATCH_OPTS, QUICK_FILTERS } from "./data";

const ChipRow = ({ label, opts, value, onChange }) => (
    <div className="mb-5">
        <div
            className="font-v3-mono mb-2"
            style={{
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--v3-mute)",
                fontWeight: 500,
            }}
        >
            {label}
        </div>
        <div className="flex flex-wrap gap-2">
            {opts.map((o) => {
                const on = o === value;
                return (
                    <button
                        key={o}
                        type="button"
                        onClick={() => onChange(o)}
                        className="rounded-full cursor-pointer v3-focus-ring"
                        style={{
                            padding: "6px 12px",
                            border: on ? "1px solid var(--v3-accent)" : "1px solid var(--v3-line)",
                            background: on ? "var(--v3-accent-soft)" : "var(--v3-paper)",
                            color: on ? "var(--v3-accent-deep)" : "var(--v3-ink-2)",
                            fontSize: 12.5,
                            fontWeight: on ? 600 : 500,
                        }}
                        aria-pressed={on}
                    >
                        {o}
                    </button>
                );
            })}
        </div>
    </div>
);

const MobileFilterSheet = ({
    open,
    onClose,
    type, setType,
    location, setLocation,
    batch, setBatch,
    quick, setQuick,
}) => {
    const closeRef = useRef(null);

    useEffect(() => {
        if (!open) return undefined;
        const onKey = (e) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", onKey);
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        closeRef.current?.focus();
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = prev;
        };
    }, [open, onClose]);

    if (!open) return null;

    const clearAll = () => {
        setType("All");
        setLocation("Anywhere");
        setBatch("All");
        setQuick(null);
    };

    return (
        <div
            className="fixed inset-0 z-50 md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Filters"
        >
            <button
                type="button"
                aria-label="Close filters"
                onClick={onClose}
                className="absolute inset-0 bg-black/40 cursor-pointer border-0"
            />
            <div
                className="absolute left-0 right-0 bottom-0 animate-v3-sheet-up"
                style={{
                    background: "var(--v3-paper)",
                    borderTopLeftRadius: 18,
                    borderTopRightRadius: 18,
                    maxHeight: "88vh",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <div
                    className="flex items-center justify-between"
                    style={{
                        padding: "16px 20px",
                        borderBottom: "1px solid var(--v3-line-soft)",
                    }}
                >
                    <div
                        className="font-v3-serif"
                        style={{ fontSize: 22, color: "var(--v3-ink)", lineHeight: 1 }}
                    >
                        Filters
                    </div>
                    <button
                        ref={closeRef}
                        type="button"
                        onClick={onClose}
                        aria-label="Close filters"
                        className="grid place-items-center cursor-pointer v3-focus-ring rounded-full"
                        style={{
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            border: "1px solid var(--v3-line)",
                            background: "var(--v3-paper)",
                        }}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 6l12 12M18 6l-12 12" />
                        </svg>
                    </button>
                </div>

                <div
                    className="overflow-y-auto"
                    style={{ padding: "20px", flex: 1 }}
                >
                    <ChipRow label="Type" opts={TYPE_OPTS} value={type} onChange={setType} />
                    <ChipRow label="Where" opts={LOCATION_OPTS} value={location} onChange={setLocation} />
                    <ChipRow label="Batch" opts={BATCH_OPTS} value={batch} onChange={setBatch} />
                    <div className="mb-5">
                        <div
                            className="font-v3-mono mb-2"
                            style={{
                                fontSize: 11,
                                letterSpacing: "0.14em",
                                textTransform: "uppercase",
                                color: "var(--v3-mute)",
                                fontWeight: 500,
                            }}
                        >
                            Quick
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {QUICK_FILTERS.map((q) => {
                                const on = quick === q;
                                return (
                                    <button
                                        key={q}
                                        type="button"
                                        onClick={() => setQuick(on ? null : q)}
                                        className="rounded-full cursor-pointer v3-focus-ring"
                                        style={{
                                            padding: "6px 12px",
                                            border: on ? "1px solid var(--v3-accent)" : "1px dashed var(--v3-line)",
                                            background: on ? "var(--v3-accent-soft)" : "transparent",
                                            color: on ? "var(--v3-accent-deep)" : "var(--v3-ink-3)",
                                            fontSize: 12,
                                            fontWeight: 500,
                                        }}
                                        aria-pressed={on}
                                    >
                                        {q}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div
                    className="flex gap-3"
                    style={{
                        padding: "16px 20px",
                        borderTop: "1px solid var(--v3-line-soft)",
                    }}
                >
                    <button
                        type="button"
                        onClick={clearAll}
                        className="rounded-full cursor-pointer flex-1 v3-focus-ring"
                        style={{
                            padding: "12px 16px",
                            border: "1px solid var(--v3-line)",
                            background: "var(--v3-paper)",
                            color: "var(--v3-ink-2)",
                            fontSize: 13,
                            fontWeight: 500,
                        }}
                    >
                        Clear all
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full cursor-pointer flex-1 v3-focus-ring"
                        style={{
                            padding: "12px 16px",
                            border: "none",
                            background: "var(--v3-ink)",
                            color: "var(--v3-paper)",
                            fontSize: 13,
                            fontWeight: 500,
                        }}
                    >
                        Apply
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MobileFilterSheet;
