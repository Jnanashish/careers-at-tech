import React from "react";
import Link from "next/link";
import {
    Sprout,
    FilterX,
    Shuffle,
    Target,
    Wand2,
    Search,
    GraduationCap,
    Link2,
    ArrowRight,
} from "lucide-react";
import SectionHead from "./SectionHead";

const ICON_MAP = {
    noexp: Sprout,
    ats: FilterX,
    switch: Shuffle,
    tailor: Target,
    bullets: Wand2,
    critique: Search,
    intern: GraduationCap,
    linkedin: Link2,
};

const CategoryCard = ({ cat }) => {
    const Icon = ICON_MAP[cat.id] || Sprout;
    return (
        <Link
            href="#library"
            className="group flex flex-col bg-white border border-cat-border rounded-[14px] p-[18px] md:p-[22px] no-underline text-inherit transition-all duration-300 hover:border-cat-accent-teal hover:shadow-[var(--cat-shadow-card-hover)] hover:-translate-y-0.5 min-h-[150px] md:min-h-[170px] shadow-[var(--cat-shadow-card)]"
        >
            <div className="w-10 h-10 rounded-[10px] bg-cat-accent-teal-bg text-cat-accent-teal flex items-center justify-center mb-4 transition-colors duration-200 group-hover:bg-cat-accent-teal group-hover:text-white">
                <Icon size={18} strokeWidth={2} />
            </div>
            <div className="text-[15px] font-semibold text-cat-ink leading-[1.3] mb-1.5 tracking-[0.1px]">
                {cat.label}
            </div>
            <div className="text-[12px] text-cat-fg-muted leading-[1.5] mb-[14px] flex-1">
                {cat.hint}
            </div>
            <div className="flex items-center justify-between text-[12px] text-cat-fg-dim font-medium">
                <span>
                    {cat.count} prompt{cat.count === 1 ? "" : "s"}
                </span>
                <ArrowRight
                    size={12}
                    className="text-cat-fg-dim group-hover:text-cat-accent-teal group-hover:translate-x-[3px] transition-all duration-200"
                />
            </div>
        </Link>
    );
};

const CategoryGridV3 = ({ categories }) => (
    <section
        id="situations"
        className="bg-cat-surface-soft border-t border-cat-divider px-4 md:px-8 py-14 md:py-20"
    >
        <div className="max-w-[1100px] mx-auto">
            <SectionHead
                eyebrow="Pick your situation"
                eyebrowColor="teal"
                title="Start from where you are."
                sub="Every fresher's resume is broken in a slightly different way. Find yours, get the prompt that fixes it."
            />
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {categories.map((c) => (
                    <CategoryCard key={c.id} cat={c} />
                ))}
            </div>
        </div>
    </section>
);

export default CategoryGridV3;
