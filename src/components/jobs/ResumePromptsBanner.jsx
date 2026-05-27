import React from "react";
import Link from "next/link";
import { Wand2, ArrowRight } from "lucide-react";

const ResumePromptsBanner = () => (
    <Link
        href="/resume-prompts"
        className="group block w-full no-underline mb-4"
        style={{
            background: "var(--v3-paper-2)",
            border: "1px solid var(--v3-line)",
            borderRadius: 14,
            padding: "16px 20px",
            color: "var(--v3-ink)",
            transition: "border-color .2s, background .2s",
        }}
    >
        <div className="flex items-center gap-3 md:gap-4">
            <span
                className="grid place-items-center flex-shrink-0"
                style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: "var(--v3-ink)",
                    color: "var(--v3-acid)",
                }}
            >
                <Wand2 size={18} />
            </span>
            <div className="flex-1 min-w-0">
                <div
                    className="font-v3-sans"
                    style={{
                        fontSize: 14.5,
                        fontWeight: 600,
                        color: "var(--v3-ink)",
                        lineHeight: 1.35,
                    }}
                >
                    Tailor your resume to any job here in 5 minutes — free.
                </div>
                <div
                    className="font-v3-sans hidden sm:block"
                    style={{
                        fontSize: 12.5,
                        color: "var(--v3-mute)",
                        marginTop: 3,
                        lineHeight: 1.4,
                    }}
                >
                    19 AI prompts for Indian freshers · ChatGPT, Claude, Gemini · no signup
                </div>
            </div>
            <span
                className="font-v3-sans flex-shrink-0 inline-flex items-center gap-1.5 group-hover:gap-2 transition-all"
                style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: "var(--v3-accent)",
                }}
            >
                Open <ArrowRight size={13} />
            </span>
        </div>
    </Link>
);

export default ResumePromptsBanner;
