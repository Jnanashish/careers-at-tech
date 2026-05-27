import React, { useState, useMemo, useEffect, useRef } from "react";
import {
    Search,
    X,
    ChevronDown,
    Check,
    Bot,
    Grid3x3,
    Sprout,
    FilterX,
    Shuffle,
    Target,
    Wand2,
    GraduationCap,
    Link2,
} from "lucide-react";
import SectionHead from "./SectionHead";
import PromptCardV3 from "./PromptCardV3";
import { firebaseEventHandler } from "@/core/eventHandler";

const FILTER_ICON_MAP = {
    all: Grid3x3,
    noexp: Sprout,
    ats: FilterX,
    switch: Shuffle,
    tailor: Target,
    bullets: Wand2,
    critique: Search,
    intern: GraduationCap,
    linkedin: Link2,
};

const TOOL_FILTERS = [
    { id: "all", label: "Any AI" },
    { id: "ChatGPT", label: "ChatGPT" },
    { id: "Claude", label: "Claude" },
    { id: "Gemini", label: "Gemini" },
];

const EmptyState = ({ onReset }) => (
    <div className="px-6 py-14 text-center bg-cat-surface-soft border border-dashed border-cat-border rounded-[14px]">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white border border-cat-border text-cat-fg-dim mb-[18px]">
            <Search size={20} />
        </div>
        <h4 className="text-[17px] font-semibold text-cat-ink m-0 mb-1.5 tracking-[0.1px]">
            No prompts match.
        </h4>
        <p className="text-[14px] text-cat-fg-muted m-0 mb-[18px] leading-[1.55]">
            Try a different keyword, or clear the filters and browse the full library.
        </p>
        <button
            onClick={onReset}
            className="inline-flex items-center px-[18px] py-2.5 min-h-[44px] rounded-[8px] bg-cat-accent-teal text-white text-[14px] font-medium tracking-[0.14px] border-0 cursor-pointer hover:bg-cat-accent-teal-hover transition-colors"
        >
            Clear filters
        </button>
    </div>
);

