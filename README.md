# AVENGERS CLUB // RECRUITMENT INITIATIVE
> **"EARTH NEEDS YOU. NOT BORN A HERO. BUILT AS A TEAM."**

A competition-quality, cinematic college club recruitment website built with pure **HTML5**, **Vanilla CSS**, and modern **JavaScript**. Designed as a futuristic superhero command center digital experience with high-tech HUD overlays, ambient cursor spotlights, synthesized tactile audio feedback, interactive personnel dossiers, and a functional cadet enlistment pipeline.

---

## ⚡ Highlights & Features

- **Pure Web Stack**: 100% standalone **HTML5**, **Vanilla CSS**, and **JavaScript** with zero external frameworks, node build steps, or runtime dependencies.
- **Cinematic Visual Identity**: Near-black obsidian backgrounds (`#05070a`), atmospheric grid textures, cyan & crimson neon illumination, and restrained titanium accents.
- **Typography & Scale**: High-impact headers using **Orbitron**, **Syne**, and **Space Mono** paired with clean **Inter** body text.
- **Original High-Resolution Assets**: Custom cinematic visuals for the Command Center, Tactical Robotics Lab, and Executive Personnel portraits located in `assets/`.
- **Synthesized Web Audio Feedback**: Built-in Web Audio API sound generator delivering tactile clicks, division sweep frequencies, and confirmation chimes—with a header audio toggle (ON / OFF).
- **Interactive Divisions (Bento Grid)**: 6 operational squads with sector filters and 1-click enlistment shortcuts.
- **Interactive Dossiers**: Clickable personnel cards opening a classified cadet dossier modal.
- **Full Enlistment Portal**: Form with validation (name, email regex, department, year, division chips, purpose statement, code of conduct), simulated transmission telemetry, and downloadable **Cadet Dossier Pass** (`.txt`).
- **Responsive & Accessible**: Fully responsive across mobile, tablet, laptop, and desktop displays, with a mobile drawer, keyboard accessibility (`Esc`, `Tab`), ARIA labeling, and `prefers-reduced-motion` compliance.

---

## 📁 Clean File Structure

```text
c:\LEON\avengers\
├── assets\                      # Original high-res cinematic images & SVGs
│   ├── hero-command-center.jpg  # Hero viewport command center visual
│   ├── mission-tactical-lab.jpg # Mission robotics engineering lab visual
│   ├── team-tony-stark.jpg      # President portrait
│   ├── team-steve-rogers.jpg    # Vice President portrait
│   ├── team-natasha-ops.jpg     # Operations Lead portrait
│   ├── team-bruce-tech.jpg      # Technical Lead portrait
│   └── team-peter-design.svg    # Media & Design Lead vector asset
├── index.html                   # Semantic HTML5 recruitment website
├── style.css                    # Pure Vanilla CSS design system & responsive styling
├── script.js                    # Pure Vanilla JavaScript client logic & audio synthesis
├── server.js                    # Zero-dependency local preview server
├── README.md                    # Documentation
└── .gitignore                   # Git ignore rules
```

---

## 🚀 How to Run Locally

### Option 1: Direct File Open (Simplest)
Double-click `index.html` or drag it into any web browser (Chrome, Edge, Firefox, Safari).

### Option 2: Node.js (Zero Dependencies)
```bash
node server.js
```
Open [http://localhost:3000/](http://localhost:3000/) in your browser.

### Option 3: Python
```bash
python -m http.server 3000
```
Open [http://localhost:3000/](http://localhost:3000/) in your browser.

---

## 📤 Push to GitHub

```powershell
$env:PATH += ";C:\LEON\mingit\cmd"
git push -u origin main
```
Deploy instantly to **GitHub Pages** simply by enabling Pages in the repository settings (Branch: `main`, Folder: `/ (root)`).
