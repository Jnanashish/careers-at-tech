import React from "react";

function pageBtnStyle(active, disabled) {
    return {
        minWidth: 36,
        height: 36,
        padding: "0 12px",
        borderRadius: 999,
        border: "1px solid var(--v3-line)",
        background: active ? "var(--v3-ink)" : "var(--v3-paper)",
        color: active ? "var(--v3-paper)" : disabled ? "var(--v3-mute-2)" : "var(--v3-ink-2)",
        fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
        fontSize: 12,
        cursor: disabled ? "not-allowed" : "pointer",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
    };
}

function pageWindow(current, total) {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    if (current <= 4) return [1, 2, 3, 4, 5, "…", total];
    if (current >= total - 3) return [1, "…", total - 4, total - 3, total - 2, total - 1, total];
    return [1, "…", current - 1, current, current + 1, "…", total];
}

const Pagination = ({ page, totalPages, totalCount, onChange }) => {
    if (!totalPages || totalPages < 1) return null;
    const pages = pageWindow(page, totalPages);
    const prevDisabled = page <= 1;
    const nextDisabled = page >= totalPages;

    return (
        <div
            className="flex items-center justify-between flex-wrap gap-3"
            style={{
                padding: "24px 0 32px",
                borderTop: "1px solid var(--v3-line-soft)",
                marginTop: 16,
            }}
        >
            <span className="font-v3-mono" style={{ fontSize: 12, color: "var(--v3-mute)" }}>
                Page {String(page).padStart(2, "0")} of {String(totalPages).padStart(2, "0")}
                {typeof totalCount === "number" ? ` · ${totalCount} roles total` : ""}
            </span>
            <div className="flex gap-1.5 flex-wrap">
                <button
                    type="button"
                    onClick={() => !prevDisabled && onChange(page - 1)}
                    disabled={prevDisabled}
                    style={pageBtnStyle(false, prevDisabled)}
                    aria-label="Previous page"
                >
                    ← Prev
                </button>
                {pages.map((p, idx) => {
                    if (p === "…") {
                        return (
                            <span
                                key={`gap-${idx}`}
                                style={{ ...pageBtnStyle(false), border: "none", background: "transparent" }}
                            >
                                …
                            </span>
                        );
                    }
                    return (
                        <button
                            key={p}
                            type="button"
                            onClick={() => onChange(p)}
                            style={pageBtnStyle(p === page)}
                            aria-current={p === page ? "page" : undefined}
                        >
                            {p}
                        </button>
                    );
                })}
                <button
                    type="button"
                    onClick={() => !nextDisabled && onChange(page + 1)}
                    disabled={nextDisabled}
                    style={pageBtnStyle(false, nextDisabled)}
                    aria-label="Next page"
                >
                    Next →
                </button>
            </div>
        </div>
    );
};

export default Pagination;
