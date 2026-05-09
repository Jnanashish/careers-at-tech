import React from "react";
import Link from "next/link";

const SectionCard = ({ number, title, count, actionLabel, actionHref, children }) => (
    <div className="bg-white border border-gray-200 rounded-2xl p-7 mb-4">
        <div className="flex items-baseline justify-between pb-[18px] border-b border-gray-200">
            <div className="flex items-baseline gap-2.5">
                <span
                    aria-hidden="true"
                    className="font-jetbrains text-[12px] font-bold tracking-[0.06em] uppercase"
                    style={{ color: "var(--jde-brand)" }}
                >
                    {number}
                </span>
                <h2 className="font-fraunces text-[28px] font-medium tracking-[-0.02em] text-gray-900">
                    {title}
                </h2>
                {count != null && (
                    <span className="font-jetbrains text-[11px] text-gray-400 ml-1">· {count}</span>
                )}
            </div>
            {actionLabel && actionHref && (
                <Link
                    href={actionHref}
                    className="font-jetbrains text-[11px] font-semibold uppercase tracking-[0.06em] hover:opacity-75 transition-opacity"
                    style={{ color: "var(--jde-brand)" }}
                >
                    {actionLabel}
                </Link>
            )}
        </div>
        <div className="pt-[22px]">{children}</div>
    </div>
);

export default SectionCard;
