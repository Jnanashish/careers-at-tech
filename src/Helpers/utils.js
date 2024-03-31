
// detect if current device is mobile ot not
export const isMobile = () => {
    const userAgent = typeof window !== "undefined" && typeof window.navigator !== "undefined" ? navigator.userAgent : "";
    const mobile = Boolean(userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i));
    return mobile;
};