import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Camera, Briefcase, MessageCircle, Send } from "lucide-react";
import logo from "@/static/Image/careersattech-biglogo.svg";

const footerLinks = {
  "For Job Seekers": [
    { label: "Browse All Jobs", href: "/jobs" },
    { label: "Internships", href: "/jobs?jobtype=internship" },
    { label: "Full-time Jobs", href: "/jobs?jobtype=full" },
    { label: "Remote Jobs", href: "/jobs?location=remote" },
    { label: "Resume Toolkit", href: "/toolkit" },
    { label: "Companies", href: "/jobs?query=companies" },
    { label: "Job Alerts", href: "#" },
  ],
  "For Employers": [
    { label: "Post a Job", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "Employer FAQ", href: "#" },
  ],
  Company: [
    { label: "About Us", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Contact", href: "mailto:thecodergeek@gmail.com" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms", href: "/terms-and-conditions" },
    { label: "DMCA", href: "/dmca" },
  ],
};

const socialLinks = [
  { icon: Camera, href: "https://www.instagram.com/careersattech/", label: "Instagram", hoverColor: "hover:text-pink-500" },
  { icon: Briefcase, href: "https://openinapp.co/m04iq", label: "LinkedIn", hoverColor: "hover:text-blue-500" },
  { icon: Send, href: "https://t.openinapp.co/careersattech-3", label: "Telegram", hoverColor: "hover:text-blue-400" },
  { icon: MessageCircle, href: "https://chat.whatsapp.com/EQNivQSL7aQFKUqC3YXpgc", label: "WhatsApp", hoverColor: "hover:text-green-400" },
];

const FooterAccordion = ({ title, links }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden border-b border-gray-700/50 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-3 text-white text-sm font-semibold uppercase tracking-wider"
      >
        {title}
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="flex flex-col gap-2 pb-3">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const FooterNew = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <footer className="bg-footer-bg text-footer-text" role="contentinfo">
      <div className="max-w-content mx-auto px-4 lg:px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Brand column */}
          <div className="md:col-span-4">
            <div className="mb-4">
              <Image
                src={logo}
                alt="CareersAt.Tech logo"
                height={24}
                width={120}
                className="brightness-0 invert"
              />
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Verified tech jobs for freshers. India&apos;s most trusted fresher job board.
            </p>
          </div>

          {/* Link columns - Desktop */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="hidden md:block md:col-span-2 lg:col-span-2">
              <h4 className="text-caption uppercase tracking-widest text-white font-semibold mb-4">
                {title}
              </h4>
              <div className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* Mobile accordions */}
          <div className="md:hidden col-span-1">
            {Object.entries(footerLinks).map(([title, links]) => (
              <FooterAccordion key={title} title={title} links={links} />
            ))}
          </div>
        </div>

        {/* Email signup */}
        <div className="mt-12 max-w-lg">
          <p className="text-sm font-medium text-white mb-3">Get weekly job alerts</p>
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 h-11 px-4 rounded-lg bg-gray-800 border border-gray-700 text-sm text-white placeholder:text-gray-500 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              aria-label="Email for job alerts"
            />
            <button
              type="submit"
              className="bg-primary text-white px-5 h-11 rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-footer-bg"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-10 pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-500 text-center sm:text-left">
              <p>&copy; 2026 CareersAt.Tech</p>
              <p className="mt-1">
                Made with &#10084;&#65039; in India by{" "}
                <a
                  href="https://bit.ly/jsh_linkedin_footer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  @Jnanashish
                </a>
              </p>
            </div>

            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`text-gray-400 ${social.hoverColor} transition-colors`}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterNew;
