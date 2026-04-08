"use client";

import { useState, useEffect, useRef } from "react";

const TableOfContents = ({ headings }) => {
  const [activeId, setActiveId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter(Boolean);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) {
          setActiveId(visible.target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 }
    );

    elements.forEach((el) => observerRef.current.observe(el));

    return () => observerRef.current?.disconnect();
  }, [headings]);

  if (!headings?.length) return null;

  return (
    <>
      {/* Mobile: collapsible */}
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="toc-mobile"
          className="flex items-center justify-between w-full rounded-lg border border-grey-border bg-blue-bg px-4 py-3 text-sm font-medium text-grey-text"
        >
          <span>Table of Contents</span>
          <span
            className={`transform transition-transform ${isOpen ? "rotate-180" : ""}`}
            aria-hidden="true"
          >
            &#9660;
          </span>
        </button>
        {isOpen && (
          <nav id="toc-mobile" aria-label="Table of contents" className="mt-2 rounded-lg border border-grey-border bg-white p-4">
            <ul className="space-y-2">
              {headings.map((h) => (
                <li
                  key={h.id}
                  style={{ paddingLeft: `${(h.level - 2) * 12}px` }}
                >
                  <a
                    href={`#${h.id}`}
                    onClick={() => setIsOpen(false)}
                    className={`block text-sm py-0.5 transition-colors ${
                      activeId === h.id
                        ? "text-primary font-medium"
                        : "text-grey-light-text hover:text-primary"
                    }`}
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {/* Desktop: sticky sidebar */}
      <nav
        aria-label="Table of contents"
        className="hidden lg:block sticky top-8"
      >
        <p className="text-sm font-semibold text-[#121212] mb-3">
          On this page
        </p>
        <ul className="space-y-1 border-l-2 border-grey-border">
          {headings.map((h) => (
            <li
              key={h.id}
              style={{ paddingLeft: `${(h.level - 2) * 12 + 12}px` }}
            >
              <a
                href={`#${h.id}`}
                className={`block text-sm py-1 transition-colors border-l-2 -ml-[2px] ${
                  activeId === h.id
                    ? "border-primary text-primary font-medium"
                    : "border-transparent text-grey-light-text hover:text-primary hover:border-grey-border"
                }`}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default TableOfContents;
