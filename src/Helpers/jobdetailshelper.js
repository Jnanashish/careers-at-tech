import { getHelper } from "@/core/apis/request";
import { apiEndPoint } from "@/core/apis/apiEndpoints";

// get job lisiting (accept array of params, page no and size)
export const getJobListing = async (params, page = 1, size = 10) => {
    let api_url = `${apiEndPoint.job_list}?page=${page}&size=${size}`;

    // if param present then create api url with param filter
    !!params && params.forEach((param, index) => {
        const key = Object.keys(param)[0];
        const value = param[key];

        api_url += `&${key}=${value}`;
    });

    const res = await getHelper(api_url);
    return res;
}