'use client';

import React, { useState, useEffect } from 'react';

interface ComponentDoc {
  id: string;
  category: string;
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
  
  // Interactive Component States
  const [showPassword, setShowPassword] = useState(false);
  const [inlineEditing, setInlineEditing] = useState(false);
  const [inlineEditVal, setInlineEditVal] = useState('Editable task parameter');
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [demoDrawerOpen, setDemoDrawerOpen] = useState(false);
  const [demoToastVisible, setDemoToastVisible] = useState(false);
  const [demoSpotlightVisible, setDemoSpotlightVisible] = useState(true);
  const [activeMenuSection, setActiveMenuSection] = useState('forms-inputs');

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

  const categories = [
    { id: 'forms-inputs', label: 'Forms & Inputs' },
    { id: 'images-icons', label: 'Images, Icons & Avatars' },
    { id: 'labels', label: 'Labels & Badges' },
    { id: 'layout', label: 'Layout & Primitives' },
    { id: 'loading-status', label: 'Loading & Status' },
    { id: 'messaging', label: 'Messaging & Feedback' },
    { id: 'navigation', label: 'Navigation Menu' },
    { id: 'overlays', label: 'Overlays & Layering' },
    { id: 'text-display', label: 'Text & Data Display' },
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
    // --- FORMS & INPUTS ---
    {
      id: 'button',
      category: 'forms-inputs',
      name: 'Button',
      description: 'Standard button presets featuring hover transitions and click active scales.',
      preview: (
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <button className="btn btn-primary btn-md">Primary Button</button>
          <button className="btn btn-secondary btn-md">Secondary Option</button>
          <button className="btn btn-outline btn-md">Outline Border</button>
          <button className="btn btn-ghost btn-md">Ghost Button</button>
          <button className="btn btn-destructive btn-md">Destructive Option</button>
        </div>
      ),
      htmlCode: `<button class="btn btn-primary btn-md">Primary Button</button>
<button class="btn btn-secondary btn-md">Secondary Option</button>
<button class="btn btn-outline btn-md">Outline Border</button>
<button class="btn btn-ghost btn-md">Ghost Button</button>
<button class="btn btn-destructive btn-md">Destructive Option</button>`,
      cssCode: `.btn { display: inline-flex; align-items: center; justify-content: center; font-family: inherit; font-weight: 500; border-radius: var(--radius-sm); border: 1px solid transparent; cursor: pointer; transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1); user-select: none; }
.btn-primary { background-color: hsl(var(--primary)); color: hsl(var(--primary-fg)); }
.btn-secondary { background-color: hsl(var(--secondary)); color: hsl(var(--secondary-fg)); border-color: hsl(var(--border)); }
.btn-outline { border-color: hsl(var(--border)); background-color: transparent; color: hsl(var(--text-primary)); }
.btn:active { transform: scale(0.97); }`
    },
    {
      id: 'calendar',
      category: 'forms-inputs',
      name: 'Calendar',
      description: 'Interactive grid calendar for choosing days and managing timelines.',
      preview: (
        <div className="calendar-popover" style={{ position: 'static' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', fontSize: '0.75rem' }}>
            <span style={{ fontWeight: 600 }}>July 2026</span>
          </div>
          <div className="calendar-grid">
            {['S','M','T','W','T','F','S'].map((day, i) => (
              <span key={i} style={{ fontSize: '0.6rem', color: 'hsl(var(--text-secondary))', textAlign: 'center', fontWeight: 600 }}>{day}</span>
            ))}
            {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
              <button key={day} className={`calendar-day-btn ${day === 3 ? 'selected' : ''}`}>
                {day}
              </button>
            ))}
          </div>
        </div>
      ),
      htmlCode: `<div class="calendar-popover">
  <div class="calendar-grid">
    <!-- Headers -->
    <span class="day-header">S</span>...
    <!-- Days -->
    <button class="calendar-day-btn">1</button>
    <button class="calendar-day-btn selected">3</button>
  </div>
</div>`,
      cssCode: `.calendar-popover { background-color: hsl(var(--popover)); border: 1px solid hsl(var(--border)); border-radius: var(--radius); padding: 0.65rem; }
.calendar-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 0.15rem; }
.calendar-day-btn { width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; border: none; background: transparent; color: hsl(var(--text-primary)); border-radius: var(--radius-sm); cursor: pointer; }
.calendar-day-btn:hover { background-color: hsl(var(--secondary)); }
.calendar-day-btn.selected { background-color: hsl(var(--primary)); color: hsl(var(--primary-fg)); font-weight: 700; }`
    },
    {
      id: 'checkbox',
      category: 'forms-inputs',
      name: 'Checkbox',
      description: 'Custom styled selection checkbox using native inputs.',
      preview: (
        <label className="control-label">
          <input className="checkbox-input" type="checkbox" defaultChecked />
          <span>Enable real-time push logs</span>
        </label>
      ),
      htmlCode: `<label class="control-label">
  <input class="checkbox-input" type="checkbox" checked />
  <span>Enable real-time push logs</span>
</label>`,
      cssCode: `.control-label { display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.825rem; cursor: pointer; }
.checkbox-input { appearance: none; width: 16px; height: 16px; border: 1px solid hsl(var(--input)); border-radius: var(--radius-xs); cursor: pointer; position: relative; }
.checkbox-input:checked { background-color: hsl(var(--primary)); border-color: hsl(var(--primary)); }
.checkbox-input:checked::after { content: ""; position: absolute; left: 5px; top: 2px; width: 4px; height: 8px; border: solid hsl(var(--primary-fg)); border-width: 0 2px 2px 0; transform: rotate(45deg); }`
    },
    {
      id: 'date-time-picker',
      category: 'forms-inputs',
      name: 'Date Time Picker',
      description: 'Grouped date calendar toggle with relative text fields.',
      preview: (
        <div style={{ display: 'flex', gap: '0.5rem', width: '100%', maxWidth: '360px' }}>
          <input className="form-control" type="date" defaultValue="2026-07-03" />
          <input className="form-control" type="time" defaultValue="14:00" />
        </div>
      ),
      htmlCode: `<div class="date-time-picker">
  <input class="form-control" type="date" value="2026-07-03" />
  <input class="form-control" type="time" value="14:00" />
</div>`,
      cssCode: `.date-time-picker { display: flex; gap: 0.5rem; }
.form-control { border-radius: var(--radius-sm); border: 1px solid hsl(var(--input)); background-color: transparent; color: hsl(var(--text-primary)); padding: 0.5rem 0.75rem; font-size: 0.825rem; }`
    },
    {
      id: 'dropdown-menu',
      category: 'forms-inputs',
      name: 'Dropdown Menu',
      description: 'Elevated popover selector menu displaying lists of items.',
      preview: (
        <div className="vertical-menu" style={{ position: 'static', width: '180px' }}>
          <button className="vertical-menu-item active">Edit Profile</button>
          <button className="vertical-menu-item">System Log Settings</button>
          <button className="vertical-menu-item" style={{ color: 'hsl(var(--destructive))' }}>Delete Account</button>
        </div>
      ),
      htmlCode: `<div class="vertical-menu">
  <button class="vertical-menu-item active">Edit Profile</button>
  <button class="vertical-menu-item">System Log Settings</button>
  <button class="vertical-menu-item destructive">Delete Account</button>
</div>`,
      cssCode: `.vertical-menu { display: flex; flex-direction: column; border: 1px solid hsl(var(--border)); border-radius: var(--radius-md); overflow: hidden; background-color: hsl(var(--bg-card)); }
.vertical-menu-item { padding: 0.6rem 1rem; font-size: 0.8rem; color: hsl(var(--text-primary)); cursor: pointer; border-bottom: 1px solid hsl(var(--border) / 0.5); text-align: left; background: transparent; border: none; }
.vertical-menu-item:hover { background-color: hsl(var(--accent) / 0.15); }
.vertical-menu-item.active { border-left: 3px solid hsl(var(--ring)); font-weight: 600; background-color: hsl(var(--accent) / 0.25); }`
    },
    {
      id: 'focus-ring',
      category: 'forms-inputs',
      name: 'Focus Ring',
      description: 'Visual indicator of element keyboard focus for accessibility, colored in orange caution.',
      preview: (
        <div className="focus-ring-demo" style={{ padding: '0.5rem 1rem', display: 'inline-block', fontSize: '0.8rem' }}>
          Interactive Keyboard Focus Indicator
        </div>
      ),
      htmlCode: `<div class="focus-ring-demo">Interactive Keyboard Focus Indicator</div>`,
      cssCode: `.focus-ring-demo {
  outline: 2px solid #ff9c3a; /* Caution custom color focus ring */
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}`
    },
    {
      id: 'form',
      category: 'forms-inputs',
      name: 'Form Layout',
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
      id: 'radio',
      category: 'forms-inputs',
      name: 'Radio buttons',
      description: 'Choice list selectors for single selection flows.',
      preview: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label className="radio-label">
            <input className="radio-input" type="radio" name="docs-radio-g" defaultChecked />
            <span>Enable Slack pushes</span>
          </label>
          <label className="radio-label">
            <input className="radio-input" type="radio" name="docs-radio-g" />
            <span>Enable Teams webhooks</span>
          </label>
        </div>
      ),
      htmlCode: `<label class="radio-label">
  <input class="radio-input" type="radio" name="docs-radio-g" checked />
  <span>Enable Slack pushes</span>
</label>`,
      cssCode: `.radio-label { display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.825rem; cursor: pointer; }
.radio-input { appearance: none; width: 16px; height: 16px; border: 1px solid hsl(var(--input)); border-radius: var(--radius-full); cursor: pointer; position: relative; }
.radio-input:checked { background-color: hsl(var(--bg-app)); border-color: hsl(var(--primary)); border-width: 5px; }`
    },
    {
      id: 'range',
      category: 'forms-inputs',
      name: 'Range',
      description: 'Horizontal sliders for selecting numeric metrics.',
      preview: (
        <div style={{ width: '100%', maxWidth: '300px' }}>
          <input className="range-input" type="range" min="0" max="100" defaultValue="45" />
        </div>
      ),
      htmlCode: `<input class="range-input" type="range" min="0" max="100" value="45" />`,
      cssCode: `.range-input { width: 100%; height: 6px; background: hsl(var(--secondary)); border-radius: var(--radius-full); outline: none; appearance: none; cursor: pointer; }
.range-input::-webkit-slider-thumb { appearance: none; width: 14px; height: 14px; border-radius: var(--radius-full); background: hsl(var(--primary)); border: 2px solid hsl(var(--bg-app)); box-shadow: 0 1px 3px rgba(0,0,0,0.15); }`
    },
    {
      id: 'select',
      category: 'forms-inputs',
      name: 'Select',
      description: 'Compact dropdown selection fields.',
      preview: (
        <select className="form-control" style={{ width: '200px' }}>
          <option>High Priority</option>
          <option>Medium Priority</option>
          <option>Low Priority</option>
        </select>
      ),
      htmlCode: `<select class="form-control">
  <option>High Priority</option>
  <option>Medium Priority</option>
  <option>Low Priority</option>
</select>`,
      cssCode: `.form-control { border-radius: var(--radius-sm); border: 1px solid hsl(var(--input)); background-color: transparent; padding: 0.5rem 0.75rem; font-size: 0.825rem; }`
    },
    {
      id: 'text-area',
      category: 'forms-inputs',
      name: 'Text area',
      description: 'Multi-line borderless text fields designed for descriptions.',
      preview: (
        <textarea className="form-control" placeholder="Write logs descriptions..." rows={3} style={{ width: '100%', maxWidth: '400px' }}></textarea>
      ),
      htmlCode: `<textarea class="form-control" placeholder="Write logs descriptions..." rows="3"></textarea>`,
      cssCode: `.form-control { border-radius: var(--radius-sm); border: 1px solid hsl(var(--input)); background-color: transparent; color: hsl(var(--text-primary)); padding: 0.5rem 0.75rem; font-size: 0.825rem; font-family: inherit; }`
    },
    {
      id: 'text-field',
      category: 'forms-inputs',
      name: 'Text field',
      description: 'Standard single-line text inputs for search parameters or details.',
      preview: (
        <input className="form-control" placeholder="Filter search terms..." type="text" style={{ width: '100%', maxWidth: '300px' }} />
      ),
      htmlCode: `<input class="form-control" placeholder="Filter search terms..." type="text" />`,
      cssCode: `.form-control { border-radius: var(--radius-sm); border: 1px solid hsl(var(--input)); background-color: transparent; color: hsl(var(--text-primary)); padding: 0.5rem 0.75rem; font-size: 0.825rem; }`
    },
    {
      id: 'toggle',
      category: 'forms-inputs',
      name: 'Toggle Switch',
      description: 'State switches triggered on change.',
      preview: (
        <label className="switch-label">
          <input className="switch-input" type="checkbox" defaultChecked />
          <span className="switch-track"></span>
          <span>Webhooks enabled</span>
        </label>
      ),
      htmlCode: `<label class="switch-label">
  <input class="switch-input" type="checkbox" checked />
  <span class="switch-track"></span>
  <span>Webhooks enabled</span>
</label>`,
      cssCode: `.switch-track { width: 34px; height: 20px; background-color: hsl(var(--secondary)); border-radius: var(--radius-full); position: relative; transition: background-color 0.2s; border: 1px solid hsl(var(--border)); }
.switch-track::after { content: ""; position: absolute; left: 2px; top: 1px; width: 14px; height: 14px; border-radius: var(--radius-full); background-color: hsl(var(--text-primary)); transition: transform 0.2s; }
.switch-input:checked + .switch-track { background-color: hsl(var(--primary)); }
.switch-input:checked + .switch-track::after { transform: translateX(14px); background-color: hsl(var(--primary-fg)); }`
    },

