import { useState, useMemo } from "react";
import Head from "next/head";
import Navbar from "@/components/Redesign/Navbar";
import FooterNew from "@/components/Redesign/FooterNew";
import { WhatsAppCTA } from "@/components/Redesign/SidebarNew";
import ToolsHero from "@/components/Redesign/Tools/ToolsHero";
import ToolsCategoryBar from "@/components/Redesign/Tools/ToolsCategoryBar";
import FeaturedTools from "@/components/Redesign/Tools/FeaturedTools";
import ToolsGrid from "@/components/Redesign/Tools/ToolsGrid";
import EmptyState from "@/components/Redesign/Tools/EmptyState";
import AffiliateDisclosure from "@/components/Redesign/Tools/AffiliateDisclosure";
import SuggestToolCTA from "@/components/Redesign/Tools/SuggestToolCTA";
import { TOOLS, CATEGORIES } from "@/components/Redesign/Tools/toolsData";
import { SITE_URL, DEFAULT_OG_IMAGE } from "@/core/SEO/constants";

export default function ToolsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  const filteredTools = useMemo(() => {
    let result = TOOLS;

    // Filter by category
    if (activeCategory !== "all") {
      result = result.filter((t) => t.category === activeCategory);
    }

    // Filter by search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.shortDescription.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortBy === "az") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "newest") {
      result = [...result].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    } else {
      // "featured" — featured first, then alphabetical
      result = [...result].sort((a, b) => {
        if (a.isFeatured !== b.isFeatured) return b.isFeatured ? 1 : -1;
        return a.name.localeCompare(b.name);
      });
    }

    return result;
  }, [searchQuery, activeCategory, sortBy]);

  // Category counts (always based on full TOOLS, ignoring search)
  const categoryCounts = useMemo(() => {
    const counts = {};
    for (const cat of CATEGORIES) {
      counts[cat.id] = TOOLS.filter((t) => t.category === cat.id).length;
    }
    return counts;
  }, []);

  const featuredTools = TOOLS.filter((t) => t.isFeatured);
  const showSections = activeCategory === "all" && !searchQuery.trim();

  const clearFilters = () => {
    setSearchQuery("");
    setActiveCategory("all");
  };

  return (
    <>
      <Head>
        <title>Free Career Tools for Tech Freshers | CareersAt.Tech</title>
        <meta
          name="description"
          content="Curated collection of free and freemium tools for Indian tech freshers — resume builders, interview prep, salary calculators, DSA practice, and more."
        />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
        <link rel="canonical" href={`${SITE_URL}/tools`} />
        <meta property="og:title" content="Free Career Tools for Tech Freshers | CareersAt.Tech" />
        <meta
          property="og:description"
          content="Resume builders, interview prep, salary tools, and coding practice — vetted and organized for Indian freshers."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/tools`} />
        <meta property="og:site_name" content="CareersAt.Tech" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:image:alt" content="CareersAt.Tech — free career tools for tech freshers" />
        {/* The page ships no wide art, so claim the small card: an image-less
            summary_large_image renders as a bare text card on X. */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Free Career Tools for Tech Freshers | CareersAt.Tech" />
        <meta
          name="twitter:description"
          content="Resume builders, interview prep, salary tools, and coding practice — vetted and organized for Indian freshers."
        />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
      </Head>

      <Navbar />

      <main id="main-content" className="min-h-screen bg-page">
        <ToolsHero searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        <ToolsCategoryBar
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          categoryCounts={categoryCounts}
        />

        {filteredTools.length === 0 ? (
          <EmptyState onClearFilters={clearFilters} />
        ) : (
          <>
            {showSections && <FeaturedTools tools={featuredTools} />}
            <AffiliateDisclosure />
            <ToolsGrid
              tools={filteredTools}
              showSections={showSections}
              onCategoryChange={setActiveCategory}
            />
          </>
        )}

        <SuggestToolCTA />

        {/* WhatsApp CTA — centered, single instance */}
        <div className="max-w-[480px] mx-auto px-4 pt-4 pb-16">
          <WhatsAppCTA />
        </div>
      </main>

      <FooterNew />
    </>
  );
}
