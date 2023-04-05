import { getAnalytics, logEvent, setUserId } from "firebase/analytics";
import app from "../core/firebaseConfig";
let analytics;
if (typeof window !== "undefined") {
    const userId = localStorage.getItem("userId");

    analytics = getAnalytics(app);
    setUserId(analytics, userId);
}

export const firenbaseEventHandler = (eventName, eventAttributes) => {
    logEvent(analytics, eventName, eventAttributes);
};
