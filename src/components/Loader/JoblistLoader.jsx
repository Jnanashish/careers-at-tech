import React from "react";
import JobcardLoader from "./JobcardLoader";
function JoblistLoader() {
    return (
        <>
            <br/>
            <br/>
  
            {[...Array(10)].map((_, index) => (
                <JobcardLoader key={index} />
            ))}
        </>
    );
}
export default JoblistLoader;