/* =========================================================
   Skills page router + renderer.
   Reads window.SKILL_PHASES, renders either:
     - the phase-grouped index, or
     - a single skill detail view (when hash = #skill/<id>)
   Also builds the left-sidebar nested skill list and the
   right-rail "Open in VS Code" button URL.
   ========================================================= */
(function () {
  const PHASES = window.SKILL_PHASES || [];
  const view = document.getElementById("skillsView");
  const crumbs = document.getElementById("breadcrumbs");
  const sidebarSkills = document.getElementById("sidebarSkills");

  // Flat lookup
  const SKILL_INDEX = {};
  const PHASE_OF = {};
  for (const p of PHASES) {
    for (const s of p.skills) {
      SKILL_INDEX[s.id] = s;
      PHASE_OF[s.id] = p;
    }
  }

  // ---------- helpers ----------
  const esc = (s) => String(s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

  // Human display name: "meeting-transcript" -> "Meeting Transcript", "ado-quality-report" -> "ADO Quality Report"
  const ACRONYMS = new Set(["ado", "cr", "pr", "qa", "mcp", "sf", "wbs"]);
  function displayName(s) {
    const src = (s.title && s.title !== s.id) ? s.title : (s.title || s.id);
    if (!src.includes("-") && /[A-Z]/.test(src)) return src;
    return src.split("-")
      .map(w => ACRONYMS.has(w.toLowerCase()) ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }

  function buildPrompt(skill) {
    return `/${skill.id}\n\n${skill.sample}`;
  }

  function buildVSCodeUrl(skill) {
    const prompt = encodeURIComponent(buildPrompt(skill));
    return `vscode://GitHub.Copilot-Chat/chat?prompt=${prompt}`;
  }

  function buildGitHubAppUrl(skill) {
    const prompt = encodeURIComponent(buildPrompt(skill));
    const repo = encodeURIComponent("Deloitte-Nordics/kab-housing-ai");
    const appLink = `ghapp://session/new?repo=${repo}&mode=plan&prompt=${prompt}`;
    return `https://github.com/copilot/app/launch?open=${encodeURIComponent(appLink)}`;
  }

  function parseHash() {
    const h = window.location.hash || "";
    const m = h.match(/^#skill\/([a-z0-9-]+)$/i);
    if (m && SKILL_INDEX[m[1]]) return { view: "detail", id: m[1] };
    return { view: "index" };
  }

  // ---------- flow diagram ----------
  // Renders skill.flow: [{ name, steps: [{ kind, short, title, body, branches }] }]
  // kind: start | step | choice | gate | decision | end
  const FLOW_KIND_LABEL = {
    start: "Start",
    step: "Automatic",
    choice: "You choose",
    gate: "It asks you",
    decision: "It decides",
    end: "Hand off"
  };

  // Canvas geometry in SVG user units. The svg scales to its container width.
  const FG = {
    W: 900, PAD_TOP: 20, PAD_BOTTOM: 26, GAP: 42,
    NODE_W: 340, NODE_H: 62,
    DIA_W: 330, DIA_H: 130,
    PHASE_W: 250, PHASE_H: 32, PHASE_PAD_X: 24, PHASE_CHAR_W: 8.4,
    CHIP_H: 52, CHIP_GAP: 16, CHIP_MAX_W: 300, ROW_PAD: 22,
    CHIP_PAD_X: 14, CHIP_CHAR_W: 7,
    FAN_GAP: 38, MERGE_GAP: 38,
    LINE_H: 16
  };
  const CX = FG.W / 2;

  function wrapLabel(text, maxChars) {
    const lines = [];
    let cur = "";
    for (const w of String(text).split(/\s+/)) {
      if (!cur) cur = w;
      else if ((cur + " " + w).length <= maxChars) cur += " " + w;
      else { lines.push(cur); cur = w; }
    }
    if (cur) lines.push(cur);
    return lines;
  }

  function svgLines(lines, cx, cy, cls) {
    const top = cy - ((lines.length - 1) * FG.LINE_H) / 2;
    return lines.map((l, i) =>
      `<text class="${cls}" x="${cx}" y="${top + i * FG.LINE_H}">${esc(l)}</text>`
    ).join("");
  }

  // Vertical-first orthogonal connector with rounded corners: down, across, down.
  function link(x1, y1, x2, y2) {
    if (Math.abs(x2 - x1) < 1) return `M ${x1} ${y1} V ${y2}`;
    const my = y1 + (y2 - y1) / 2;
    const dir = x2 > x1 ? 1 : -1;
    const r = Math.min(16, Math.abs(x2 - x1) / 2, Math.abs(y2 - y1) / 2);
    return `M ${x1} ${y1} V ${my - r}` +
           ` Q ${x1} ${my} ${x1 + dir * r} ${my}` +
           ` H ${x2 - dir * r}` +
           ` Q ${x2} ${my} ${x2} ${my + r}` +
           ` V ${y2}`;
  }

  function renderFlow(flow) {
    if (!Array.isArray(flow) || !flow.length) return "";

    const links = [];
    const shapes = [];
    const outline = [];          // read-aloud fallback, mirrors the visual order
    let y = FG.PAD_TOP;
    let pending = [];            // open ends that must join the next element's top

    // Join every open end above into the top-centre of the element starting at topY.
    const join = (topY) => {
      pending.forEach(p => links.push(`<path class="sfsvg-line" d="${link(p.x, p.y, CX, topY)}" />`));
    };

    flow.forEach((phase, pi) => {
      join(y);
      const phaseLabel = "Phase " + (pi + 1) + ": " + phase.name;
      // Pill hugs its text: estimated text width plus comfortable side padding.
      const phaseW = Math.min(
        FG.W - 2 * FG.ROW_PAD,
        Math.max(FG.PHASE_W, Math.round(phaseLabel.length * FG.PHASE_CHAR_W) + 2 * FG.PHASE_PAD_X)
      );
      shapes.push(
        `<g class="sfsvg-phase">` +
          `<rect x="${CX - phaseW / 2}" y="${y}" width="${phaseW}" height="${FG.PHASE_H}" rx="${FG.PHASE_H / 2}" />` +
          `<text x="${CX}" y="${y + FG.PHASE_H / 2}">${esc(phaseLabel)}</text>` +
        `</g>`
      );
      outline.push(`Phase ${pi + 1}, ${phase.name}.`);
      pending = [{ x: CX, y: y + FG.PHASE_H }];
      y += FG.PHASE_H + FG.GAP;

      phase.steps.forEach(step => {
        const kind = FLOW_KIND_LABEL[step.kind] ? step.kind : "step";
        const isDiamond = kind === "decision" || kind === "choice" || kind === "gate";
        const label = step.short || step.title;
        const lines = wrapLabel(label, isDiamond ? 24 : 34);
        const w = isDiamond ? FG.DIA_W : FG.NODE_W;
        // Shapes grow with their text so nothing overflows.
        const h = isDiamond
          ? Math.max(FG.DIA_H, lines.length * FG.LINE_H + 84)
          : Math.max(FG.NODE_H, lines.length * FG.LINE_H + 30);
        const fans = Array.isArray(step.branches) ? step.branches : [];
        const cy = y + h / 2;
        const bottom = y + h;
        const tip = step.body ? `<title>${esc(step.body)}</title>` : "";

        join(y);

        if (isDiamond) {
          const pts = [
            `${CX},${y}`, `${CX + w / 2},${cy}`, `${CX},${bottom}`, `${CX - w / 2},${cy}`
          ].join(" ");
          shapes.push(
            `<g class="sfsvg-node is-${kind}">${tip}` +
              `<polygon class="sfsvg-shape" points="${pts}" />` +
              svgLines(lines, CX, cy, "sfsvg-label") +
            `</g>`
          );
        } else {
          const rx = (kind === "start" || kind === "end") ? Math.min(h / 2, 31) : 16;
          shapes.push(
            `<g class="sfsvg-node is-${kind}">${tip}` +
              `<rect class="sfsvg-shape" x="${CX - w / 2}" y="${y}" width="${w}" height="${h}" rx="${rx}" />` +
              svgLines(lines, CX, cy, "sfsvg-label") +
            `</g>`
          );
        }
        outline.push(label + ".");

        if (!fans.length) {
          pending = [{ x: CX, y: bottom }];
          y = bottom + FG.GAP;
          return;
        }

        // Branches sit in a row below the node, then merge back into the next step.
        const n = fans.length;
        const chipW = Math.min(FG.CHIP_MAX_W, (FG.W - 2 * FG.ROW_PAD - (n - 1) * FG.CHIP_GAP) / n);
        const rowW = n * chipW + (n - 1) * FG.CHIP_GAP;
        const rowX = (FG.W - rowW) / 2;
        const chipTop = bottom + FG.FAN_GAP;
        // Wrap against the chip's inner width so lines never touch the edges.
        const maxChars = Math.floor((chipW - 2 * FG.CHIP_PAD_X) / FG.CHIP_CHAR_W);
        const chipLines = fans.map(b => wrapLabel(b.label, maxChars));
        const anyTerminal = fans.some(b => b.terminal);
        const chipH = Math.max(FG.CHIP_H, Math.max(...chipLines.map(l => l.length)) * FG.LINE_H + 26) +
          (anyTerminal ? 12 : 0);
        const chipCy = chipTop + chipH / 2;

        pending = [];
        fans.forEach((b, i) => {
          const cx = rowX + i * (chipW + FG.CHIP_GAP) + chipW / 2;
          links.push(`<path class="sfsvg-line" d="${link(CX, bottom, cx, chipTop)}" />`);
          const cls = "sfsvg-chip" +
            (b.tone ? " tone-" + esc(b.tone) : "") +
            (b.terminal ? " is-terminal" : "");
          shapes.push(
            `<g class="${cls}">` +
              (b.body ? `<title>${esc(b.body)}</title>` : "") +
              `<rect class="sfsvg-shape" x="${cx - chipW / 2}" y="${chipTop}" width="${chipW}" height="${chipH}" rx="16" />` +
              svgLines(chipLines[i], cx, b.terminal ? chipCy - 9 : chipCy, "sfsvg-chip-label") +
              (b.terminal ? `<text class="sfsvg-ends" x="${cx}" y="${chipTop + chipH - 14}">ends here</text>` : "") +
            `</g>`
          );
          outline.push(`Branch, ${b.label}. ${b.body || ""}`);
          if (!b.terminal) pending.push({ x: cx, y: chipTop + chipH });
        });

        y = chipTop + chipH + FG.MERGE_GAP;
      });
    });

    const H = y - FG.GAP + FG.PAD_BOTTOM;

    return `
      <section class="skill-flow" aria-labelledby="skill-flow-title">
        <h2 id="skill-flow-title">How it works, end to end</h2>
        <p class="sflow-lede">Amber shapes stop and wait for you, nothing reaches Azure DevOps without an answer. Hover any shape for the detail behind it.</p>
        <ul class="sflow-legend">
          <li class="legend-auto">Runs automatically</li>
          <li class="legend-ask">Stops and asks you</li>
          <li class="legend-branch">Branches on the answer</li>
        </ul>
        <div class="sfsvg-wrap">
          <svg class="sfsvg" viewBox="0 0 ${FG.W} ${H}" width="${FG.W}" height="${H}"
               role="img" aria-labelledby="sfsvgTitle sfsvgDesc">
            <title id="sfsvgTitle">Flowchart of this skill, start to finish</title>
            <desc id="sfsvgDesc">${esc(outline.join(" "))}</desc>
            <g class="sfsvg-links">${links.join("")}</g>
            <g class="sfsvg-shapes">${shapes.join("")}</g>
          </svg>
        </div>
      </section>`;
  }

  // ---------- sidebar (nested skill list) ----------
  function renderSidebar(activeId) {
    const html = PHASES.map(p => {
      const isOpen = activeId && PHASE_OF[activeId] && PHASE_OF[activeId].id === p.id;
      const items = p.skills.map(s => {
        const cur = s.id === activeId ? ' aria-current="page"' : "";
        const href = s.href ? s.href : `#skill/${s.id}`;
        return `<li><a href="${href}"${cur}>${esc(displayName(s))}</a></li>`;
      }).join("");
      return `
        <details${isOpen ? " open" : ""} class="sidebar-phase">
          <summary>${esc(p.name)}</summary>
          <ul>${items}</ul>
        </details>`;
    }).join("");
    sidebarSkills.innerHTML = html;
  }

  // ---------- breadcrumbs ----------
  function renderCrumbs(parts) {
    crumbs.innerHTML = parts.map((p, i) => {
      const last = i === parts.length - 1;
      if (last) return `<li aria-current="page">${esc(p.label)}</li>`;
      return `<li><a href="${p.href}">${esc(p.label)}</a></li>`;
    }).join("");
  }

  // ---------- index view ----------
  function renderIndex() {
    renderCrumbs([
      { label: "Docs", href: "../index.html" },
      { label: "Skills" }
    ]);

    const sections = PHASES.map(p => {
      const cards = p.skills.map(s => {
        const href = s.href ? s.href : `#skill/${s.id}`;
        return `
        <a class="skill-card" href="${href}">
          <p class="skill-card-title">${esc(displayName(s))}</p>
          <p class="skill-card-desc">${esc(s.desc)}</p>
          <p class="skill-card-cta">View skill <span aria-hidden="true">›</span></p>
        </a>`;
      }).join("");
      return `
        <section class="phase-section" id="phase-${p.id}" data-phase="${p.id}">
          <h2>${esc(p.name)}</h2>
          <p class="phase-blurb">${esc(p.blurb)}</p>
          <div class="skill-card-grid">${cards}</div>
        </section>`;
    }).join("");

    const quickNav = `
      <nav class="agent-quick-nav" aria-label="Filter skill phases">
        <button type="button" class="is-active" data-filter="all">All</button>
        ${PHASES.map(p => `<button type="button" data-filter="${p.id}">${esc(p.name)} <span class="agent-quick-count">${p.skills.length}</span></button>`).join("")}
      </nav>`;

    view.innerHTML = `
      <h1 id="skills-overview">Skills catalog</h1>
      <p class="lede">
        Every skill below is a slash command you can invoke in Copilot Chat. Skills are grouped
        by delivery phase so you can jump from a discovery conversation all the way to release
        notes without leaving the editor.
      </p>
      ${quickNav}
      ${sections}`;

    const floatCard = document.getElementById("skillFloatCard");
    if (floatCard) floatCard.hidden = true;
    const floatLauncher = document.getElementById("skillFloatCardLauncher");
    if (floatLauncher) floatLauncher.hidden = true;

    wireQuickFilters();
    document.body.classList.add("skills-overview");

    renderSidebar(null);
    window.scrollTo({ top: 0 });
  }

  // ---------- quick filters ----------
  function wireQuickFilters() {
    const nav = view.querySelector(".agent-quick-nav");
    if (!nav) return;
    nav.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-filter]");
      if (!btn) return;
      const f = btn.dataset.filter;
      nav.querySelectorAll("button").forEach(b => b.classList.toggle("is-active", b === btn));
      view.querySelectorAll(".phase-section").forEach(s => {
        s.hidden = !(f === "all" || s.dataset.phase === f);
      });
    });
  }

  // ---------- detail view ----------
  function renderDetail(id) {
    const skill = SKILL_INDEX[id];
    const phase = PHASE_OF[id];

    document.body.classList.remove("skills-overview");

    renderCrumbs([
      { label: "Docs", href: "../index.html" },
      { label: "Skills", href: "index.html" },
      { label: phase.name },
      { label: displayName(skill) }
    ]);

    const promptDisplay = esc(buildPrompt(skill));
    const stableUrl = buildVSCodeUrl(skill);
    const ghAppUrl = buildGitHubAppUrl(skill);

    const whenList = Array.isArray(skill.when) && skill.when.length
      ? `<h2>When to use this</h2>
         <ul class="bulleted">${skill.when.map(w => `<li>${esc(w)}</li>`).join("")}</ul>`
      : "";

    const flowSection = renderFlow(skill.flow);

    const doesList = Array.isArray(skill.does) && skill.does.length
      ? `<h2>What it does, step by step</h2>
         <ol class="step-list">${skill.does.map(d => `<li>${esc(d)}</li>`).join("")}</ol>`
      : "";

    const outputsList = Array.isArray(skill.outputs) && skill.outputs.length
      ? `<h2>What you get back</h2>
         <ul class="bulleted">${skill.outputs.map(o => `<li>${esc(o)}</li>`).join("")}</ul>`
      : "";

    const realExample = skill.realExample
      ? `<h2>A real example</h2>
         <p>Here is the kind of prompt people actually paste:</p>
         <pre><code>${esc("/" + skill.id + "\n\n" + skill.realExample)}</code></pre>`
      : "";

    const pairsList = Array.isArray(skill.pairsWith) && skill.pairsWith.length
      ? `<h2>Pairs well with</h2>
         <ul class="bulleted">${skill.pairsWith.map(p => {
            const slug = typeof p === "string" ? p : p.id;
            const note = (typeof p === "object" && p.note) ? `, ${esc(p.note)}` : "";
            const target = SKILL_INDEX[slug];
            const label = target ? displayName(target) : slug;
            const href = target && target.href ? target.href : `#skill/${slug}`;
            return `<li><a href="${href}"><code>/${esc(slug)}</code> &middot; ${esc(label)}</a>${note}</li>`;
          }).join("")}</ul>`
      : "";

    view.innerHTML = `
      <p class="eyebrow">${esc(phase.name)}</p>
      <h1>${esc(displayName(skill))}</h1>
      <p class="lede">${esc(skill.desc)}</p>
      <dialog id="promptDialog" class="gh-app-dialog">
        <form method="dialog">
          <h3 id="promptDialogTitle" style="margin:0 0 8px;">Edit prompt</h3>
          <textarea id="promptDialogTextarea" rows="8" style="width:100%;font-family:monospace;font-size:13px;padding:8px;border:1px solid #ccc;border-radius:4px;resize:vertical;"></textarea>
          <div style="margin-top:12px;display:flex;gap:8px;justify-content:flex-end;">
            <button type="button" id="promptDialogCancel" class="btn btn-outline">Cancel</button>
            <button type="button" id="promptDialogProceed" class="btn btn-primary">Proceed</button>
          </div>
        </form>
      </dialog>

      ${flowSection}

      ${whenList}

      <h2>Slash command</h2>
      <p>Type this in Copilot Chat to start:</p>
      <pre><code>/${esc(skill.id)}</code></pre>

      <h2>Sample task (with placeholders)</h2>
      <p>The "Open in VS Code" button in the floating panel sends this exact prompt. Replace anything in <code>[brackets]</code> with your own values:</p>
      <pre><code>${promptDisplay}</code></pre>

      ${realExample}

      ${doesList}

      ${outputsList}

      ${pairsList}

      <h2>Where the skill lives</h2>
      <p>
        The full definition is at
        <code>.github/skills/${esc(skill.id)}/SKILL.md</code>. Copilot Chat loads this file
        every time the slash command runs, so the source-of-truth is always up to date.
      </p>

      <p class="pager">
        <a class="link-quiet" href="index.html">&lsaquo; Back to all skills</a>
      </p>`;

    ensureFloatCard();
    wireSplitButton(skill);
    wirePromptDialogs(skill);
    renderSidebar(id);
    window.scrollTo({ top: 0 });
  }

  // ---------- floating action card ----------
  function ensureFloatCard() {
    let card = document.getElementById("skillFloatCard");
    if (!card) {
      card = document.createElement("aside");
      card.id = "skillFloatCard";
      card.className = "float-actions";
      card.setAttribute("aria-label", "Run this skill");
      document.body.appendChild(card);
    }
    // rebuild body each render: fresh buttons, no duplicate listeners
    card.innerHTML = `
      <div class="float-actions-handle" title="Drag to move">
        <svg width="10" height="14" viewBox="0 0 10 14" aria-hidden="true"><g fill="currentColor"><circle cx="2.5" cy="2" r="1.4"/><circle cx="7.5" cy="2" r="1.4"/><circle cx="2.5" cy="7" r="1.4"/><circle cx="7.5" cy="7" r="1.4"/><circle cx="2.5" cy="12" r="1.4"/><circle cx="7.5" cy="12" r="1.4"/></g></svg>
        <span>Run this skill</span>
        <button class="float-actions-close" type="button" aria-label="Close panel">&times;</button>
      </div>
      <div class="float-actions-body">
        <p class="float-actions-note">Both buttons first open a dialog where you can review and edit the pre-filled prompt. Nothing runs until you confirm there.</p>
        <a id="openSkillInVSCode" class="btn btn-outline" href="#">Open in VS Code</a>
        <a id="openSkillInGitHubApp" class="btn btn-outline" href="#">Open in GitHub Copilot</a>
      </div>`;
    if (window.wireFloatDrag) window.wireFloatDrag(card);
    card.hidden = false;
    if (window.wireFloatPanel) window.wireFloatPanel(card, "Want to try this?");
  }

  function wireSplitButton(skill) {
    // No longer needed — prompt dialog handles both buttons
  }

  function wirePromptDialogs(skill) {
    const vscodeBtn = document.getElementById("openSkillInVSCode");
    const ghAppBtn = document.getElementById("openSkillInGitHubApp");
    const dialog = document.getElementById("promptDialog");
    const title = document.getElementById("promptDialogTitle");
    const textarea = document.getElementById("promptDialogTextarea");
    const cancelBtn = document.getElementById("promptDialogCancel");
    const proceedBtn = document.getElementById("promptDialogProceed");
    if (!dialog) return;

    let targetApp = null;

    function openDialog(app, heading) {
      targetApp = app;
      title.textContent = heading;
      textarea.value = buildPrompt(skill);
      dialog.showModal();
      textarea.focus();
    }

    if (vscodeBtn) {
      vscodeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        openDialog("vscode", "Edit prompt before opening VS Code");
      });
    }

    if (ghAppBtn) {
      ghAppBtn.addEventListener("click", (e) => {
        e.preventDefault();
        openDialog("ghapp", "Edit prompt before opening GitHub Copilot");
      });
    }

    cancelBtn.addEventListener("click", () => dialog.close());

    proceedBtn.addEventListener("click", () => {
      const prompt = textarea.value;
      dialog.close();
      if (targetApp === "vscode") {
        const encoded = encodeURIComponent(prompt);
        window.location.href = `vscode://GitHub.Copilot-Chat/chat?prompt=${encoded}`;
      } else if (targetApp === "ghapp") {
        const encoded = encodeURIComponent(prompt);
        const repo = encodeURIComponent("Deloitte-Nordics/kab-housing-ai");
        const appLink = `ghapp://session/new?repo=${repo}&mode=plan&prompt=${encoded}`;
        window.open(`https://github.com/copilot/app/launch?open=${encodeURIComponent(appLink)}`, "_blank");
      }
    });

    dialog.addEventListener("click", (e) => {
      if (e.target === dialog) dialog.close();
    });
  }

  function wireGitHubAppButton(skill) {
    // Deprecated — handled by wirePromptDialogs
  }

  // ---------- router ----------
  function route() {
    const state = parseHash();
    if (state.view === "detail") renderDetail(state.id);
    else renderIndex();
  }

  window.addEventListener("hashchange", route);
  route();
})();
