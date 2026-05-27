import React, { useState, useCallback } from "react";
import Link from "next/link";
import { Copy, Check, ArrowRight, Clock } from "lucide-react";
import Badge from "./Badge";
import { firebaseEventHandler } from "@/core/eventHandler";

const cardBase =
    "group flex flex-col bg-white border rounded-[12px] transition-[box-shadow,border-color] duration-[250ms] ease-out overflow-hidden border-cat-border hover:border-cat-accent-teal shadow-[0px_1px_2px_rgba(16,24,40,0.04)] hover:shadow-[0px_4px_12px_rgba(16,24,40,0.08)]";

const MetaLine = ({ time, tools }) => (
    <div className="flex items-center gap-[10px] text-[12px] text-cat-fg-dim">
        <span className="inline-flex items-center gap-1">
            <Clock size={11} strokeWidth={2} />
            {time} min
        </span>
        <span className="text-[#dcdcdc]">·</span>
        <span className="truncate">{tools}</span>
    </div>
);

const useCopy = (prompt) => {
    const [copied, setCopied] = useState(false);
    const copy = useCallback(
        (e) => {
            e?.preventDefault();
            e?.stopPropagation();
            const text =
                prompt?.promptBody ||
                prompt?.promptPreview ||
                prompt?.title ||
                "";
            try {
                navigator.clipboard.writeText(text);
            } catch (_) {}
            setCopied(true);
            firebaseEventHandler("toolkit_prompt_copy", {
                prompt_slug: prompt?.slug || prompt?.id || "",
                prompt_title: prompt?.title || "",
                variant: prompt?.__variant || "unknown",
            });
            setTimeout(() => setCopied(false), 1400);
        },
        [prompt]
    );
    return [copied, copy];
};

const promptHref = (prompt) =>
    prompt?.slug ? `/resume-prompts/${prompt.slug}` : "#";

const PromptCardV3 = ({ prompt, variant = "standard" }) => {
    const p = { ...prompt, __variant: variant };
    const [copied, copy] = useCopy(p);
    const href = promptHref(p);
    const toolsLabel = Array.isArray(p.tools) ? p.tools.join(" · ") : p.tools;

    if (variant === "compact") {
        return (
            <div className={cardBase}>
                <div className="p-5 flex items-start gap-[14px]">
                    <div className="flex-1 min-w-0">
                        <Badge variant="teal">{p.category}</Badge>
                        <Link href={href} className="block">
                            <h3 className="text-[16px] font-semibold leading-[1.35] text-cat-ink mt-[10px] tracking-[0.1px] hover:text-cat-accent-teal transition-colors">
                                {p.title}
                            </h3>
                        </Link>
                        <div className="mt-3">
                            <MetaLine time={p.time} tools={toolsLabel} />
                        </div>
                    </div>
                    <button
                        onClick={copy}
                        aria-label={copied ? "Copied" : "Copy prompt"}
                        className={`flex-shrink-0 w-11 h-11 rounded-[8px] border flex items-center justify-center transition-colors ${
                            copied
                                ? "bg-cat-accent-teal text-white border-cat-accent-teal"
                                : "bg-white text-cat-accent-teal border-cat-border hover:bg-cat-accent-teal-bg"
                        }`}
                    >
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                </div>
            </div>
        );
    }

    if (variant === "featured") {
        return (
            <div
                className={`${cardBase}`}
                style={{
                    background:
                        "linear-gradient(180deg, var(--cat-accent-teal-bg) 0%, #fff 60%)",
                }}
            >
                <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-[14px] flex-wrap">
                        <Badge variant="warm">Featured</Badge>
                        <Badge variant="teal">{p.category}</Badge>
                    </div>
                    <Link href={href} className="block">
                        <h3 className="text-[18px] font-semibold leading-[1.35] text-cat-ink mb-[10px] tracking-[0.1px] hover:text-cat-accent-teal transition-colors">
                            {p.title}
                        </h3>
                    </Link>
                    <p className="text-[14px] text-cat-fg-muted leading-[1.55] mb-[14px]">
                        {p.description}
                    </p>
                    {p.promptPreview && (
                        <div className="relative mb-[14px] bg-white border border-dashed border-cat-border rounded-[8px] px-[14px] py-3 text-[13px] text-cat-fg-soft leading-[1.55] font-mono max-h-[76px] overflow-hidden">
                            {p.promptPreview}
                            <div className="absolute inset-x-0 bottom-0 h-7 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                        </div>
                    )}
                    <div className="mt-auto">
                        <MetaLine time={p.time} tools={toolsLabel} />
                    </div>
                </div>
                <div className="flex border-t border-cat-border">
                    <button
                        onClick={copy}
                        className={`flex-1 px-4 py-[14px] flex items-center justify-center gap-2 text-[14px] font-medium border-r border-cat-border transition-colors ${
                            copied
                                ? "bg-cat-accent-teal text-white"
                                : "bg-white text-cat-accent-teal hover:bg-cat-accent-teal-bg"
                        }`}
                    >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                        {copied ? "Copied!" : "Copy prompt"}
                    </button>
                    <Link
                        href={href}
                        className="flex-1 px-4 py-[14px] flex items-center justify-center gap-2 text-[14px] font-medium text-cat-fg hover:bg-cat-accent-teal-bg hover:text-cat-accent-teal transition-colors"
                    >
                        Use prompt <ArrowRight size={12} />
                    </Link>
                </div>
            </div>
        );
    }

    // standard
    return (
        <div className={cardBase}>
            <div className="p-6 flex-1 flex flex-col">
                <Badge variant="teal">{p.category}</Badge>
                <Link href={href} className="block">
                    <h3 className="text-[17px] font-semibold leading-[1.35] text-cat-ink mt-3 mb-2 tracking-[0.1px] hover:text-cat-accent-teal transition-colors">
                        {p.title}
                    </h3>
                </Link>
                <p className="text-[14px] text-cat-fg-muted leading-[1.55] mb-4">
                    {p.description}
                </p>
                <div className="mt-auto">
                    <MetaLine time={p.time} tools={toolsLabel} />
                </div>
            </div>
            <div className="flex items-center justify-between px-6 py-3 border-t border-cat-border">
                <Link
                    href={href}
                    className="inline-flex items-center gap-1.5 text-[13px] font-medium text-cat-accent-teal hover:gap-2 transition-all"
                >
                    Use prompt <ArrowRight size={11} />
                </Link>
                <button
                    onClick={copy}
                    className={`inline-flex items-center gap-1.5 min-h-[36px] px-[14px] py-2 rounded-[8px] border text-[13px] font-medium transition-colors ${
                        copied
                            ? "bg-cat-accent-teal text-white border-cat-accent-teal"
                            : "bg-cat-accent-teal-bg text-cat-accent-teal border-cat-border hover:border-cat-accent-teal"
                    }`}
                >
                    {copied ? <Check size={11} /> : <Copy size={11} />}
                    {copied ? "Copied" : "Copy"}
                </button>
            </div>
        </div>
    );
};

export default PromptCardV3;
