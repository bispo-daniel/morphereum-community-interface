# Morphereum — Community Interface 👾
*A playful, Matrix-styled frontend for a fictional meme coin: **$Morphereum***  
> Live token ticker, animated hero, 3D coin, arts gallery with uploads, real-time chat, and community dashboards — all in one sleek SPA.

---

## ✨ Highlights

- **Matrix-flavored UI**: raining code background, bold type, motion micro-interactions.
- **Live Token Ticker**: real-time price/volume/cap/holders, scrolling across the top of every page via a marquee. 
- **3D Rotating Coin**: WebGL scene powered by `@react-three/fiber` + `@react-three/drei`.
- **Arts Gallery**: infinite scroll, fullscreen view, safe file uploads with client validations, and one-click download.
- **MatrixCHAT**: WebSocket chat with prompt recommendations, typing indicator, daily-limit block UX, and message metrics.
- **One-tap Theme Toggle**: light/dark with persistent preference.
- **Mobile-first Navigation**: sticky, compact, with accessible labels.
- **Embedded Price Chart**: GeckoTerminal iframe, dark-mode aware.
- **Zero-friction DX**: Vite dev server, typed envs, cached queries, and component primitives.

---

## 🧱 Tech Stack

**Core**
- **React** (Vite) + **TypeScript**
- **React Router** for routing
- **@tanstack/react-query** for data fetching & caching
- **Zod** for runtime env validation
- **Socket.IO client** for real-time chat

**UI & Motion**
- **shadcn/ui-style primitives** (Radix + class-variance-authority + utility helpers)
- **lucide-react** icons and **@icons-pack/react-simple-icons** (lazy, dynamic import)
- **framer-motion** for entrance/parallax effects
- **react-fast-marquee** for tickers
- **@react-three/fiber** + **@react-three/drei** for the 3D coin
- **Recharts** with a custom themable container

**Styling Utilities**
- Utility classes with dark-mode support
- A11y-first patterns (labels, roles, aria-current, focus rings)

---

## 🗺️ App Structure (Frontend)

```
src/
  api/                    # Fetch & mutations (React Query)
  assets/                 # Images & logos (e.g., coin textures, social icons)
  components/             # Layout, Navigator, TokenMarquee, shared UI
    ui/                   # Shadcn-style primitives (alert, card, sheet, toast, etc.)
  config/                 # Zod-validated envs
  features/
    home/                 # Hero, marquee, Matrix code, 3D coin, chart, goal timelines
    arts/                 # Gallery, upload sheet, fullscreen, infinite query
    chat/                 # MatrixCHAT (WebSocket), recommendations, input, bubbles
  providers/              # Theme provider, etc.
  router/                 # Route definitions
  utils/                  # Helpers (e.g., timezone → country)
  App.tsx                 # App bootstrap + visit metrics
```

---

## 🔌 Key Modules & How They Work

### Token data & marquee
- `useTokenData()` fetches token metrics from `VITE_API_URL /token` and streams them across a **top, fixed marquee** with color-coded deltas (green/red).  
- Age in days is computed from a fixed “token birth” (2024-10-31).

### Metrics plumbing
- **Visits**: on mount, the app posts a country-tagged visit metric (`/metrics/visits`), persisting the country in `localStorage`.
- **Arts**: posting `/metrics/arts` on submissions for activity tracking.
- **Chat**: posting `/metrics/chat` on each message.

### Arts gallery
- **Infinite loading** with `useInfiniteQuery`, schema-validated with **Zod**.
- **Upload sheet** with client-side guards (image mime type, ≤ 10 MB).
- **Fullscreen** overlay supports download + external X profile.
- Progressive skeletons for smooth loading.

### MatrixCHAT
- **WebSocket** connection (`VITE_WS_URL`) for assistant replies.
- Prompt recommendation grid with single-tap send.
- **Daily block** UX: server can respond with a `blocked` payload + `unblockDate`, stored and shown to the user.
- Auto-scroll, markdown rendering, avatarized bubbles, typing animation.

