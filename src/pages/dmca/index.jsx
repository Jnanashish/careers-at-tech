import React from "react";
import styles from "../privacy-policy/privacy.module.scss";
import Header from "@/components/common/Header/header";
import Footer from "@/components/common/Footer/Footer";
import Meta from "../../core/SEO/Meta";


function Dmca() {
    return (
        <>
            <Meta/>
            <Header showBorder={true} />

            <div className={styles.privacyContainer}>
                <h1>Disclaimer for CareersAt.Tech</h1>

                <p>
                    If you require any more information or have any questions about our site&apos;s disclaimer, please feel free to contact us by email at thecodergeek@gmail.com.
                </p>

                <h2>Disclaimers for CareersAt.Tech</h2>

                <p>
                    All the information on this website - https://careersat.tech/ - is published in good faith and for general information purpose only. CareersAt.Tech does not make any warranties
                    about the completeness, reliability and accuracy of this information. Any action you take upon the information you find on this website (CareersAt.Tech), is strictly at your own
                    risk. CareersAt.Tech will not be liable for any losses and/or damages in connection with the use of our website.
                </p><br/>

                <p>
                    From our website, you can visit other websites by following hyperlinks to such external sites. While we strive to provide only quality links to useful and ethical websites, we have
                    no control over the content and nature of these sites. These links to other websites do not imply a recommendation for all the content found on these sites. Site owners and content
                    may change without notice and may occur before we have the opportunity to remove a link which may have gone bad.
                </p><br/>

                <p>
                    Please be also aware that when you leave our website, other sites may have different privacy policies and terms which are beyond our control. Please be sure to check the Privacy
                    Policies of these sites as well as their Terms of Service before engaging in any business or uploading any information.
                </p>

                <h2>External Links Disclaimer</h2>
                <p>Our website may contain links to third-party websites for additional resources or advertisements. While we aim to link only to ethical and high-quality sources, we do not control their content or policies.</p>
                <p>
                    <ul>
                        <li>We do not endorse any third-party website linked from CareersAt.Tech.</li>
                        <li>Content on external websites may change without notice, and we do not assume responsibility for outdated or incorrect information.</li>
                        <li>When you leave our site, different privacy policies and terms apply. We strongly advise reviewing those policies before engaging with third-party websites.</li>
                    </ul>
                </p><br/>

                <h2>Consent</h2>

                <p>By using our website, you hereby consent to our disclaimer and agree to its terms.</p>

                <h2>Update</h2>

                <p>We may update or amend this disclaimer as needed. Any changes will be prominently posted on this page.</p>
            </div>
            <Footer />
        </>
    );
}

export default Dmca;
