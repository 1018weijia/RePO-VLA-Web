# RePO-VLA project website

Academic project page for **RePO-VLA: Recovery-Driven Policy Optimization for Vision-Language-Action Model**, NeurIPS 2026. Built with Vue 3, TypeScript, and Vite; retains the GitHub Pages deployment at `/RePO-VLA-Web/`.

## Develop and build

```sh
npm ci
npm run dev
npm run build
npm run preview
```

`npm run build` runs both TypeScript checks and the production build. The existing GitHub Actions workflow publishes `dist/` when changes are pushed to `main`.

## Update content

- `src/mock/data.ts`: paper title, all 19 authors in paper order, affiliation superscripts and contribution marks, abstract, figures, datasets, quantitative results, video categories, and BibTeX.
- `src/views/home/index.vue`: page composition and corresponding-author email addresses.
- `src/components/HeroDemo.vue`: three featured robot demonstrations.
- `src/components/ResultsTables.vue`: recovery-data scaling chart and experimental results tabs. Values are imported from the content file.
- `src/components/DemoGallery.vue`: 19 on-demand videos across four categories.
- `src/assets/styles/index.scss`: shared typography, colors, and responsive design tokens. Fonts are bundled locally.

Resource destinations:

- Code: https://github.com/1018weijia/FR_Bench
- Dataset: https://huggingface.co/datasets/Jerry2003/FR_Bench
- Paper: https://arxiv.org/pdf/2605.09410

Paper links use the arXiv PDF above. The supplied camera-ready PDF is retained in `public/paper/RePO-VLA.pdf` as a local reference. The citation follows the camera-ready title and author list.

## Media

- `public/Figures/`: figures exported from the supplied paper, with click-to-enlarge dialogs.
- `public/logos/`: institutional marks; the Shenzhen affiliation uses the full name **Harbin Institute of Technology, Shenzhen**.
- `public/posters/`: static video preview frames.
- `public/videos/real/` and `public/Demo/`: existing experimental videos.

Asset paths are prefixed with Vite's `BASE_URL` in the content file so they work on GitHub Pages. Video downloads start on demand (`preload="none"`), and playback pauses other videos. Tabs support keyboard navigation; figures support Escape to close; mobile navigation also closes with Escape. Motion honors the visitor's reduced-motion preference.

## Paper source

The page was synchronized with `neurips_2026.tex` and `sec/{3_method,4_benchmark,5_experiment,FRBench_Appdex}.tex` in the supplied camera-ready project on 2026-10-21. In particular:

- Liang Lin and Xiaodan Liang are both corresponding authors.
- The 46 tasks and 23,453 episodes describe the **simulation dataset**; the main simulation evaluation uses 10 tasks.
- At 4× recovery data, 75% is the average **adversarial** success over two real-world tasks; 80% is the Pour Water result in that condition.
- Matched Fold Towel controls and the **offline component** of the RECAP reproduction are included without extending their claims to the full online RECAP system.
