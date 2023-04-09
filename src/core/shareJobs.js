import { firenbaseEventHandler } from "./eventHandler";
export const handleShareClick = (data) => {
    const { title, jdpage, id, link } = data;
    const titleforShare = title.replace(/[\s;]+/g, "-").toLowerCase();
    firenbaseEventHandler("jobCardShareClicked", {
        jobId: id,
        jobTitle: title,
    });

    if (jdpage === "true") {
        const joblink = `https://careersat.tech/${titleforShare}/${id}`;
        if (navigator.share) {
            navigator.share({
                title: `${title} | ${title}`,
                text: `Hey 👋! \nCheckout this job : ${title} \n\nTo know more visit`,
                url: joblink,
            });
        } else {
            const msg = `Hey 👋! \nCheckout this job opening.${title} \n\nTo know more visit here : ${joblink}`;
            window.open(`whatsapp://send?text=${msg}`);
        }
    } else {
        if (navigator.share) {
            navigator.share({
                title: `${title} | ${title}`,
                text: `Hey 👋! \nCheckout this job : ${title} \n\nApply to this job from here ${link}. \n\nFor more job opportunity visit \n`,
                url: "https://careersat.tech/jobs",
            });
        } else {
            const msg = `Hey 👋! \nCheckout this job opening.${title} \n\nApply to this job role from here : \n${link}\n\nFor more job opportunity visit \n$👉{url}`;
            window.open(`whatsapp://send?text=${msg}`);
        }
    }
};
