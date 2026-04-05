import React, { useState } from "react";
import { MessageCircle, X, CheckCircle, Shield, Calendar, Ban } from "lucide-react";
import { firebaseEventHandler } from "@/core/eventHandler";

const WhatsAppCTA = () => {
  const handleClick = () => {
    firebaseEventHandler("whatsapp_cta_clicked", { source: "sidebar" });
    window.open("https://chat.whatsapp.com/EQNivQSL7aQFKUqC3YXpgc", "_blank");
  };

  return (
    <div className="bg-white rounded-card p-6 shadow-card border border-border">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
          <MessageCircle size={20} className="text-whatsapp" />
        </div>
        <div>
          <p className="text-sm font-semibold text-text-primary">Get jobs on WhatsApp</p>
        </div>
      </div>
      <p className="text-sm text-text-secondary mb-4 leading-relaxed">
        Daily verified job alerts. 25,000+ freshers already in.
      </p>
      <button
        onClick={handleClick}
        className="w-full bg-whatsapp text-white py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-whatsapp focus:ring-offset-2"
      >
        Join WhatsApp Channel
      </button>
    </div>
  );
};

const TrustCard = () => {
  const items = [
    { icon: CheckCircle, label: "Verified listings", color: "text-secondary" },
    { icon: Shield, label: "Always free", color: "text-primary" },
    { icon: Calendar, label: "Updated daily", color: "text-amber-500" },
    { icon: Ban, label: "No spam, no scams", color: "text-red-500" },
  ];

  return (
    <div className="bg-white rounded-card p-6 shadow-card border border-border">
      <p className="text-sm font-semibold text-text-primary mb-4">Why CareersAt.Tech</p>
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <item.icon size={18} className={item.color} />
            <span className="text-sm text-text-secondary">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const TopCompanies = () => {
  const companies = ["Google", "Microsoft", "Stripe", "Amazon", "Visa", "Tesla"];

  return (
    <div className="bg-white rounded-card p-6 shadow-card border border-border">
      <p className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
        <span className="text-orange-500">&#128293;</span> Top Companies Hiring
      </p>
      <div className="grid grid-cols-3 gap-3">
        {companies.map((company) => (
          <div
            key={company}
            className="flex items-center justify-center h-10 rounded-lg bg-gray-50 border border-border text-xs font-medium text-text-secondary hover:border-primary hover:text-primary transition-colors cursor-pointer"
          >
            {company}
          </div>
        ))}
      </div>
      <button className="mt-4 text-sm text-primary hover:text-primary-hover font-medium transition-colors">
        View all companies &rarr;
      </button>
    </div>
  );
};

const MobileWhatsAppBanner = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const handleClick = () => {
    firebaseEventHandler("whatsapp_cta_clicked", { source: "mobile_banner" });
    window.open("https://chat.whatsapp.com/EQNivQSL7aQFKUqC3YXpgc", "_blank");
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-whatsapp text-white p-3 flex items-center justify-between shadow-lg">
      <button
        onClick={handleClick}
        className="flex items-center gap-2 flex-1"
      >
        <MessageCircle size={20} />
        <span className="text-sm font-medium">Get daily job alerts on WhatsApp</span>
      </button>
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss WhatsApp banner"
        className="p-1 ml-2 flex-shrink-0"
      >
        <X size={18} />
      </button>
    </div>
  );
};

const SidebarNew = () => {
  return (
    <aside className="hidden lg:flex flex-col gap-4 sticky top-36">
      <WhatsAppCTA />
      <TrustCard />
      <TopCompanies />
    </aside>
  );
};

export { MobileWhatsAppBanner, WhatsAppCTA };
export default SidebarNew;
