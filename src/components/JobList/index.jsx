import React from "react";

// import components
import Linkmid from "./Linkmid";

const JobList = (jobdata) => {
    return (
        <div>
            {jobdata &&
                jobdata.jobdata.map((data) => {
                    return (
                        <div key={data.id}>
                            <Linkmid data={data} />
                        </div>
                    );
                })}
        </div>
    );
};

export default JobList;
