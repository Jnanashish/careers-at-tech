import React from "react";

const MiniStat = ({ label, value, delta }) => (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-3.5">
        <p className="font-jetbrains text-[10.5px] uppercase tracking-[0.08em] text-gray-400 mb-1">
            {label}
        </p>
        <p className="font-fraunces text-2xl font-medium text-gray-900 leading-tight">
            {value}
        </p>
        {delta && (
            <p className="font-jetbrains text-[11px] font-semibold mt-1 text-[#027A48]">
                {delta}
            </p>
        )}
    </div>
);

export default MiniStat;
