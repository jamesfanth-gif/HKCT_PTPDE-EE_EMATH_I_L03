# 🔲 EM1 L03 — Basic Matrix Theory

Engineering Maths I · Tutorial 1 of 2 (D.J. Dunn) · Interactive Bilingual Learning Platform

An interactive learning site that walks first-year engineering students through
the **matrix-theory foundation** of EM1: matrix notation & element addressing,
vectors as matrices, square matrices & trace, special matrices (diagonal,
unit, zero), transpose, addition/subtraction, scalar multiplication,
matrix × vector, matrix × matrix (row × column rule), AB ≠ BA, the identity
property AI = A, and the transpose-of-product identity (AB)ᵀ = BᵀAᵀ — all
with hand-drawn SVG matrix schematics and step-by-step worked examples.

## 🚀 1-Minute Deployment on GitHub Pages

1. On GitHub, create a new **public** repository (e.g. `em1-l03-matrices`).
2. Drop these **4 files** into the repo root:
   - `index.html`
   - `style.css`
   - `app.js`
   - `README.md`
3. Commit and push:
   ```bash
   git add .
   git commit -m "Deploy EM1 Tutorial 1 Basic Matrix Theory interactive platform"
   git branch -M main
   git push -u origin main
   ```
4. In repo **Settings → Pages**, set Source = `main` branch / root. The site
   goes live at `https://<your-username>.github.io/em1-l03-matrices/`
   within a minute.

## 📂 File Layout

| File          | Purpose                                                                 |
|---------------|-------------------------------------------------------------------------|
| `index.html`  | Page shell, three tabs (Notes / MC / Short Q), header & stats bar.       |
| `style.css`   | Engineering-blue + matrix-teal theme, animated element highlights.       |
| `app.js`      | 12 topics + diagrams · 25 MCQs · 5 short-answer Qs · timer · MC scoring. |
| `README.md`   | This file.                                                              |

## 🎓 Lecture Coverage (12 topics)

1. What is a Matrix? — array of numbers in rows and columns; element aᵢⱼ
2. Vectors as Matrices — row vs column vectors, V = a₁₁x + a₁₂y + a₁₃z
3. Square Matrix & Trace — leading diagonal, trace = sum of aᵢᵢ
4. Special Matrices — Diagonal, Unit (I), Zero (null)
5. Transpose Matrix Aᵀ — rows ↔ columns, size flips
6. Addition & Subtraction — element-wise, same-size requirement
7. Scalar Multiplication — αA, distribute through every element
8. Matrix × Column Vector — A·x = b, three linear equations in one
9. Matrix × Matrix — cᵢⱼ = (row i of A) · (column j of B)
10. Multiplication Properties — AB ≠ BA, but associative & distributive
11. Unit Matrix Property — AI = IA = A
12. Worked Examples Recap — Examples 6, 7, 8 + Self Assessment 1 answers

## 🧪 Self-Assessment

- **25 multiple-choice questions** covering definitions, notation, element
  addressing, transpose, arithmetic (add/sub/scalar), the row × column
  multiplication rule, AB ≠ BA, and (AB)ᵀ = BᵀAᵀ.
- **5 structured short-answer questions** with full worked model answers
  (each showing every dot-product computation).
- **90-minute timer** to simulate exam pacing.

## 🎨 Design Choices

- **Blue + teal palette** — engineering-blue primary, matrix-teal accent
  to differentiate from L01 (vectors) and L02 (complex numbers).
- **Hand-drawn matrix brackets** in pure SVG (`<path>`) for crisp
  visual rendering of every matrix on the page.
- **Element highlighting** — when illustrating the row × column rule,
  the contributing row turns blue and the contributing column turns
  orange; everything else dims, so the eye locks onto the right pair.
- **Bilingual (EN / 中文)** side-by-side layout, mirroring the source.
- Fully responsive — works on phone, tablet, and desktop.

## ✏️ Extending the Site

To add a new topic:
1. Append a new object to `notesData` in `app.js` with `id`, `icon`,
   `title`, `titleZh`, `diagram` (SVG), and `sections`.
2. To add MC questions, append objects to `mcData` with `type`, `text`,
   `options`, `correct`, `explanation`.
3. For short-answer items, append objects to `shortData` with `title`,
   `titleZh`, `prompt`, `modelAnswer`, `tips`.

That's it — no build step, no dependencies, plain HTML/CSS/JS.

## 📜 Licence

Educational use. Adapt freely for your own engineering-maths teaching.