    // --- IMAGES, ICONS & AVATARS ---
    {
      id: 'avatar',
      category: 'images-icons',
      name: 'Avatar',
      description: 'Initials or image circular representation avatar.',
      preview: (
        <div className="avatar">JD</div>
      ),
      htmlCode: `<div class="avatar">JD</div>`,
      cssCode: `.avatar { width: 32px; height: 32px; border-radius: var(--radius-full); background-color: hsl(var(--secondary)); color: hsl(var(--secondary-fg)); font-size: 0.75rem; font-weight: 600; display: inline-flex; align-items: center; justify-content: center; text-transform: uppercase; }`
    },
    {
      id: 'avatar-group',
      category: 'images-icons',
      name: 'Avatar Group',
      description: 'Overlapping avatars demonstrating task teams.',
      preview: (
        <div className="avatar-group">
          <div className="avatar" style={{ zIndex: 3 }}>JD</div>
          <div className="avatar" style={{ zIndex: 2, backgroundColor: '#7b84ff', color: '#fff' }}>AM</div>
          <div className="avatar" style={{ zIndex: 1, backgroundColor: '#ff5c5c', color: '#fff' }}>PK</div>
        </div>
      ),
      htmlCode: `<div class="avatar-group">
  <div class="avatar">JD</div>
  <div class="avatar">AM</div>
  <div class="avatar">PK</div>
</div>`,
      cssCode: `.avatar-group { display: flex; align-items: center; }
.avatar-group .avatar { border: 2px solid hsl(var(--bg-card)); margin-left: -6px; }
.avatar-group .avatar:first-child { margin-left: 0; }`
    },
    {
      id: 'icon',
      category: 'images-icons',
      name: 'Icon wrapper',
      description: 'Standard SVG wrappers.',
      preview: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
      ),
      htmlCode: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
</svg>`,
      cssCode: `/* Standard inline SVG settings */`
    },
    {
      id: 'tile',
      category: 'images-icons',
      name: 'Tile Component',
      description: 'Interactive structural panel showing categories or actions.',
      preview: (
        <div className="tile-grid">
          <div className="tile-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
            <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>Analytics</span>
          </div>
          <div className="tile-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>Security</span>
          </div>
        </div>
      ),
      htmlCode: `<div class="tile-grid">
  <div class="tile-item">
    <svg>...</svg>
    <span>Analytics</span>
  </div>
</div>`,
      cssCode: `.tile-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 1rem; }
