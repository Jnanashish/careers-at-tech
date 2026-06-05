import React, { useState, useRef, useEffect } from "react";
import { Check, ChevronDown } from "lucide-react";

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-[3px] focus-visible:ring-cat-primary/20";

// ---- selectable multi-chip group ----
export function MultiChips({ options, values, onChange, name }) {
  const toggle = (v) =>
    onChange(values.includes(v) ? values.filter((x) => x !== v) : [...values, v]);

  return (
    <div className="flex flex-wrap gap-[9px]" role="group" aria-label={name}>
      {options.map((o) => {
        const on = values.includes(o.value);
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={on}
            onClick={() => toggle(o.value)}
            className={`inline-flex items-center gap-[7px] min-h-[44px] px-[14px] rounded-[4px] border text-[13px] font-medium tracking-[0.14px] transition-colors cursor-pointer ${FOCUS_RING} ${
              on
                ? "bg-cat-blue-bg text-cat-primary border-cat-primary"
                : "bg-white text-cat-fg border-cat-border hover:border-cat-primary-light hover:bg-cat-blue-bg"
            }`}
          >
            {on && <Check size={12} aria-hidden="true" />}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

// ---- custom single-select dropdown ----
export function Select({ options, value, onChange, ariaLabel }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const current = options.find((o) => o.value === value) || options[0];

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => setOpen((o) => !o)}
        className={`w-full h-[46px] px-[14px] flex items-center justify-between gap-2.5 rounded-[8px] border bg-white text-[14px] text-cat-fg text-left transition-colors cursor-pointer ${FOCUS_RING} ${
          open ? "border-cat-primary" : "border-cat-border"
        } focus:border-cat-primary`}
      >
        <span>{current.label}</span>
        <ChevronDown
          size={14}
          aria-hidden="true"
          className={`text-cat-fg-dim transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div
          role="listbox"
          className="absolute left-0 right-0 top-[52px] z-30 p-1 rounded-[10px] bg-white border border-cat-border shadow-cat-dropdown"
        >
          {options.map((o) => {
            const selected = o.value === value;
            return (
              <div
                key={o.value}
                role="option"
                aria-selected={selected}
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
                className={`px-3 py-[11px] rounded-[6px] text-[14px] flex items-center justify-between cursor-pointer ${
                  selected
                    ? "bg-cat-blue-bg text-cat-primary font-medium"
                    : "text-cat-fg hover:bg-cat-surface-soft"
                }`}
              >
                <span>{o.label}</span>
                {selected && <Check size={13} aria-hidden="true" />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ---- toggle switch row ----
export function SwitchRow({ checked, onChange, title, sub }) {
  return (
    <div
      role="switch"
      tabIndex={0}
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          onChange(!checked);
        }
      }}
      className={`flex items-center justify-between gap-4 min-h-[44px] px-[14px] py-2.5 rounded-[8px] border border-cat-border cursor-pointer transition-colors hover:border-cat-primary-light ${FOCUS_RING}`}
    >
      <span className="min-w-0">
        <strong className="block text-[14px] font-medium text-cat-fg">{title}</strong>
        <span className="text-[10px] text-cat-fg-hint">{sub}</span>
      </span>
      <span
        aria-hidden="true"
        className={`relative flex-none w-11 h-[26px] rounded-full transition-colors ${
          checked ? "bg-cat-primary" : "bg-cat-border"
        }`}
      >
        <span
          className={`absolute top-[3px] left-[3px] w-5 h-5 rounded-full bg-white shadow-cat-xs transition-transform ${
            checked ? "translate-x-[18px]" : ""
          }`}
        />
      </span>
    </div>
  );
}

// ---- pretty-print a URL with the query keys tinted accent ----
export function PrettyUrl({ url }) {
  const qIdx = url.indexOf("?");
  if (qIdx === -1) {
    return (
      <span className="font-semibold text-cat-ink">{url}</span>
    );
  }
  const base = url.slice(0, qIdx);
  const parts = url.slice(qIdx + 1).split("&");
  return (
    <span>
      <span className="font-semibold text-cat-ink">{base}</span>?
      {parts.map((p, i) => {
        const eq = p.indexOf("=");
        const k = eq === -1 ? p : p.slice(0, eq);
        const v = eq === -1 ? "" : p.slice(eq + 1);
        return (
          <span key={i}>
            {i > 0 && <span>&amp;</span>}
            <span className="text-cat-primary">{k}</span>
            {eq !== -1 && "="}
            {v}
          </span>
        );
      })}
    </span>
  );
}
