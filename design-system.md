# The Master Parent Design System (MPDS)
## The Universal Design Specification & Component Library Blueprint

This document is the absolute source of truth for the **Master Parent Design System (MPDS)**. It defines the design tokens, visual guidelines, markup schemas (semantic HTML), and class-based CSS specifications for all building block components required to build any web application, dashboard, or SaaS product.

---

## 📂 Table of Contents
1. [Design Tokens & Theme Variables](#1-design-tokens--theme-variables)
2. [Layout & Grid Shells](#2-layout--grid-shells)
3. [Forms & Inputs](#3-forms--inputs)
4. [Images, Icons & Avatars](#4-images-icons--avatars)
5. [Labels & Badges](#5-labels--badges)
6. [Layout & Structure Primitives](#6-layout--structure-primitives)
7. [Loading Indicators](#7-loading-indicators)
8. [Messaging & Feedback Systems](#8-messaging--feedback-systems)
9. [Navigation Systems](#9-navigation-systems)
10. [Overlays & Layering](#10-overlays--layering)
11. [Text & Data Display](#11-text--data-display)
12. [System States & Micro-interactions](#12-system-states--micro-interactions)

---

## 1. Design Tokens & Theme Variables

```css
/* --- Light Mode (Default) --- */
:root, [data-theme="light"] {
  --bg-app: 240 10% 99%;                  
  --bg-surface: 240 4.8% 95.9%;              
  --bg-card: 0 0% 100%;                
  --bg-popover: 0 0% 100%;             

  --text-primary: 240 10% 3.9%;        
  --text-secondary: 240 3.8% 46.1%;    
  --text-muted: 240 3.8% 65%;          

  --primary: 240 5.9% 10%;             
  --primary-fg: 0 0% 98%;
  --secondary: 240 4.8% 95.9%;         
  --secondary-fg: 240 5.9% 10%;
  --accent: 240 4.8% 90%;            
  --accent-fg: 240 5.9% 10%;
  
  --success: 142 76.2% 36.3%;          
  --success-fg: 355.6 100% 97.3%;
  --warning: 38 92% 50%;               
  --warning-fg: 38 92% 5%;
  --destructive: 0 84.2% 60.2%;        
  --destructive-fg: 0 0% 98%;

  --border: 240 5.9% 90%;
  --input: 240 5.9% 88%;
  --ring: 240 5% 64.9%;

  --radius-xs: 0.25rem;
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-full: 9999px;
}

/* --- Dark Mode --- */
[data-theme="dark"] {
  --bg-app: 240 10% 3.9%;
  --bg-surface: 240 10% 5.5%;
  --bg-card: 240 10% 4.8%;
  --bg-popover: 240 10% 4.8%;

  --text-primary: 0 0% 98%;
  --text-secondary: 240 5% 64.9%;
  --text-muted: 240 4% 40%;

  --primary: 0 0% 98%;
  --primary-fg: 240 5.9% 10%;
  --secondary: 240 3.7% 15.9%;
  --secondary-fg: 0 0% 98%;
  --accent: 240 3.7% 20%;            
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
.app-layout { display: flex; min-height: 100vh; background-color: hsl(var(--bg-app)); color: hsl(var(--text-primary)); }
.app-sidebar { width: 250px; flex-shrink: 0; border-right: 1px solid hsl(var(--border)); background-color: hsl(var(--bg-surface)); }
.app-body { flex-grow: 1; display: flex; flex-direction: column; min-width: 0; }
.app-header { height: 64px; border-bottom: 1px solid hsl(var(--border)); display: flex; align-items: center; padding: 0 2rem; }
.app-content { flex-grow: 1; padding: 2rem; overflow-y: auto; }
```

---

## 3. Forms & Inputs

### Button
```html
<button class="btn btn-primary btn-md">Button</button>
```
```css
.btn { display: inline-flex; align-items: center; justify-content: center; font-family: inherit; font-weight: 500; border-radius: var(--radius-sm); border: 1px solid transparent; cursor: pointer; transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1); user-select: none; }
.btn-primary { background-color: hsl(var(--primary)); color: hsl(var(--primary-fg)); }
.btn:active { transform: scale(0.97); }
```

### Calendar
```html
<div class="calendar-popover">
  <div class="calendar-grid">
    <button class="calendar-day-btn">1</button>
  </div>
</div>
```
```css
.calendar-popover { background-color: hsl(var(--popover)); border: 1px solid hsl(var(--border)); border-radius: var(--radius); padding: 0.65rem; }
.calendar-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 0.15rem; }
.calendar-day-btn { width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; border-radius: var(--radius-sm); border: none; background: transparent; cursor: pointer; }
.calendar-day-btn.selected { background-color: hsl(var(--primary)); color: hsl(var(--primary-fg)); }
```

### Checkbox
```html
<label class="control-label">
  <input class="checkbox-input" type="checkbox" />
  <span>Select item</span>
</label>
```
```css
.control-label { display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.825rem; }
.checkbox-input { appearance: none; width: 16px; height: 16px; border: 1px solid hsl(var(--input)); border-radius: var(--radius-xs); cursor: pointer; position: relative; }
.checkbox-input:checked { background-color: hsl(var(--primary)); border-color: hsl(var(--primary)); }
```

### Date Time Picker
```html
<div class="date-time-picker">
  <input class="form-control" type="date" />
  <input class="form-control" type="time" />
</div>
```

### Dropdown Menu
```html
<div class="vertical-menu">
  <button class="vertical-menu-item active">Edit Profile</button>
</div>
```
```css
.vertical-menu { display: flex; flex-direction: column; border: 1px solid hsl(var(--border)); border-radius: var(--radius-md); overflow: hidden; background-color: hsl(var(--bg-card)); }
.vertical-menu-item { padding: 0.6rem 1rem; font-size: 0.8rem; border: none; background: transparent; cursor: pointer; text-align: left; }
.vertical-menu-item.active { border-left: 3px solid hsl(var(--ring)); font-weight: 600; }
```

### Focus Ring & Focusable
```css
.focus-ring-demo {
  outline: 2px solid #ff9c3a; /* Caution custom color focus ring */
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}
```

### Form Layout
```html
<div class="form-group">
  <label class="form-label" for="email">Email</label>
  <input class="form-control" id="email" type="email" />
</div>
```

### Radio Buttons
```html
<label class="radio-label">
  <input class="radio-input" type="radio" name="group" />
  <span>Choice</span>
</label>
```
```css
.radio-label { display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.825rem; cursor: pointer; }
.radio-input { appearance: none; width: 16px; height: 16px; border: 1px solid hsl(var(--input)); border-radius: var(--radius-full); cursor: pointer; position: relative; }
.radio-input:checked { background-color: hsl(var(--bg-app)); border-color: hsl(var(--primary)); border-width: 5px; }
```

### Range Slider
```html
<input class="range-input" type="range" min="0" max="100" />
```
```css
.range-input { width: 100%; height: 6px; background: hsl(var(--secondary)); border-radius: var(--radius-full); outline: none; appearance: none; cursor: pointer; }
.range-input::-webkit-slider-thumb { appearance: none; width: 14px; height: 14px; border-radius: var(--radius-full); background: hsl(var(--primary)); }
```

### Select
```html
<select class="form-control">
  <option>Option 1</option>
</select>
```

### Text Area & Text Field
```html
<input class="form-control" type="text" />
<textarea class="form-control" rows="3"></textarea>
```

### Toggle Switch
```html
<label class="switch-label">
  <input class="switch-input" type="checkbox" />
  <span class="switch-track"></span>
  <span>Enable Toggle</span>
</label>
```

---

## 4. Images, Icons & Avatars

### Avatar & Avatar Group
```html
<div class="avatar-group">
  <div class="avatar">JD</div>
  <div class="avatar">AM</div>
</div>
```
```css
.avatar-group { display: flex; align-items: center; }
.avatar-group .avatar { border: 2px solid hsl(var(--bg-card)); margin-left: -6px; }
.avatar { width: 32px; height: 32px; border-radius: var(--radius-full); background-color: hsl(var(--secondary)); color: hsl(var(--secondary-fg)); font-size: 0.75rem; font-weight: 600; display: inline-flex; align-items: center; justify-content: center; }
```

### Tile Component
```html
<div class="tile-item">
  <svg>...</svg>
  <span>Analytics</span>
</div>
```
```css
.tile-item { border: 1px solid hsl(var(--border)); border-radius: var(--radius-md); padding: 1.25rem; background-color: hsl(var(--bg-card)); display: flex; flex-direction: column; align-items: center; gap: 0.5rem; cursor: pointer; }
.tile-item:hover { background-color: hsl(var(--accent) / 0.15); border-color: hsl(var(--ring) / 0.3); }
```

---

## 5. Labels & Badges

### Badge
```html
<span class="badge badge-success">Completed</span>
```
```css
.badge { display: inline-flex; align-items: center; padding: 0.2rem 0.5rem; font-size: 0.68rem; font-weight: 600; border-radius: var(--radius-xs); text-transform: uppercase; }
.badge-success { background-color: hsl(var(--success) / 0.1); color: hsl(var(--success)); border-color: hsl(var(--success) / 0.2); }
```

### Date Label
```html
<span class="date-label-badge">July 3, 2026</span>
```
```css
.date-label-badge { display: inline-flex; align-items: center; padding: 0.2rem 0.5rem; border-radius: var(--radius-xs); background-color: #e8f0fe; color: #1a73e8; font-size: 0.7rem; font-weight: 600; }
```

### Lozenge
```html
<span class="lozenge lozenge-success">Completed</span>
```
```css
.lozenge { display: inline-flex; align-items: center; padding: 0.15rem 0.4rem; font-size: 0.65rem; font-weight: 700; border-radius: var(--radius-xs); text-transform: uppercase; }
.lozenge-success { background-color: #e6f4ea; color: #137333; }
```

### Tag & Tag Group
```html
<div class="tag-group">
  <span class="tag-pill"># frontend</span>
</div>
```
```css
.tag-group { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.tag-pill { display: inline-flex; align-items: center; padding: 0.25rem 0.5rem; border-radius: var(--radius-sm); background-color: hsl(var(--secondary)); color: hsl(var(--text-primary)); font-size: 0.75rem; border: 1px solid hsl(var(--border)); }
```

---

## 6. Layout & Structure Primitives

### Primitives (Box, Stack, Inline, Bleed)
```html
<div class="primitive-stack">
  <div class="primitive-inline">
    <div class="primitive-box">Box 1</div>
  </div>
  <div class="primitive-bleed">Bleeding content</div>
</div>
```
```css
.primitive-stack { display: flex; flex-direction: column; gap: 0.75rem; }
.primitive-inline { display: flex; flex-direction: row; gap: 0.75rem; }
.primitive-box { padding: 1rem; border-radius: var(--radius-md); border: 1px dashed hsl(var(--ring) / 0.4); background-color: hsl(var(--secondary) / 0.3); }
.primitive-bleed { margin: 0 -2rem; padding: 0.5rem 2rem; background-color: hsl(var(--accent) / 0.15); }
```

---

## 7. Loading Indicators

```html
<div class="spinner"></div>
<div class="progress-bar"><div class="progress-fill" style="width: 50%;"></div></div>
```
```css
.spinner { width: 18px; height: 18px; border: 2px solid hsl(var(--border)); border-top-color: hsl(var(--text-primary)); border-radius: var(--radius-full); animation: spin-anim 0.6s linear infinite; }
@keyframes spin-anim { to { transform: rotate(360deg); } }
```

---

## 8. Messaging & Feedback Systems

### Banner
```html
<div class="msg-banner">System Notice Banner</div>
```
```css
.msg-banner { background-color: #fef7e0; color: #b06000; border-bottom: 1px solid #f1c40f; padding: 0.6rem 1.5rem; font-size: 0.8rem; }
```

### Flag & Inline Message
```html
<div class="flag-toast">
  <span>Connection Restored</span>
</div>
<div class="section-msg">Success: synched</div>
```
```css
.flag-toast { background-color: hsl(var(--bg-card)); border-left: 4px solid #1a73e8; padding: 0.75rem 1rem; box-shadow: 0 5px 15px rgba(0,0,0,0.15); }
.section-msg { border-left: 3px solid #137333; padding: 0.5rem 0.75rem; background-color: #f1f8f3; color: #137333; }
```

### Spotlight
```html
<div class="spotlight-card">
  <div>Feature Spotlight</div>
</div>
```
```css
.spotlight-card { background-color: #1e2030; color: #fff; border-radius: var(--radius-md); padding: 1rem; border: 1px solid #7b84ff; }
```

---

## 9. Navigation Systems

### Breadcrumbs
```html
<nav class="breadcrumbs">
  <a href="#">Products</a>
  <span class="divider">/</span>
  <span class="current">Details</span>
</nav>
```

### Pagination
```html
<div class="pagination-row">
  <button class="pagination-btn active">1</button>
</div>
```
```css
.pagination-row { display: flex; align-items: center; gap: 0.25rem; }
.pagination-btn { width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; border-radius: var(--radius-xs); border: 1px solid hsl(var(--border)); }
```

---

## 10. Overlays & Layering

### Blanket & Drawer Modal Dialog
```html
<div class="blanket-screen">
  <div class="modal-card">...</div>
</div>
```
```css
.blanket-screen { position: fixed; inset: 0; background-color: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; }
```

---

## 11. Text & Data Display

### MetricText
```html
<span class="metric-text">99.85%</span>
```
```css
.metric-text { font-size: 2.25rem; font-weight: 800; color: hsl(var(--text-primary)); letter-spacing: -0.03em; }
```

### Inline Edit
```html
<span class="inline-edit-trigger">Click to edit</span>
```
```css
.inline-edit-trigger { border-bottom: 1px dashed hsl(var(--text-secondary)); cursor: pointer; font-size: 0.825rem; }
```

### Table Tree
```html
<div class="table-tree-node" style="--tree-level: 1">
  <svg>...</svg>
  <span>page.tsx</span>
</div>
```
```css
.table-tree-node { display: flex; align-items: center; gap: 0.5rem; padding-left: calc(var(--tree-level, 0) * 1.5rem); font-size: 0.8rem; }
```

---

## 12. System States & Micro-interactions
* **Transitions**: Apply `transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1)` system-wide.
* **Focus outline**: Accessible elements display clean focus indicators.
