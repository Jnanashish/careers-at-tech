import { getAnalytics, logEvent, setUserProperties } from "firebase/analytics";

const firenbaseEventHandler = (eventName, eventAttributes) => {
    const analytics = getAnalytics();
    logEvent(eventName, eventAttributes);
};
