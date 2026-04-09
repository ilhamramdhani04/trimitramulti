# Design System Specification: PT Trimitra Multi Kreasi

## 1. Overview & Creative North Star: "The Architectural Blueprint"

This design system is built upon the concept of **Architectural Precision**. As a contractor for exhibition booths and elite event organizing, PT Trimitra Multi Kreasi does not just "build"; they curate space. The visual language must reflect this by treating the digital canvas as a physical environment.

**The Creative North Star: The Monolith & The Void.**
We utilize massive, high-contrast typography (The Monolith) juxtaposed against expansive, warm negative space (The Void). We break the "template" look by avoiding standard grid-heavy boxes. Instead, we use intentional asymmetry—placing text and imagery in "structural" positions that feel anchored yet airy. Every element should feel like a custom-built exhibition stand: deliberate, premium, and structurally sound.

---

## 2. Colors: Tonal Depth & The "No-Line" Rule

The palette is rooted in high-contrast luxury. We move away from digital "greys" in favor of "Inks" and "Papers" to provide a tactile, editorial feel.

### The Palette
- **Primary Ink (`primary` / #000000):** Our foundational weight. Used for heavy display type and primary CTAs.
- **Background Paper (`background` / #FCF9F3):** A warm, high-end substrate that feels more expensive than pure white.
- **Gold Accent (`secondary` / #735B28):** Used for sophistication and "Gold Standard" highlights.
- **Rust Accent (`tertiary_container` / #3C0800):** A nod to raw materials and industrial craftsmanship; use sparingly for high-impact emphasis.

### Surface Hierarchy & The "No-Line" Rule
**Explicit Instruction:** Prohibit 1px solid borders for sectioning. Boundaries must be defined through background color shifts.
*   **Level 0 (Base):** Use `surface` (#FCF9F3) for the main page canvas.
*   **Level 1 (Nesting):** Use `surface-container-low` (#F6F3ED) for large content blocks or sidebars.
*   **Level 2 (Elevation):** Use `surface-container-highest` (#E5E2DC) for nested interactive elements.
*   **The Signature Texture:** For Hero sections, use a subtle radial gradient transitioning from `primary` (#000000) to `primary_container` (#1C1B1B) to create a sense of infinite depth behind the exhibition showcases.

---

## 3. Typography: Editorial Authority

We use a "High-Low" typographic approach. Headings are aggressive and structural; body copy is light and spacious.

*   **Display & Headlines (Syne):** Use `display-lg` (3.5rem) and `headline-lg` (2rem) with extra-tight letter spacing (-0.04em). This font's wide, geometric nature should feel like it was etched into a building facade.
*   **Titles & Body (DM Sans):** Use `body-lg` (1rem) for standard reading. DM Sans should be set with generous line-height (1.6) to provide "breathing room" against the heavy Syne headers.
*   **The Signature Label:** Labels (`label-md`) should be set in all-caps with increased letter spacing (+0.1em) to mimic architectural notations.

---

## 4. Elevation & Depth: Tonal Layering

Traditional drop shadows are forbidden. We convey depth through physics and light.

*   **The Layering Principle:** Instead of a shadow, place a `surface-container-lowest` card on a `surface-container-low` background. The subtle 2% shift in brightness creates a "soft lift" that feels more premium than a digital shadow.
*   **Ambient Shadows:** If an element must "float" (e.g., a high-end modal), use a shadow color tinted with the `on-surface` color (#1C1C18) at 4% opacity with a 40px blur. It should look like a soft glow, not a dark smudge.
*   **Glassmorphism:** For floating navigation or overlays, use `surface` with 80% opacity and a `backdrop-filter: blur(12px)`. This integrates the UI with the background photography of exhibition spaces.
*   **The "Ghost Border":** If a separator is required, use `outline-variant` (#C4C7C7) at 15% opacity. It should be barely visible, felt rather than seen.

---

## 5. Components

### Buttons
*   **Primary:** Solid `primary` (#000000) background, `on_primary` (#FFFFFF) text. 0px corner radius. Padding: 16px 32px.
*   **Secondary (Architectural):** No background. 1px "Ghost Border" (`outline_variant` at 20%). Hover state transitions to a subtle `surface_variant` fill.
*   **CTA Animation:** On hover, the Gold Accent (`secondary`) should be used for the text color or a small geometric arrow icon.

### Cards & Project Showcases
*   **Strict Rule:** No dividers. Use `margin-bottom: 64px` to separate projects.
*   **Layout:** Use asymmetrical image-to-text ratios (e.g., 60% image, 40% text) to break the "standard grid" feel.

### Input Fields
*   **Style:** Underline only. Use `outline` (#747878) for the bottom border. 0px border-radius.
*   **Focus State:** The underline transitions to `secondary` (Gold). Labels should float upward in `label-sm` style.

### Navigation
*   **The Monolith Menu:** Use a full-screen "Curtain" menu instead of a standard dropdown. Large `display-md` links in `Syne` that change from `primary` to `secondary` on hover.

---

## 6. Do's and Don'ts

### Do:
*   **Embrace the 0px Radius:** Everything is sharp, precise, and architectural.
*   **Use Massive Scale:** Don't be afraid to make a heading 120px tall if it serves the "Monolith" aesthetic.
*   **Prioritize Negative Space:** If a section feels crowded, double the padding. "Luxury is space."
*   **Layer with Purpose:** Only use the Rust Accent (`tertiary`) for the most important action on a page (e.g., "Request a Quote").

### Don't:
*   **No Rounded Corners:** Never use `border-radius`. It softens the "Architectural" intent.
*   **No Standard Shadows:** Avoid CSS `box-shadow: 0 2px 4px rgba(0,0,0,0.5)`. It looks cheap and "out-of-the-box."
*   **No 1px Dividers:** Do not separate content with lines. Use the spacing scale and background color shifts (`surface` vs `surface-container`).
*   **No Generic Icons:** Avoid thin, rounded system icons. Use custom, geometric, sharp-edged iconography that matches the weight of the Syne typeface.