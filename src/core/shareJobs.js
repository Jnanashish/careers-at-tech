import { firebaseEventHandler } from "./eventHandler";

// handle share action of any job
export const handleShareClick = (data) => {
    const { title, jdpage, id, link } = data;
    const titleforShare = title.replace(/[\s;]+/g, "-").toLowerCase();

    firebaseEventHandler("share_job_clicked", {
        job_id: id,
        job_title: title,
        source: "Job card",
    });

    if (jdpage === "true") {
        const joblink = `${process.env.NEXT_PUBLIC_SITE_URL}/${titleforShare}/${id}`;
        if (navigator.share) {
            navigator.share({
                title: `${title} | ${title}`,
                text: `Hey 👋! \nCheckout this job : ${title} \n\nTo know more visit`,
                url: joblink,
            });
        } else {
            const msg = `Hey 👋, Checkout this job opening.${title} \n\nTo know more visit here : ${joblink}`;
            window.open(`whatsapp://send?text=${msg}`);
        }
    } else {
        if (navigator.share) {
            navigator.share({
                title: `${title} | ${title}`,
                text: `Hey 👋, Checkout this job : ${title} \n\nApply to this job from here ${link}. \n\nFor more job opportunity visit \n`,
                url: `${process.env.NEXT_PUBLIC_SITE_URL}/jobs`,
            });
        } else {
            const msg = `Hey 👋, Checkout this job opening.${title} \n\nApply to this job role from here : \n${link}\n\nFor more job opportunity visit \n$👉{url}`;
            window.open(`whatsapp://send?text=${msg}`);
        }
    }
};
