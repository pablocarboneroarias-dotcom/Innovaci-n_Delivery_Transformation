/* =============================================================
   Cadence — Architecture Visualization
   Handles: main tab switching, pipeline sub-tabs, staggered
   entrance animations, and accessible hover/focus tooltips.
   ============================================================= */
(function () {
  'use strict';

  /* ---- Helpers ---- */
  function qs(sel, ctx)  { return (ctx || document).querySelector(sel); }
  function qsa(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }

  function escapeHTML(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ---- Staggered entrance for a set of nodes ---- */
  function staggerIn(items, baseDelay, stepDelay) {
    items.forEach(function (el, i) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(6px)';
      el.style.transition =
        'opacity 0.35s ease ' + (baseDelay + i * stepDelay) + 's, ' +
        'transform 0.35s ease ' + (baseDelay + i * stepDelay) + 's';
      /* double-rAF forces browser to register the initial state */
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          el.style.opacity = '';
          el.style.transform = '';
        });
      });
    });
  }

  /* ---- Main tab switching (overview / pipelines / security) ---- */
  function initMainTabs() {
    var tabs   = qsa('[data-arch-tab]');
    var panels = qsa('.arch-panel');
    if (!tabs.length) return;

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var target = tab.getAttribute('data-arch-tab');

        tabs.forEach(function (t) {
          t.classList.remove('is-active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('is-active');
        tab.setAttribute('aria-selected', 'true');

        panels.forEach(function (p) { p.classList.remove('is-active'); });
        var panel = document.getElementById('arch-' + target);
        if (!panel) return;
        panel.classList.add('is-active');

        /* Animate the incoming panel's cards/nodes */
        var animTargets = qsa(
          '.arch-box, .arch-hook-card, .arch-flow-step, .arch-flow-gate',
          panel
        );
        staggerIn(animTargets, 0, 0.04);
      });
    });
  }

  /* ---- Pipeline sub-tabs ---- */
  function initPipelineTabs() {
    var tabs  = qsa('[data-pipeline-tab]');
    var views = qsa('.arch-pipeline-view');
    if (!tabs.length) return;

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var target = tab.getAttribute('data-pipeline-tab');

        tabs.forEach(function (t) {
          t.classList.remove('is-active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('is-active');
        tab.setAttribute('aria-selected', 'true');

        views.forEach(function (v) { v.classList.remove('is-active'); });
        var view = document.getElementById('pipe-' + target);
        if (!view) return;
        view.classList.add('is-active');

        var steps = qsa('.arch-flow-step, .arch-flow-gate, .arch-parallel-wrap, .arch-flow-arrow', view);
        staggerIn(steps, 0, 0.1);
      });
    });
  }

  /* ---- Tooltip ---- */
  function initTooltips() {
    var tip = document.createElement('div');
    tip.className = 'arch-tooltip';
    tip.setAttribute('role', 'tooltip');
    tip.id = 'arch-tt';
    tip.style.display = 'none';
    document.body.appendChild(tip);

    var nodes = qsa('[data-arch-title]');

    function show(node) {
      var title = node.getAttribute('data-arch-title');
      var desc  = node.getAttribute('data-arch-desc') || '';
      tip.innerHTML =
        '<span class="arch-tt-title">' + escapeHTML(title) + '</span>' +
        (desc ? '<span class="arch-tt-desc">' + escapeHTML(desc) + '</span>' : '');
      tip.style.display = 'block';
      place(node);
    }

    function place(node) {
      var r   = node.getBoundingClientRect();
      var sy  = window.pageYOffset;
      var tw  = tip.offsetWidth;
      var th  = tip.offsetHeight;
      var top = r.top + sy - th - 10;
      var left = r.left + r.width / 2 - tw / 2;

      if (top < sy + 8) top = r.bottom + sy + 10;
      left = Math.max(8, Math.min(left, window.innerWidth - tw - 8));

      tip.style.top  = top  + 'px';
      tip.style.left = left + 'px';
    }

    function hide() { tip.style.display = 'none'; }

    nodes.forEach(function (node) {
      if (!node.hasAttribute('tabindex')) node.setAttribute('tabindex', '0');
      node.setAttribute('aria-describedby', 'arch-tt');
      node.addEventListener('mouseenter', function () { show(node); });
      node.addEventListener('mouseleave', hide);
      node.addEventListener('focus',      function () { show(node); });
      node.addEventListener('blur',       hide);
      node.addEventListener('keydown',    function (e) {
        if (e.key === 'Escape') { hide(); }
      });
    });

    document.addEventListener('click', function (e) {
      if (!e.target.closest('[data-arch-title]')) hide();
    });
  }

  /* ---- Boot ---- */
  function boot() {
    initMainTabs();
    initPipelineTabs();
    initTooltips();

    /* Animate nodes in the initially-visible overview panel */
    var overview = document.getElementById('arch-overview');
    if (overview) {
      var initialNodes = qsa('.arch-box', overview);
      staggerIn(initialNodes, 0.1, 0.03);
    }

    /* Animate the first pipeline view */
    var firstPipe = document.getElementById('pipe-delivery');
    if (firstPipe) {
      var steps = qsa('.arch-flow-step, .arch-flow-gate, .arch-parallel-wrap, .arch-flow-arrow', firstPipe);
      staggerIn(steps, 0.2, 0.08);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

}());