### Navigation & layout
- **Navigator**: bottom nav on most pages; auto-relocates for `/chat`, includes **theme toggle**.
- **Layout** swaps in a **Footer** (except on chat) and pins the **TokenMarquee** globally.

### Home page candy
- **MatrixRainingCode**: dynamic canvas that adapts to theme.
- **RotatingCoinCanvas**: 3D coin textured with the token image.
- **Chart**: GeckoTerminal iframe (swaps/infos toggled off, chart-only).
- **Animated sections**: headings sweep in horizontally; paragraphs fade-up.

---

## 🔧 Environment Variables

Create a `.env` (or `.env.local`) in the project root:

```env
VITE_API_URL=https://your-backend.example.com
VITE_WS_URL=wss://your-realtime.example.com
```

> These are **validated with Zod** at startup to prevent foot-guns.

---

## ▶️ Getting Started

```bash
# 1) install deps
pnpm install        # or: npm i / yarn

# 2) start dev server
pnpm dev            # Vite @ http://localhost:5173 (default)

# 3) build for production
pnpm build

# 4) preview the production build locally
pnpm preview
```

> Requires Node 18+ (recommended).

---

## 🧪 API Contract (Frontend Expectations)

- **GET** `${VITE_API_URL}/token` → `{ tokenPriceInUSD, volumeIn24H, changeIn1H, changeIn24H, marketCap, transactions24H, sell24H, buy24H, totalSupply, holders }`
- **POST** `${VITE_API_URL}/metrics/visits` → `{"country": "<ISO/Country name>"}` (autodetected from timezone)
- **POST** `${VITE_API_URL}/metrics/arts` → `{"xProfile": "<https://x.com/...>" }`
- **POST** `${VITE_API_URL}/arts` → `FormData { image, creator, xProfile, description }`
- **POST** `${VITE_API_URL}/metrics/chat`
- **WS** `${VITE_WS_URL}` → emits `"bot-message"` or `"blocked"` payloads

---

## 📁 Notable Components

- **`components/TokenMarquee`** — fixed global ticker with dynamic, colorized stats.
- **`components/Navigator`** — sticky bottom nav, icons, theme action.
- **`features/home/*`**
  - `MatrixRainingCode` (canvas)
  - `RotatingCoinCanvas` (+ `RotatingCoinCanvasMesh`)
  - `Chart` (GeckoTerminal embed)
  - `TokenGoals` + `TokenGoalsGoal` (animated milestones)
- **`features/arts/*`**
  - `CreateNewArtSheet` (Radix Sheet), `Image`, `FullscreenCarrousel`, `ImageSkeleton`
- **`features/chat/*`**
  - `InputForm`, `Message` (markdown support), `TypingAnimation`, `PromptRecommendation`

---

## 🛡️ UX & A11y Touches

- Keyboard-focus rings on actionable components.
- `aria-current` for active nav links.
- Reduced jank via skeletons and cached queries.
- Localized messages on validations and states.
- File-type/size checks before uploads.

---

## 🧩 Design Ideas you can borrow

- **Dynamic brand icons**: lazy import from `@icons-pack/react-simple-icons` by name.
- **Theme-aware charts**: CSS variables injected for Recharts, swapped by theme.
- **Parallax headings**: framer-motion + `useScroll` + responsive transforms.
- **Marquee separators**: animated visual dividers that respond to scroll velocity.

---

## 🚀 Scripts (typical Vite setup)

```jsonc
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview --port 5173"
  }
}
```

(Adjust to your package manager.)

---

## 📸 Screens/Routes (SPA)

- `/` — Home (hero, Matrix rain, 3D coin, marquee, chart, goals)
- `/arts` — Arts & Memes gallery (create, view, download)
- `/chat` — MatrixCHAT (WebSocket AI chat)
- `/raid`, `/links`, `/metrics`, `/whitepaper` — community tools & info
- *Global*: Token Ticker + Navigator; Footer on all but `/chat`

---

### Made with ❤️ by the $Morphereum community
