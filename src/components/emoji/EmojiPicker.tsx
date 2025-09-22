import { useEffect, useMemo, useRef, useState } from "react";
import { ALL_EMOJIS, EMOJI_CATEGORIES, type Emoji } from "./emojiData";

type EmojiPickerProps = {
  onSelect: (emoji: string) => void;
  onClose?: () => void;
  className?: string; // for positioning
  disableOutsideClose?: boolean;
};

const RECENT_STORAGE_KEY = "emoji_recent_v1";
const MAX_RECENT = 7;

// Basic click-outside hook
function useClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  onOutside: () => void,
) {
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) onOutside();
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onOutside, ref]);
}

export default function EmojiPicker({
  onSelect,
  onClose,
  className,
  disableOutsideClose = false,
}: EmojiPickerProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Delegate outside-close to parent (e.g., Popover) when disabled
  useClickOutside(panelRef, () => {
    if (!disableOutsideClose) onClose?.();
  });

  const [activeCat, setActiveCat] = useState(EMOJI_CATEGORIES[0].id);
  const [query, setQuery] = useState("");

  // Recent emojis (persisted)
  const [recents, setRecents] = useState<string[]>([]);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(RECENT_STORAGE_KEY);
      const parsed = raw ? (JSON.parse(raw) as string[]) : [];
      // Only keep emojis we know (or valid single grapheme)
      const known = new Set(ALL_EMOJIS.map((e) => e.char));
      const safe = parsed.filter((c) => typeof c === "string" && (known.has(c) || c.length > 0));
      setRecents(safe.slice(0, MAX_RECENT));
    } catch {
      setRecents([]);
    }
  }, []);

  const pushRecent = (emoji: string) => {
    setRecents((prev) => {
      const next = [emoji, ...prev.filter((e) => e !== emoji)].slice(0, MAX_RECENT);
      try {
        localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const results: Emoji[] = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return ALL_EMOJIS.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        (e.keywords && e.keywords.some((k) => k.toLowerCase().includes(q))),
    ).slice(0, 300);
  }, [query]);

  const currentItems = useMemo(() => {
    return EMOJI_CATEGORIES.find((c) => c.id === activeCat)?.items ?? [];
  }, [activeCat]);

  // Fixed-height grid: 5 rows visible, scroll when overflowing.
  // Each cell is 32px, gap is 4px (gap-1). 5 rows => 32*5 + 4*4 = 176px.
  const GRID_HEIGHT_CLASS = "h-[176px]";

  const handlePick = (char: string) => {
    pushRecent(char);
    onSelect(char);
    // Do not call onClose here; parent Popover controls open/close.
  };

  return (
    <div
      ref={panelRef}
      className={
        className ??
        "absolute z-50 mt-2 w-72 rounded-xl border bg-white p-2 shadow-lg ring-1 ring-black/5"
      }
      role="dialog"
      aria-label="Emoji picker"
    >
      {/* Search */}
      <div className="p-1">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search emoji..."
          className="w-full rounded-md border px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Recent (only when not searching and when there are recents) */}
      {!query && recents.length > 0 && (
        <div className="px-2 pb-2">
          <div className="mb-1 text-xs font-medium text-gray-500">Recent</div>
          <div className="grid grid-cols-7 gap-1">
            {recents.slice(0, MAX_RECENT).map((char) => (
              <button
                key={`recent-${char}`}
                aria-label={`recent ${char}`}
                className="h-8 w-8 select-none rounded-md text-xl hover:bg-gray-100"
                onClick={() => handlePick(char)}
              >
                {char}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Category tabs (hidden when searching) */}
      {!query && (
        <div className="flex gap-1 px-2 pb-2 pt-1">
          {EMOJI_CATEGORIES.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCat(category.id)}
                className={`h-8 w-8 flex items-center justify-center rounded-md transition-colors ${
                  activeCat === category.id
                    ? "bg-gray-200 text-black"
                    : "text-gray-500 hover:bg-gray-100 hover:text-black"
                }`}
                title={category.label}
              >
                <Icon size={18} />
              </button>
            );
          })}
        </div>
      )}

      {/* Grid (fixed height -> 5 rows visible, scrollable) */}
      <div
        className={`overflow-auto overscroll-contain p-1 ${GRID_HEIGHT_CLASS}`}
        onWheelCapture={(e) => {
          // Keep scrolling inside the picker; prevent body from scrolling.
          e.stopPropagation();
        }}
      >
        <div className="grid grid-cols-7 gap-1">
          {(query ? results : currentItems).map((e) => (
            <button
              key={e.char + e.name}
              aria-label={e.name}
              title={e.name}
              className="h-8 w-8 select-none rounded-md text-xl hover:bg-gray-100"
              onClick={() => handlePick(e.char)}
            >
              {e.char}
            </button>
          ))}
        </div>

        {(query ? results : currentItems).length === 0 && (
          <div className="p-4 text-center text-sm text-gray-500">No emoji found</div>
        )}
      </div>
    </div>
  );
}
