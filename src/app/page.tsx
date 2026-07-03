'use client';

import React, { useState, useEffect } from 'react';

interface ComponentDoc {
  id: string;
  name: string;
  description: string;
  preview: React.ReactNode;
  htmlCode: string;
  cssCode: string;
}

export default function Home() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeTabMap, setActiveTabMap] = useState<Record<string, 'html' | 'css'>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // Sync theme attribute with DOM wrapper
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getCodeTab = (id: string) => {
    return activeTabMap[id] || 'html';
  };

  const setCodeTab = (id: string, tab: 'html' | 'css') => {
    setActiveTabMap(prev => ({ ...prev, [id]: tab }));
  };

  const menuSections = [
    { id: 'tokens', label: 'Design Tokens' },
    { id: 'buttons', label: 'Buttons & Actions' },
    { id: 'forms', label: 'Form Controls' },
    { id: 'selection', label: 'Selection Indicators' },
    { id: 'badges', label: 'Badges & Tags' },
    { id: 'tabs', label: 'Segmented Tabs' },
    { id: 'cards', label: 'Cards & Containers' },
    { id: 'tables', label: 'Data Tables' },
    { id: 'overlays', label: 'Overlays & Alerts' },
    { id: 'loaders', label: 'Loading & States' },
  ];

  const designTokens = [
    { name: '--bg-app', value: '240 10% 3.9% (dark) / 240 10% 99% (light)', color: 'hsl(var(--bg-app))' },
    { name: '--bg-surface', value: '240 10% 5.5% (dark) / 240 4.8% 95.9% (light)', color: 'hsl(var(--bg-surface))' },
    { name: '--bg-card', value: '240 10% 4.8% (dark) / 0 0% 100% (light)', color: 'hsl(var(--bg-card))' },
    { name: '--text-primary', value: '0 0% 98% (dark) / 240 10% 3.9% (light)', color: 'hsl(var(--text-primary))' },
    { name: '--text-secondary', value: '240 5% 64.9% (dark) / 240 3.8% 46.1% (light)', color: 'hsl(var(--text-secondary))' },
    { name: '--primary', value: '0 0% 98% (dark) / 240 5.9% 10% (light)', color: 'hsl(var(--primary))' },
    { name: '--secondary', value: '240 3.7% 15.9% (dark) / 240 4.8% 95.9% (light)', color: 'hsl(var(--secondary))' },
    { name: '--border', value: '240 3.7% 15.9% (dark) / 240 5.9% 90% (light)', color: 'hsl(var(--border))' },
    { name: '--success', value: '142 70.6% 45.3% (dark) / 142 76.2% 36.3% (light)', color: 'hsl(var(--success))' },
    { name: '--destructive', value: '0 62.8% 30.6% (dark) / 0 84.2% 60.2% (light)', color: 'hsl(var(--destructive))' },
  ];

  const componentDocs: ComponentDoc[] = [
    {
      id: 'buttons',
      name: 'Buttons & Actions',
      description: 'Standard button presets featuring hover and click animations across sizes.',
      preview: (
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <button className="btn btn-primary btn-md">Primary Action</button>
          <button className="btn btn-secondary btn-md">Secondary Option</button>
          <button className="btn btn-outline btn-md">Outline Button</button>
          <button className="btn btn-ghost btn-md">Ghost Button</button>
          <button className="btn btn-destructive btn-md">Destructive Action</button>
          <button className="btn btn-primary btn-sm">Small Pill</button>
          <button className="btn btn-primary btn-lg">Large Action</button>
        </div>
      ),
      htmlCode: `<button class="btn btn-primary btn-md">Primary Action</button>
<button class="btn btn-secondary btn-md">Secondary Option</button>
<button class="btn btn-outline btn-md">Outline Button</button>
<button class="btn btn-ghost btn-md">Ghost Button</button>
<button class="btn btn-destructive btn-md">Destructive Action</button>`,
      cssCode: `/* CSS definitions reside inside components class bindings */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  user-select: none;
}
.btn-primary { background-color: hsl(var(--primary)); color: hsl(var(--primary-fg)); }
.btn-secondary { background-color: hsl(var(--secondary)); color: hsl(var(--secondary-fg)); border-color: hsl(var(--border)); }
.btn-outline { border-color: hsl(var(--border)); background-color: transparent; color: hsl(var(--text-primary)); }`
    },
    {
      id: 'forms',
      name: 'Form Controls',
      description: 'Standard text inputs, label groupings, helper text, and validation error layouts including show/hide password visibility toggle.',
      preview: (
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <div className="form-group">
            <label className="form-label" htmlFor="doc-email">Email Address</label>
            <input className="form-control" id="doc-email" placeholder="you@domain.com" type="email" />
            <span className="form-help">Enter your primary business account.</span>
          </div>
          <div className="form-group error" style={{ marginTop: '1.5rem' }}>
            <label className="form-label" htmlFor="doc-pass">Password</label>
            <div className="input-with-icon-wrapper">
              <input 
                className="form-control" 
                id="doc-pass" 
                type={showPassword ? "text" : "password"} 
                defaultValue="12345678" 
              />
              <button 
                type="button" 
                className="input-icon-btn" 
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                )}
              </button>
            </div>
            <span className="form-error-msg">Password must be at least 8 characters.</span>
          </div>
        </div>
      ),
      htmlCode: `<div class="form-group">
  <label class="form-label" for="email">Email Address</label>
  <input class="form-control" id="email" placeholder="you@domain.com" type="email" />
  <span class="form-help">Enter your primary business account.</span>
</div>

<!-- Password with Show/Hide Toggle -->
<div class="form-group error">
  <label class="form-label" for="password">Password</label>
  <div class="input-with-icon-wrapper">
    <input class="form-control" id="password" type="password" value="12345678" />
    <button type="button" class="input-icon-btn" aria-label="Toggle password visibility">
      <!-- Show Eye Icon (SVG) -->
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
    </button>
  </div>
  <span class="form-error-msg">Password must be at least 8 characters.</span>
</div>`,
      cssCode: `.form-group { display: flex; flex-direction: column; gap: 0.35rem; }
.form-label { font-size: 0.75rem; font-weight: 600; color: hsl(var(--text-secondary)); }
.form-control { border-radius: var(--radius-sm); border: 1px solid hsl(var(--input)); background-color: transparent; padding: 0.5rem 0.75rem; font-size: 0.825rem; }
.form-control:focus { outline: none; border-color: hsl(var(--ring)); box-shadow: 0 0 0 2px hsl(var(--ring) / 0.15); }
.form-group.error .form-control { border-color: hsl(var(--destructive)); }

/* Show/Hide Toggle Classes */
.input-with-icon-wrapper { position: relative; width: 100%; display: flex; align-items: center; }
.input-with-icon-wrapper .form-control { padding-right: 2.5rem; }
.input-icon-btn { position: absolute; right: 0.75rem; background: transparent; border: none; color: hsl(var(--text-secondary)); cursor: pointer; display: flex; align-items: center; justify-content: center; padding: 0; }
.input-icon-btn:hover { color: hsl(var(--text-primary)); }`
    },
    {
      id: 'selection',
      name: 'Selection Indicators',
      description: 'Styled checkboxes and animated status toggles built with native browser elements.',
      preview: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <label className="control-label">
            <input className="checkbox-input" type="checkbox" defaultChecked />
            <span>Accept Agreement Criteria</span>
          </label>
          <label className="switch-label">
            <input className="switch-input" type="checkbox" defaultChecked />
            <span className="switch-track"></span>
            <span>Dark Mode Activation Switch</span>
          </label>
        </div>
      ),
      htmlCode: `<!-- Checkbox -->
<label class="control-label">
  <input class="checkbox-input" type="checkbox" checked />
  <span>Accept Agreement Criteria</span>
</label>

<!-- Toggle Switch -->
<label class="switch-label">
  <input class="switch-input" type="checkbox" checked />
  <span class="switch-track"></span>
  <span>Dark Mode Activation Switch</span>
</label>`,
      cssCode: `.checkbox-input { appearance: none; width: 16px; height: 16px; border: 1px solid hsl(var(--input)); border-radius: var(--radius-xs); position: relative; }
.checkbox-input:checked { background-color: hsl(var(--primary)); border-color: hsl(var(--primary)); }
.checkbox-input:checked::after { content: ""; position: absolute; left: 5px; top: 2px; width: 4px; height: 8px; border: solid hsl(var(--primary-fg)); border-width: 0 2px 2px 0; transform: rotate(45deg); }

.switch-track { width: 34px; height: 20px; background-color: hsl(var(--secondary)); border-radius: var(--radius-full); position: relative; transition: background-color 0.2s; border: 1px solid hsl(var(--border)); }
.switch-track::after { content: ""; position: absolute; left: 2px; top: 1px; width: 14px; height: 14px; border-radius: var(--radius-full); background-color: hsl(var(--text-primary)); transition: transform 0.2s; }
.switch-input:checked + .switch-track { background-color: hsl(var(--primary)); }
.switch-input:checked + .switch-track::after { transform: translateX(14px); background-color: hsl(var(--primary-fg)); }`
    },
    {
      id: 'badges',
      name: 'Badges & Tags',
      description: 'Compact status markers for categorization, metadata tags, and logs.',
      preview: (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <span className="badge badge-neutral">Draft Log</span>
          <span className="badge badge-success">Completed</span>
          <span className="badge badge-error">Rejected</span>
        </div>
      ),
      htmlCode: `<span class="badge badge-neutral">Draft Log</span>
<span class="badge badge-success">Completed</span>
<span class="badge badge-error">Rejected</span>`,
      cssCode: `.badge { display: inline-flex; align-items: center; padding: 0.2rem 0.5rem; font-size: 0.68rem; font-weight: 600; border-radius: var(--radius-xs); text-transform: uppercase; }
.badge-neutral { background-color: hsl(var(--secondary)); color: hsl(var(--secondary-fg)); border-color: hsl(var(--border)); }
.badge-success { background-color: hsl(var(--success) / 0.1); color: hsl(var(--success)); border-color: hsl(var(--success) / 0.2); }
.badge-error { background-color: hsl(var(--destructive) / 0.1); color: hsl(var(--destructive)); border-color: hsl(var(--destructive) / 0.2); }`
    },
    {
      id: 'tabs',
      name: 'Segmented Tabs',
      description: 'A layout switcher, filters panel, or navigation category tab controller.',
      preview: (
        <div className="segmented-tabs">
          <button className="tab-btn active">Overview Analytics</button>
          <button className="tab-btn">System Settings</button>
        </div>
      ),
      htmlCode: `<div class="segmented-tabs">
  <button class="tab-btn active">Overview Analytics</button>
  <button class="tab-btn">System Settings</button>
</div>`,
      cssCode: `.segmented-tabs { display: inline-flex; background-color: hsl(var(--secondary) / 0.5); border-radius: var(--radius-md); padding: 0.2rem; border: 1px solid hsl(var(--border)); }
.tab-btn { padding: 0.35rem 0.85rem; font-size: 0.8rem; font-weight: 500; border-radius: var(--radius-sm); border: none; background-color: transparent; color: hsl(var(--text-secondary)); cursor: pointer; }
.tab-btn.active { background-color: hsl(var(--bg-card)); color: hsl(var(--text-primary)); box-shadow: 0 1px 3px rgba(0,0,0,0.1); }`
    },
    {
      id: 'cards',
      name: 'Cards & Containers',
      description: 'Structural container cards featuring clear header borders.',
      preview: (
        <div className="card" style={{ maxWidth: '400px' }}>
          <div className="card-header">
            <h3 className="card-title">Analytics Summary</h3>
          </div>
          <div className="card-body">
            <p style={{ margin: 0 }}>System metrics indicators show optimal processing speed and zero queue latency.</p>
          </div>
        </div>
      ),
      htmlCode: `<div class="card">
  <div class="card-header">
    <h3 class="card-title">Analytics Summary</h3>
  </div>
  <div class="card-body">
    <p>System metrics indicators show optimal processing speed and zero queue latency.</p>
  </div>
</div>`,
      cssCode: `.card { background-color: hsl(var(--bg-card)); border: 1px solid hsl(var(--border)); border-radius: var(--radius-lg); display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
.card-header { padding: 1.25rem; border-bottom: 1px solid hsl(var(--border)); }
.card-title { font-size: 0.95rem; font-weight: 600; }
.card-body { padding: 1.25rem; font-size: 0.825rem; color: hsl(var(--text-secondary)); }`
    },
    {
      id: 'tables',
      name: 'Data Tables',
      description: 'Sleek, high-density row layout for lists, details log spreadsheets, or audits.',
      preview: (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Budget Allocation</th>
                <th>Status Badge</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Log Engine Architecture</td>
                <td>$14,500</td>
                <td><span className="badge badge-success">Done</span></td>
              </tr>
              <tr>
                <td>Auth Provider System</td>
                <td>$8,200</td>
                <td><span className="badge badge-neutral">In Review</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
      htmlCode: `<div class="table-container">
  <table class="data-table">
    <thead>
      <tr>
        <th>Project Name</th>
        <th>Budget Allocation</th>
        <th>Status Badge</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Log Engine Architecture</td>
        <td>$14,500</td>
        <td><span class="badge badge-success">Done</span></td>
      </tr>
    </tbody>
  </table>
</div>`,
      cssCode: `.table-container { overflow-x: auto; border: 1px solid hsl(var(--border)); border-radius: var(--radius-md); }
.data-table { width: 100%; border-collapse: collapse; text-align: left; font-size: 0.8rem; }
.data-table th, .data-table td { padding: 0.75rem 1.0rem; }
.data-table th { background-color: hsl(var(--bg-surface)); color: hsl(var(--text-secondary)); font-weight: 600; border-bottom: 1px solid hsl(var(--border)); }
.data-table td { border-bottom: 1px solid hsl(var(--border) / 0.5); color: hsl(var(--text-primary)); }
.data-table tbody tr:hover td { background-color: hsl(var(--accent) / 0.2); }`
    },
    {
      id: 'overlays',
      name: 'Overlays & Alerts',
      description: 'Alert notifications and interactive element tooltips.',
      preview: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
          <div className="alert alert-error">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span>Your session has expired. Please log in again to continue operations.</span>
          </div>
          <div>
            <span className="tooltip-container" data-tooltip="This deletes files permanently from the directory.">
              <button className="btn btn-outline btn-md">Delete Folder Tooltip Hover</button>
            </span>
          </div>
        </div>
      ),
      htmlCode: `<div class="alert alert-error">
  <svg>...</svg>
  <span>Your session has expired. Please log in again to continue operations.</span>
</div>

<span class="tooltip-container" data-tooltip="This deletes files permanently from the directory.">
  <button class="btn btn-outline">Delete Folder Tooltip Hover</button>
</span>`,
      cssCode: `.alert { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1.0rem; border-radius: var(--radius-md); font-size: 0.8rem; border: 1px solid transparent; }
.alert-error { background-color: hsl(var(--destructive) / 0.1); color: hsl(var(--destructive)); border-color: hsl(var(--destructive) / 0.2); }

.tooltip-container { position: relative; display: inline-block; }
.tooltip-container::after { content: attr(data-tooltip); position: absolute; bottom: calc(100% + 5px); left: 50%; transform: translateX(-50%) scale(0.95); background-color: hsl(var(--primary)); color: hsl(var(--primary-fg)); font-size: 0.68rem; padding: 0.25rem 0.5rem; border-radius: var(--radius-xs); opacity: 0; pointer-events: none; transition: opacity 0.15s, transform 0.15s; }
.tooltip-container:hover::after { opacity: 1; transform: translateX(-50%) scale(1); }`
    },
    {
      id: 'loaders',
      name: 'Loading & States',
      description: 'Spinning circle loading feedback and shimmering skeleton component panels.',
      preview: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div className="spinner"></div>
            <span style={{ fontSize: '0.8rem', color: 'hsl(var(--text-secondary))' }}>Loading system logs...</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '60%' }}></div>
          </div>
          <div className="skeleton skeleton-card"></div>
        </div>
      ),
      htmlCode: `<!-- Loading spinner -->
<div class="spinner"></div>

<!-- Progress bar -->
<div class="progress-bar">
  <div class="progress-fill" style="width: 60%;"></div>
</div>

<!-- Skeleton shimmer -->
<div class="skeleton skeleton-card"></div>`,
      cssCode: `.spinner { width: 18px; height: 18px; border: 2px solid hsl(var(--border)); border-top-color: hsl(var(--text-primary)); border-radius: var(--radius-full); animation: spin-anim 0.6s linear infinite; }
@keyframes spin-anim { to { transform: rotate(360deg); } }

.progress-bar { height: 6px; background-color: hsl(var(--secondary)); border-radius: var(--radius-full); overflow: hidden; }
.progress-fill { height: 100%; background-color: hsl(var(--primary)); transition: width 0.3s ease; }

.skeleton { background: linear-gradient(90deg, hsl(var(--secondary)) 25%, hsl(var(--accent)) 37%, hsl(var(--secondary)) 63%); background-size: 400% 100%; animation: shimmer-anim 1.4s ease infinite; }
@keyframes shimmer-anim { 0% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }`
    }
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="doc-shell">
      {/* Sidebar Panel */}
      <aside className="doc-sidebar">
        <div className="doc-title-area">
          <div className="doc-title-logo">Oykot MPDS</div>
          <span style={{ fontSize: '0.65rem', fontWeight: 600, color: 'hsl(var(--text-secondary))', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Product Design System Docs
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
          <button className="btn btn-secondary btn-sm" onClick={toggleTheme} style={{ width: '100%', justifyContent: 'flex-start' }}>
            {theme === 'dark' ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                Light Theme
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                Dark Theme
              </>
            )}
          </button>
        </div>

        <nav className="doc-menu">
          {menuSections.map(sec => (
            <button
              key={sec.id}
              className="doc-menu-link"
              onClick={() => scrollToSection(sec.id)}
            >
              {sec.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Panel Content */}
      <main className="doc-main">
        <div style={{ marginBottom: '3.5rem', borderBottom: '1px solid hsl(var(--border))', paddingBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 800, margin: 0, letterSpacing: '-0.03em', color: 'hsl(var(--text-primary))' }}>
              Master Parent Design System
            </h1>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'hsl(var(--text-secondary))', marginTop: '0.5rem', lineHeight: 1.6, maxWidth: '800px' }}>
            This documentation site serves as a live sandbox and code exporter for the **Oykot Product Design System (MPDS)**.
            Toggle light/dark modes on the sidebar to preview reactive variables, copy code blocks directly, and compile new interfaces with clean HSL-driven aesthetics.
          </p>
        </div>

        {/* Section: Design Tokens */}
        <section id="tokens" className="doc-section">
          <div className="doc-section-title">Design Tokens & variables</div>
          <div className="doc-section-desc">
            Core CSS HSL color scales and typography settings defining the branding environment.
          </div>
          <div className="tokens-grid">
            {designTokens.map(tok => (
              <div key={tok.name} className="token-item">
                <div className="token-swatch" style={{ backgroundColor: tok.color }}></div>
                <div className="token-name">{tok.name}</div>
                <div className="token-value">{tok.value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Sections for each component type */}
        {componentDocs.map(doc => {
          const tab = getCodeTab(doc.id);
          const currentCode = tab === 'html' ? doc.htmlCode : doc.cssCode;
          const isCopied = copiedId === doc.id;

          return (
            <section key={doc.id} id={doc.id} className="doc-section">
              <div className="doc-section-title">{doc.name}</div>
              <div className="doc-section-desc">{doc.description}</div>

              <div className="preview-card">
                {/* Visual Preview Box */}
                <div className="preview-canvas">
                  <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'hsl(var(--text-muted))', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Rendered Output Preview
                  </span>
                  {doc.preview}
                </div>

                {/* Code Export Tabs */}
                <div className="preview-code-viewer">
                  <div className="code-tabs-header">
                    <button
                      className={`code-tab-btn ${tab === 'html' ? 'active' : ''}`}
                      onClick={() => setCodeTab(doc.id, 'html')}
                    >
                      HTML STRUCTURE
                    </button>
                    <button
                      className={`code-tab-btn ${tab === 'css' ? 'active' : ''}`}
                      onClick={() => setCodeTab(doc.id, 'css')}
                    >
                      CSS CLASSES
                    </button>
                  </div>
                  <div className="code-panel">
                    <button
                      className="copy-btn"
                      onClick={() => copyToClipboard(currentCode, doc.id)}
                    >
                      {isCopied ? 'COPIED!' : 'COPY CODE'}
                    </button>
                    <pre className="code-content">
                      <code>{currentCode}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}
