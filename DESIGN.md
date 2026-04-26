# Design System Strategy: Ethereal Zen & Therapeutic Monolith

## 1. Overview & Creative North Star: "The Digital Sanctuary"
This design system is a departure from the frantic, high-stimulation patterns of traditional gamification. Our Creative North Star is **"The Digital Sanctuary."** We are evolving the rigid, monolithic structures of the past into something that feels architectural yet breathable—Quiet Luxury meets Digital Zen.

To break the "template" look, we abandon the rigid 12-column grid in favor of **Intentional Asymmetry**. Large-scale typography should overlap subtle surface transitions, and elements should feel like they are floating in a pressurized, ethereal space. The goal is to make the user feel as though they are interacting with light and shadow rather than buttons and boxes.

---

## 2. Colors & Surface Philosophy
The palette is rooted in high-contrast light mode, utilizing a sophisticated range of off-whites and warm grays to prevent eye strain while maintaining a premium, editorial feel.

### The "No-Line" Rule
**Explicit Instruction:** You are prohibited from using 1px solid borders for sectioning. Boundaries must be defined solely through background color shifts. 
- A section transition occurs when moving from `surface` (#f9f9f9) to `surface-container-low` (#f2f4f4).
- Structure is born from tone, not lines.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers, like stacked sheets of fine vellum.
- **Base Layer:** `surface` (#f9f9f9).
- **Sub-Sectioning:** `surface-container-low` (#f2f4f4).
- **Interactive Elements:** `surface-container-lowest` (#ffffff) to provide a "lifted" feel.
- **High-Priority Modals:** `surface-bright` (#f9f9f9) with a `backdrop-blur`.

### The "Glass & Gradient" Rule
To achieve the "Ethereal" quality, use **Glassmorphism** for floating cards and navigation bars.
- **Glass Token:** `surface-container-lowest` at 70% opacity with a `24px backdrop-blur`.
- **Signature Textures:** For primary CTAs or hero moments, apply a subtle linear gradient from `primary` (#5f5e5e) to `primary-container` (#e5e2e1). This adds a metallic, silken "soul" to the interface.

---

## 3. Typography: Architectural Narrative
We use **Manrope** for its geometric clarity and architectural "bones." To move beyond standard UI, we use varied weights to create a "narrative flow."

- **Display (L/M/S):** Light (300) weight. These should have generous letter-spacing (-0.02em) and act as the "sculpture" on the page.
- **Headlines (L/M/S):** Semibold (600). These provide the structural anchor.
- **Titles (L/M/S):** Medium (500). Use these for clear, confident labeling.
- **Body (L/M/S):** Regular (400). Optimized for readability with a slightly increased line-height (1.6) to provide "Zen" breathing room.
- **Labels:** Bold (700) and All-Caps for metadata. This provides a "High-End Editorial" contrast against the softer body text.

---

## 4. Elevation & Depth: Tonal Layering
We do not use drop shadows to represent distance; we use light.

### The Layering Principle
Depth is achieved by "stacking" the surface-container tiers. Place a `surface-container-lowest` (#ffffff) card on a `surface-container-low` (#f2f4f4) section. The delta in brightness creates a soft, natural lift.

### Ambient Shadows & "Glowing Embers"
When an element must float (e.g., a therapeutic modal):
- **Shadow:** Use the `on-surface` color (#2d3435) at 4% opacity with a 40px blur. 
- **Focus States:** This is the system's signature. A focused element should not have a blue ring. It should have a soft, internal glow using `secondary_container` (#ffdcc4) and a 15px outer blur, mimicking a **"glowing ember."**

### The "Ghost Border" Fallback
If accessibility requires a container boundary, use a **Ghost Border**: `outline-variant` (#adb3b4) at 15% opacity. Never use a 100% opaque border.

---

## 5. Components: Therapeutic Primitives

### Buttons: The "Soft Tactile" Approach
- **Primary:** Gradient from `primary` (#5f5e5e) to `primary_dim` (#535252). Corner radius: `md` (0.375rem).
- **Secondary:** Surface-only. `surface-container-highest` (#dde4e5) with `on-surface` text.
- **Interaction:** On hover, the button shouldn't just darken; it should "exhale," increasing its backdrop-blur or shifting the gradient subtly toward `primary_fixed_dim`.

### Cards & Lists: The "No-Divider" Rule
Forbid the use of divider lines. Separate items using:
- **Vertical White Space:** Use exactly `2rem` (32px) of space between list items.
- **Subtle Tonal Shifts:** Alternate backgrounds between `surface` and `surface-container-low` for large list arrays.

### Therapeutic Input Fields
- **Default State:** A simple `surface-container-highest` fill with no border. 
- **Focus State:** The "Ember" effect. The background shifts to `surface-container-lowest` and an outer glow of `secondary_container` (#ffdcc4) appears.
- **Labels:** Always use `label-md` (Bold, All-Caps) positioned 8px above the field to maintain architectural alignment.

### Progress Embers (Custom Gamification Component)
Instead of a standard progress bar, use a series of soft-blur circles. As the user progresses, the circles transition from `primary_container` (dim) to `secondary` (#8f4f14), glowing with the "ember" focus effect.

---

## 6. Do's and Don'ts

### Do:
- **Embrace White Space:** If you think there is enough padding, add 20% more. Zen requires "Ma" (the space between).
- **Use Intentional Asymmetry:** Align text to the left but place imagery or secondary actions on a slightly offset grid to create visual interest.
- **Layer Tones:** Use the full spectrum of `surface-container` tokens to create a sense of physical objects resting on each other.

### Don't:
- **Don't use pure black:** Use `on-surface` (#2d3435) for all high-contrast text.
- **Don't use hard corners:** Stick to the `md` (0.375rem) and `lg` (0.5rem) roundedness scale to keep the experience "soft."
- **Don't use "Gamification Blue":** Stick to the therapeutic earth tones—`secondary` (ambers) and `tertiary` (terracotta)—to keep the user grounded.