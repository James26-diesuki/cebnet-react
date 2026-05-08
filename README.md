# CebNet Technologies — React Website

## Requirements
- **Node.js** v18 or higher → https://nodejs.org
- **npm** (comes with Node)

---

## Setup & Running Locally

### Step 1 — Extract the zip
Unzip `cebnet-react.zip` anywhere on your computer.

### Step 2 — Copy your assets
Copy your existing `assets/` folder (images, videos, fonts) into the project root:

```
cebnet-react/
  public/
    assets/           ← paste your assets folder HERE
      img/
        team/
        partners/
        clients/
      video/
```

> All image and video paths are already pre-configured to look inside `public/assets/`.

### Step 3 — Install dependencies
Open a terminal inside the `cebnet-react/` folder and run:

```bash
npm install
```

### Step 4 — Start the dev server
```bash
npm run dev
```

Then open your browser at: **http://localhost:5173**

---

## Building for Production (Deployment)

```bash
npm run build
```

This creates a `dist/` folder. Upload the contents of `dist/` to any static host:
- **cPanel / shared hosting** → upload `dist/` contents to `public_html/`
- **Netlify / Vercel** → connect your repo, set build command to `npm run build`, output dir to `dist`
- **GitHub Pages** → use the `dist/` folder

---

## Updating Site Content

All site data lives in one file:

```
src/data/siteData.js
```

Edit this file to update:
- Company name, address, phone, email
- Navigation links
- Services list
- Partners list (add/remove/reorder)
- Clients list
- Job openings
- Employee benefits
- Stats (clients, years, engineers, etc.)

---

## Adding / Changing Images

| Image type | Folder |
|---|---|
| Partner logos | `public/assets/img/partners/` |
| Client logos | `public/assets/img/clients/` |
| Team photos | `public/assets/img/team/` |
| Videos | `public/assets/video/` |

After adding files, update the paths in `src/data/siteData.js` to match.

---

## Project Structure

```
cebnet-react/
├── public/
│   └── assets/           ← static files (images, video)
├── src/
│   ├── data/
│   │   └── siteData.js   ← ALL site content lives here
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Icons.jsx
│   │   ├── HeroCanvas.jsx
│   │   ├── PageHero.jsx
│   │   ├── PageLoader.jsx
│   │   └── BackToTop.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Company.jsx
│   │   ├── Services.jsx
│   │   ├── Partners.jsx
│   │   ├── Careers.jsx
│   │   └── Contact.jsx
│   ├── hooks/
│   │   └── useScrollReveal.js
│   ├── App.jsx
│   ├── main.jsx
│   └── style.css         ← your original CSS, unchanged
├── index.html
├── vite.config.js
└── package.json
```
