import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Camera, Briefcase, MessageCircle, Send } from "lucide-react";
import logo from "@/static/Image/careersattech-biglogo.svg";
import { FLAGS } from "@/Helpers/featureFlags";

const companyLinks = [
  { label: "Contact us", href: "/contact" },
  { label: "Resume Toolkit", href: "/toolkit" },
  { label: "Privacy policy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms-and-conditions" },
  { label: "DMCA", href: "/dmca" },
];

const footerColumns = [
  {
    title: "Jobs by types",
    links: [
      { label: "Full time jobs", href: "/jobs?type=Full-time" },
      { label: "Internships", href: "/jobs?type=Internship" },
    ],
  },
  {
    title: "Jobs by category",
    links: [
      { label: "Jobs in Frontend development", href: "/jobs?q=frontend" },
      { label: "Jobs in Backend development", href: "/jobs?q=backend" },
      { label: "Jobs in App development", href: "/jobs?q=app" },
      { label: "Jobs in Data analytics", href: "/jobs?q=data+analytics" },
      { label: "Jobs in Fullstack development", href: "/jobs?q=fullstack" },
      { label: "Jobs in Web development", href: "/jobs?q=web" },
      { label: "Jobs in Quality analyst (QA)", href: "/jobs?q=qa" },
    ],
  },
  {
    title: "Jobs by location",
    links: [
      { label: "Remote Jobs", href: "/jobs?loc=Remote" },
      { label: "Hybrid Jobs", href: "/jobs?q=hybrid" },
      { label: "Jobs in Bengaluru", href: "/jobs?loc=Bengaluru" },
      { label: "Jobs in Noida", href: "/jobs?q=noida" },
      { label: "Jobs in Gurgaon", href: "/jobs?q=gurgaon" },
      { label: "Jobs in Delhi", href: "/jobs?loc=Delhi+NCR" },
      { label: "Jobs in Pune", href: "/jobs?loc=Pune" },
      { label: "Jobs in Mumbai", href: "/jobs?loc=Mumbai" },
      { label: "Jobs in Hyderabad", href: "/jobs?loc=Hyderabad" },
    ],
  },
  {
    title: "Jobs by batch",
    links: [
      { label: "Jobs for 2020 batch", href: "/jobs?batch=2020" },
      { label: "Jobs for 2021 batch", href: "/jobs?batch=2021" },
      { label: "Jobs for 2022 batch", href: "/jobs?batch=2022" },
      { label: "Jobs for 2023 batch", href: "/jobs?batch=2023" },
      { label: "Jobs for 2024 batch", href: "/jobs?batch=2024" },
      { label: "Jobs for 2025 batch", href: "/jobs?batch=2025" },
    ],
  },
];

const socialLinks = [
  { icon: Camera, href: "https://www.instagram.com/careersattech/", label: "Instagram", hoverColor: "hover:text-pink-500" },
  { icon: Briefcase, href: "https://openinapp.co/m04iq", label: "LinkedIn", hoverColor: "hover:text-blue-500" },
  { icon: Send, href: "https://t.openinapp.co/careersattech-3", label: "Telegram", hoverColor: "hover:text-blue-400" },
  { icon: MessageCircle, href: "https://chat.whatsapp.com/EQNivQSL7aQFKUqC3YXpgc", label: "WhatsApp", hoverColor: "hover:text-green-400" },
];

const FooterAccordion = ({ title, links }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-700/50 last:border-0">
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
        {/* Brand + company links row */}
        <div className="flex flex-col sm:flex-row gap-8 mb-10">
          <div className="sm:w-48 shrink-0">
            {FLAGS.FOOTER_LOGO && (
              <div className="mb-4">
                <Image
                  src={logo}
                  alt="CareersAt.Tech logo"
                  height={24}
                  width={120}
                  className="brightness-0 invert"
                />
              </div>
            )}
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Verified tech jobs for freshers. India&apos;s most trusted fresher job board.
            </p>
            <h4 className="text-caption uppercase tracking-widest text-white font-semibold mb-3">
              Careers at tech
            </h4>
            <div className="flex flex-col gap-2">
              {companyLinks
                .filter((link) => link.label !== "Resume Toolkit" || FLAGS.FOOTER_RESUME_TOOLKIT)
                .map((link) => (
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

          {/* Desktop link columns */}
          <div className="hidden md:grid grid-cols-4 gap-8 flex-1">
            {footerColumns.filter(({ title }) => title !== "Jobs by types" || FLAGS.FOOTER_JOBS_BY_TYPE).map(({ title, links }) => (
              <div key={title}>
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
          </div>

          {/* Mobile accordions */}
          <div className="md:hidden flex-1">
            {footerColumns.filter(({ title }) => title !== "Jobs by types" || FLAGS.FOOTER_JOBS_BY_TYPE).map(({ title, links }) => (
              <FooterAccordion key={title} title={title} links={links} />
            ))}
          </div>
        </div>

        {/* Email signup */}
        {FLAGS.FOOTER_EMAIL_ALERT && (
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
        )}

        {/* Divider */}
        <div className="border-t border-gray-700 mt-10 pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-500 text-center sm:text-left">
              <p>&copy; 2026 CareersAt.Tech</p>
              {FLAGS.FOOTER_MADE_WITH && (
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
              )}
            </div>

            {FLAGS.FOOTER_SOCIAL_ICONS && (
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
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterNew;
