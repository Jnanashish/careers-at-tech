import React from "react";
import Donut from "@/components/ui/Donut";
import { MOCK_PROFILE } from "../data";

const ProfileMatch = () => (
    <div
        style={{
            background: "var(--v3-paper)",
            border: "1px solid var(--v3-line)",
            borderRadius: 16,
            padding: 18,
        }}
    >
        <div className="flex items-center justify-between mb-3.5">
            <span
                className="font-v3-mono"
                style={{
                    fontSize: 11,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--v3-mute)",
                    fontWeight: 500,
                }}
            >
                Your match
            </span>
            <span
                style={{
                    background: "var(--v3-accent-soft)",
                    color: "var(--v3-accent-deep)",
                    borderRadius: 999,
                    padding: "3px 10px",
                    fontSize: 11,
                    fontWeight: 600,
                }}
            >
                3 updated
            </span>
        </div>
        <div className="flex items-center gap-3.5 mb-3.5">
            <Donut value={MOCK_PROFILE.matchPct} size={64} />
            <div>
                <div className="font-v3-serif" style={{ fontSize: 22, lineHeight: 1.1, color: "var(--v3-ink)" }}>
                    {MOCK_PROFILE.name}
                </div>
                <div className="font-v3-mono" style={{ fontSize: 11, color: "var(--v3-mute)", marginTop: 4 }}>
                    {MOCK_PROFILE.subtitle}
                </div>
            </div>
        </div>
        <div
            className="font-v3-sans"
            style={{ fontSize: 12.5, color: "var(--v3-ink-3)", lineHeight: 1.5, marginBottom: 14 }}
        >
            We match each role on your batch, stack, and location.{" "}
            <span style={{ color: "var(--v3-accent)", fontWeight: 600, cursor: "pointer" }}>
                Add {MOCK_PROFILE.skillsToAdd} more skills
            </span>{" "}
            to raise to {MOCK_PROFILE.targetPct}%.
        </div>
        <button
            type="button"
            className="cursor-pointer v3-focus-ring"
            style={{
                width: "100%",
                background: "var(--v3-paper-2)",
                border: "1px solid var(--v3-line)",
                borderRadius: 10,
                padding: "10px 14px",
                fontSize: 13,
                fontWeight: 500,
                color: "var(--v3-ink-2)",
            }}
        >
            Edit profile →
        </button>
    </div>
);

export default ProfileMatch;
