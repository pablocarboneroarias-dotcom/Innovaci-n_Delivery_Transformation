/* Unified Role Journey, Persona Cards & Command Palette (⌘K) */
(function () {
  "use strict";

  var PERSONAS = window.PERSONAS || [];
  var section = document.getElementById("journey");
  if (!PERSONAS.length) return;

  var ROLE_KEY = "cadence.role";
  var OPEN_KEY = "cadence.journeyOpen";
  var PAGE = 9;

  function esc(s) {
    return String(s || "").replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function command(id) { 
    if (!id) return "";
    if (id.startsWith("/") || id.startsWith("@")) return id;
    if (id.startsWith("speckit-")) return "/" + id.replace("speckit-", "speckit.");
    return "/" + id;
  }

  function skillHref(id) {
    return "skills/skills.html#skill/" + id;
  }

  function vscodeUrl(c) {
    var cmd = c.skill ? command(c.skill) + "\n\n" : "";
    return "vscode://GitHub.Copilot-Chat/chat?prompt=" + encodeURIComponent(cmd + (c.prompt || c.title));
  }

  function shortName(p) { return p && p.name ? p.name.replace(/^the /, "") : ""; }

  function readRole() {
    try {
      var raw = window.localStorage.getItem(ROLE_KEY);
      if (raw === "all") return 0;
      var i = parseInt(raw, 10);
      return (i >= 0 && i < PERSONAS.length) ? i : 0;
    } catch (e) { return 0; }
  }

  var current = readRole();
  var firstIdx = 0;
  var shown = PAGE;

  var elFirstTitle = document.getElementById("jrFirstTitle");
  var elFirstPrompt = document.getElementById("jrFirstPrompt");
  var elFirstOpen = document.getElementById("jrFirstOpen");
  var elFirstSkill = document.getElementById("jrFirstSkill");
  var elGrid = document.getElementById("jrGrid");
  var elEmpty = document.getElementById("jrEmpty");
  var elMore = document.getElementById("jrMore");
  var elFilter = document.getElementById("jrFilter");

  function renderFirst() {
    var p = PERSONAS[current];
    if (!p || !p.cases || !p.cases.length) return;
    var c = p.cases[firstIdx % p.cases.length];
    var cmd = command(c.skill);
    var href = skillHref(c.skill);

    if (elFirstTitle) elFirstTitle.textContent = c.title;
    if (elFirstPrompt) {
      elFirstPrompt.innerHTML =
        '<span class="jr-chat-cmd">' + esc(cmd) + "</span>\n\n" +
        esc(c.prompt) + '<span class="jr-caret" aria-hidden="true">&nbsp;</span>';
    }
    if (elFirstOpen) elFirstOpen.href = vscodeUrl(c);
    if (elFirstSkill) {
      elFirstSkill.innerHTML = 'Uses <a href="' + href + '">' + esc(cmd) + "</a>";
    }
  }

  function matching() {
    var q = (elFilter && elFilter.value || "").trim().toLowerCase();
    var all = (PERSONAS[current] && PERSONAS[current].cases) || [];
    if (!q) return all;
    return all.filter(function (c) {
      return (c.title + " " + c.summary + " " + (c.body || "") + " " + c.prompt + " " + c.skill)
        .toLowerCase().indexOf(q) !== -1;
    });
  }

  function renderGrid() {
    if (!elGrid) return;
    var list = matching();

    elGrid.innerHTML = list.slice(0, shown).map(function (c) {
      var href = skillHref(c.skill);
      var cmd = command(c.skill);
      var tag = '<a class="jr-uc-tag" href="' + href + '">' + esc(cmd) + "</a>";
      return '<article class="jr-uc">' +
        "<h3>" + esc(c.title) + "</h3>" +
        "<p>" + esc(c.summary) + "</p>" +
        '<div class="jr-uc-bar">' + tag +
        '<a class="jr-uc-run" href="' + vscodeUrl(c) + '" target="_self" rel="noopener">Run it <span aria-hidden="true">&rarr;</span></a>' +
        "</div></article>";
    }).join("");

    if (elEmpty) elEmpty.hidden = list.length !== 0;
    if (elMore) {
      elMore.hidden = list.length <= shown;
      elMore.textContent = "Show " + Math.min(PAGE, list.length - shown) + " more of " + list.length;
    }
  }

  var cardGrid = document.getElementById("rsCasesGrid");
  var cardDetail = document.getElementById("rsCaseDetail");

  function closeCardCase() {
    if (!cardDetail || !cardGrid) return;
    cardDetail.hidden = true;
    cardGrid.hidden = false;
  }

  function openCardCase(i) {
    var p = PERSONAS[current];
    if (!p || !p.cases) return;
    var c = p.cases[i];
    if (!c) return;
    var href = skillHref(c.skill);
    var cmd = command(c.skill);

    var t = document.getElementById("rsCaseTitle");
    var s = document.getElementById("rsCaseSummary");
    var b = document.getElementById("rsCaseBody");
    var pr = document.getElementById("rsCasePrompt");
    var sk = document.getElementById("rsCaseSkill");
    var vs = document.getElementById("rsCaseVSCode");

    if (t) t.textContent = c.title;
    if (s) s.textContent = c.summary;
    if (b) b.textContent = c.body;
    if (pr) pr.textContent = c.prompt;
    if (sk) {
      sk.innerHTML = 'Skill: <a class="uc-skill-link" href="' + href + '"><code>' + esc(cmd) + "</code>" +
        '<span class="uc-skill-go" aria-hidden="true">&rarr;</span></a>';
    }
    if (vs) vs.href = vscodeUrl(c);

    if (cardGrid) cardGrid.hidden = true;
    if (cardDetail) cardDetail.hidden = false;
  }

  function renderCardCases() {
    if (!cardGrid) return;
    var cases = (PERSONAS[current] && PERSONAS[current].cases) || [];
    cardGrid.innerHTML = cases.map(function (c, i) {
      return '<button type="button" class="uc-card" data-case="' + i + '">' +
        "<h3>" + esc(c.title) + "</h3><p>" + esc(c.summary) + "</p></button>";
    }).join("");
    closeCardCase();
  }

  function renderWorkflow() {
    var name = shortName(PERSONAS[current]);
    document.querySelectorAll(".flow-line .flow-step").forEach(function (step) {
      var badge = step.querySelector(".flow-mine");
      if (badge) badge.textContent = name;
    });
  }

  function apply(index, opts) {
    current = index;
    firstIdx = 0;
    shown = PAGE;
    if (elFilter && (!opts || !opts.keepFilter)) elFilter.value = "";

    var p = PERSONAS[current];
    if (!p) return;
    var name = shortName(p);
    
    var jrRole = document.getElementById("jrRole");
    var jrJumpRole = document.getElementById("jrJumpRole");
    var jrUcHeading = document.getElementById("jrUcHeading");

    if (jrRole) jrRole.textContent = name;
    if (jrJumpRole) jrJumpRole.textContent = name;
    if (jrUcHeading && p.cases) {
      jrUcHeading.textContent = "All " + p.cases.length + " things the " + name + " can hand over";
    }

    renderFirst();
    renderGrid();
    renderCardCases();
    renderWorkflow();
  }

  function openJourney(opts) {
    if (section) section.hidden = false;
    try { window.localStorage.setItem(OPEN_KEY, "1"); } catch (e) {}
    if (opts && opts.scroll && section) section.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  var rsExplore = document.getElementById("rsExplore");
  if (rsExplore) rsExplore.addEventListener("click", function () { openJourney({ scroll: true }); });

  var jrSwitch = document.getElementById("jrSwitch");
  if (jrSwitch) {
    jrSwitch.addEventListener("click", function (e) {
      e.stopPropagation();
      var toggle = document.getElementById("roleToggle");
      var menu = document.getElementById("roleMenu");
      var card = document.querySelector(".rs-card");
      if (card) card.scrollIntoView({ behavior: "smooth", block: "center" });
      if (menu && toggle) {
        menu.hidden = false;
        toggle.setAttribute("aria-expanded", "true");
      }
    });
  }

  var jrShuffle = document.getElementById("jrShuffle");
  if (jrShuffle) {
    jrShuffle.addEventListener("click", function () {
      var p = PERSONAS[current];
      if (p && p.cases && p.cases.length) {
        firstIdx = (firstIdx + 1) % p.cases.length;
        renderFirst();
      }
    });
  }

  if (elFilter) elFilter.addEventListener("input", function () { shown = PAGE; renderGrid(); });
  if (elMore) elMore.addEventListener("click", function () { shown += PAGE; renderGrid(); });

  if (cardGrid) {
    cardGrid.addEventListener("click", function (e) {
      var b = e.target.closest(".uc-card");
      if (b && b.dataset.case !== undefined) openCardCase(parseInt(b.dataset.case, 10));
    });
  }
  var rsCaseBack = document.getElementById("rsCaseBack");
  if (rsCaseBack) rsCaseBack.addEventListener("click", closeCardCase);

  document.addEventListener("cadence:persona", function (e) {
    if (e.detail && e.detail.index !== undefined) {
      apply(e.detail.index);
    }
  });

  apply(current);

  /* Command Palette (⌘K) */
  var bar = document.getElementById("cmdk");
  var input = document.getElementById("cmdkInput");
  var results = document.getElementById("cmdkResults");
  var active = 0;
  var items = [];
  var corpus = null;

  function buildCorpus() {
    var out = [];
    PERSONAS.forEach(function (p) {
      (p.cases || []).forEach(function (c) {
        out.push({
          group: "Role Use Cases",
          kind: "prompt",
          title: c.title,
          sub: shortName(p) + " · " + command(c.skill),
          href: vscodeUrl(c),
          hay: (c.title + " " + c.summary + " " + (c.body || "") + " " + c.prompt + " " + c.skill + " " + shortName(p)).toLowerCase()
        });
      });
    });

    (window.PROJECT_SKILLS || []).forEach(function (s) {
      out.push({
        group: "Repository Skills (" + s.category + ")",
        kind: "skill",
        title: s.command,
        sub: s.name + " — " + s.description,
        href: "vscode://GitHub.Copilot-Chat/chat?prompt=" + encodeURIComponent(s.command),
        hay: (s.name + " " + s.command + " " + s.category + " " + s.description).toLowerCase()
      });
    });

    (window.__SEARCH_INDEX || []).forEach(function (e) {
      if (!e.title || !e.url) return;
      out.push({
        group: "Documentation & Architecture",
        kind: "page",
        title: e.title,
        sub: e.page || "",
        href: e.url,
        hay: (e.title + " " + (e.body || "") + " " + (e.page || "")).toLowerCase()
      });
    });
    return out;
  }

  function search(q) {
    if (!corpus) corpus = buildCorpus();
    q = (q || "").trim().toLowerCase();
    if (!q) {
      return corpus.slice(0, 10);
    }

    var terms = q.split(/s+/);
    var scored = [];
    corpus.forEach(function (x) {
      var matchAll = true;
      var score = 0;
      for (var i = 0; i < terms.length; i++) {
        var t = terms[i];
        if (x.hay.indexOf(t) === -1) {
          matchAll = false;
          break;
        }
        if (x.title.toLowerCase().indexOf(t) !== -1) score += 5;
        score += 1;
      }
      if (matchAll) scored.push({ item: x, score: score });
    });

    return scored
      .sort(function (a, b) { return b.score - a.score; })
      .slice(0, 15)
      .map(function (x) { return x.item; });
  }

  function renderPalette() {
    if (!results || !input) return;
    items = search(input.value);
    if (!items.length) {
      results.innerHTML = '<p class="cmdk-empty" style="padding:16px;text-align:center;color:var(--fg-quiet);">Nothing matches that search.</p>';
      return;
    }
    var lastGroup = null;
    results.innerHTML = items.map(function (x, i) {
      var head = x.group !== lastGroup ? '<p class="cmdk-group" style="font-size:11px;font-weight:700;text-transform:uppercase;color:var(--brand);padding:8px 12px 4px;margin:0;">' + esc(x.group) + "</p>" : "";
      lastGroup = x.group;
      return head +
        '<button type="button" class="cmdk-item' + (i === active ? " is-active" : "") + '" data-i="' + i + '" style="display:flex;justify-content:space-between;align-items:center;width:100%;padding:10px 14px;border:none;background:' + (i === active ? "var(--bg-muted)" : "transparent") + ';cursor:pointer;text-align:left;">' +
        '<span><strong style="display:block;font-size:14px;color:var(--fg);">' + esc(x.title) + '</strong><small style="font-size:12px;color:var(--fg-quiet);">' + esc(x.sub) + '</small></span>' +
        '<span class="cmdk-kind" style="font-size:11px;padding:3px 8px;background:var(--brand-soft);color:var(--brand-deep);border-radius:2px;">' + esc(x.kind) + '</span>' +
        '</button>';
    }).join("");
  }

  function openPalette() {
    if (!bar || !input) return;
    bar.hidden = false;
    input.value = "";
    active = 0;
    renderPalette();
    input.focus();
  }

  function closePalette() { 
    if (bar) bar.hidden = true; 
  }

  function go(i) {
    if (items[i]) {
      closePalette();
      window.location.href = items[i].href;
    }
  }

  document.querySelectorAll("[data-cmdk-open]").forEach(function (b) {
    b.addEventListener("click", function(e) {
      e.preventDefault();
      e.stopPropagation();
      openPalette();
    });
  });

  if (input) {
    input.addEventListener("input", function () { active = 0; renderPalette(); });
  }
  if (results) {
    results.addEventListener("click", function (e) {
      var b = e.target.closest("[data-i]");
      if (b) go(parseInt(b.dataset.i, 10));
    });
  }
  if (bar) {
    bar.addEventListener("click", function (e) { if (e.target === bar) closePalette(); });
  }

  document.addEventListener("keydown", function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      if (bar) {
        bar.hidden ? openPalette() : closePalette();
      }
      return;
    }
    if (!bar || bar.hidden) return;
    if (e.key === "Escape") { closePalette(); return; }
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!items.length) return;
      active = (active + (e.key === "ArrowDown" ? 1 : -1) + items.length) % items.length;
      renderPalette();
    }
    if (e.key === "Enter" && items.length) {
      e.preventDefault();
      go(active);
    }
  });

  window.cadenceOpenPalette = openPalette;
  window.cadenceClosePalette = closePalette;
})();
