# Oykot Product Design System (MPDS)

Welcome to the **Oykot Product Design System (MPDS)** repository. This repository serves as the universal parent design system and source of truth for all modern web applications, dashboards, and SaaS products built under the Oykot brand.

## 📂 Structure
* **[design-system.md](design-system.md)**: The master component specification sheet containing all CSS variables, typography mappings, layout shells, basic controls (buttons, inputs), navigation layouts, card widgets, overlays (modals, drawers, toasts), and skeleton load states.

## 🚀 How to Use this Design System
1. **Initialize a New Project**: Clone or pull this repository as a submodule or context into your new project workspace.
2. **Apply Global Tokens**: Copy the HSL theme variables in Section 1 of `design-system.md` into your global CSS layout stylesheet (`index.css`, `globals.css`).
3. **Assemble Component HTML/CSS**: Copy-paste the semantic HTML and CSS segments corresponding to the widgets you want (Buttons, Text Inputs, Segmented Tabs, Cards, Modal overlays, etc.) directly into your application.
4. **Compile Themes**: Supports native system dark/light switching out of the box using `[data-theme="dark"]` attribute targeting on the document HTML element.
