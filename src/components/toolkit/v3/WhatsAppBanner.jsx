import React from "react";
import { MessageCircle, Users, Sparkles, Bell } from "lucide-react";
import { firebaseEventHandler } from "@/core/eventHandler";

const WHATSAPP_URL =
    "https://whatsapp.com/channel/0029VaUJgMW2kNFx7ABlpx2y";

const WhatsAppBanner = () => {
    const handleClick = () => {
        firebaseEventHandler("whatsapp_cta_clicked", {
            source: "toolkit_v3_banner",
        });
    };

    return (
        <section className="bg-white px-4 md:px-8 pt-10 pb-16 md:pt-16 md:pb-24">
            <div className="max-w-[1100px] mx-auto">
                <div
                    className="border border-cat-green-border rounded-[18px] p-6 sm:p-8 md:px-12 md:py-11 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-10"
                    style={{
                        background:
                            "linear-gradient(135deg, var(--cat-green-bg) 0%, #fff 60%)",
                    }}
                >
                    <div className="flex-1">
                        <div className="inline-flex items-center gap-2 px-3 py-[5px] rounded-full bg-white border border-cat-green-border text-[12px] text-cat-green-ink font-medium mb-4">
                            <span className="w-1.5 h-1.5 rounded-full bg-cat-success" />
                            40,000+ freshers · active daily
                        </div>
                        <h3 className="text-[26px] md:text-[32px] font-semibold text-cat-ink m-0 mb-2.5 leading-[1.2] tracking-[-0.2px]">
                            The job hunt is less brutal with company.
                        </h3>
                        <p className="text-[15px] text-cat-fg-muted m-0 mb-6 leading-[1.6] max-w-[540px]">
                            Daily verified job drops. New prompts the day
                            they&apos;re written. Referral threads, mock-interview
                            swaps. Mute or leave anytime.
                        </p>
                        <a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleClick}
                            className="inline-flex items-center gap-2.5 px-[22px] py-3 bg-cat-success text-white rounded-[8px] no-underline text-[15px] font-semibold tracking-[0.14px] shadow-[0_2px_8px_rgba(37,211,102,0.25)] hover:opacity-90 transition-opacity"
                        >
                            <MessageCircle size={18} />
                            Join the WhatsApp channel
                        </a>
                    </div>
                    <div className="hidden md:flex w-[260px] flex-shrink-0 flex-col gap-2.5">
                        {[
                            { icon: Bell, text: "Verified job alerts daily" },
                            { icon: Sparkles, text: "New prompts before they go live" },
                            { icon: Users, text: "Referral threads + mock-swap" },
                        ].map((it) => (
                            <div
                                key={it.text}
                                className="flex items-center gap-3 px-4 py-3 bg-white border border-cat-green-border rounded-[10px]"
                            >
                                <it.icon
                                    size={16}
                                    className="text-cat-green-ink flex-shrink-0"
                                />
                                <span className="text-[13px] font-medium text-cat-ink">
                                    {it.text}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhatsAppBanner;
