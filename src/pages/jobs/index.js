import React from "react";
import JobList from "@/components/JobList";
import Header from "@/components/common/Header/header";
import { getJobListData } from "@/core/apis/jobapicall";

const Jobs = (props) => {
    const { jobdata } = props;

    return (
        <div>
            <Header />
            <JobList jobdata={jobdata} />
        </div>
    );
};

export const getServerSideProps = async (context) => {
    const apiResponse = await getJobListData(1);
    return {
        props: {
            jobdata: apiResponse.data,
        },
    };
};

export default Jobs;
