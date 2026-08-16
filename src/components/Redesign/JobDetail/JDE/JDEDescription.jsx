import React from "react";
import SectionCard from "./primitives/SectionCard";

// The description HTML is sanitized server-side in pages/jobs/[slug].js
// (getStaticProps) before it ever reaches props, so it is safe to inject here.
// Section dividers/spacing around each <h3> are handled entirely by the
// `.jde-body` rules in globals.css — see the comment there for why this is no
// longer a post-hydration DOM rewrite.
const JDEDescription = ({ job }) => {
    const html = job.jobDescription?.html || "";
    const isExternal = job.displayMode === "external_redirect";

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
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </SectionCard>
    );
};

export default JDEDescription;
