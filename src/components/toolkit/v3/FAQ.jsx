import React, { useState } from "react";
import SectionHead from "./SectionHead";

const FAQ = ({ items }) => {
    const [open, setOpen] = useState(0);

    return (
        <section className="bg-cat-surface-soft px-4 md:px-8 py-16 md:py-24">
            <div className="max-w-[780px] mx-auto">
                <SectionHead
                    eyebrow="Asked a lot"
                    eyebrowColor="teal"
                    title="The honest questions, answered."
                />
                <div className="mt-9 border-t border-cat-border">
                    {items.map((f, i) => {
                        const isOpen = open === i;
                        return (
                            <div
                                key={i}
                                className="border-b border-cat-border"
                            >
                                <h3>
                                    <button
                                        onClick={() => setOpen(isOpen ? -1 : i)}
                                        aria-expanded={isOpen}
                                        className="w-full flex items-start justify-between gap-4 py-5 bg-transparent border-0 cursor-pointer text-left font-[inherit] min-h-[44px]"
                                    >
                                        <span className="text-[15px] md:text-[16px] font-medium text-cat-ink leading-[1.4] tracking-[0.1px]">
                                            {f.q}
                                        </span>
                                        <span
                                            className={`flex-shrink-0 text-[18px] text-cat-accent-teal font-normal w-6 h-6 inline-flex items-center justify-center transition-transform duration-200 ease-out ${
                                                isOpen ? "rotate-45" : ""
                                            }`}
                                        >
                                            +
                                        </span>
                                    </button>
                                </h3>
                                <div
                                    className={`overflow-hidden transition-[max-height,padding] duration-300 ease-out ${
                                        isOpen ? "max-h-[400px] pb-5" : "max-h-0 pb-0"
                                    }`}
                                >
                                    <p className="text-[15px] text-cat-fg-muted leading-[1.6] m-0 pr-10">
                                        {f.a}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
