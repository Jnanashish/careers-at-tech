import React, { useMemo, useState, useEffect } from "react";
import SectionCard from "./primitives/SectionCard";

const rewriteSections = (html) => {
    if (typeof window === "undefined") return html;
    try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const body = doc.body;
        const sections = [];
        let current = null;

        body.childNodes.forEach((node) => {
            const isH3 = node.nodeName === "H3";
            if (isH3) {
                current = document.createElement("div");
                current.className = "jde-section";
                current.appendChild(node.cloneNode(true));
                sections.push(current);
            } else if (current) {
                current.appendChild(node.cloneNode(true));
            } else {
                // content before first h3
                current = document.createElement("div");
                current.className = "jde-section";
                current.appendChild(node.cloneNode(true));
                sections.push(current);
            }
        });

        return sections.map((s) => s.outerHTML).join("");
    } catch {
        return html;
    }
};

const JDEDescription = ({ job }) => {
    const html = job.jobDescription?.html || "";
    const isExternal = job.displayMode === "external_redirect";

    const [rewritten, setRewritten] = useState(html);
    useEffect(() => {
        setRewritten(rewriteSections(html));
    }, [html]);

    if (!html) {
        if (isExternal) {
            return (
                <SectionCard number="01" title="Description">
                    <div
                        className="rounded-xl border border-dashed border-gray-200 p-5"
                        style={{ background: "#FAFBFC" }}
                    >
                        <p className="text-[14.5px] text-gray-500 leading-relaxed">
                            Full description hosted on {job.companyName}&apos;s careers page.
                            Click <strong className="text-gray-700">Apply</strong> to view and submit.
                        </p>
                    </div>
                </SectionCard>
            );
        }
        return null;
    }

    return (
        <SectionCard number="01" title="Description">
            <div
                className="jde-body"
                dangerouslySetInnerHTML={{ __html: rewritten }}
            />
        </SectionCard>
    );
};

export default JDEDescription;
