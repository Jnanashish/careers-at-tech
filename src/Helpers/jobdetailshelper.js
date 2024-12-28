import { getHelper } from "@/core/apis/request";
import { apiEndPoint } from "@/core/apis/apiEndpoints";

// get job lisiting (accept array of params, page no and size)
export const getJobListing = async (params, page = 1, size = 10) => {
    let api_url = `${apiEndPoint.job_list}?page=${page}&size=${size}`;

    // if param present then create api url with param filter
    !!params &&
        Array.isArray(params) &&
        params?.length > 0 &&
        params.forEach((param) => {
            const key = Object.keys(param)[0];
            const value = param[key];

            api_url += `&${key}=${value}`;
        });

    const res = await getHelper(api_url);
    return res;
};

// generte slug from job title
export const generateSlugFromrole = (role) => {
    if (!!role) {
        return role
            .toString() // Convert to string
            .toLowerCase() // Convert to lowercase
            .trim() // Remove whitespace from both ends
            .replace(/\s+/g, "-") // Replace spaces with hyphens
            .replace(/[^\w\-]+/g, "") // Remove all non-word characters
            .replace(/\-\-+/g, "-"); // Replace multiple hyphens with a single hyphen
    }
    return role;
};

// generate random impression based on total click
// TODO: need to improve the logic (need to increase impression based on time)
export const generateRandomImpression = (totalClick) => {
    const impression = totalClick * 6;
    return impression + (totalClick === 0 ? Math.floor(Math.random() * (500 - 300 + 1)) + 300 : 300);
}
