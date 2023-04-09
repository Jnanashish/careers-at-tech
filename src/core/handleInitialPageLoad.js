import { v4 as uuidv4 } from "uuid";

export const handleIntialPageLoad = () => {
    const userId = localStorage.getItem("userId");
    alert("USER ID");
    alert(userId);

    if (!userId) {
        localStorage.setItem("userId", uuidv4());
    }
};
