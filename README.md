# 🌿 Random Acts of Kindness — Daily Challenge Generator

A lightweight, browser-based web app that serves up one kindness challenge a day. No backend, no accounts, no fuss — just open it and go be kind.
https://coplikso.github.io/kindness-generator/

---

## What It Does

- **Generates a random kindness challenge** from a curated list of 30 acts across 6 categories
- **Tracks your streak and total acts** completed, persisted locally in the browser
- **Logs up to 20 completed acts** so you can see your history
- **Lets you filter by category** — Friends, Family, Strangers, Online, Planet, Self-care
- **Shareable challenges** — via the Web Share API or clipboard fallback

---

## Project Structure

```
/
├── index.html    # Markup and layout
├── style.css     # All styles, animations, category theming
└── script.js     # App logic, state management, localStorage
```

No build tools. No dependencies. No node_modules. Just three files.

---

## Features

| Feature | How it works |
|---|---|
| Daily streak | Checks `localStorage` for yesterday's date; increments or resets accordingly |
| Difficulty dots | Each challenge has a 1–3 difficulty rating shown as filled dots on the card |
| Category filtering | Filters the challenge pool before picking randomly |
| "I did it" button | Marks today's challenge done — one log per day, enforced client-side |
| Card flip animation | CSS `cardFlip` keyframe + a shimmer shine effect on each new draw |
| Toast notifications | Lightweight fixed-position toast for feedback messages |
| Share | Uses `navigator.share` on mobile; falls back to `navigator.clipboard` on desktop |

---

## Kindness Categories

| Category | Description |
|---|---|
| `friends` | Acts aimed at people you already know |
| `family` | Things to do at home or for relatives |
| `strangers` | Quick, low-stakes acts in public |
| `online` | Digital kindness — comments, shares, DMs |
| `environment` | Small planet-positive habits |
| `self` | Self-care and mindset challenges |

---

## Local Storage Keys

The app persists state using these keys:

| Key | Value |
|---|---|
| `kg_streak` | Current day streak (integer) |
| `kg_total` | Total acts completed (integer) |
| `kg_lastDate` | Date string of last completion |
| `kg_log` | JSON array of completed challenge texts (max 20) |
| `kg_todayDone` | `"true"` if a challenge was marked done today |

To reset all progress, run in the browser console:
```js
['kg_streak','kg_total','kg_lastDate','kg_log','kg_todayDone'].forEach(k => localStorage.removeItem(k));
location.reload();
```

---

## Running It

Just open `index.html` in a browser. That's it.

If you want a local dev server (to avoid any browser quirks with `file://` origins):

```bash
# Python
python -m http.server 8000

# Node
npx serve .
```

---

## Fonts Used

- **Playfair Display** — headings and challenge text (Google Fonts)
- **DM Sans** — UI, buttons, body copy (Google Fonts)

Loaded via `<link>` in the HTML head; requires an internet connection on first load.

---

## Known Quirks

- There's a stray ` v` at the end of the `<script>` tag in `index.html` — harmless but worth cleaning up.
- `grid-template-columns: ifr auto` in `.actions` is a typo — should be `1fr auto`. Currently overridden by the mobile media query so it doesn't visually break, but worth fixing.
- The font stack references `'playfir Display'` and `'playfair Display'` (lowercase p, typo) in a couple of CSS rules — these fall back to serif gracefully.
- `clamp(18px, 3.5uw, 22px)` — `uw` is not a valid CSS unit; the clamp silently collapses to `18px`.

---

## quote
whatever you do at the crossroad, keep going forward
