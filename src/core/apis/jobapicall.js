import { API } from "../backend";

// get list of jobs available from database
export const getJobListData = (pagenum) => {
    return fetch(`${API}/jd/get?page=${pagenum}&size=10`, { method: "GET" })
        .then((res) => {
            return res.json();
        })
        .catch((err) => console.log(err));
};

export const getAlljdData = (id) => {
    return fetch(`${API}/jd/get/${id}`, { method: "GET" })
        .then((res) => {
            return res.json();
        })
        .catch((err) => console.log(err));
};

// get job dara based on batch
export const getcompanynamedata = (companyname) => {
    return fetch(`${API}/jd/get/companyname?companyname=${companyname}`, {
        method: "GET",
    })
        .then((res) => {
            return res.json();
        })
        .catch((err) => console.log(err));
};

// get job data based on batch
export const getjdBatchData = (year) => {
    return fetch(`${API}/jd/get/batch?year=${year}`, { method: "GET" })
        .then((res) => {
            return res.json();
        })
        .catch((err) => console.log(err));
};

// get job data based on Degree
export const getjdDegreeData = (deg) => {
    return fetch(`${API}/jd/get/degree?degree=${deg}`, { method: "GET" })
        .then((res) => {
            return res.json();
        })
        .catch((err) => console.log(err));
};

// get job data based on Role
export const getjdJobtypeData = (role) => {
    return fetch(`${API}/jd/get/jobtype?jobtype=${role}`, { method: "GET" })
        .then((res) => {
            return res.json();
        })
        .catch((err) => console.log(err));
};

// get type of ad need to show
export const gettypeofad = (role) => {
    return fetch(`${API}/showadpop/get`, { method: "GET" })
        .then((res) => {
            return res.json();
        })
        .catch((err) => console.log(err));
};

export const countClickinJd = (id) => {
    fetch(`${API}/jd/update/count/${id}`, { method: "PATCH" });
};
