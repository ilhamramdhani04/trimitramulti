# Design System: Architectural Warmth & Precision

## 1. Overview & Creative North Star: "The Tactile Architect"
This design system moves away from the cold, clinical sterility of traditional architectural portfolios and toward a philosophy we call **The Tactile Architect**. 

Our goal is to balance the rigorous precision of engineering with the sensory warmth of high-end physical materials. We break the "digital template" by utilizing intentional asymmetry, generous white space, and a layering strategy that mimics stacked architectural vellum. This is not a flat interface; it is a curated editorial experience where every pixel feels intentional, weighted, and human.

---

## 2. Colors: Materiality & Depth
The palette transitions from monochrome to a rich, organic spectrum. We treat color as "material"—using it to define space rather than just decorating it.

### Surface Hierarchy & The "No-Line" Rule
To achieve a premium feel, **1px solid borders are strictly prohibited for sectioning.** Boundaries must be defined through tonal shifts.
*   **The Layering Principle:** Use the `surface-container` tiers to create depth. A `surface-container-low` section sitting on a `surface` background creates a natural, sophisticated break without the "cheapness" of a line.
*   **Nesting:** Treat the UI as physical layers. An inner card (`surface-container-lowest`) should sit atop a section background (`surface-container-low`) to provide a soft, natural lift.

### Signature Textures
*   **The "Glass & Gradient" Rule:** Use Glassmorphism for floating navigation or modal overlays. Utilize `surface` colors at 70-80% opacity with a `24px` backdrop-blur. 
*   **Soulful CTAs:** Move beyond flat fills. Use a subtle linear gradient from `secondary` (#735b28) to `secondary_container` (#fedb9c) for primary actions to give them a "metallic" glow reminiscent of brass or gold leaf.

---

## 3. Typography: Editorial Authority
Typography is the skeletal structure of this system. By pairing the weighted, humanist geometry of **Epilogue** with the high-legibility precision of **Manrope**, we create a dialogue between form and function.

*   **Display & Headlines (Epilogue):** These are our "structural beams." They should be used with generous leading (1.1 - 1.2) and often placed with intentional asymmetry to draw the eye.
*   **Body & Labels (Manrope):** These provide the "technical specs." Manrope’s clean apertures ensure readability even at the smallest `label-sm` scale.
*   **Hierarchy as Identity:** Use `display-lg` for hero statements to evoke the feeling of a premium architectural monograph.

---

## 4. Elevation & Depth: Tonal Layering
We reject the standard "drop shadow" in favor of environmental lighting.

*   **Ambient Shadows:** If an element must float, shadows must be ultra-diffused. Use a blur of `40px-60px` with an opacity of `4%-6%` using the `on-surface` tint. It should feel like a soft shadow cast on a paper model, not a digital effect.
*   **The "Ghost Border" Fallback:** If a container requires a boundary for accessibility (e.g., input fields), use the `outline-variant` token at **15% opacity**. This creates a "whisper" of a line that maintains the "No-Line" Rule.
*   **Glassmorphism:** For high-end components like floating headers, use semi-transparent `surface` tokens. This allows the "Rust" (`tertiary`) and "Gold" (`secondary`) accents of the background to bleed through, integrating the UI into the environment.

---

## 5. Components: Precision Elements

### Buttons
*   **Primary:** A bold statement. Use `secondary` (Gold) or `tertiary` (Rust) backgrounds. Roundedness is kept at `md` (0.375rem) to maintain an architectural edge—avoid full pill shapes unless for small tags.
*   **Secondary/Ghost:** Never a solid border. Use a subtle `surface-container-high` background that shifts to `surface-container-highest` on hover.

### Cards & Lists
*   **The Separation Rule:** Forbid the use of divider lines. Separate list items or card groups using vertical whitespace from the Spacing Scale (typically `24px` to `32px`) or a subtle shift from `surface` to `surface-container-low`.

### Input Fields
*   **Refinement:** Use `surface-container-lowest` for the field fill. Instead of a heavy border, use a `2px` bottom-only stroke in `outline-variant` that transitions to `secondary` (Gold) on focus.

### Additional Signature Component: The "Architectural Inset"
*   **The Inset Quote/Stat:** A large `display-md` number or quote set against a `surface-container-highest` block with a `4px` left-accent border in `tertiary` (Rust). This breaks the grid and adds editorial flair.

---

## 6. Do’s and Don’ts

### Do:
*   **Do** use `tertiary` (Rust) for micro-interactions, such as active states in navigation or iconography, to add "human warmth."
*   **Do** embrace white space. If a layout feels crowded, increase the spacing rather than adding a border.
*   **Do** use `surface` (#fcf9f3) as your primary canvas to evoke the feeling of high-quality architectural paper.

### Don’t:
*   **Don't** use pure black (#000000). Always use `on-background` (#1c1c18) for text to keep the "Ink on Paper" soft-contrast feel.
*   **Don't** use the `full` roundedness token for structural elements. It breaks the architectural precision. Reserve `full` only for chips and small status indicators.
*   **Don't** use high-contrast dividers. If you feel the need to "separate" two sections, use a 50px vertical gap instead of a line.