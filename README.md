# Creative Portfolio: Ahmad Kholil Ahya Ainul Yaqin

A single-page creative portfolio built with plain HTML, CSS, and JavaScript. No framework, no build step, no backend. Theme: Bright Minimalist Contrast.

## Structure

```
creative-portfolio/
├── index.html
├── assets/
│   ├── images/      portfolio images (full size + thumbs/), portrait, MANIFEST.md
│   ├── icons/       social icons, sparkle mark, favicon
│   └── fonts/       Bodoni Moda + Quicksand (self-hosted, SIL OFL)
├── css/style.css
├── js/script.js
├── README.md
└── .gitignore
```

## Deploy on GitHub Pages

1. Create a new repository on GitHub (for example `creative-portfolio`).
2. Upload the **contents** of this folder so that `index.html` sits at the repository root.
   - With Git: `git init`, `git add .`, `git commit -m "Initial portfolio"`, `git branch -M main`, `git remote add origin <your-repo-url>`, `git push -u origin main`.
   - Or drag and drop the files in the GitHub web interface.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to *Deploy from a branch*, choose branch `main` and folder `/ (root)`, then **Save**.
5. After a minute the site is live at `https://<username>.github.io/<repository>/`.

All paths are relative, so the site works from a repository sub-path. To preview locally, run `python3 -m http.server` in this folder and open `http://localhost:8000` (opening `index.html` directly also works, but font preloading is only reliable over HTTP).

## How the images were matched

The folder numbers in the ZIP follow your Instagram reference links one by one, not the seven project groups:

| ZIP source | Portfolio project | Images | Web folder |
|---|---|---|---|
| Folder 1 | 01 HMPS Tadris Biologi: Biofact | 6 | `assets/images/01-hmps-biofact/` |
| Folder 2 | 02 PMII Rayon PIPA: management team photography | 6 | `assets/images/02a-pmii-management-team/` |
| Folder 3 | 02 PMII Rayon PIPA: everyday posts | 30 | `assets/images/02b-pmii-daily-posts/` |
| Folder 4 | 03 Life at UCP: Throw Back / Onboarding | 7 | `assets/images/03a-ucp-onboarding/` |
| Folder 5 | 03 Life at UCP: Do & Don't | 5 | `assets/images/03b-ucp-internship-tips/` |
| Files 6.jpg to 10.jpg | 04 FITK UIN Jakarta (5 posts) | 5 | `assets/images/04-fitk-uin-jakarta/` |
| Folder 11 | 05 NU Online Banten | 32 | `assets/images/05-nu-online-banten/` |
| Folder 12 | 06 Jendela Sains | 14 | `assets/images/06-jendela-sains/` |

Project **07 Impact Circle 13.0** has no image folder in the ZIP. It is presented as a typographic award card linking to the Figma file. To add artwork later, put the image in `assets/images/07-impact-circle/` and replace the `<a class="featured__card">` block in `index.html` with an `<img>`.

The full original-to-web filename list is in `assets/images/MANIFEST.md`.

Notes on the files:

- Files named `.heic` inside the ZIP were actually JPEG, so they were saved as `.jpg`.
- `3/624857381_..._n (1).webp` is a byte-identical copy of `3/624857381_..._n.webp`, so it appears once.
- Screenshots (`11/` and `12/`) were converted from PNG to high-quality WebP. Other originals are used unchanged.
- Each image has a 640px thumbnail for the grid. The lightbox opens the original.
- Images are never cropped: tiles use a 4:5 frame and the artwork is fitted inside it.

## Updating content

- **Add an image to a gallery:** copy the full image to the project folder, create a thumbnail in `thumbs/`, then copy one `<li class="tile">…</li>` block in `index.html` and update the paths, `width`/`height`, and `alt`.
- **Change text or links:** edit `index.html` directly.
- **Change colors or fonts:** the palette and fonts are variables at the top of `css/style.css` (`:root`).
