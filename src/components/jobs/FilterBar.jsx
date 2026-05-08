import React, { forwardRef } from "react";
import SelectChip from "@/components/ui/SelectChip";
import {
    QUICK_FILTERS,
    TYPE_OPTS,
    LOCATION_OPTS,
    BATCH_OPTS,
    SORT_OPTS,
} from "./data";

const FilterBar = forwardRef(function FilterBar(
    {
        query,
        setQuery,
        sort,
        setSort,
        quick,
        setQuick,
        type,
        setType,
        location,
        setLocation,
        batch,
        setBatch,
        onMobileFiltersOpen,
    },
    searchRef
) {
    const active = [];
    if (type !== "All") active.push({ key: "type", label: "Type", val: type, clear: () => setType("All") });
    if (location !== "Anywhere") active.push({ key: "loc", label: "Where", val: location, clear: () => setLocation("Anywhere") });
    if (batch !== "All") active.push({ key: "batch", label: "Batch", val: batch, clear: () => setBatch("All") });
    if (quick) active.push({ key: "quick", label: "Quick", val: quick, clear: () => setQuick(null) });

    const clearAll = () => {
        setType("All");
        setLocation("Anywhere");
        setBatch("All");
        setQuick(null);
    };

    return (
        <div
            className="sticky top-0 z-20 v3-filterbar"
            style={{
                background: "rgba(250,250,247,0.78)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                borderBottom: "1px solid var(--v3-line-soft)",
            }}
        >
            {/* Row 1 */}
            <div className="row1 flex flex-wrap items-center gap-3">
                <div
                    className="search-pill"
                    style={{
                        flex: "1 1 360px",
                        minWidth: 240,
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        background: "var(--v3-paper)",
                        border: "1px solid var(--v3-line)",
                        borderRadius: 999,
                        padding: "8px 12px 8px 16px",
                        height: 42,
                    }}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <circle cx="11" cy="11" r="7" />
                        <path d="m20 20-3.5-3.5" />
                    </svg>
                    <input
                        ref={searchRef}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search role, company, stack…"
                        className="font-v3-sans"
                        style={{
                            flex: 1,
                            border: "none",
                            outline: "none",
                            background: "transparent",
                            fontSize: 13.5,
                            color: "var(--v3-ink)",
                            minWidth: 0,
                        }}
                        aria-label="Search jobs"
                    />
                    <span
                        className="font-v3-mono kbd"
                        style={{
                            fontSize: 10.5,
                            padding: "3px 7px",
                            border: "1px solid var(--v3-line)",
                            borderRadius: 5,
                            color: "var(--v3-mute)",
                        }}
                    >
                        ⌘K
                    </span>
                </div>

                <div className="hidden md:flex items-center gap-3 flex-wrap">
                    <SelectChip label="Type" value={type} onChange={setType} opts={TYPE_OPTS} />
                    <SelectChip label="Where" value={location} onChange={setLocation} opts={LOCATION_OPTS} />
                    <SelectChip label="Batch" value={batch} onChange={setBatch} opts={BATCH_OPTS} />
                    <button
                        type="button"
                        className="rounded-full v3-focus-ring inline-flex items-center gap-2 cursor-pointer"
                        style={{
                            height: 42,
                            padding: "0 14px",
                            border: "1px dashed var(--v3-ink-3)",
                            background: "transparent",
                            fontSize: 12.5,
                            fontWeight: 500,
                            color: "var(--v3-ink-2)",
                        }}
                    >
                        + More filters
                    </button>
                </div>

                <button
                    type="button"
                    onClick={onMobileFiltersOpen}
                    className="md:hidden rounded-full inline-flex items-center gap-2 v3-focus-ring"
                    style={{
                        height: 42,
                        padding: "0 16px",
                        border: "1px solid var(--v3-line)",
                        background: "var(--v3-paper)",
                        fontSize: 12.5,
                        fontWeight: 500,
                        color: "var(--v3-ink-2)",
                    }}
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M3 6h18M6 12h12M10 18h4" />
                    </svg>
                    Filters
                    {active.length > 0 && (
                        <span
                            className="font-v3-mono"
                            style={{
                                fontSize: 10.5,
                                padding: "2px 6px",
                                borderRadius: 999,
                                background: "var(--v3-accent-soft)",
                                color: "var(--v3-accent-deep)",
                                fontWeight: 600,
                            }}
                        >
                            {active.length}
                        </span>
                    )}
                </button>

                <span className="hidden md:block flex-1" />

                <div
                    className="sort-seg inline-flex items-center"
                    style={{
                        background: "var(--v3-paper-2)",
                        borderRadius: 999,
                        padding: 3,
                        border: "1px solid var(--v3-line-soft)",
                        height: 42,
                    }}
                >
                    {SORT_OPTS.map((s) => {
                        const on = sort === s;
                        return (
                            <button
                                key={s}
                                type="button"
                                onClick={() => setSort(s)}
                                className="rounded-full v3-focus-ring cursor-pointer"
                                style={{
                                    padding: "6px 14px",
                                    border: "none",
                                    background: on ? "var(--v3-ink)" : "transparent",
                                    color: on ? "var(--v3-paper)" : "var(--v3-ink-3)",
                                    fontSize: 12.5,
                                    fontWeight: 500,
                                }}
                                aria-pressed={on}
                            >
                                {s}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Row 2: Quick filters */}
            <div className="row2 mt-3 flex items-center gap-2.5 v3-quick-strip">
                <span
                    className="font-v3-mono hidden md:inline"
                    style={{
                        fontSize: 11,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "var(--v3-mute)",
                        fontWeight: 500,
                        marginRight: 4,
                    }}
                >
                    Quick
                </span>
                <div className="quick-row">
                    {QUICK_FILTERS.map((q) => {
                        const on = quick === q;
                        return (
                            <button
                                key={q}
                                type="button"
                                onClick={() => setQuick(on ? null : q)}
                                className="rounded-full v3-focus-ring cursor-pointer"
                                style={{
                                    padding: "6px 12px",
                                    border: on ? "1px solid var(--v3-accent)" : "1px dashed var(--v3-line)",
                                    background: on ? "var(--v3-accent-soft)" : "transparent",
                                    color: on ? "var(--v3-accent-deep)" : "var(--v3-ink-3)",
                                    fontSize: 12,
                                    fontWeight: 500,
                                    whiteSpace: "nowrap",
                                }}
                                aria-pressed={on}
                            >
                                {q}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Row 3: active chips */}
            {active.length > 0 && (
                <div
                    className="row3 flex items-center gap-2.5 mt-3 pt-3 flex-wrap"
                    style={{ borderTop: "1px dashed var(--v3-line)" }}
                >
                    <span
                        className="font-v3-mono"
                        style={{
                            fontSize: 11,
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            color: "var(--v3-ink-2)",
                            fontWeight: 500,
                        }}
                    >
                        {active.length} active
                    </span>
                    <div className="flex gap-1.5 flex-wrap flex-1">
                        {active.map((a) => (
                            <span
                                key={a.key}
                                className="inline-flex items-center gap-1.5 rounded-full"
                                style={{
                                    padding: "4px 6px 4px 10px",
                                    background: "var(--v3-accent-soft)",
                                    color: "var(--v3-accent-deep)",
                                    fontSize: 11.5,
                                    fontWeight: 500,
                                }}
                            >
                                <span style={{ opacity: 0.7 }}>{a.label}:</span> {a.val}
                                <button
                                    type="button"
                                    onClick={a.clear}
                                    aria-label={`Clear ${a.label}`}
                                    className="grid place-items-center cursor-pointer v3-focus-ring rounded-full"
                                    style={{
                                        width: 18,
                                        height: 18,
                                        borderRadius: "50%",
                                        background: "rgba(10,26,191,0.12)",
                                        border: "none",
                                        color: "var(--v3-accent-deep)",
                                    }}
                                >
                                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                        <path d="M6 6l12 12M18 6l-12 12" />
                                    </svg>
                                </button>
                            </span>
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={clearAll}
                        className="v3-underline-link cursor-pointer bg-transparent border-0 v3-focus-ring rounded"
                        style={{
                            fontFamily: "var(--font-geist), sans-serif",
                            fontSize: 12,
                            color: "var(--v3-accent-deep)",
                            fontWeight: 500,
                            padding: 0,
                        }}
                    >
                        Clear all
                    </button>
                </div>
            )}

            <style jsx>{`
                .v3-filterbar {
                    padding: 14px 16px;
                }
                .quick-row {
                    display: flex;
                    gap: 8px;
                    overflow-x: auto;
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                    margin: 0 -16px;
                    padding: 0 16px;
                    flex-wrap: nowrap;
                }
                .quick-row::-webkit-scrollbar {
                    display: none;
                }
                @media (min-width: 768px) {
                    .v3-filterbar {
                        padding: 14px 56px;
                    }
                    .quick-row {
                        flex-wrap: wrap;
                        overflow-x: visible;
                        margin: 0;
                        padding: 0;
                    }
                }
            `}</style>
        </div>
    );
});

export default FilterBar;
