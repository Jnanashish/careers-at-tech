import React from "react";
import styles from "./privacy.module.scss";
import Header from "@/components/common/Header/header";
import Footer from "@/components/common/Footer/Footer";
import Meta from "@/core/SEO/Meta";

function Privacy() {
    return (
        <>
            <Meta />
            <Header showBorder={true} />
            <div className={styles.privacyContainer}>
                <h1>Privacy Policy</h1>
                <p>
                    At CareersAt.Tech, accessible from <a href="http://www.careersat.tech">www.careersat.tech</a>, one of our main priorities is the privacy of our visitors. This Privacy Policy
                    document outlines the types of information that is collected and recorded by CareersAt.Tech and how we use it.
                </p>
                <p>
                    If you have additional questions or require more information about our Privacy Policy, please do not hesitate to contact us via email at
                    <a href="mailto:thecodergeek@gmail.com">thecodergeek@gmail.com</a>.
                </p>

                <h2>Log Files</h2>
                <p>
                    CareersAt.Tech follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this as part of hosting services&apos;
                    analytics. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit
                    pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends,
                    administering the site, tracking users&apos; movement on the website, and gathering demographic information.
                </p>

                <h2>Google DoubleClick DART Cookie</h2>
                <p>
                    Google is one of the third-party vendors on our site. It uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to{" "}
                    <a href="http://www.careersat.tech">www.careersat.tech</a> and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google
                    ad and content network Privacy Policy at the following URL –{" "}
                    <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noreferrer">
                        https://policies.google.com/technologies/ads
                    </a>
                    .
                </p>

                <h2>Privacy Policies</h2>
                <p>
                    Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on
                    CareersAt.Tech, which are sent directly to users&apos; browsers. They automatically receive your IP address when this occurs. These technologies are used to measure the
                    effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
                </p>
                <p>Note that CareersAt.Tech has no access to or control over these cookies that are used by third-party advertisers.</p>

                <h2>Third Party Privacy Policies</h2>
                <p>
                    CareersAt.Tech &aposs Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad
                    servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options. You may find a complete list of these Privacy
                    Policies and their links here: Privacy Policy Links.
                </p>
                <p>
                    You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at
                    the browsers&apos; respective websites. What Are Cookies?
                </p>

                <h2>Children &aposs Information</h2>
                <p>
                    Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide
                    their online activity.
                </p>
                <p>
                    CareersAt.Tech does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on
                    our
                </p>
                <p>By using our website, you consent to our Privacy Policy and agree to its Terms and Conditions.</p>
            </div>
            <Footer />
        </>
    );
}

export default Privacy;
