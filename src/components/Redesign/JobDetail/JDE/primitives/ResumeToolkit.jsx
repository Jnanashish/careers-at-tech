import React from "react";
import Link from "next/link";

const ResumeToolkit = ({ jobTitle }) => (
    <div
        className="rounded-2xl p-[22px] border"
        style={{
            background: "#FAF8F4",
            borderColor: "var(--jde-brand-soft-b)",
        }}
    >
        <p className="font-jetbrains text-[10.5px] font-bold uppercase tracking-[0.08em] mb-2"
            style={{ color: "var(--jde-brand-ink)" }}>
            ✦ Resume toolkit
        </p>
        <h3 className="font-fraunces text-[22px] font-medium leading-snug mb-2 text-gray-900">
            Tailor your resume to <em style={{ color: "var(--jde-brand)", fontStyle: "italic" }}>this</em> JD.
        </h3>
        <p className="text-[12.5px] text-gray-500 mb-4 leading-relaxed">
            Get AI-powered prompts to highlight the skills and experience this role asks for.
        </p>
        <Link
            href="/tools/resume-toolkit"
            className="flex items-center justify-center w-full rounded-xl px-4 py-3 text-[13.5px] font-semibold text-white transition-opacity hover:opacity-90"
            style={{
                background: "var(--jde-brand)",
                boxShadow: "inset 0 0 0 1px var(--jde-brand-ink)",
            }}
        >
            Open tailor →
        </Link>
    </div>
);

export default ResumeToolkit;
