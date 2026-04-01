# My Notes Site

A personal knowledge base built with vanilla HTML, CSS, and JavaScript — hosted on GitHub Pages.

## Structure

```
studyguide/
├── index.html                   ← Home / site selector
├── root/
│   ├── style.css                ← Design system (layout, typography, dark mode)
│   ├── components.css           ← Reusable components (callouts, code blocks, etc.)
│   ├── core.js                  ← Sidebar toggle, TOC, scroll spy, copy buttons
│   └── sidebar-template.html   ← Reference template for sidebar HTML
├── sites/
│   ├── powerbi/
│   │   ├── index.html           ← First page of the site
│   │   └── pages/
│   │       ├── data-modeling.html
│   │       ├── dax-basics.html
│   │       └── ...
│   └── sql/
│       ├── index.html
│       └── pages/
│           └── ...
```

## Adding a New Site

1. Create `sites/mysite/index.html` — copy the sidebar HTML from any existing site and update the title, links, and content.
2. Add pages under `sites/mysite/pages/`.
3. Adjust the `href` paths in `<link>` and `<script>` tags to point correctly to `../../root/` (from `index.html`) or `../../../root/` (from `pages/`).
4. Add a card to the root `index.html`.

## Adding a New Page

1. Copy an existing page HTML file.
2. Update the sidebar links (add a new `<li>` entry).
3. Write your content inside `<div id="content">`.
4. Headings (`h2`, `h3`) are automatically picked up for the TOC.

## Components Reference

### Callouts

```html
<div class="callout note">
  <span class="callout-icon">ℹ️</span>
  <div class="callout-body">
    <div class="callout-title">Note</div>
    Your message here.
  </div>
</div>
```

Types: `note`, `warning`, `error`, `tip`

### Code Block with Copy Button

```html
<div class="code-block">
  <div class="code-toolbar">
    <span class="code-lang">SQL</span>
    <button class="copy-btn">Copy</button>
  </div>
  <pre><code>SELECT * FROM table;</code></pre>
</div>
```

### Highlight

```html
<mark>highlighted text</mark>
```

### Badges

```html
<span class="badge badge-green">✓ Complete</span>
<span class="badge badge-yellow">⚡ In Progress</span>
<span class="badge badge-blue">ℹ Draft</span>
<span class="badge badge-red">⚠ Needs Review</span>
```

### Steps

```html
<div class="steps">
  <div class="step"><p>First thing to do</p></div>
  <div class="step"><p>Second thing to do</p></div>
</div>
```

### Keyboard Shortcut

```html
<kbd>Ctrl</kbd> + <kbd>Z</kbd>
```

### Definition

```html
<dl class="def">
  <dt>Term</dt>
  <dd>Definition of the term.</dd>
</dl>
```

## Hosting on GitHub Pages

1. Push this folder to a GitHub repository.
2. Go to **Settings → Pages**.
3. Set Source to **Deploy from a branch → main → / (root)**.
4. Your site will be live at `https://yourusername.github.io/repo-name/`.

No build step needed — everything is plain HTML/CSS/JS.
