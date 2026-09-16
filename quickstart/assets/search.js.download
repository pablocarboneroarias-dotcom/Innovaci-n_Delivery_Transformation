/* =========================================================
   Cadence — site-wide search
   Loads search-index.json, debounced input, dropdown,
   keyboard navigation, click-to-navigate.
   ========================================================= */
(function () {
  "use strict";

  const wrapper = document.querySelector(".search");
  const input = wrapper && wrapper.querySelector("input[type='search']");
  if (!wrapper || !input) return;
  if (input.dataset.searchEnhanced === "1") return;
  input.dataset.searchEnhanced = "1";

  // Derive the docs root from this script's own URL so relative
  // paths to the index and to result pages work from any depth.
  const myScript =
    document.currentScript ||
    Array.from(document.scripts).find((s) => /search\.js(?:\?|$)/.test(s.src));
  const scriptSrc = myScript ? myScript.src : "";
  const baseUrl = scriptSrc
    ? scriptSrc.replace(/assets\/js\/[^/]+(?:\?.*)?$/, "")
    : new URL(".", window.location.href).href;

  const results = document.createElement("div");
  results.className = "search-results";
  results.setAttribute("role", "listbox");
  results.hidden = true;
  wrapper.appendChild(results);

  const kbd = document.createElement("span");
  kbd.className = "search-kbd";
  kbd.textContent = navigator.platform.toLowerCase().includes("mac") ? "⌘K" : "Ctrl+K";
  kbd.setAttribute("aria-hidden", "true");
  wrapper.appendChild(kbd);

  let INDEX = null;
  let indexPromise = null;
  let focusedIndex = -1;
  let currentResults = [];

  function loadIndex() {
    if (INDEX) return Promise.resolve(INDEX);
    if (
      typeof window !== "undefined" &&
      Array.isArray(window.__SEARCH_INDEX)
    ) {
      INDEX = window.__SEARCH_INDEX;
      return Promise.resolve(INDEX);
    }
    if (indexPromise) return indexPromise;
    indexPromise = fetch(baseUrl + "assets/js/search-index.json", {
      cache: "force-cache",
    })
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load search index: " + r.status);
        return r.json();
      })
      .then((data) => {
        INDEX = data;
        return data;
      })
      .catch((err) => {
        console.error("[search] load failed", err);
        return [];
      });
    return indexPromise;
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
    );
  }

  function highlight(text, terms) {
    let safe = escapeHtml(text);
    for (const term of terms) {
      if (!term) continue;
      const re = new RegExp(
        "(" + term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")",
        "ig"
      );
      safe = safe.replace(re, "<mark>$1</mark>");
    }
    return safe;
  }

  function score(record, terms) {
    const titleLower = record.title.toLowerCase();
    const pageLower = record.page.toLowerCase();
    const bodyLower = (record.body || "").toLowerCase();
    let s = 0;
    for (const term of terms) {
      if (!term) continue;
      const t = term.toLowerCase();
      if (titleLower === t) s += 50;
      if (titleLower.startsWith(t)) s += 25;
      if (titleLower.includes(t)) s += 18;
      if (pageLower.includes(t)) s += 6;
      if (bodyLower.includes(t)) s += 3;
      if (record.level === "h1") s += 4;
      else if (record.level === "h2") s += 2;
    }
    return s;
  }

  function findResults(query) {
    if (!INDEX) return [];
    const terms = query
      .toLowerCase()
      .split(/\s+/)
      .filter((t) => t.length >= 2);
    if (terms.length === 0) return [];
    const scored = INDEX.map((r) => ({ r, s: score(r, terms) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 8);
    return scored.map((x) => x.r);
  }

  function renderResults(query, list) {
    currentResults = list;
    focusedIndex = list.length > 0 ? 0 : -1;
    if (list.length === 0) {
      results.innerHTML =
        '<div class="search-empty">No matches for <strong>' +
        escapeHtml(query) +
        "</strong>.</div>";
    } else {
      const terms = query.split(/\s+/).filter(Boolean);
      results.innerHTML = list
        .map((r, i) => {
          const href = baseUrl + r.url;
          return (
            '<a class="search-result' +
            (i === focusedIndex ? " is-focused" : "") +
            '" role="option" data-idx="' +
            i +
            '" href="' +
            escapeHtml(href) +
            '">' +
            '<span class="search-result-page">' +
            escapeHtml(r.page) +
            "</span>" +
            '<span class="search-result-title">' +
            highlight(r.title, terms) +
            "</span>" +
            '<span class="search-result-snippet">' +
            highlight((r.body || "").slice(0, 180), terms) +
            "</span>" +
            "</a>"
          );
        })
        .join("");
    }
    results.hidden = false;
    wrapper.classList.add("is-open");
  }

  function close() {
    results.hidden = true;
    wrapper.classList.remove("is-open");
    focusedIndex = -1;
  }

  function setFocused(next) {
    const items = results.querySelectorAll(".search-result");
    if (items.length === 0) return;
    items[focusedIndex] && items[focusedIndex].classList.remove("is-focused");
    focusedIndex = (next + items.length) % items.length;
    items[focusedIndex].classList.add("is-focused");
    items[focusedIndex].scrollIntoView({ block: "nearest" });
  }

  let debounceId;
  function onInput() {
    const q = input.value.trim();
    clearTimeout(debounceId);
    if (q.length < 2) {
      close();
      return;
    }
    results.innerHTML = '<div class="search-loading">Searching…</div>';
    results.hidden = false;
    wrapper.classList.add("is-open");
    debounceId = setTimeout(() => {
      loadIndex().then(() => {
        const list = findResults(q);
        renderResults(q, list);
      });
    }, 120);
  }

  function onKey(e) {
    if (e.key === "ArrowDown") {
      if (results.hidden) return;
      e.preventDefault();
      setFocused(focusedIndex + 1);
    } else if (e.key === "ArrowUp") {
      if (results.hidden) return;
      e.preventDefault();
      setFocused(focusedIndex - 1);
    } else if (e.key === "Enter") {
      if (results.hidden || focusedIndex < 0) return;
      e.preventDefault();
      const item = results.querySelectorAll(".search-result")[focusedIndex];
      if (item) window.location.href = item.href;
    } else if (e.key === "Escape") {
      close();
      input.blur();
    }
  }

  input.addEventListener("input", onInput);
  input.addEventListener("keydown", onKey);
  input.addEventListener("focus", () => {
    loadIndex();
    if (input.value.trim().length >= 2) onInput();
  });

  document.addEventListener("click", (e) => {
    if (!wrapper.contains(e.target)) close();
  });

  // Cmd/Ctrl+K global shortcut to focus the search box
  document.addEventListener("keydown", (e) => {
    const isMac = navigator.platform.toLowerCase().includes("mac");
    const trigger =
      (isMac && e.metaKey && e.key.toLowerCase() === "k") ||
      (!isMac && e.ctrlKey && e.key.toLowerCase() === "k");
    if (trigger) {
      e.preventDefault();
      input.focus();
      input.select();
    } else if (e.key === "/" && document.activeElement !== input) {
      const tag = document.activeElement && document.activeElement.tagName;
      if (tag !== "INPUT" && tag !== "TEXTAREA") {
        e.preventDefault();
        input.focus();
      }
    }
  });
})();
