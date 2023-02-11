import { API } from "../backend";

// handle get request
export const handleRequestGET = (url) => {
    return fetch(`${API}${url}`, { method: "GET" })
        .then((res) => {
            return res.json();
        })
        .catch((err) => console.log(err));
};

// handle Patch Request
export const handleRequestPATCH = (url) => {
    fetch(`${API}${url}`, { method: "PATCH" });
};
