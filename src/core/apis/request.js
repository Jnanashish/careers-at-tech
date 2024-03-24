const API = process.env.NEXT_PUBLIC_BACKEND_URL;

// axios post call
export const postHelper = async (url, formData) => {
    const res = await fetch(`${API}${url}`, {
        method: "POST",
        body: formData,
    });
    if (res.status === 201 || res.status === 200) {
        return await res.json();
    } else {
        return null;
    }
};

// axios get call
export const getHelper = async (url) => {
    const res = await fetch(`${API}${url}`, {
        method: "GET",
    });

    if (res.status === 201 || res.status === 200) {
        return await res.json();
    }
    return null;
};

// axios delete call
export const deleteHelper = async (url) => {
    const res = await fetch(`${API}${url}`, {
        method: "DELETE",
    });

    if (res.status === 201 || res.status === 200) {
        return await res.json();
    }
    return null;
};

// axios update call
export const updateHelper = async (url, formData) => {
    const res = await fetch(`${API}${url}`, {
        method: "PUT",
        body: formData,
    });

    if (res.status === 201 || res.status === 200) {
        return await res.json();
    }
    return null;
};
