import { getHelper } from "@/core/apis/request";
import { apiEndPoint } from "@/core/apis/apiEndpoints";

// get job lisiting (accept array of params, page no and size)
export const getJobListing = async (params, page = 1, size = 10) => {
    let api_url = `${apiEndPoint.job_list}?page=${page}&size=${size}`;

    // if param present then create api url with param filter
    !!params && Array.isArray(params) && params?.length > 0 && params.forEach((param) => {
        const key = Object.keys(param)[0];
        const value = param[key];

        api_url += `&${key}=${value}`;
    });

    const res = await getHelper(api_url);
    return res;
}

export const generateSlugFromrole = (title) => {
    if (!title) return "";
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
};

export const generateRandomImpression = (totalclick) => {
    if (!totalclick) return Math.floor(Math.random() * 50) + 10;
    return totalclick + Math.floor(Math.random() * 10);
};