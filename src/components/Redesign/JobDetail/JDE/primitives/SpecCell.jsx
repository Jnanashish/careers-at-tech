import React from "react";

const SpecCell = ({ label, value, delta, deltaColor = "#667085", first = false, valueStyle }) => (
    <div className={`px-6 py-5 ${!first ? "border-l border-gray-200" : ""}`}>
        <p className="font-jetbrains text-[10.5px] uppercase tracking-[0.08em] text-gray-400 mb-1.5">
            {label}
        </p>
        <p
            className="font-fraunces text-[22px] font-medium leading-tight text-gray-900"
            style={valueStyle}
        >
            {value}
        </p>
        {delta && (
            <p
                className="font-jetbrains text-[11.5px] font-semibold mt-1"
                style={{ color: deltaColor }}
            >
                {delta}
            </p>
        )}
    </div>
);

export default SpecCell;
