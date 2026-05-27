import React, { useState, useEffect, useRef } from "react";

const BEFORE = "Did frontend development for college fest website.";

const AfterHighlighted = () => (
    <span>
        <mark className="bg-cat-yellow-mark text-inherit px-[2px] py-[1px] rounded-[3px]">
            Led 4-person team
        </mark>
        {" to ship IIIT-H Felicity '25 ("}
        <mark className="bg-cat-yellow-mark text-inherit px-[2px] py-[1px] rounded-[3px]">
            React + Vite
        </mark>
        {", "}
        <mark className="bg-cat-yellow-mark text-inherit px-[2px] py-[1px] rounded-[3px]">
            11k+ visitors during fest week
        </mark>
        {", "}
        <mark className="bg-cat-yellow-mark text-inherit px-[2px] py-[1px] rounded-[3px]">
            0 downtime
        </mark>
        {")."}
    </span>
);

const PHASE_SEQUENCE = [
    { phase: "before", ms: 1800 },
    { phase: "running", ms: 1500 },
    { phase: "after", ms: 4500 },
];

const LiveDemoCard = () => {
    const [phase, setPhase] = useState("before");
    const [reduced, setReduced] = useState(false);
    const tickRef = useRef(0);
    const timerRef = useRef(null);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const prefersReduced =
            window.matchMedia &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReduced) {
            setReduced(true);
            setPhase("after");
            return;
        }

        const run = () => {
            const idx = tickRef.current % PHASE_SEQUENCE.length;
            const current = PHASE_SEQUENCE[idx];
            setPhase(current.phase);
            timerRef.current = setTimeout(() => {
                tickRef.current += 1;
                run();
            }, current.ms);
        };
        run();
        return () => clearTimeout(timerRef.current);
    }, []);

    return (
        <div className="w-full max-w-[720px] mx-auto bg-white border border-cat-border rounded-[16px] overflow-hidden shadow-[var(--cat-shadow-live-demo)]">
            {/* macOS chrome */}
            <div className="flex items-center gap-1.5 px-[14px] py-[10px] border-b border-cat-border bg-[#FBFCFD]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                <span className="flex-1 text-center text-[11px] text-cat-fg-dim tracking-[0.14px] font-mono">
                    claude.ai — &quot;Fix weak bullets&quot; prompt
                </span>
            </div>

            <div className="p-5 md:p-7 flex flex-col gap-[14px]">
                {/* BEFORE */}
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.6px] text-cat-warm-ink bg-cat-warm-bg px-2 py-[3px] rounded">
                            Before
                        </span>
                        <span className="text-[11px] text-cat-fg-dim">
                            Your bullet, copy-pasted into the prompt
                        </span>
                    </div>
                    <div className="font-mono text-[13px] md:text-[14px] px-4 py-[14px] bg-[#FAFBFC] border border-cat-border rounded-[10px] text-cat-fg leading-[1.5]">
                        <span className="text-cat-fg-dim">•</span> {BEFORE}
                    </div>
                </div>

                {/* Running */}
                <div
                    className={`flex items-center justify-center gap-2.5 text-[12px] font-medium transition-colors duration-300 py-0.5 ${
                        phase === "running"
                            ? "text-cat-primary"
                            : "text-cat-fg-dim"
                    }`}
                >
                    <span
                        className={`w-[14px] h-[14px] rounded-full border-2 border-cat-border ${
                            phase === "running"
                                ? "border-t-cat-primary cat-spin opacity-100"
                                : "opacity-30"
                        }`}
                        style={
                            phase === "running"
                                ? { borderTopColor: "var(--cat-primary)" }
                                : undefined
                        }
                    />
                    {phase === "before" && "Press ⌘+Enter to rewrite"}
                    {phase === "running" && "Claude is rewriting…"}
                    {phase === "after" && (reduced ? "AI rewrite" : "Done — 3 seconds.")}
                </div>

                {/* AFTER */}
                <div
                    className="transition-opacity duration-500"
                    style={{
                        opacity: phase === "after" ? 1 : 0.35,
                    }}
                >
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.6px] text-cat-green-ink bg-cat-green-bg px-2 py-[3px] rounded">
                            After
                        </span>
                        <span className="text-[11px] text-cat-fg-dim">
                            What Claude returns
                        </span>
                    </div>
                    <div className="font-mono text-[13px] md:text-[14px] px-4 py-[14px] bg-[#F4FBF6] border border-cat-green-border rounded-[10px] text-cat-ink-2 leading-[1.5]">
                        <span className="text-cat-fg-dim">•</span>{" "}
                        <AfterHighlighted />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LiveDemoCard;
