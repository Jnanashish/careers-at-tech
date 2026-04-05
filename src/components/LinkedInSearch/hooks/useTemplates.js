import { useState, useEffect, useCallback } from "react";
import { BUILT_IN_TEMPLATES } from "../lib/templates";

const STORAGE_KEY = "linkedin-search-templates";

function loadCustomTemplates() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export default function useTemplates() {
  const [customTemplates, setCustomTemplates] = useState([]);

  useEffect(() => {
    setCustomTemplates(loadCustomTemplates());
  }, []);

  const persist = (templates) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
    } catch {
      // localStorage full or unavailable
    }
  };

  const saveTemplate = useCallback((name, filters) => {
    const template = {
      id: `custom-${Date.now()}`,
      name,
      filters: { ...filters },
      isBuiltIn: false,
      createdAt: Date.now(),
    };
    setCustomTemplates((prev) => {
      const next = [...prev, template];
      persist(next);
      return next;
    });
  }, []);

  const removeTemplate = useCallback((id) => {
    setCustomTemplates((prev) => {
      const next = prev.filter((t) => t.id !== id);
      persist(next);
      return next;
    });
  }, []);

  return {
    builtInTemplates: BUILT_IN_TEMPLATES,
    customTemplates,
    saveTemplate,
    removeTemplate,
  };
}
