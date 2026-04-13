"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faCheck } from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faLinkedinIn,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

const ShareButtons = ({ url, title }) => {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      try {
        const input = document.createElement("input");
        input.value = url;
        document.body.appendChild(input);
        input.select();
        const success = document.execCommand("copy");
        document.body.removeChild(input);
        if (success) {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
      } catch {
        // Copy failed silently
      }
    }
  };

  const buttons = [
    {
      label: "Share on Twitter",
      icon: faTwitter,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      className: "hover:text-[#1DA1F2]",
    },
    {
      label: "Share on LinkedIn",
      icon: faLinkedinIn,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      className: "hover:text-[#0A66C2]",
    },
    {
      label: "Share on WhatsApp",
      icon: faWhatsapp,
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      className: "hover:text-[#25D366]",
    },
  ];

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-[#697586]">Share:</span>
      {buttons.map((btn) => (
        <a
          key={btn.label}
          href={btn.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={btn.label}
          className={`h-9 w-9 rounded-full border border-grey-border flex items-center justify-center text-[#697586] transition-colors ${btn.className}`}
        >
          <FontAwesomeIcon icon={btn.icon} className="h-4 w-4" />
        </a>
      ))}
      <button
        onClick={handleCopy}
        aria-label={copied ? "Link copied" : "Copy link"}
        className="h-9 w-9 rounded-full border border-grey-border flex items-center justify-center text-[#697586] hover:text-primary transition-colors"
      >
        <FontAwesomeIcon
          icon={copied ? faCheck : faLink}
          className="h-4 w-4"
        />
      </button>
    </div>
  );
};

export default ShareButtons;
