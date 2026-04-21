import { useMemo } from "react";
import { buildJobSearchURL, buildReferralURL } from "../lib/url-builder";

export default function useLinkedInURL(filters, activeTab) {
  return useMemo(() => {
    if (activeTab === "referral") return buildReferralURL(filters);
    return buildJobSearchURL(filters);
  }, [filters, activeTab]);
}
