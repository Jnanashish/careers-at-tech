import { v4 as uuidv4 } from "uuid";

export const handleIntialPageLoad = () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
        localStorage.setItem("userId", uuidv4());
    }
};
