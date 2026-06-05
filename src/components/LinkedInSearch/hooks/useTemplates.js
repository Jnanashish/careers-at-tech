import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "cb_presets_v1";

function loadPresets() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

// Saved presets persist a full { name, state } blob to localStorage.
export default function useTemplates() {
  const [presets, setPresets] = useState([]);

  useEffect(() => {
    setPresets(loadPresets());
  }, []);

  const persist = (next) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // localStorage full or unavailable
    }
  };

  const savePreset = useCallback((name, state) => {
    setPresets((prev) => {
      const next = [...prev, { name: name.slice(0, 32), state }];
      persist(next);
      return next;
    });
  }, []);

  const removePreset = useCallback((index) => {
    setPresets((prev) => {
      const next = prev.filter((_, i) => i !== index);
      persist(next);
      return next;
    });
  }, []);

  return { presets, savePreset, removePreset };
}
