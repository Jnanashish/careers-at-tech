import React from "react";

const RowStat = ({ label, value, valueStyle, last }) => (
    <div
        className={`flex items-center justify-between py-2 ${!last ? "border-b border-gray-100" : ""}`}
    >
        <span className="text-[13px] text-gray-500">{label}</span>
        <span className="text-[13px] font-semibold text-gray-800" style={valueStyle}>
            {value}
        </span>
    </div>
);

const ActivityCard = ({ job, expired, applicants }) => {
    const statusColor = expired ? "#B54708" : "#027A48";
    const statusText = expired ? "Closed" : "Accepting";

    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <p className="font-jetbrains text-[10.5px] font-bold uppercase tracking-[0.08em] text-gray-400 mb-3">
                § Activity
            </p>
            <RowStat label="Applicants" value={applicants?.toLocaleString() ?? "—"} />
            <RowStat label="Avg response" value="4 days" />
            <RowStat label="Posted" value={job.postedAgo} />
            <RowStat
                label="Status"
                value={statusText}
                valueStyle={{ color: statusColor }}
                last
            />
        </div>
    );
};

export default ActivityCard;
