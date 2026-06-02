import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { FLAGS } from "@/Helpers/featureFlags";

const companyLinks = [
  { label: "Contact us", href: "/contact" },
  { label: "Resume Prompts", href: "/resume-prompts" },
  { label: "Privacy policy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms-and-conditions" },
  { label: "DMCA", href: "/dmca" },
];

const footerColumns = [
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

// Brand glyphs (Simple Icons paths). Inline SVG — zero bundle cost, matches DESIGN_SYSTEM §10.5.
const SOCIAL_PATHS = {
  Instagram:
    "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  LinkedIn:
    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z",
  Telegram:
    "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z",
  WhatsApp:
    "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.359.101 11.943c0 2.096.548 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.582 0 11.941-5.359 11.944-11.945a11.864 11.864 0 0 0-3.48-8.4",
};

const SocialGlyph = ({ name, className }) => {
  const d = SOCIAL_PATHS[name];
  if (!d) return null;
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" className={className}>
      <path d={d} />
    </svg>
  );
};

const socialLinks = [
  { href: "https://www.instagram.com/careersattech/", label: "Instagram", hoverColor: "hover:text-pink-500" },
  { href: "https://openinapp.co/m04iq", label: "LinkedIn", hoverColor: "hover:text-blue-500" },
  { href: "https://t.openinapp.co/careersattech-3", label: "Telegram", hoverColor: "hover:text-blue-400" },
  { href: "https://whatsapp.com/channel/0029VaUJgMW2kNFx7ABlpx2y", label: "WhatsApp", hoverColor: "hover:text-green-400" },
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
  return (
    <footer className="bg-footer-bg text-footer-text" role="contentinfo">
      <div className="max-w-content mx-auto px-4 lg:px-6 pt-16 pb-12">
        {/* Brand + company links row */}
        <div className="flex flex-col sm:flex-row gap-8 mb-10">
          <div className="sm:w-48 shrink-0">
            <h4 className="text-caption uppercase tracking-widest text-white font-semibold mb-3">
              Careers at tech
            </h4>
            <div className="flex flex-col gap-2">
              {companyLinks
                .filter((link) => link.label !== "Resume Prompts" || FLAGS.FOOTER_RESUME_TOOLKIT)
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
          <div className="hidden md:flex gap-8 ml-auto">
            {footerColumns.map(({ title, links }) => (
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
            {footerColumns.map(({ title, links }) => (
              <FooterAccordion key={title} title={title} links={links} />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-10 pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-500 text-center sm:text-left">
              <p>&copy; 2026 CareersAt.Tech</p>
            </div>

            {FLAGS.FOOTER_SOCIAL_ICONS && (
              <div className="flex items-center gap-1 sm:-mr-2.5">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    title={social.label}
                    className={`flex items-center justify-center h-11 w-11 rounded-full text-gray-400 ${social.hoverColor} hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-footer-bg motion-reduce:transition-none`}
                  >
                    <SocialGlyph name={social.label} className="w-5 h-5" />
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
