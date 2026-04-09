# Design System Strategy: The Architectural Warmth

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Architectural Atelier."** 

We are moving away from the cold, sterile minimalism of "white-cube" galleries toward a space that feels curated, grounded, and human-centric. This system rejects the generic "SaaS-flat" aesthetic in favor of **Tonal Depth and Editorial Intent.** 

The layout should feel like a high-end architectural monograph: generous white space (which we call "Paper"), intentional asymmetry, and a focus on materiality. We break the grid by allowing elements to overlap slightly and by using typography scales that create a clear, authoritative hierarchy. The goal is a digital experience that feels "built" rather than "rendered."

---

## 2. Colors: Tonal Depth & The Material Palette
This system is built on a foundation of "Ink," "Paper," and "Gold." We avoid pure #000000 and #FFFFFF to ensure the interface feels warm and premium.

### Palette Strategy
*   **The "No-Line" Rule:** Under no circumstances should 1px solid borders be used to define sections. Boundaries must be created through **Tonal Shifts**. To separate a hero from a feature section, shift from `surface` to `surface-container-low`.
*   **Surface Hierarchy:** Use the `surface-container` tiers to create a "nested" physical reality. 
    *   *Base:* `surface` (#fcf9f3)
    *   *Secondary Depth:* `surface-container-low` (#f6f3ed)
    *   *Elevated Content:* `surface-container-lowest` (#ffffff)
*   **The "Glass & Gradient" Rule:** Main CTAs or Featured Hero sections should utilize a subtle linear gradient from `primary` (#735b28) to `primary_container` (#c8a96e). This provides a "shimmer" effect that mimics light hitting a metallic surface.
*   **The Rust Accent:** The `tertiary` (#a8391a) "Rust" color is used sparingly. It is reserved for high-signal moments—badges, notification dots, or active states—to provide a sudden, warm focal point.

---

## 3. Typography: The Editorial Voice
We pair the geometric precision of **Lexend** with the approachable utility of **Plus Jakarta Sans** (our interpretation of the requested softer body text).

*   **Display (Lexend):** Used for massive, evocative headings. `display-lg` should be set with tight letter-spacing (-0.02em) to give it a "locked-in" architectural feel.
*   **Headline (Lexend):** Professional and structured. These serve as the "beams" of the layout.
*   **Title & Body (Plus Jakarta Sans):** These levels provide the "softness." By using a high-quality sans-serif for body text, we ensure that long-form content is readable without losing the premium edge.
*   **Hierarchy as Identity:** Always maintain a significant size contrast between `headline-lg` and `body-lg`. If everything is the same size, nothing is premium.

---

## 4. Elevation & Depth: Tonal Layering
We do not use structural lines to define space. We use light and layering.

*   **The Layering Principle:** Depth is achieved by "stacking." A card is not a box with a border; it is a `surface-container-lowest` (#ffffff) shape sitting on a `surface-container-low` (#f6f3ed) background.
*   **Ambient Shadows:** If a floating element (like a modal or a primary menu) requires a shadow, it must be "Atmospheric."
    *   *Blur:* 40px - 60px
    *   *Opacity:* 4-6%
    *   *Color:* Use a tinted version of `on-surface` (#1c1c18) rather than black to ensure the shadow feels like a natural obstruction of light.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility, use the `outline_variant` (#d0c5b5) at **15% opacity**. It should be felt, not seen.
*   **Glassmorphism:** For navigation bars or floating action buttons, use `surface` (#fcf9f3) at 80% opacity with a `backdrop-filter: blur(12px)`. This allows the "warmth" of the underlying content to bleed through.

---

## 5. Components

### Buttons
*   **Primary:** A gradient fill from `primary` to `primary_container`. Text is `on_primary`. Radius is `md` (0.375rem) to keep it architectural but not sharp.
*   **Secondary:** An "Ink" text button using `on_surface` with no background, only a `surface_variant` hover state.
*   **Tertiary:** Reserved for "Rust" accents. Use for small "New" badges or urgent calls to action.

### Cards & Lists
*   **The No-Divider Rule:** Explicitly forbid horizontal lines between list items. Use **24px vertical padding** (from the spacing scale) and a subtle shift to `surface-container-high` on hover to define the row.
*   **Card Styling:** Use `surface-container-lowest` with a `xl` (0.75rem) radius for a softer, inviting feel. No borders.

### Input Fields
*   **Text Inputs:** Use a soft fill of `surface-container-highest` with a bottom-only "Ghost Border" that transitions to `primary` (#735b28) at 2px height on focus. This mimics a tactile architectural ledge.

### Chips & Badges
*   **Selection Chips:** Use `primary_fixed` (#ffdea3) with `on_primary_fixed` (#261900) text. The warm gold tone signifies high value.

---

## 6. Do’s and Don’ts

### Do
*   **DO** use intentional asymmetry. Align a heading to the left and a body paragraph to the right to create "breathing room."
*   **DO** use `tertiary` (Rust) for micro-interactions to add a human "pulse" to the design.
*   **DO** treat typography as an image. Play with scale to create a sense of grandeur.

### Don't
*   **DON'T** use 1px solid black borders. It breaks the "Architectural" illusion.
*   **DON'T** use pure white backgrounds unless it is for a specific "Elevated Card" (`surface-container-lowest`). The default state is always `surface` (#fcf9f3).
*   **DON'T** crowd the layout. If you think there is enough space, add 16px more. High-end design is defined by what you leave out.