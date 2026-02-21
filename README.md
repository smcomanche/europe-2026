# 🇬🇧 Europe 2026 — Family Vacation App 🇫🇷

A Progressive Web App (PWA) for the Meredith family's London & Paris vacation, July 8–17, 2026.

**Features:**
- 📋 **Itinerary** — Day-by-day schedule with times, tags, and tips
- ✅ **Checklist** — Prioritized to-do list with booking links (persists on your phone)
- 📸 **Journal** — Travel diary to capture memories during the trip

Works offline, installable on iPhone home screen, no App Store needed.

---

## 🚀 Deploy to GitHub Pages (Step by Step)

### Prerequisites
- A [GitHub](https://github.com) account
- [Node.js](https://nodejs.org) installed (v18 or newer) — download the LTS version
- A terminal (Terminal on Mac, Command Prompt or PowerShell on Windows)

### Step 1: Create the GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Name the repository: `europe-2026`
3. Set it to **Public**
4. Click **Create repository**
5. Copy the repository URL (e.g., `https://github.com/YOUR_USERNAME/europe-2026.git`)

> ⚠️ **Important:** If you name your repo something other than `europe-2026`, update the `repoName` variable in `vite.config.js` to match.

### Step 2: Set Up the Project Locally

Open your terminal and run these commands one at a time:

```bash
# Navigate to where you unzipped the project
cd europe2026

# Install dependencies
npm install

# Test it locally (opens in your browser at http://localhost:5173)
npm run dev
```

Press `Ctrl+C` to stop the local server when you're done testing.

### Step 3: Push to GitHub

```bash
# Initialize git
git init
git add .
git commit -m "Initial commit - Europe 2026 vacation app"

# Connect to your GitHub repo (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/europe-2026.git
git branch -M main
git push -u origin main
```

### Step 4: Deploy to GitHub Pages

```bash
# Build and deploy (this creates a gh-pages branch automatically)
npm run deploy
```

### Step 5: Enable GitHub Pages

1. Go to your repo on GitHub → **Settings** → **Pages**
2. Under "Source", select **Deploy from a branch**
3. Set branch to `gh-pages` and folder to `/ (root)`
4. Click **Save**
5. Wait 1-2 minutes, then visit: `https://YOUR_USERNAME.github.io/europe-2026/`

---

## 📱 Add to iPhone Home Screen

1. Open `https://YOUR_USERNAME.github.io/europe-2026/` in Safari on your iPhone
2. Tap the **Share** button (square with arrow)
3. Scroll down and tap **Add to Home Screen**
4. Tap **Add**

It will appear as a regular app icon. It works offline and opens in full-screen mode!

**Have Susan, Charlotte, and Gabriella do the same** — checklist and journal data are stored per-device, so everyone has their own.

---

## 🔧 Customization

### Update the itinerary
Edit `src/App.jsx` — the `DAYS` array contains all itinerary data. Each day has events with time, title, detail, type, icon, and optional tag.

### Change the repo name
If your GitHub repo isn't named `europe-2026`, update these files:
1. `vite.config.js` — change `repoName` variable
2. `index.html` — update the `apple-touch-icon` href

### Rebuild after changes
```bash
npm run build    # Build locally
npm run deploy   # Deploy to GitHub Pages
```

---

## 🛠 Tech Stack
- React 18 + Vite 5
- PWA with vite-plugin-pwa (offline support + installable)
- localStorage for persistent checklist & journal data
- GitHub Pages hosting (free)

Bon voyage! 🗼✈️
