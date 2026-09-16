/* =========================================================
   Cadence — shared site script
   ========================================================= */
(function () {
  "use strict";

  // ---------- Floating action cards: drag anywhere ----------
  window.wireFloatDrag = function (card) {
    const handle = card.querySelector(".float-actions-handle");
    if (!handle || handle.dataset.dragWired) return;
    handle.dataset.dragWired = "1";
    let dragging = false, sx = 0, sy = 0, ox = 0, oy = 0;
    handle.addEventListener("pointerdown", (e) => {
      if (e.target.closest(".float-actions-close")) return;
      dragging = true;
      const r = card.getBoundingClientRect();
      sx = e.clientX; sy = e.clientY; ox = r.left; oy = r.top;
      card.style.transition = "none";
      handle.setPointerCapture(e.pointerId);
    });
    handle.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      const x = Math.min(Math.max(8, ox + e.clientX - sx), window.innerWidth - card.offsetWidth - 8);
      const y = Math.min(Math.max(8, oy + e.clientY - sy), window.innerHeight - card.offsetHeight - 8);
      card.style.left = x + "px";
      card.style.top = y + "px";
      card.style.right = "auto";
      card.style.bottom = "auto";
      card.style.transform = "none";
    });
    handle.addEventListener("pointerup", () => {
      dragging = false;
      card.style.transition = "";
    });
  };
  document.querySelectorAll(".float-actions").forEach(window.wireFloatDrag);

  window.wireFloatPanel = function (card, label) {
    const launcherId = card.id + "Launcher";
    let launcher = document.getElementById(launcherId);
    if (!launcher) {
      launcher = document.createElement("button");
      launcher.id = launcherId;
      launcher.type = "button";
      launcher.className = "float-launcher";
      launcher.setAttribute("aria-controls", card.id);
      launcher.setAttribute("aria-expanded", "false");
      document.body.appendChild(launcher);
    }
    launcher.textContent = label || "Want to try this?";

    const collapse = () => {
      card.classList.remove("is-open");
      card.style.left = "";
      card.style.top = "";
      card.style.right = "";
      card.style.bottom = "";
      card.style.transform = "";
      card.style.transition = "";
      launcher.hidden = card.hidden === true;
      launcher.setAttribute("aria-expanded", "false");
    };
    const open = () => {
      card.classList.add("is-open");
      card.dataset.openScrollY = String(window.scrollY);
      launcher.hidden = true;
      launcher.setAttribute("aria-expanded", "true");
    };

    if (!launcher.dataset.panelWired) {
      launcher.dataset.panelWired = "1";
      launcher.addEventListener("click", open);
      window.addEventListener("scroll", () => {
        if (!card.classList.contains("is-open")) return;
        const started = Number(card.dataset.openScrollY || 0);
        if (Math.abs(window.scrollY - started) > 16) collapse();
      }, { passive: true });
    }

    const closeBtn = card.querySelector(".float-actions-close");
    if (closeBtn) closeBtn.addEventListener("click", collapse);

    // every render starts collapsed with the launcher showing
    collapse();
  };

  // ---------- Shared header identity ----------
  document.querySelectorAll(".brand").forEach((brand) => {
    brand.setAttribute("aria-label", "Ellevio home");
  });

  // ---------- Announcement bar dismiss ----------
  const announce = document.querySelector(".announce");
  if (announce) {
    const closeBtn = announce.querySelector(".announce-close");
    const dismissed = sessionStorage.getItem("gds.announce.dismissed");
    if (dismissed === "1") announce.style.display = "none";
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        announce.style.display = "none";
        try { sessionStorage.setItem("gds.announce.dismissed", "1"); } catch (e) {}
      });
    }
  }

  // ---------- Mobile drawers ----------
  // Two separate panels, because they answer two different questions:
  // the burger on the right opens site navigation, the contents button on the
  // left opens the current page's sections. Only one can be open at a time.
  const mobileToggle = document.querySelector(".mobile-toggle");
  const sidebar = document.querySelector(".sidebar");
  const headerInner = document.querySelector(".header-inner");

  if (mobileToggle) {
    const BURGER =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">' +
      '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
    const CLOSE =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">' +
      '<line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>';

    mobileToggle.classList.add("is-icon");
    mobileToggle.innerHTML = BURGER;

    const scrim = document.createElement("div");
    scrim.className = "nav-scrim";
    document.body.appendChild(scrim);

    const panels = [];

    function close(panel) {
      panel.el.classList.remove("is-open");
      panel.trigger.setAttribute("aria-expanded", "false");
      if (panel.side === "right") mobileToggle.innerHTML = BURGER;
      if (!panels.some((p) => p.el.classList.contains("is-open"))) {
        scrim.classList.remove("is-open");
        document.body.classList.remove("drawer-open");
      }
    }

    function closeAll() { panels.forEach(close); }

    function open(panel) {
      panels.forEach((p) => { if (p !== panel) close(p); });
      if (panel.refresh) panel.refresh();
      panel.el.classList.add("is-open");
      panel.trigger.setAttribute("aria-expanded", "true");
      if (panel.side === "right") mobileToggle.innerHTML = CLOSE;
      scrim.classList.add("is-open");
      document.body.classList.add("drawer-open");
    }

    function createPanel(side, title, bodyHtml, trigger) {
      const el = document.createElement("aside");
      el.className = "nav-drawer nav-drawer-" + side;
      el.setAttribute("aria-label", title);
      el.innerHTML =
        '<div class="nav-drawer-head">' +
        '<p class="nav-drawer-title">' + title + "</p>" +
        '<button type="button" class="nav-drawer-close" aria-label="Close">&#x2715;</button>' +
        "</div>" + bodyHtml;
      document.body.appendChild(el);

      const panel = { el, side, trigger };
      panels.push(panel);

      trigger.addEventListener("click", (e) => {
        e.stopPropagation();
        if (el.classList.contains("is-open")) close(panel);
        else open(panel);
      });
      el.querySelector(".nav-drawer-close").addEventListener("click", () => close(panel));

      // Picking an item slides the panel shut and jumps straight to the target.
      el.addEventListener("click", (e) => {
        const a = e.target.closest("a[href]");
        if (!a) return;
        const href = a.getAttribute("href");
        close(panel);
        if (href && href.charAt(0) === "#" && href.length > 1) {
          const target = document.getElementById(href.slice(1));
          if (target) {
            e.preventDefault();
            history.replaceState(null, "", href);
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      });

      return panel;
    }

    // ---- right: site navigation ----
    const primary = document.querySelector(".primary-nav ul");
    const primaryLinks = primary
      ? Array.from(primary.querySelectorAll("a")).map((a) => {
          const cur = a.getAttribute("aria-current") === "page" ? ' aria-current="page"' : "";
          return `<li><a href="${a.getAttribute("href")}"${cur}>${a.textContent.trim()}</a></li>`;
        }).join("")
      : "";

    const navPanel = createPanel("right", "Menu",
      '<div class="nav-drawer-search">' +
      '<label class="visually-hidden" for="drawer-search-input">Search docs</label>' +
      '<input id="drawer-search-input" type="search" placeholder="Search the docs\u2026" autocomplete="off" spellcheck="false" />' +
      "</div>" +
      (primaryLinks ? '<div class="nav-drawer-group"><h3>Site</h3><ul>' + primaryLinks + "</ul></div>" : ""),
      mobileToggle);

    if (window.RoleFocus && window.RoleFocus.mount) {
      const slot = document.createElement("div");
      navPanel.el.querySelector(".nav-drawer-search").insertAdjacentElement("afterend", slot);
      window.RoleFocus.mount(slot, false);
    }

    // ---- left: this page's sections ----
    // Rebuilt from text and href on every open, because pages like Skills and
    // Agents render their sidebar from JS after this script has already run.
    if (sidebar && headerInner) {
      const esc = (s) => String(s).replace(/[&<>"]/g, (c) =>
        ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

      // Recurse to the innermost <details> so nested groups are not duplicated.
      function collect(el, label, out) {
        const nested = el.querySelectorAll("details");
        if (nested.length) {
          nested.forEach((d) => {
            const s = d.querySelector("summary");
            collect(d, s ? s.textContent.trim() : label, out);
          });
          return;
        }
        const links = Array.from(el.querySelectorAll("a[href]"));
        if (links.length) out.push({ label, links });
      }

      function sectionsBody() {
        const nav = sidebar.querySelector("nav");
        if (!nav) return "";
        const out = [];

        const outermost = Array.from(nav.querySelectorAll("details"))
          .filter((d) => !d.parentElement.closest("details"));
        outermost.forEach((d) => {
          const s = d.querySelector("summary");
          collect(d, s ? s.textContent.trim() : "Sections", out);
        });

        const loose = Array.from(nav.querySelectorAll("a[href]"))
          .filter((a) => !a.closest("details"));
        if (loose.length) out.unshift({ label: "", links: loose });

        return out.map((g) => {
          const items = g.links.map((a) => {
            const href = a.getAttribute("href");
            const sub = href && href.charAt(0) === "#" ? ' class="is-sub"' : "";
            return `<li${sub}><a href="${esc(href)}">${esc(a.textContent.trim())}</a></li>`;
          }).join("");
          return '<div class="nav-drawer-group">' +
            (g.label ? "<h3>" + esc(g.label) + "</h3>" : "") +
            "<ul>" + items + "</ul></div>";
        }).join("");
      }

      const contentsToggle = document.createElement("button");
      contentsToggle.type = "button";
      contentsToggle.className = "contents-toggle";
      contentsToggle.setAttribute("aria-label", "Open page contents");
      contentsToggle.setAttribute("aria-expanded", "false");
      contentsToggle.innerHTML =
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>' +
        '<line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>' +
        "<span>Contents</span>";
      headerInner.insertBefore(contentsToggle, headerInner.firstChild);

      const sectionsPanel = createPanel("left", "On this page", "", contentsToggle);
      sectionsPanel.refresh = () => {
        const head = sectionsPanel.el.querySelector(".nav-drawer-head");
        while (head.nextSibling) sectionsPanel.el.removeChild(head.nextSibling);
        head.insertAdjacentHTML("afterend", sectionsBody());
      };
      sectionsPanel.refresh();
    }

    scrim.addEventListener("click", closeAll);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeAll(); });

    // Mirror drawer search into the desktop input so existing search logic fires.
    const desktopSearch = document.querySelector(".header-actions .search input[type='search']");
    const drawerInput = navPanel.el.querySelector("#drawer-search-input");
    if (desktopSearch && drawerInput) {
      drawerInput.addEventListener("input", () => {
        desktopSearch.value = drawerInput.value;
        desktopSearch.dispatchEvent(new Event("input", { bubbles: true }));
      });
    }
  }

  // ---------- Copy-to-clipboard for code blocks ----------
  function wrapCodeBlocks() {
    const blocks = document.querySelectorAll("pre:not(.no-copy)");
    blocks.forEach((pre) => {
      if (pre.parentElement && pre.parentElement.classList.contains("code-block")) return;
      const wrap = document.createElement("div");
      wrap.className = "code-block";
      pre.parentNode.insertBefore(wrap, pre);
      wrap.appendChild(pre);

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "copy-code-btn";
      btn.setAttribute("aria-label", "Copy code");
      btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h9"/></svg>`;
      btn.addEventListener("click", async () => {
        const text = pre.innerText.trim();
        try {
          await navigator.clipboard.writeText(text);
          btn.classList.add("is-copied");
          btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
          setTimeout(() => {
            btn.classList.remove("is-copied");
            btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h9"/></svg>`;
          }, 1500);
        } catch (e) {
          window.prompt("Copy this:", text);
        }
      });
      wrap.appendChild(btn);
    });
  }
  wrapCodeBlocks();

  // ---------- Scrollspy: highlight sidebar + TOC link for current section ----------
  (function () {
    const tocLinks = Array.from(document.querySelectorAll('.toc > ul a[href^="#"]'));
    const sideLinks = Array.from(document.querySelectorAll('.sidebar a[href^="#"]'));
    if (!tocLinks.length && !sideLinks.length) return;

    const idOf = a => decodeURIComponent(a.getAttribute("href").slice(1));
    const tocById = new Map(tocLinks.map(a => [idOf(a), a]));
    const sideById = new Map(sideLinks.map(a => [idOf(a), a]));

    // Union of all linked section elements that exist, ordered by document position.
    const seen = new Set();
    const targets = [];
    [...tocLinks, ...sideLinks].forEach(a => {
      const id = idOf(a);
      if (seen.has(id)) return;
      const el = document.getElementById(id);
      if (el) { seen.add(id); targets.push(el); }
    });
    if (!targets.length) return;
    targets.sort((a, b) =>
      (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING) ? -1 : 1
    );

    let current = null;
    function setActive(id) {
      if (id === current) return;
      current = id;
      tocLinks.forEach(a => a.classList.remove("is-active"));
      const tl = tocById.get(id);
      if (tl) tl.classList.add("is-active");
      sideLinks.forEach(a => a.removeAttribute("aria-current"));
      const sl = sideById.get(id);
      if (sl) sl.setAttribute("aria-current", "page");
    }

    function update() {
      const probe = window.innerHeight * 0.25;
      let activeId = targets[0] && targets[0].id;
      for (const el of targets) {
        const top = el.getBoundingClientRect().top;
        if (top - probe <= 0) activeId = el.id;
        else break;
      }
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 4) {
        activeId = targets[targets.length - 1].id;
      }
      setActive(activeId);
    }

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { update(); ticking = false; });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
  })();

  // ---------- Tabs ----------
  document.querySelectorAll(".tabs").forEach((tabs) => {
    const buttons = tabs.querySelectorAll(".tab-btn");
    const panels = tabs.querySelectorAll(".tab-panel");
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.target;
        buttons.forEach(b => b.setAttribute("aria-selected", b === btn ? "true" : "false"));
        panels.forEach(p => p.setAttribute("aria-hidden", p.id === target ? "false" : "true"));
      });
    });
  });

  // ---------- Skill finder wizard ----------
  const wizard = document.querySelector("[data-wizard]");
  if (wizard) {
    const steps = wizard.querySelectorAll(".wizard-step");
    const answers = {};

    function go(id) {
      steps.forEach(s => s.classList.toggle("is-active", s.dataset.step === id));
    }

    function recommend() {
      const result = wizard.querySelector(".wizard-result");
      const heading = result.querySelector("h3");
      const desc = result.querySelector("p");
      const link = result.querySelector("a.btn");
      const rec = matchRec(answers);
      heading.textContent = rec.title;
      desc.textContent = rec.desc;
      link.href = "skills/index.html#skill/" + rec.id;
      link.textContent = "Open /" + rec.id;
      go("result");
    }

    function matchRec(a) {
      const where = a.where;
      const what = a.what;

      // Discovery / before a story exists
      if (where === "discovery") {
        if (what === "transcript") return { id: "meeting-transcript", title: "Try /meeting-transcript", desc: "Paste a Teams transcript and it will extract actions, decisions, and draft user stories." };
        if (what === "process") return { id: "process-map", title: "Try /process-map", desc: "Maps your as-is or to-be business process and inventories pain points and bottlenecks." };
        return { id: "discovery", title: "Try /discovery", desc: "Facilitates stakeholder interviews and frames questions before any story is written." };
      }
      // Backlog / refinement
      if (where === "backlog") {
        if (what === "draft") return { id: "backlog-creation", title: "Try /backlog-creation", desc: "Drafts Epics, Features and user stories with Gherkin ACs and MoSCoW priority." };
        if (what === "polish") return { id: "story-refinement", title: "Try /story-refinement", desc: "Tightens descriptions, adds missing ACs, surfaces assumptions and edge cases." };
        return { id: "ado-task-breakdown", title: "Try /ado-task-breakdown", desc: "Creates the project's task breakdown under a User Story with assignees and estimates." };
      }
      // Build / code
      if (where === "build") {
        if (what === "draft") return { id: "sf-codegen", title: "Try /sf-codegen", desc: "Generates Apex, triggers, test classes, Flows and LWC components from a refined User Story." };
        if (what === "plan") return { id: "implementation", title: "Try /implementation", desc: "Breaks a story into technical tasks, outlines coding approach and validation steps." };
        return { id: "solution-design", title: "Try /solution-design", desc: "Produces architecture options, integration points and trade-offs before you build." };
      }
      // QA & release
      if (where === "release") {
        if (what === "draft") return { id: "test-case-generation", title: "Try /test-case-generation", desc: "Generates manual test cases and publishes them as an Azure Test Plan linked to the story." };
        if (what === "plan") return { id: "release-readiness", title: "Try /release-readiness", desc: "Runs the sprint sign-off, deployment and demo readiness checks." };
        return { id: "release-notes", title: "Try /release-notes", desc: "Combines completed ADO items with feature-registry context into shareable release notes." };
      }
      // Scope & governance
      if (where === "scope") {
        if (what === "draft") return { id: "scope-gate", title: "Try /scope-gate", desc: "Validates an ask against the the client contract, SLAs and the contractual buffer." };
        if (what === "plan") return { id: "milestone-review", title: "Try /milestone-review", desc: "Compares delivered value against contractual milestones and produces a steering-ready report." };
        return { id: "governance-audit", title: "Try /governance-audit", desc: "Runs the full repo-wide governance & AI-readiness audit across 7 dimensions." };
      }
      // ADO operations
      if (where === "ado") {
        if (what === "draft") return { id: "ado-comment", title: "Try /ado-comment", desc: "Posts discussion comments on Azure DevOps work items with @mention support." };
        if (what === "polish") return { id: "ado-quality-guardian", title: "Try /ado-quality-guardian", desc: "Scores every work item against the quality rubric and detects MECE gaps." };
        return { id: "ado-task-breakdown", title: "Try /ado-task-breakdown", desc: "Creates the project's task breakdown under a User Story with assignees and estimates." };
      }
      // Default fallback
      return { id: "skill-finder", title: "Try /skill-finder", desc: "When you're not sure which skill fits, this entry-point router will pick one for you." };
    }

    wizard.querySelectorAll(".wizard-opt").forEach((opt) => {
      opt.addEventListener("click", () => {
        const step = opt.closest(".wizard-step").dataset.step;
        const next = opt.dataset.next;
        const key = opt.dataset.key;
        const val = opt.dataset.value;
        if (key && val) answers[key] = val;
        if (next === "result") return recommend();
        if (next) go(next);
      });
    });

    wizard.querySelectorAll(".reset").forEach((b) => {
      b.addEventListener("click", () => {
        Object.keys(answers).forEach(k => delete answers[k]);
        go("q1");
      });
    });
  }

  // ---------- Scroll reveals (progressive enhancement) ----------
  (function () {
    // Mark document as motion-capable so CSS reveal styles activate.
    // Without this, [data-reveal] / [data-reveal-group] elements stay fully visible.
    document.documentElement.setAttribute('data-motion', '');

    var selectors = '[data-reveal], [data-reveal-group], [data-stats], [data-reveal-cta]';
    var targets = Array.from(document.querySelectorAll(selectors));
    if (!targets.length) return;

    // Fallback for browsers without IntersectionObserver
    if (!('IntersectionObserver' in window)) {
      targets.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

    targets.forEach(function (el) { observer.observe(el); });
  })();
})();