const PromptLibrary = ({ prompts, filterCategories, sectionMeta }) => {
    const [query, setQuery] = useState("");
    const [cat, setCat] = useState("all");
    const [tool, setTool] = useState("all");
    const [toolOpen, setToolOpen] = useState(false);
    const dropdownRef = useRef(null);

    const filtersActive = query.trim() !== "" || cat !== "all" || tool !== "all";

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return prompts.filter((p) => {
            if (cat !== "all" && p.catId !== cat) return false;
            if (tool !== "all") {
                const tools = Array.isArray(p.tools) ? p.tools : [];
                if (!tools.some((t) => t.toLowerCase() === tool.toLowerCase()))
                    return false;
            }
            if (
                q &&
                !(
                    p.title.toLowerCase().includes(q) ||
                    p.description.toLowerCase().includes(q) ||
                    p.category.toLowerCase().includes(q)
                )
            )
                return false;
            return true;
        });
    }, [query, cat, tool, prompts]);

    useEffect(() => {
        if (!toolOpen) return;
        const handler = (e) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target)
            ) {
                setToolOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [toolOpen]);

    useEffect(() => {
        if (!filtersActive) return;
        const id = setTimeout(() => {
            firebaseEventHandler("toolkit_library_filter", {
                query: query.slice(0, 40),
                cat,
                tool,
                results: filtered.length,
            });
        }, 400);
        return () => clearTimeout(id);
    }, [query, cat, tool, filtered.length, filtersActive]);

    const toolLabel = TOOL_FILTERS.find((t) => t.id === tool)?.label || "Any AI";

    const reset = () => {
        setQuery("");
        setCat("all");
        setTool("all");
    };

    const renderGrid = (items) => (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[14px] md:gap-5">
            {items.map((p) => (
                <PromptCardV3 key={p.slug || p.id} prompt={p} variant="standard" />
            ))}
        </div>
    );

    return (
        <section
            id="library"
            className="bg-white border-t border-cat-divider px-4 md:px-8 py-16 md:py-24"
        >
            <div className="max-w-[1100px] mx-auto">
                <SectionHead
                    eyebrow="The full library"
                    eyebrowColor="teal"
                    title={`All ${prompts.length}+ prompts, grouped by situation.`}
                    sub="Browse by category, or search if you already know what you need. Every prompt works on the free tier of ChatGPT, Claude, and Gemini."
                />

                {/* Search + tool */}
                <div className="mt-9 flex flex-col md:flex-row gap-3 items-stretch">
                    <label className="relative flex-1 block">
                        <span className="sr-only">Search prompts</span>
                        <Search
                            size={16}
                            className="absolute left-[18px] top-1/2 -translate-y-1/2 text-cat-fg-dim pointer-events-none"
                        />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder='Search prompts — try "ATS" or "no internship"'
                            className="w-full px-4 py-[14px] pl-12 text-[15px] text-cat-ink bg-white border border-cat-border rounded-[10px] min-h-[48px] tracking-[0.14px] shadow-[var(--cat-shadow-card)] outline-none focus:border-cat-accent-teal focus:ring-[3px] focus:ring-[rgba(13,148,136,0.15)] transition-all"
                            aria-label="Search prompts"
                        />
                        {query && (
                            <button
                                onClick={() => setQuery("")}
                                aria-label="Clear search"
                                className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-cat-surface-soft text-cat-fg-muted border-0 cursor-pointer flex items-center justify-center hover:bg-cat-border transition-colors"
                            >
                                <X size={12} />
                            </button>
                        )}
                    </label>
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setToolOpen((o) => !o)}
                            aria-haspopup="listbox"
                            aria-expanded={toolOpen}
                            className="w-full md:w-auto md:min-w-[160px] min-h-[48px] px-4 text-[14px] bg-white border border-cat-border rounded-[10px] text-cat-ink font-medium flex items-center gap-2.5 justify-between tracking-[0.14px] hover:border-cat-accent-teal transition-colors cursor-pointer"
                        >
                            <span className="inline-flex items-center gap-2">
                                <Bot size={14} className="text-cat-fg-dim" />
                                {toolLabel}
                            </span>
                            <ChevronDown size={12} className="text-cat-fg-dim" />
                        </button>
                        {toolOpen && (
                            <div className="absolute top-[calc(100%+6px)] right-0 min-w-[160px] bg-white border border-cat-border rounded-[10px] shadow-[var(--cat-shadow-dropdown)] p-1.5 z-10">
                                {TOOL_FILTERS.map((t) => (
                                    <button
                                        key={t.id}
                                        onClick={() => {
                                            setTool(t.id);
                                            setToolOpen(false);
                                        }}
                                        className={`w-full text-left px-3 py-2.5 rounded-[6px] text-[14px] font-medium flex items-center justify-between transition-colors ${
                                            tool === t.id
                                                ? "bg-cat-accent-teal-bg text-cat-accent-teal"
                                                : "text-cat-fg hover:bg-cat-surface-soft"
                                        }`}
                                    >
                                        {t.label}
                                        {tool === t.id && <Check size={12} />}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Category chips */}
                <div
                    className="flex gap-2 mt-4 overflow-x-auto cat-no-scrollbar pb-1 md:flex-wrap"
                >
                    {filterCategories.map((c) => {
                        const active = cat === c.id;
                        const Icon = FILTER_ICON_MAP[c.id] || Grid3x3;
                        return (
                            <button
                                key={c.id}
                                onClick={() => setCat(c.id)}
                                aria-pressed={active}
                                className={`flex-shrink-0 px-[14px] py-2 text-[13px] font-medium rounded-full border inline-flex items-center gap-1.5 min-h-[36px] tracking-[0.14px] transition-colors cursor-pointer ${
                                    active
                                        ? "bg-cat-accent-teal text-white border-cat-accent-teal"
                                        : "bg-white text-cat-fg border-cat-border hover:border-cat-accent-teal hover:text-cat-accent-teal"
                                }`}
                            >
                                <Icon size={11} className={active ? "" : "opacity-60"} />
                                {c.label}
                            </button>
                        );
                    })}
                </div>

                {/* Meta */}
                <div className="mt-7 mb-6 flex justify-between items-center text-[13px] text-cat-fg-muted flex-wrap gap-3">
                    <div>
                        {filtersActive ? (
                            <>
                                Showing{" "}
                                <b className="text-cat-ink">{filtered.length}</b> of{" "}
                                {prompts.length} prompts
                            </>
                        ) : (
                            <>
                                Browse{" "}
                                <b className="text-cat-ink">
                                    {prompts.length} prompts
                                </b>{" "}
                                across {sectionMeta.length} situations
                            </>
                        )}
                        {filtersActive && (
                            <button
                                onClick={reset}
                                className="ml-3 bg-transparent border-0 text-cat-accent-teal font-medium text-[13px] cursor-pointer hover:underline"
                            >
                                Clear filters
                            </button>
                        )}
                    </div>
                </div>

                {/* Results */}
                {filtered.length > 0 ? (
                    filtersActive ? (
                        <div className="cat-fade-in">{renderGrid(filtered)}</div>
                    ) : (
                        <div className="flex flex-col gap-10 md:gap-14">
                            {sectionMeta.map((sec) => {
                                const items = filtered.filter(
                                    (p) => p.catId === sec.id
                                );
                                if (items.length === 0) return null;
                                return (
                                    <div key={sec.id} id={`cat-${sec.id}`}>
                                        <div className="mb-5 flex items-end justify-between gap-3 flex-wrap">
                                            <div className="max-w-[660px]">
                                                <h3 className="text-[20px] md:text-[22px] font-semibold text-cat-ink m-0 mb-1.5 tracking-[0.1px]">
                                                    {sec.title}
                                                </h3>
                                                <p className="text-[14px] text-cat-fg-muted m-0 leading-[1.55]">
                                                    {sec.sub}
                                                </p>
                                            </div>
                                            <span className="text-[12px] text-cat-fg-dim font-medium">
                                                {items.length} prompt{items.length === 1 ? "" : "s"}
                                            </span>
                                        </div>
                                        {renderGrid(items)}
                                    </div>
                                );
                            })}
                        </div>
                    )
                ) : (
                    <EmptyState onReset={reset} />
                )}
            </div>
        </section>
    );
};

export default PromptLibrary;
