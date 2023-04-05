export const handleShareClick = (data) => {
    const { title, jdpage, id, link } = data;
    const titleforShare = title.replace(/[\s;]+/g, "-").toLowerCase();

    if (jdpage === "true") {
        const joblink = `https://careersat.tech/${titleforShare}/${id}`;
        if (navigator.share) {
            navigator.share({
                title: `${title} | ${title}`,
                text: `Hey 👋! \nCheckout this job : ${title} \n\nTo know more visit`,
                url: joblink,
            });
        } else {
            const msg = `Hey 👋! %0ACheckout this job opening.%0A${title} %0A%0ATo know more visit here : %0A${joblink}`;
            window.open(`whatsapp://send?text=${msg}`);
        }
    } else {
        if (navigator.share) {
            navigator.share({
                title: `${title} | ${title}`,
                text: `Hey 👋! %0ACheckout this job : ${title} %0AApply to this job from here ${link}. %0A%0AFor more job opportunity visit %0A`,
                url: "https://careersat.tech/jobs",
            });
        } else {
            const msg = `Hey 👋! %0ACheckout this job opening.%0A${title} %0A%0AApply to this job role from here : %0A${link}%0A%0AFor more job opportunity visit %0A$👉{url}`;
            window.open(`whatsapp://send?text=${msg}`);
        }
    }
};
