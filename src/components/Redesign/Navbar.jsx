import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Menu, X } from "lucide-react";

import Wordmark from "@/components/ui/Wordmark";

const NAV_LINKS = [
  { label: "Find Jobs", href: "/jobs" },
  { label: "Resume Prompts", href: "/resume-prompts" },
  { label: "Tools", href: "/tools" },
];

/**
 * Site-wide header. Wordmark left, nav right.
 *
 * `sticky` (default) pins the bar and shrinks it 64px→56px past 10px of scroll.
 * Pass `sticky={false}` on pages that own their own scroll furniture — /jobs
 * pins its FilterBar at the top instead, and two stacked sticky bars eat a
 * third of a phone viewport.
 *
 * `transparent` drops the white fill — keeping the bottom rule — so the page's
 * own background runs behind the bar. /jobs uses it to carry its hero wash up
 * to the top of the viewport instead of starting it at a hard seam below the
 * header. Only meaningful together with `sticky={false}`.
 *
 * The bar always sits in the 1200px content column. It deliberately does NOT
 * adapt to a page's own gutters — /jobs is full-bleed with 56px gutters, and
 * giving it a matching full-bleed nav made the wordmark and tabs jump
 * horizontally on every navigation in or out of that route.
 */
const Navbar = ({ sticky = true, transparent = false }) => {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!sticky) return undefined;
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sticky]);

  // Lock the page behind the drawer and let Escape close it.
  useEffect(() => {
    if (!mobileMenuOpen) return undefined;
    const handleKey = (e) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKey);
    };
  }, [mobileMenuOpen]);

  // A route change from anywhere (back button included) should not leave the
  // drawer hanging open over the new page.
  useEffect(() => {
    const close = () => setMobileMenuOpen(false);
    router.events.on("routeChangeComplete", close);
    return () => router.events.off("routeChangeComplete", close);
  }, [router.events]);

  // Exact segment match — plain startsWith would light up "Find Jobs" on a
  // hypothetical /jobseekers route.
  const isActive = (href) => router.pathname === href || router.pathname.startsWith(`${href}/`);

  const shell = sticky
    ? `fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled ? "h-14 bg-white/95 shadow-nav backdrop-blur-md" : "h-16 border-b border-border bg-white"
      }`
    : transparent
      ? "relative z-40 h-16 border-b border-border"
      : "relative z-40 h-16 border-b border-border bg-white";

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-button focus:outline-none"
      >
        Skip to content
      </a>
      <nav role="navigation" aria-label="Main navigation" className={`font-sans ${shell}`}>
        <div className="mx-auto flex h-full max-w-content items-center justify-between px-4 lg:px-6">
          <Link
            href="/jobs"
            aria-label="CareersAt.Tech — home"
            className="group flex-shrink-0 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
          >
            <Wordmark size="sm" className="sm:hidden" />
            <Wordmark size="md" className="hidden sm:inline-flex" />
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-sm py-1 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 ${
                    active
                      ? "font-semibold text-primary"
                      : "font-medium text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <button
            className="-mr-2 rounded-lg p-2 text-text-secondary hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 md:hidden"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden" role="dialog" aria-modal="true" aria-label="Site menu">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 flex w-72 flex-col bg-white p-6 font-sans shadow-xl">
            <div className="mb-8 flex items-center justify-between">
              <Wordmark size="sm" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                className="-mr-2 rounded-lg p-2 text-text-secondary hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col">
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex min-h-[44px] items-center border-b border-border text-base transition-colors last:border-b-0 ${
                      active
                        ? "font-semibold text-primary"
                        : "font-medium text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
