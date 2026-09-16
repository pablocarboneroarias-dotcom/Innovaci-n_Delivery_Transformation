/* =========================================================
   role-focus.js — site-wide role personalisation & synchronization.
   ========================================================= */
(function () {
  "use strict";

  var PERSONAS = window.PERSONAS || [];
  var META = window.ROLE_META || [];
  if (!PERSONAS.length) return;

  var KEY = "cadence.role";
  var ALL = "all";

  function shortName(i) {
    if (i === ALL || i === "all") return "All roles";
    return (PERSONAS[i] && PERSONAS[i].name) ? PERSONAS[i].name.replace(/^the /, "") : "";
  }

  function readRole() {
    var raw;
    try { raw = window.localStorage.getItem(KEY); } catch (e) { raw = null; }
    if (raw === null || raw === ALL || raw === "all") return ALL;
    var n = parseInt(raw, 10);
    return (n >= 0 && n < PERSONAS.length) ? n : ALL;
  }

  function writeRole(v) {
    try { window.localStorage.setItem(KEY, String(v)); } catch (e) { /* private mode */ }
  }

  /* ---------- relevance sets, computed once per role ---------- */
  var cache = {};

  function relevance(i) {
    if (cache[i]) return cache[i];
    var skills = {};
    (PERSONAS[i].cases || []).forEach(function (c) { skills[c.skill] = true; });
    var stages = {};
    if (META[i] && META[i].stages) {
      META[i].stages.forEach(function (s) { stages[s] = true; });
    }
    var pages = {};
    if (META[i] && META[i].pages) {
      META[i].pages.forEach(function (p) { pages[p] = true; });
    }
    cache[i] = { skills: skills, stages: stages, pages: pages, slug: (META[i] ? META[i].slug : "role-" + i) };
    return cache[i];
  }

  function idFromHref(href, kind) {
    if (!href) return null;
    var marker = "#" + kind + "/";
    var at = href.indexOf(marker);
    return at === -1 ? null : href.slice(at + marker.length).split(/[?&#]/)[0];
  }

  function stageFromId(id) {
    if (!id || id.indexOf("stage-") !== 0) return null;
    var n = parseInt(id.slice(6), 10);
    return isNaN(n) ? null : n;
  }

  function pageFromHref(href) {
    if (!href || href.indexOf("http") === 0 || href.indexOf("mailto:") === 0 || href.indexOf("#") === 0) return null;
    var h = href;
    while (h.indexOf("../") === 0) h = h.slice(3);
    if (h.indexOf("./") === 0) h = h.slice(2);
    return h.split("#")[0];
  }

  function pageMatches(pages, candidate) {
    if (!candidate) return false;
    for (var p in pages) {
      if (p === candidate || p.slice(-(candidate.length + 1)) === "/" + candidate) return true;
    }
    return false;
  }

  function currentPage() {
    var path = window.location.pathname;
    if (path.charAt(path.length - 1) === "/") path += "index.html";
    var parts = path.split("/").filter(Boolean);
    return parts.slice(-2).join("/");
  }

  function verdict(el, rel) {
    var tagged = el.getAttribute("data-roles");
    if (tagged) {
      var list = tagged.split(/[,s]+/);
      return list.indexOf(ALL) !== -1 || list.indexOf(rel.slug) !== -1;
    }

    var href = el.getAttribute("href");
    var skill = idFromHref(href, "skill") || idFromHref(href, "agent");
    if (skill) return !!rel.skills[skill];

    var stage = stageFromId(el.id);
    if (stage) return !!rel.stages[stage];

    var page = pageFromHref(href);
    if (page && pageMatches(rel.pages, page)) return true;

    return null;
  }

  var CANDIDATES = [
    "[data-roles]",
    "a.skill-card",
    "a.cap-card",
    ".stage-card",
    ".flow-step",
    ".primary-nav a",
    ".sidebar nav a"
  ].join(",");

  function clear(el) {
    el.classList.remove("is-role-hit", "is-role-miss");
  }

  var countEl = null;

  function apply() {
    var role = readRole();
    var nodes = document.querySelectorAll(CANDIDATES);

    if (role === ALL) {
      document.body.classList.remove("role-focus");
      document.body.removeAttribute("data-role");
      Array.prototype.forEach.call(nodes, clear);
      if (countEl) countEl.textContent = "";
      return;
    }

    var rel = relevance(role);
    var marked = [];
    var hits = 0;
    Array.prototype.forEach.call(nodes, function (el) {
      var v = verdict(el, rel);
      clear(el);
      if (v === true) { el.classList.add("is-role-hit"); hits++; }
      else if (v === false) { marked.push(el); }
    });

    if (hits > 0) {
      marked.forEach(function (el) { el.classList.add("is-role-miss"); });
    }

    document.body.classList.add("role-focus");
    document.body.setAttribute("data-role", rel.slug);
    if (countEl) {
      if (hits) {
        countEl.textContent = hits + (hits === 1 ? " item on this page" : " items on this page");
      } else if (pageMatches(rel.pages, currentPage())) {
        countEl.textContent = "this whole page is written for you";
      } else {
        countEl.textContent = "nothing role-specific on this page";
      }
    }
  }

  function labelFor(role) {
    return role === ALL ? "All roles" : shortName(role);
  }

  var pickers = [];

  function syncPickers() {
    var role = readRole();
    pickers.forEach(function (p) {
      if (p.isHero) {
        p.label.textContent = role === ALL ? "Choose your role" : shortName(role);
        p.wrap.classList.toggle("is-set", role !== ALL);
        p.menu.querySelectorAll("[data-persona], [data-role-value]").forEach(function (b) {
          var val = b.dataset.persona !== undefined ? b.dataset.persona : b.dataset.roleValue;
          var selected = (String(val) === String(role));
          b.setAttribute("aria-selected", selected ? "true" : "false");
        });
      } else {
        p.label.textContent = labelFor(role);
        p.wrap.classList.toggle("is-set", role !== ALL);
        p.menu.querySelectorAll("[data-role-value], [data-persona]").forEach(function (b) {
          var val = b.dataset.roleValue !== undefined ? b.dataset.roleValue : b.dataset.persona;
          var selected = (String(val) === String(role));
          b.setAttribute("aria-selected", selected ? "true" : "false");
        });
      }
    });
  }

  function choose(v) {
    writeRole(v);
    syncPickers();
    apply();
    banner();
    var idx = (v === ALL ? 0 : v);
    document.dispatchEvent(new CustomEvent("cadence:persona", { detail: { index: idx, role: v } }));
  }

  function wirePicker(wrap) {
    if (!wrap || wrap.__wired) return;
    wrap.__wired = true;

    var toggle = wrap.querySelector(".role-picker-toggle");
    var menu = wrap.querySelector(".role-picker-menu");
    var label = wrap.querySelector(".role-picker-label") || wrap.querySelector("#roleToggleLabel") || (toggle ? toggle.querySelector("span") : null);
    if (!toggle || !menu || !label) return;

    var isHero = !wrap.classList.contains("role-picker-compact");

    function close() {
      menu.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
    }

    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      var willOpen = menu.hidden;
      document.querySelectorAll(".role-picker-menu").forEach(function(m) {
        m.hidden = true;
        var t = m.parentElement ? m.parentElement.querySelector(".role-picker-toggle") : null;
        if (t) t.setAttribute("aria-expanded", "false");
      });
      menu.hidden = !willOpen;
      toggle.setAttribute("aria-expanded", willOpen ? "true" : "false");
    });

    menu.addEventListener("click", function (e) {
      e.stopPropagation();
      var btn = e.target.closest("[data-role-value], [data-persona]");
      if (!btn) return;
      var raw = btn.dataset.roleValue !== undefined ? btn.dataset.roleValue : btn.dataset.persona;
      close();
      choose(raw === ALL || raw === "all" ? ALL : parseInt(raw, 10));
    });

    document.addEventListener("click", close);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });

    pickers.push({ wrap: wrap, menu: menu, label: label, isHero: isHero });
  }

  function init() {
    document.querySelectorAll(".role-picker-wrapper").forEach(wirePicker);
    syncPickers();
    apply();
    banner();
  }

  var bar = null;
  function banner() {
    var role = readRole();
    var header = document.querySelector(".site-header");
    if (!header) return;

    if (!bar) {
      bar = document.createElement("div");
      bar.className = "role-bar";
      bar.innerHTML =
        '<div class="role-bar-inner">' +
        '<span class="role-bar-dot" aria-hidden="true"></span>' +
        '<span class="role-bar-text">Personalised for <strong data-role-name></strong></span>' +
        '<span class="role-bar-count" data-role-count></span>' +
        '<button type="button" class="role-bar-clear">Show everything</button>' +
        "</div>";
      header.insertAdjacentElement("afterend", bar);
      countEl = bar.querySelector("[data-role-count]");
      bar.querySelector(".role-bar-clear").addEventListener("click", function () {
        choose(ALL);
      });
    }

    if (role === ALL) {
      bar.hidden = true;
      return;
    }
    bar.hidden = false;
    bar.querySelector("[data-role-name]").textContent = shortName(role);
  }

  function watch() {
    var host = document.querySelector("main") || document.body;
    var queued = false;
    new MutationObserver(function () {
      if (queued) return;
      queued = true;
      window.requestAnimationFrame(function () { queued = false; apply(); });
    }).observe(host, { childList: true, subtree: true });
  }

  document.addEventListener("cadence:persona", function (e) {
    if (e && e.detail) {
      var roleVal = e.detail.role !== undefined ? e.detail.role : e.detail.index;
      if (roleVal !== undefined && roleVal !== null) {
        writeRole(roleVal);
        syncPickers();
        apply();
        banner();
      }
    }
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
  watch();
})();