.tile-item { border: 1px solid hsl(var(--border)); border-radius: var(--radius-md); padding: 1.25rem; background-color: hsl(var(--bg-card)); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.5rem; cursor: pointer; transition: all 0.2s; }
.tile-item:hover { background-color: hsl(var(--accent) / 0.15); border-color: hsl(var(--ring) / 0.3); }`
    },

    // --- LABELS & BADGES ---
    {
      id: 'badge',
      category: 'labels',
      name: 'Badge',
      description: 'Pills displaying counts or static values.',
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
.badge-success { background-color: hsl(var(--success) / 0.1); color: hsl(var(--success)); border-color: hsl(var(--success) / 0.2); }`
    },
    {
      id: 'date-label',
      category: 'labels',
      name: 'Date Label',
      description: 'A blue badge representing specific target dates.',
      preview: (
        <span className="date-label-badge">July 3, 2026</span>
      ),
      htmlCode: `<span class="date-label-badge">July 3, 2026</span>`,
      cssCode: `.date-label-badge { display: inline-flex; align-items: center; padding: 0.2rem 0.5rem; border-radius: var(--radius-xs); background-color: #e8f0fe; color: #1a73e8; font-size: 0.7rem; font-weight: 600; }
[data-theme="dark"] .date-label-badge { background-color: #122442; color: #8ab4f8; }`
    },
    {
      id: 'lozenge',
      category: 'labels',
      name: 'Lozenge',
      description: 'Text labels with varying visual significance (bold or subtle colors).',
      preview: (
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span className="lozenge lozenge-subtle">Subtle Badge</span>
          <span className="lozenge lozenge-bold">Bold Text</span>
          <span className="lozenge lozenge-success">Completed</span>
          <span className="lozenge lozenge-moved">Moved</span>
        </div>
      ),
      htmlCode: `<span class="lozenge lozenge-subtle">Subtle Badge</span>
<span class="lozenge lozenge-bold">Bold Text</span>
<span class="lozenge lozenge-success">Completed</span>
<span class="lozenge lozenge-moved">Moved</span>`,
      cssCode: `.lozenge { display: inline-flex; align-items: center; padding: 0.15rem 0.4rem; font-size: 0.65rem; font-weight: 700; border-radius: var(--radius-xs); text-transform: uppercase; letter-spacing: 0.06em; }
.lozenge-subtle { background-color: hsl(var(--secondary)); color: hsl(var(--text-secondary)); }
.lozenge-bold { background-color: hsl(var(--primary)); color: hsl(var(--primary-fg)); }
.lozenge-success { background-color: #e6f4ea; color: #137333; }
.lozenge-moved { background-color: #fce8e6; color: #c5221f; }`
    },
    {
      id: 'tag',
      category: 'labels',
      name: 'Tag & Tag Group',
      description: 'List grouping tags representing parameters.',
      preview: (
        <div className="tag-group">
          <span className="tag-pill"># frontend</span>
          <span className="tag-pill"># api</span>
          <span className="tag-pill"># bug</span>
        </div>
      ),
      htmlCode: `<div class="tag-group">
  <span class="tag-pill"># frontend</span>
  <span class="tag-pill"># api</span>
</div>`,
      cssCode: `.tag-group { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.tag-pill { display: inline-flex; align-items: center; padding: 0.25rem 0.5rem; border-radius: var(--radius-sm); background-color: hsl(var(--secondary)); color: hsl(var(--text-primary)); font-size: 0.75rem; border: 1px solid hsl(var(--border)); }`
    },

    // --- LAYOUT & PRIMITIVES ---
    {
      id: 'primitives',
      category: 'layout',
      name: 'Primitives (Box, Stack, Inline, Bleed)',
      description: 'Structural building blocks for layouts, margin bleeding, and spacing.',
      preview: (
        <div style={{ width: '100%' }}>
          <div className="primitive-stack">
            <div className="primitive-inline">
              <div className="primitive-box">Box 1</div>
              <div className="primitive-box">Box 2</div>
            </div>
            <div className="primitive-bleed">
              Bleeding Row (extends out horizontally)
            </div>
          </div>
        </div>
      ),
      htmlCode: `<div class="primitive-stack">
  <div class="primitive-inline">
    <div class="primitive-box">Box 1</div>
    <div class="primitive-box">Box 2</div>
  </div>
  <div class="primitive-bleed">Bleeding Row</div>
</div>`,
      cssCode: `.primitive-stack { display: flex; flex-direction: column; gap: 0.75rem; }
.primitive-inline { display: flex; flex-direction: row; gap: 0.75rem; }
.primitive-box { padding: 1rem; border-radius: var(--radius-md); border: 1px dashed hsl(var(--ring) / 0.4); background-color: hsl(var(--secondary) / 0.3); }
.primitive-bleed { margin: 0 -2rem; padding: 0.5rem 2rem; background-color: hsl(var(--accent) / 0.15); }`
    },
    {
      id: 'page-header',
      category: 'layout',
      name: 'Page Header & Panel',
      description: 'Structural wrappers displaying titles and card headers.',
      preview: (
        <div className="panel-card" style={{ width: '100%' }}>
          <div className="page-header-banner">
            <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700 }}>Task Overview</h2>
          </div>
          <span style={{ fontSize: '0.8rem' }}>Panel content renders here.</span>
        </div>
      ),
      htmlCode: `<div class="panel-card">
  <div class="page-header-banner">
    <h2>Task Overview</h2>
  </div>
  <span>Panel content renders here.</span>
</div>`,
      cssCode: `.panel-card { background-color: hsl(var(--bg-card)); border: 1px solid hsl(var(--border)); border-radius: var(--radius-md); padding: 1.5rem; }
.page-header-banner { border-bottom: 1px solid hsl(var(--border)); padding-bottom: 1rem; margin-bottom: 0.5rem; }`
    },

    // --- LOADING & STATUS ---
    {
      id: 'loaders',
      category: 'loading-status',
      name: 'Loaders (Spinner, Progress bar, Skeleton)',
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
    },

    // --- MESSAGING & FEEDBACK ---
    {
      id: 'banner',
      category: 'messaging',
      name: 'Banner',
      description: 'System-wide notifications banner displayed at the top of the canvas.',
      preview: (
        <div className="msg-banner">
          Attention: Database migration is scheduled for tonight at 23:00 UTC.
        </div>
      ),
      htmlCode: `<div class="msg-banner">
  Attention: Database migration is scheduled for tonight at 23:00 UTC.
</div>`,
      cssCode: `.msg-banner { background-color: #fef7e0; color: #b06000; border-bottom: 1px solid #f1c40f; padding: 0.6rem 1.5rem; font-size: 0.8rem; font-weight: 500; }
[data-theme="dark"] .msg-banner { background-color: #3b2a0c; color: #f7b731; border-bottom-color: #f7b731; }`
    },
    {
      id: 'flag',
      category: 'messaging',
      name: 'Flag & Inline Message',
      description: 'Toasts for side actions and inline system warning labels.',
      preview: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
          <div className="flag-toast">
            <span style={{ fontWeight: 700 }}>Connection Restored</span>
            <span style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.75rem' }}>Successfully re-established Supabase bridge.</span>
          </div>
          <div className="section-msg">
            Success: Workspace configurations synchronized.
          </div>
        </div>
      ),
      htmlCode: `<!-- Toast Flag -->
<div class="flag-toast">
  <span class="flag-title">Connection Restored</span>
  <span class="flag-desc">Successfully re-established Supabase bridge.</span>
</div>

<!-- Inline Section Message -->
<div class="section-msg">
  Success: Workspace configurations synchronized.
</div>`,
      cssCode: `.flag-toast { background-color: hsl(var(--bg-card)); border-left: 4px solid #1a73e8; border-radius: var(--radius-sm); padding: 0.75rem 1rem; box-shadow: 0 5px 15px rgba(0,0,0,0.15); display: flex; flex-direction: column; }
.section-msg { border-left: 3px solid #137333; padding: 0.5rem 0.75rem; background-color: #f1f8f3; font-size: 0.78rem; color: #137333; }`
    },
    {
      id: 'spotlight',
      category: 'messaging',
      name: 'Spotlight',
      description: 'Simulated card layout highlighting specific components.',
      preview: (
        <div style={{ padding: '1rem', position: 'relative' }}>
          {demoSpotlightVisible && (
            <div className="spotlight-card">
              <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>New: Multi-project view</div>
              <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.7rem', color: '#a0a8c6' }}>Switch between distinct products layouts from the sidebar filter controls.</p>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                <button className="btn btn-ghost btn-sm" onClick={() => setDemoSpotlightVisible(false)} style={{ color: '#fff' }}>Dismiss</button>
                <button className="btn btn-primary btn-sm" style={{ backgroundColor: '#7b84ff', color: '#fff' }}>Learn More</button>
              </div>
            </div>
          )}
          {!demoSpotlightVisible && (
            <button className="btn btn-secondary btn-sm" onClick={() => setDemoSpotlightVisible(true)}>Reset Spotlight Demo</button>
          )}
        </div>
      ),
      htmlCode: `<div class="spotlight-card">
  <div class="spotlight-title">New: Multi-project view</div>
  <p class="spotlight-desc">Switch between distinct products layouts...</p>
  <div class="spotlight-actions">
    <button class="btn btn-ghost">Dismiss</button>
    <button class="btn btn-primary">Learn More</button>
  </div>
</div>`,
      cssCode: `.spotlight-card { position: relative; background-color: #1e2030; color: #fff; border-radius: var(--radius-md); padding: 1rem; max-width: 280px; box-shadow: 0 10px 25px rgba(0,0,0,0.3); font-size: 0.78rem; border: 1px solid #7b84ff; }`
    },
    {
      id: 'comment',
      category: 'messaging',
      name: 'Comment Thread',
      description: 'Standard comment layouts showing user details and timestamps.',
      preview: (
        <div className="card" style={{ maxWidth: '450px' }}>
          <div style={{ padding: '0.75rem 1rem', display: 'flex', gap: '0.75rem' }}>
            <div className="avatar">JD</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: '0.8rem' }}>John Doe</span>
                <span style={{ fontSize: '0.65rem', color: 'hsl(var(--text-secondary))' }}>10 hours ago</span>
              </div>
              <p style={{ margin: 0, fontSize: '0.78rem', color: 'hsl(var(--text-secondary))' }}>
                We should review the calendar selected indicator padding; it seems too tight on mobile layout.
              </p>
            </div>
          </div>
        </div>
      ),
      htmlCode: `<div class="card">
  <div class="comment-row">
    <div class="avatar">JD</div>
    <div class="comment-content">
      <span class="comment-author">John Doe</span>
      <p class="comment-text">We should review the calendar selected...</p>
    </div>
  </div>
</div>`,
      cssCode: `/* Reuses existing card layout components and avatar styles */`
    },

    // --- NAVIGATION ---
    {
      id: 'navigation-elements',
      category: 'navigation',
      name: 'Tabs & Breadcrumbs',
      description: 'Standard breadcrumbs hierarchies and paginator grids.',
      preview: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <nav className="breadcrumbs">
            <a href="#">Products</a>
            <span className="divider">/</span>
            <a href="#">Design System</a>
            <span className="divider">/</span>
            <span className="current">Base Elements</span>
          </nav>
          <div className="pagination-row">
            <button className="pagination-btn">&laquo;</button>
            <button className="pagination-btn active">1</button>
            <button className="pagination-btn">2</button>
            <button className="pagination-btn">3</button>
            <button className="pagination-btn">&raquo;</button>
          </div>
        </div>
      ),
      htmlCode: `<!-- Breadcrumbs -->
<nav class="breadcrumbs">
  <a href="#">Products</a>
  <span class="divider">/</span>
  <span class="current">Base Elements</span>
</nav>

<!-- Pagination -->
<div class="pagination-row">
  <button class="pagination-btn active">1</button>
  <button class="pagination-btn">2</button>
</div>`,
      cssCode: `.breadcrumbs { display: flex; align-items: center; gap: 0.5rem; font-size: 0.75rem; }
.breadcrumbs a { color: hsl(var(--text-secondary)); text-decoration: none; }
.breadcrumbs .divider { color: hsl(var(--text-muted)); }
.breadcrumbs .current { color: hsl(var(--text-primary)); font-weight: 500; }

.pagination-row { display: flex; align-items: center; gap: 0.25rem; }
.pagination-btn { width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; border-radius: var(--radius-xs); border: 1px solid hsl(var(--border)); background: transparent; cursor: pointer; }
.pagination-btn.active { background-color: hsl(var(--primary)); color: hsl(var(--primary-fg)); }`
    },

    // --- OVERLAYS & LAYERING ---
    {
      id: 'overlays-layering',
      category: 'overlays',
      name: 'Blanket, Drawer & Modal Dialog',
      description: 'Overlay components for displaying blocking focus panels and content details.',
      preview: (
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button className="btn btn-outline btn-md" onClick={() => setDemoModalOpen(true)}>Open Modal Dialog</button>
          <button className="btn btn-outline btn-md" onClick={() => setDemoDrawerOpen(true)}>Open Slide Drawer</button>
          
          {/* Simulated Blanket Screen & Modal */}
          {demoModalOpen && (
            <div className="blanket-screen" style={{ position: 'fixed', zIndex: 1100 }}>
              <div className="modal-card" style={{ maxWidth: '400px' }}>
                <div className="modal-body">
                  <h3 style={{ marginTop: 0, color: 'hsl(var(--text-primary))' }}>Deactivate System Log?</h3>
                  <p>This action is irreversible. All current log evidence stacks will be deleted permanently.</p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-ghost" onClick={() => setDemoModalOpen(false)}>Cancel</button>
                  <button className="btn btn-destructive" onClick={() => setDemoModalOpen(false)}>Deactivate</button>
                </div>
              </div>
            </div>
          )}

          {/* Slide Drawer */}
          {demoDrawerOpen && (
            <div className="blanket-screen" style={{ position: 'fixed', zIndex: 1100 }} onClick={() => setDemoDrawerOpen(false)}>
              <div 
                className="drawer-panel open" 
                style={{ height: '100vh', maxWidth: '320px' }}
                onClick={(e) => e.stopPropagation()}
              >
                <div style={{ padding: '1.5rem', borderBottom: '1px solid hsl(var(--border))', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 700 }}>Inspect Log Item</span>
                  <button className="btn btn-ghost btn-sm" onClick={() => setDemoDrawerOpen(false)}>Close</button>
                </div>
                <div style={{ padding: '1.5rem', fontSize: '0.8rem', color: 'hsl(var(--text-secondary))' }}>
                  Metadata details and associated code symbols display inside this slide drawer layout.
                </div>
              </div>
            </div>
          )}
        </div>
      ),
      htmlCode: `<!-- Blanket Overlay -->
<div class="blanket-screen">
  <!-- Modal Card -->
  <div class="modal-card">
    <div class="modal-body">
      <h3>Deactivate System Log?</h3>
      <p>This action is irreversible...</p>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost">Cancel</button>
      <button class="btn btn-destructive">Deactivate</button>
    </div>
  </div>
</div>`,
      cssCode: `.blanket-screen { position: fixed; inset: 0; background-color: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; }
.modal-card { background-color: hsl(var(--bg-card)); border: 1px solid hsl(var(--border)); border-radius: var(--radius-lg); width: 100%; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.2); }
.modal-footer { padding: 1.0rem 1.5rem; border-top: 1px solid hsl(var(--border)); display: flex; justify-content: flex-end; gap: 0.5rem; }

.drawer-panel { position: fixed; top: 0; right: 0; bottom: 0; background-color: hsl(var(--bg-card)); border-left: 1px solid hsl(var(--border)); transform: translateX(100%); transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
.drawer-panel.open { transform: translateX(0); }`
    },

    // --- TEXT & DATA DISPLAY ---
    {
      id: 'metric-text',
      category: 'text-display',
      name: 'MetricText',
      description: 'Bold visual numbers representing metrics and numeric results.',
      preview: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <span className="metric-text">99.85%</span>
          <span style={{ fontSize: '0.7rem', color: 'hsl(var(--text-secondary))', textTransform: 'uppercase', fontWeight: 600 }}>Bridge Uptime</span>
        </div>
      ),
      htmlCode: `<div class="metric-container">
  <span class="metric-text">99.85%</span>
  <span class="metric-label">Bridge Uptime</span>
</div>`,
      cssCode: `.metric-text { font-size: 2.25rem; font-weight: 800; color: hsl(var(--text-primary)); letter-spacing: -0.03em; }`
    },
    {
      id: 'inline-edit',
      category: 'text-display',
      name: 'Inline Edit',
      description: 'A text label that converts to a standard input on click.',
      preview: (
        <div>
          {inlineEditing ? (
            <input 
              className="inline-edit-input" 
              type="text" 
              value={inlineEditVal} 
              onChange={(e) => setInlineEditVal(e.target.value)}
              onBlur={() => setInlineEditing(false)}
              onKeyDown={(e) => e.key === 'Enter' && setInlineEditing(false)}
              autoFocus
            />
          ) : (
            <span className="inline-edit-trigger" onClick={() => setInlineEditing(true)}>
              {inlineEditVal}
            </span>
          )}
        </div>
      ),
      htmlCode: `<!-- Static Trigger -->
<span class="inline-edit-trigger">Editable task parameter</span>

<!-- Interactive Edit Input -->
<input class="inline-edit-input" type="text" value="..." />`,
      cssCode: `.inline-edit-trigger { border-bottom: 1px dashed hsl(var(--text-secondary)); cursor: pointer; padding: 0.1rem 0.2rem; display: inline-block; font-size: 0.825rem; }
.inline-edit-input { border: 1px solid hsl(var(--ring)); background-color: hsl(var(--bg-app)); color: hsl(var(--text-primary)); border-radius: var(--radius-xs); padding: 0.1rem 0.4rem; font-size: 0.825rem; outline: none; }`
    },
    {
      id: 'table-tree',
      category: 'text-display',
      name: 'Table Tree',
      description: 'Hierarchical tree structure demonstrating folders, directories, or tasks trees.',
      preview: (
        <div className="table-container" style={{ width: '100%' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Directory Node</th>
                <th>File Size</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="table-tree-node" style={{ '--tree-level': 0 } as any}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                    <span style={{ fontWeight: 600 }}>src/</span>
                  </div>
                </td>
                <td>--</td>
              </tr>
              <tr>
                <td>
                  <div className="table-tree-node" style={{ '--tree-level': 1 } as any}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                    <span style={{ fontWeight: 600 }}>app/</span>
                  </div>
                </td>
                <td>--</td>
              </tr>
              <tr>
                <td>
                  <div className="table-tree-node" style={{ '--tree-level': 2 } as any}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                    <span>page.tsx</span>
                  </div>
                </td>
                <td>24.5 KB</td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
      htmlCode: `<div class="table-tree-node" style="--tree-level: 2">
  <svg>...</svg>
  <span>page.tsx</span>
</div>`,
      cssCode: `.table-tree-node { display: flex; align-items: center; gap: 0.5rem; padding-left: calc(var(--tree-level, 0) * 1.5rem); font-size: 0.8rem; }`
    }
  ];

  const filteredComponents = componentDocs.filter(c => c.category === activeMenuSection);

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
                Light Theme Mode
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                Dark Theme Mode
              </>
            )}
          </button>
        </div>

        <nav className="doc-menu">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`doc-menu-link ${activeMenuSection === cat.id ? 'active' : ''}`}
              onClick={() => setActiveMenuSection(cat.id)}
            >
              {cat.label}
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
            This portal hosts all of the building block components of the **Oykot Product Design System**. 
            Select categories on the sidebar menu list to preview components, toggle themes, and export copyable HTML structures and CSS classes.
          </p>
        </div>

        {/* Render Design Tokens if forms-inputs is active */}
        {activeMenuSection === 'forms-inputs' && (
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
        )}

        {/* Render Filtered Component Sections */}
        {filteredComponents.map(doc => {
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
