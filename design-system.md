# The Master Parent Design System (MPDS)
## A Universal Source of Truth for Modern SaaS & Web Application Component Architecture

This document serves as the absolute source of truth for the **Master Parent Design System (MPDS)**. It provides a complete design language, design tokens, responsive layout strategies, semantic HTML structures, and class-based CSS specifications for all core visual components required to build any web application, dashboard, or SaaS product.

---

## 📂 Table of Contents
1. [Core Design Tokens & Theme Variables](#1-core-design-tokens--theme-variables)
2. [Layout & Grid Shells](#2-layout--grid-shells)
3. [Base Components](#3-base-components)
   * [A. Buttons & Actions](#a-buttons--actions)
   * [B. Inputs & Form Fields](#b-inputs--form-fields)
   * [C. Selection Controls (Checkboxes, Radios, Toggles)](#c-selection-controls-checkboxes-radios-toggles)
   * [D. Badges & Status Tags](#d-badges--status-tags)
4. [Navigation Components](#4-navigation-components)
   * [A. Sidebar & Header Anchors](#a-sidebar--header-anchors)
   * [B. Tab Systems & Segmented Controls](#b-tab-systems--segmented-controls)
   * [C. Breadcrumbs & Pagination](#c-breadcrumbs--pagination)
5. [Data & Display Surfaces](#5-data--display-surfaces)
   * [A. Content Cards](#a-content-cards)
   * [B. Data Tables](#b-data-tables)
   * [C. Accordions & Collapsibles](#c-accordions--collapsibles)
6. [Overlays & Feedback Systems](#6-overlays--feedback-systems)
   * [A. Modals & Dialogs](#a-modals--dialogs)
   * [B. Slide-Out Drawers](#b-slide-out-drawers)
   * [C. Toasts & Alert Banners](#c-toasts--alert-banners)
   * [D. Tooltips](#d-tooltips)
7. [Loading States & Placeholders](#7-loading-states--placeholders)
   * [A. Spinners & Progress Indicators](#a-spinners--progress-indicators)
   * [B. Skeleton Placeholders](#b-skeleton-placeholders)
8. [System States & Micro-interactions](#8-system-states--micro-interactions)

---

## 1. Core Design Tokens & Theme Variables

The Master Parent Design System supports native system dark/light switching through standard CSS variables.

```css
/* --- Light Mode (Default) --- */
:root {
  /* Surface Colors */
  --bg-app: 0 0% 100%;                  /* Canvas background */
  --bg-surface: 0 0% 98%;              /* Secondary panels, menus */
  --bg-card: 0 0% 100%;                /* Card element backgrounds */
  --bg-popover: 0 0% 100%;             /* Floating dropdowns and popups */

  /* Text Colors */
  --text-primary: 240 10% 3.9%;        /* Primary title text */
  --text-secondary: 240 3.8% 46.1%;    /* Subheadings, meta labels */
  --text-muted: 240 3.8% 65%;          /* Placeholder / disabled state text */

  /* Component Colors */
  --primary: 240 5.9% 10%;             /* Dominant primary colors */
  --primary-fg: 0 0% 98%;
  --secondary: 240 4.8% 95.9%;         /* Secondary action buttons */
  --secondary-fg: 240 5.9% 10%;
  --accent: 240 4.8% 95.9%;            /* Hover backgrounds, highlights */
  --accent-fg: 240 5.9% 10%;
  
  /* System Feedback */
  --success: 142 76.2% 36.3%;          /* Positive states */
  --success-fg: 355.6 100% 97.3%;
  --warning: 38 92% 50%;               /* Cautionary states */
  --warning-fg: 38 92% 5%;
  --destructive: 0 84.2% 60.2%;        /* Error / delete states */
  --destructive-fg: 0 0% 98%;

  /* Lines & Borders */
  --border: 240 5.9% 90%;
  --input: 240 5.9% 90%;
  --ring: 240 5% 64.9%;

  /* Corners */
  --radius-xs: 0.25rem;
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-full: 9999px;
}

/* --- Dark Mode Override --- */
[data-theme="dark"] {
  --bg-app: 240 10% 3.9%;
  --bg-surface: 240 10% 5.5%;
  --bg-card: 240 10% 3.9%;
  --bg-popover: 240 10% 4.8%;

  --text-primary: 0 0% 98%;
  --text-secondary: 240 5% 64.9%;
  --text-muted: 240 4% 40%;

  --primary: 0 0% 98%;
  --primary-fg: 240 5.9% 10%;
  --secondary: 240 3.7% 15.9%;
  --secondary-fg: 0 0% 98%;
  --accent: 240 3.7% 15.9%;
  --accent-fg: 0 0% 98%;

  --success: 142 70.6% 45.3%;
  --success-fg: 144 61% 10%;
  --destructive: 0 62.8% 30.6%;
  --destructive-fg: 0 0% 98%;

  --border: 240 3.7% 15.9%;
  --input: 240 3.7% 15.9%;
  --ring: 240 4.9% 83.9%;
}
```

---

## 2. Layout & Grid Shells

### A. Dashboard/Console Layout
Three-pane layout: responsive sidebar navigation panel, header action banner, and scrolling content grid.

```html
<div class="app-layout">
  <aside class="app-sidebar">...</aside>
  <div class="app-body">
    <header class="app-header">...</header>
    <main class="app-content">...</main>
  </div>
</div>
```

```css
.app-layout {
  display: flex;
  min-height: 100vh;
  background-color: hsl(var(--bg-app));
  color: hsl(var(--text-primary));
}

.app-sidebar {
  width: 250px;
  flex-shrink: 0;
  border-right: 1px solid hsl(var(--border));
  background-color: hsl(var(--bg-surface));
}

.app-body {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.app-header {
  height: 64px;
  border-bottom: 1px solid hsl(var(--border));
  display: flex;
  align-items: center;
  padding: 0 2rem;
}

.app-content {
  flex-grow: 1;
  padding: 2rem;
  overflow-y: auto;
}

@media (max-width: 768px) {
  .app-sidebar {
    display: none; /* Collapse sidebar on mobile (overlay flow) */
  }
}
```

---

## 3. Base Components

### A. Buttons & Actions
Flexible class structures with sizes and styles.

```html
<!-- Variants -->
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-outline">Outline</button>
<button class="btn btn-ghost">Ghost</button>
<button class="btn btn-destructive">Destructive</button>

<!-- Sizes -->
<button class="btn btn-primary btn-sm">Small</button>
<button class="btn btn-primary btn-md">Medium</button>
<button class="btn btn-primary btn-lg">Large</button>
```

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
  font-weight: 500;
  border-radius: var(--radius-sm);
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  user-select: none;
}

/* --- Sizes --- */
.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
}
.btn-md {
  padding: 0.5rem 1rem;
  font-size: 0.825rem;
}
.btn-lg {
  padding: 0.75rem 1.5rem;
  font-size: 0.95rem;
}

/* --- Variants --- */
.btn-primary {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-fg));
}
.btn-primary:hover {
  opacity: 0.9;
}

.btn-secondary {
  background-color: hsl(var(--secondary));
  color: hsl(var(--secondary-fg));
}
.btn-secondary:hover {
  background-color: hsl(var(--accent));
}

.btn-outline {
  border-color: hsl(var(--border));
  background-color: transparent;
  color: hsl(var(--text-primary));
}
.btn-outline:hover {
  background-color: hsl(var(--accent));
}

.btn-ghost {
  background-color: transparent;
  color: hsl(var(--text-primary));
}
.btn-ghost:hover {
  background-color: hsl(var(--accent));
}

.btn-destructive {
  background-color: hsl(var(--destructive));
  color: hsl(var(--destructive-fg));
}
.btn-destructive:hover {
  opacity: 0.9;
}

.btn:active {
  transform: scale(0.98);
}
```

---

## 3. Base Components

### B. Inputs & Form Fields
Includes support for form validation states.

```html
<div class="form-group">
  <label class="form-label" for="email">Email Address</label>
  <input class="form-control" id="email" placeholder="you@domain.com" type="email" />
  <span class="form-help">Enter your primary business account.</span>
</div>

<!-- Validation Error State -->
<div class="form-group error">
  <label class="form-label" for="password">Password</label>
  <input class="form-control" id="password" type="password" />
  <span class="form-error-msg">Password must be at least 8 characters.</span>
</div>
```

```css
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-bottom: 1.25rem;
}

.form-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: hsl(var(--text-secondary));
}

.form-control {
  border-radius: var(--radius-sm);
  border: 1px solid hsl(var(--input));
  background-color: transparent;
  color: hsl(var(--text-primary));
  padding: 0.5rem 0.75rem;
  font-size: 0.825rem;
  font-family: inherit;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-control:focus {
  outline: none;
  border-color: hsl(var(--ring));
  box-shadow: 0 0 0 2px hsl(var(--ring) / 0.15);
}

.form-help {
  font-size: 0.7rem;
  color: hsl(var(--text-secondary) / 0.85);
}

/* Error States */
.form-group.error .form-control {
  border-color: hsl(var(--destructive));
}

.form-group.error .form-control:focus {
  box-shadow: 0 0 0 2px hsl(var(--destructive) / 0.15);
}

.form-error-msg {
  font-size: 0.7rem;
  color: hsl(var(--destructive));
  font-weight: 500;
}
```

---

### C. Selection Controls (Checkboxes, Radios, Toggles)
Native elements are custom-styled to support dark/light theme options.

```html
<!-- Checkbox -->
<label class="control-label">
  <input class="checkbox-input" type="checkbox" />
  <span>Accept Agreement</span>
</label>

<!-- Toggle Switch -->
<label class="switch-label">
  <input class="switch-input" type="checkbox" />
  <span class="switch-track"></span>
  <span>Dark Mode Activation</span>
</label>
```

```css
.control-label {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.825rem;
  cursor: pointer;
}

.checkbox-input {
  appearance: none;
  width: 16px;
  height: 16px;
  border: 1px solid hsl(var(--input));
  border-radius: var(--radius-xs);
  cursor: pointer;
  position: relative;
}

.checkbox-input:checked {
  background-color: hsl(var(--primary));
  border-color: hsl(var(--primary));
}

.checkbox-input:checked::after {
  content: "";
  position: absolute;
  left: 5px;
  top: 2px;
  width: 4px;
  height: 8px;
  border: solid hsl(var(--primary-fg));
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

/* --- Toggle Switch --- */
.switch-label {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.825rem;
  cursor: pointer;
}

.switch-input {
  display: none;
}

.switch-track {
  width: 34px;
  height: 20px;
  background-color: hsl(var(--secondary));
  border-radius: var(--radius-full);
  position: relative;
  transition: background-color 0.2s;
}

.switch-track::after {
  content: "";
  position: absolute;
  left: 2px;
  top: 2px;
  width: 16px;
  height: 16px;
  border-radius: var(--radius-full);
  background-color: hsl(var(--text-primary));
  transition: transform 0.2s;
}

.switch-input:checked + .switch-track {
  background-color: hsl(var(--primary));
}

.switch-input:checked + .switch-track::after {
  transform: translateX(14px);
  background-color: hsl(var(--primary-fg));
}
```

---

### D. Badges & Status Tags
Non-clickable status text items with colored background labels.

```html
<span class="badge badge-neutral">Draft</span>
<span class="badge badge-success">Active</span>
<span class="badge badge-error">Rejected</span>
```

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.2rem 0.5rem;
  font-size: 0.68rem;
  font-weight: 600;
  border-radius: var(--radius-xs);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: 1px solid transparent;
}

.badge-neutral {
  background-color: hsl(var(--secondary));
  color: hsl(var(--secondary-fg));
  border-color: hsl(var(--border));
}

.badge-success {
  background-color: hsl(var(--success) / 0.1);
  color: hsl(var(--success));
  border-color: hsl(var(--success) / 0.2);
}

.badge-error {
  background-color: hsl(var(--destructive) / 0.1);
  color: hsl(var(--destructive));
  border-color: hsl(var(--destructive) / 0.2);
}
```

---

## 4. Navigation Components

### A. Sidebar & Header Anchors

```html
<nav class="nav-stack">
  <a href="#" class="nav-link active">
    <svg>...</svg> Dashboard
  </a>
  <a href="#" class="nav-link">
    <svg>...</svg> Projects
  </a>
</nav>
```

```css
.nav-stack {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.45rem 0.75rem;
  font-size: 0.825rem;
  font-weight: 500;
  color: hsl(var(--text-secondary));
  text-decoration: none;
  border-radius: var(--radius-sm);
  transition: all 0.2s;
}

.nav-link:hover {
  background-color: hsl(var(--accent));
  color: hsl(var(--accent-fg));
}

.nav-link.active {
  background-color: hsl(var(--secondary));
  color: hsl(var(--secondary-fg));
  font-weight: 600;
}
```

---

### B. Tab Systems & Segmented Controls
A clean slider container with pill buttons.

```html
<div class="segmented-tabs">
  <button class="tab-btn active">Overview</button>
  <button class="tab-btn">Settings</button>
</div>
```

```css
.segmented-tabs {
  display: inline-flex;
  background-color: hsl(var(--secondary) / 0.5);
  border-radius: var(--radius-md);
  padding: 0.2rem;
  border: 1px solid hsl(var(--border));
}

.tab-btn {
  padding: 0.35rem 0.85rem;
  font-size: 0.8rem;
  font-weight: 500;
  border-radius: var(--radius-sm);
  border: none;
  background-color: transparent;
  color: hsl(var(--text-secondary));
  cursor: pointer;
  transition: all 0.2s;
}

.tab-btn:hover {
  color: hsl(var(--text-primary));
}

.tab-btn.active {
  background-color: hsl(var(--bg-card));
  color: hsl(var(--text-primary));
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
```

---

### C. Breadcrumbs & Pagination

```html
<!-- Breadcrumbs -->
<nav class="breadcrumbs">
  <a href="#">Home</a>
  <span class="divider">/</span>
  <a href="#">Projects</a>
  <span class="divider">/</span>
  <span class="current">Details</span>
</nav>
```

```css
.breadcrumbs {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
}

.breadcrumbs a {
  color: hsl(var(--text-secondary));
  text-decoration: none;
}

.breadcrumbs a:hover {
  color: hsl(var(--text-primary));
}

.breadcrumbs .divider {
  color: hsl(var(--text-muted));
}

.breadcrumbs .current {
  color: hsl(var(--text-primary));
  font-weight: 500;
}
```

---

## 5. Data & Display Surfaces

### A. Content Cards
Universal grid cards featuring a clear header division.

```html
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Analytics Summary</h3>
  </div>
  <div class="card-body">
    <p>Performance indicators display positive returns.</p>
  </div>
</div>
```

```css
.card {
  background-color: hsl(var(--bg-card));
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.card-header {
  padding: 1.25rem;
  border-bottom: 1px solid hsl(var(--border));
}

.card-title {
  font-size: 0.95rem;
  font-weight: 600;
  margin: 0;
}

.card-body {
  padding: 1.25rem;
  font-size: 0.825rem;
  color: hsl(var(--text-secondary));
}
```

---

### B. Data Tables
Features sticky headers, overflow behavior, and subtle border lines.

```html
<div class="table-container">
  <table class="data-table">
    <thead>
      <tr>
        <th>Project Name</th>
        <th>Budget</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Log Engine</td>
        <td>$14,500</td>
        <td><span class="badge badge-success">Done</span></td>
      </tr>
    </tbody>
  </table>
</div>
```

```css
.table-container {
  overflow-x: auto;
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius-md);
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.8rem;
}

.data-table th, .data-table td {
  padding: 0.75rem 1.0rem;
}

.data-table th {
  background-color: hsl(var(--bg-surface));
  color: hsl(var(--text-secondary));
  font-weight: 600;
  border-bottom: 1px solid hsl(var(--border));
}

.data-table td {
  border-bottom: 1px solid hsl(var(--border) / 0.5);
  color: hsl(var(--text-primary));
}

.data-table tbody tr:last-child td {
  border-bottom: none;
}

.data-table tbody tr:hover td {
  background-color: hsl(var(--accent) / 0.2);
}
```

---

### C. Accordions & Collapsibles

```html
<details class="accordion-item">
  <summary class="accordion-trigger">How do I change the billing?</summary>
  <div class="accordion-content">
    <p>Navigate to Settings > Billing and click "Update payment method".</p>
  </div>
</details>
```

```css
.accordion-item {
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius-md);
  margin-bottom: 0.5rem;
  overflow: hidden;
}

.accordion-trigger {
  padding: 0.75rem 1.0rem;
  font-size: 0.825rem;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
  background-color: hsl(var(--bg-surface));
}

.accordion-trigger:focus {
  outline: none;
}

.accordion-content {
  padding: 1.0rem;
  font-size: 0.8rem;
  border-top: 1px solid hsl(var(--border));
  color: hsl(var(--text-secondary));
  background-color: hsl(var(--bg-card));
}
```

---

## 6. Overlays & Feedback Systems

### A. Modals & Dialogs
Centered screen overlay with backdrop filters.

```html
<div class="modal-backdrop">
  <div class="modal-card">
    <div class="modal-body">
      <h3 style="margin-top:0;">Confirmation Dialog</h3>
      <p>Are you sure you want to delete this resource?</p>
    </div>
    <div class="modal-footer">
      <button class="btn btn-outline">Cancel</button>
      <button class="btn btn-destructive">Delete</button>
    </div>
  </div>
</div>
```

```css
.modal-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-card {
  background-color: hsl(var(--bg-card));
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius-lg);
  width: 100%;
  max-width: 480px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
}

.modal-body {
  padding: 1.5rem;
  font-size: 0.85rem;
  color: hsl(var(--text-secondary));
}

.modal-footer {
  padding: 1.0rem 1.5rem;
  border-top: 1px solid hsl(var(--border));
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}
```

---

### B. Slide-Out Drawers
A sidebar drawer that slides in from the right edge.

```css
.drawer-panel {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: 400px;
  background-color: hsl(var(--bg-card));
  border-left: 1px solid hsl(var(--border));
  box-shadow: -10px 0 25px -5px rgba(0, 0, 0, 0.15);
  z-index: 900;
  display: flex;
  flex-direction: column;
  transform: translateX(100%); /* Controlled via transition / state class */
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.drawer-panel.open {
  transform: translateX(0);
}
```

---

### C. Toasts & Alert Banners

```html
<!-- Alert Banner -->
<div class="alert alert-error">
  <svg>...</svg>
  <span>Your session has expired. Please log in again.</span>
</div>

<!-- Toast Box -->
<div class="toast">
  <span>Changes successfully saved!</span>
</div>
```

```css
.alert {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.0rem;
  border-radius: var(--radius-md);
  font-size: 0.8rem;
  border: 1px solid transparent;
  margin-bottom: 1.0rem;
}

.alert-error {
  background-color: hsl(var(--destructive) / 0.1);
  color: hsl(var(--destructive));
  border-color: hsl(var(--destructive) / 0.2);
}

/* --- Toast --- */
.toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
  background-color: hsl(var(--bg-card));
  border: 1px solid hsl(var(--border));
  padding: 0.75rem 1.25rem;
  border-radius: var(--radius-md);
  font-size: 0.825rem;
  font-weight: 500;
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
}
```

---

### D. Tooltips

```html
<span class="tooltip-container" data-tooltip="This deletes files permanently.">
  <button class="btn btn-sm btn-outline">Delete Folder</button>
</span>
```

```css
.tooltip-container {
  position: relative;
  display: inline-block;
}

.tooltip-container::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: calc(100% + 5px);
  left: 50%;
  transform: translateX(-50%) scale(0.95);
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-fg));
  font-size: 0.68rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-xs);
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s, transform 0.15s;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
}

.tooltip-container:hover::after {
  opacity: 1;
  transform: translateX(-50%) scale(1);
}
```

---

## 7. Loading States & Placeholders

### A. Spinners & Progress Indicators

```html
<!-- Spinner -->
<div class="spinner"></div>

<!-- Progress Bar -->
<div class="progress-bar">
  <div class="progress-fill" style="width: 45%;"></div>
</div>
```

```css
.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid hsl(var(--border));
  border-top-color: hsl(var(--text-primary));
  border-radius: var(--radius-full);
  animation: spin-anim 0.6s linear infinite;
}

@keyframes spin-anim {
  to { transform: rotate(360deg); }
}

/* --- Progress Bar --- */
.progress-bar {
  height: 6px;
  background-color: hsl(var(--secondary));
  border-radius: var(--radius-full);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: hsl(var(--primary));
  transition: width 0.3s ease;
}
```

---

### B. Skeleton Placeholders
Shimmering skeletons placeholder panels.

```html
<div class="skeleton skeleton-card"></div>
```

```css
.skeleton {
  background: linear-gradient(
    90deg,
    gradient-color 25%,
    hsl(var(--accent)) 37%,
    gradient-color 63%
  );
  background-size: 400% 100%;
  animation: shimmer-anim 1.4s ease infinite;
}

@keyframes shimmer-anim {
  0% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.skeleton-card {
  height: 120px;
  border-radius: var(--radius-md);
}
```

---

## 8. System States & Micro-interactions
Interactive responses applied system-wide:

* **Transitions**: Apply `transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1)` to hover actions, buttons, and popovers.
* **Focus States**: Native elements use clean focus outlines:
  ```css
  :focus-visible {
    outline: 2px solid hsl(var(--ring));
    outline-offset: 2px;
  }
  ```
* **Click feedback**: Buttons shift down `1px` on active click simulation.
