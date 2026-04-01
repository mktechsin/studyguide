/* ============================================================
   NOTES SITE — Core JS
   Handles: sidebar toggle, TOC generation, active states,
            copy buttons, scroll spy
   ============================================================ */

(function () {
  'use strict';

  /* ── Sidebar toggle (mobile) ─────────────────────────────── */
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  const toggleBtn = document.getElementById('sidebar-toggle');

  function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('visible');
    document.body.style.overflow = '';
  }

  if (toggleBtn) toggleBtn.addEventListener('click', openSidebar);
  if (overlay)   overlay.addEventListener('click', closeSidebar);

  /* close sidebar when a nav link is clicked on mobile */
  document.querySelectorAll('#page-nav a').forEach(a => {
    a.addEventListener('click', () => {
      if (window.innerWidth <= 768) closeSidebar();
    });
  });

  /* ── Mark current page in page nav ──────────────────────── */
  const currentFile = location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('#page-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentFile || href === './' + currentFile) {
      a.classList.add('active');
    }
  });

  /* ── TOC generation ──────────────────────────────────────── */
  const tocList   = document.getElementById('toc-list');
  const content   = document.getElementById('content');

  if (tocList && content) {
    const headings = content.querySelectorAll('h2, h3');

    if (headings.length === 0) {
      const parent = tocList.closest('.sidebar-section');
      if (parent) parent.style.display = 'none';
    } else {
      headings.forEach((h, i) => {
        /* ensure every heading has an id */
        if (!h.id) {
          h.id = 'heading-' + i + '-' + h.textContent.trim()
            .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        }

        const li = document.createElement('li');
        const a  = document.createElement('a');
        a.href        = '#' + h.id;
        a.textContent = h.textContent;
        if (h.tagName === 'H3') a.classList.add('toc-h3');

        a.addEventListener('click', (e) => {
          e.preventDefault();
          document.getElementById(h.id).scrollIntoView({ behavior: 'smooth' });
          if (window.innerWidth <= 768) closeSidebar();
        });

        li.appendChild(a);
        tocList.appendChild(li);
      });
    }
  }

  /* ── Scroll spy — highlight active TOC + nav item ───────── */
  function scrollSpy() {
    if (!content) return;
    const headings = Array.from(content.querySelectorAll('h2, h3'));
    if (!headings.length) return;

    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    let active = headings[0];

    headings.forEach(h => {
      if (h.getBoundingClientRect().top + window.scrollY - 80 <= scrollTop) {
        active = h;
      }
    });

    document.querySelectorAll('#toc-list a').forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + active.id);
    });
  }

  window.addEventListener('scroll', scrollSpy, { passive: true });
  scrollSpy();

  /* ── Copy buttons ────────────────────────────────────────── */
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const block = btn.closest('.code-block');
      const code  = block ? block.querySelector('code') : null;
      if (!code) return;

      navigator.clipboard.writeText(code.innerText).then(() => {
        btn.textContent = '✓ Copied';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = 'Copy';
          btn.classList.remove('copied');
        }, 2000);
      }).catch(() => {
        /* fallback for older browsers */
        const ta = document.createElement('textarea');
        ta.value = code.innerText;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        btn.textContent = '✓ Copied';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = 'Copy';
          btn.classList.remove('copied');
        }, 2000);
      });
    });
  });

  /* ── Update topbar title from h1 ─────────────────────────── */
  const h1 = content && content.querySelector('h1');
  const topbarTitle = document.getElementById('topbar-title');
  if (h1 && topbarTitle) {
    topbarTitle.textContent = h1.textContent;
  }

})();
