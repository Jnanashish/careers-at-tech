import { getHelper } from "@/core/apis/request";
import { apiEndPoint } from "@/core/apis/apiEndpoints";

export const getJobListing = async (params) => {
    console.log("PARAMS", params);
    const res = await getHelper(apiEndPoint.job_list);
    console.log("RES==>", res)
}