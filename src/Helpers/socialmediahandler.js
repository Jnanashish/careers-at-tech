import { firenbaseEventHandler } from "@/core/eventHandler";


// share current job detail page on whatsapp
const shareonWhatsApp = (companyName) => {
    const currentPageUrl = document.location.href;
    const msg = `Hey 👋! %0ACheckout this job opening at ${companyName}. %0A%0ATo know more visit here : %0A${currentPageUrl}`;

    window.open(`whatsapp://send?text=${msg}`);
};


export const shareJobDetails = (data) => {
    firenbaseEventHandler("share_job_clicked", {
        job_id: data._id,
        job_title: data.title,
        source: "Jd page",
    });

    const currentPageUrl = document.location.href; 

    // if share is available in navigator
    if (navigator.share) {
        navigator.share({
            title: `${data.title} | ${data.title}`,
            text: `Hey 👋! \nCheckout this job : ${data.title} \n\nTo know more visit`,
            url: currentPageUrl,
        });
    } else {
        // if naviagator is not available share on whatsapp
        shareonWhatsApp(data.companyName);
    }
};
