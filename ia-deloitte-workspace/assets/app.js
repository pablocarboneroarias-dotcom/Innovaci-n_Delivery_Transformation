import {
  meta,
  phases,
  roles,
  agents,
  features,
  architectureAssets,
  tools,
  knowledgeAssets,
  useCases,
  projectMap,
  allAssets,
  getAsset,
  getRole,
  getPhase
} from '../data/workspace-data.js';

const state = {
  activeRole: 'all',
  workspaceRole: 'developer',
  selectedUseCase: 'entender-feature',
  selectedPhase: 'analisis',
  activeMapBranch: 'all',
  useCaseFilter: 'Todos',
  assetCategory: 'agents',
  assetQuery: ''
};

const statusLabels = {
  disponible: 'Disponible',
  'aplicacion-potencial': 'Aplicación potencial',
  evolucion: 'Evolución'
};

const categoryIcons = {
  agents: 'users-round',
  features: 'puzzle',
  architecture: 'network',
  testing: 'flask-conical',
  tools: 'wrench',
  automation: 'workflow',
  knowledge: 'library-big'
};

const assetCategories = [
  { id: 'agents', label: 'Agentes', assets: agents },
  { id: 'features', label: 'Features', assets: features },
  { id: 'architecture', label: 'Arquitectura', assets: architectureAssets },
  { id: 'testing', label: 'Testing', assets: [...tools, ...knowledgeAssets].filter(item => item.category === 'Testing' || item.id.includes('playwright') || item.id === 'tool-sf-browser') },
  { id: 'tools', label: 'Herramientas', assets: tools.filter(item => item.category === 'Tool') },
  { id: 'automation', label: 'Automatización', assets: [...tools, ...knowledgeAssets].filter(item => item.category === 'Automatización') },
  { id: 'knowledge', label: 'Conocimiento y gobierno', assets: knowledgeAssets.filter(item => ['Conocimiento', 'Gobierno', 'Código'].includes(item.category)) }
];

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function normalize(value = '') {
  return value
    .toLocaleLowerCase('es')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function icon(name, className = '') {
  return `<i data-lucide="${escapeHtml(name || 'circle')}" class="${escapeHtml(className)}" aria-hidden="true"></i>`;
}

function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons({ attrs: { 'stroke-width': 1.8 } });
  }
}

function statusBadge(status) {
  return `<span class="status-badge" data-status="${escapeHtml(status)}">${escapeHtml(statusLabels[status] || status)}</span>`;
}

function getRelatedUseCases(assetId) {
  return useCases.filter(item =>
    [...(item.agents || []), ...(item.tools || []), ...(item.assets || [])].includes(assetId)
  );
}

function getUseCaseRelations(useCase) {
  return [...(useCase.agents || []), ...(useCase.tools || []), ...(useCase.assets || [])]
    .map(getAsset)
    .filter(Boolean);
}

function renderOverview() {
  $('#snapshot-date').textContent = meta.actualizado;
  $('#kpi-grid').innerHTML = meta.indicadores
    .map(item => `
      <div class="kpi-item">
        <span class="kpi-value">${escapeHtml(item.value)}</span>
        <span class="kpi-label">${escapeHtml(item.label)}</span>
        <span class="kpi-detail">${escapeHtml(item.detail)}</span>
      </div>`)
    .join('');
}

function renderHeaderRoles() {
  const select = $('#header-role-select');
  select.innerHTML = [
    '<option value="all">Todos los roles</option>',
    ...roles.map(role => `<option value="${role.id}">${escapeHtml(role.label)}</option>`)
  ].join('');
  select.value = state.activeRole;
  select.addEventListener('change', event => setActiveRole(event.target.value));
}

function setActiveRole(roleId, options = {}) {
  state.activeRole = roleId;
  $('#header-role-select').value = roleId;
  if (roleId !== 'all') {
    state.workspaceRole = roleId;
    const role = getRole(roleId);
    if (!role.useCases.includes(state.selectedUseCase)) {
      state.selectedUseCase = role.useCases[0];
    }
  }
  renderLifecycle();
  renderRoleWorkspace();
  if (options.scroll) {
    $('#roles').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function renderMap() {
  const stage = $('#map-stage');
  const nodes = buildProjectMapNodes();
  stage.innerHTML = nodes.map(projectMapNodeMarkup).join('');
  renderMapFilters();
  bindMapEvents();
  drawMapConnections();
  refreshIcons();
}

function buildProjectMapNodes() {
  const nodes = [{
    id: projectMap.center.id,
    label: projectMap.center.label,
    subtitle: projectMap.center.subtitle,
    summary: projectMap.center.summary,
    type: 'center',
    x: 50,
    y: 47
  }];

  const layouts = {
    verification: { root: [50, 19], leaves: projectMap.branches[0].items.map((_, index) => [8 + index * 12, 6]) },
    features: {
      root: [31.5, 47],
      groups: [[21, 17], [21, 37], [21, 55], [21, 65], [21, 77], [21, 90]],
      leaves: [
        [[7, 11], [7, 15], [7, 19], [7, 23]],
        [[7, 27], [7, 31], [7, 35], [7, 39], [7, 43], [7, 47]],
        [[7, 51], [7, 55], [7, 59]],
        [[7, 63], [7, 68]],
        [[7, 71], [7, 75], [7, 79], [7, 83]],
        [[7, 88], [7, 92]]
      ]
    },
    agents: { root: [67, 47], leaves: projectMap.branches[2].items.map((_, index) => [84, 22 + index * 6.5]) },
    context: { root: [40, 79], leaves: [[34, 89], [46, 89], [34, 95], [46, 95]] },
    architecture: { root: [73, 79], leaves: [[58, 89], [68.5, 89], [79, 89], [89.5, 89], [58, 95], [68.5, 95], [79, 95], [89.5, 95]] }
  };

  projectMap.branches.forEach(branch => {
    const layout = layouts[branch.id];
    nodes.push({
      id: `branch-${branch.id}`,
      branchId: branch.id,
      label: branch.label,
      summary: branch.summary,
      color: branch.color,
      type: 'branch',
      parentId: projectMap.center.id,
      x: layout.root[0],
      y: layout.root[1]
    });

    if (branch.groups) {
      branch.groups.forEach((group, groupIndex) => {
        const groupPosition = layout.groups[groupIndex];
        nodes.push({
          id: group.id,
          branchId: branch.id,
          label: group.label,
          color: branch.color,
          type: 'group',
          parentId: `branch-${branch.id}`,
          x: groupPosition[0],
          y: groupPosition[1]
        });
        group.items.forEach((item, itemIndex) => {
          const itemPosition = layout.leaves[groupIndex][itemIndex];
          nodes.push(mapLeafNode(item, branch, group.id, itemPosition));
        });
      });
    } else {
      branch.items.forEach((item, itemIndex) => {
        nodes.push(mapLeafNode(item, branch, `branch-${branch.id}`, layout.leaves[itemIndex]));
      });
    }
  });

  return nodes;
}

function mapLeafNode(item, branch, parentId, position) {
  const asset = getAsset(item.assetId);
  return {
    id: `leaf-${branch.id}-${item.assetId}`,
    branchId: branch.id,
    assetId: item.assetId,
    label: item.label,
    summary: asset?.summary || '',
    status: asset?.status,
    color: branch.color,
    type: 'leaf',
    parentId,
    x: position[0],
    y: position[1]
  };
}

function projectMapNodeMarkup(node) {
  const dimmed = state.activeMapBranch !== 'all' && node.type !== 'center' && node.branchId !== state.activeMapBranch;
  const classes = ['project-map-node', `is-${node.type}`, node.color ? `tone-${node.color}` : '', dimmed ? 'is-dimmed' : '', node.status === 'evolucion' ? 'is-proposal' : ''].filter(Boolean).join(' ');
  const style = `--map-x:${node.x}%;--map-y:${node.y}%`;
  const content = node.type === 'center'
    ? `<span class="map-center-icon">${icon('bot')}</span><strong>${escapeHtml(node.label)}</strong><span class="map-center-subtitle">${escapeHtml(node.subtitle)}</span>`
    : `<strong>${escapeHtml(node.label)}</strong>${node.subtitle ? `<span>${escapeHtml(node.subtitle)}</span>` : ''}`;
  const attributes = `data-map-node="${node.id}" data-map-branch="${node.branchId || 'all'}" style="${style}" title="${escapeHtml(node.summary || node.label)}"`;

  if (node.type === 'leaf') {
    return `<button type="button" class="${classes}" ${attributes} data-asset-id="${node.assetId}">${content}</button>`;
  }
  if (node.type === 'branch') {
    return `<button type="button" class="${classes}" ${attributes} data-branch-id="${node.branchId}">${content}</button>`;
  }
  return `<div class="${classes}" ${attributes}>${content}</div>`;
}

function renderMapFilters() {
  const filters = [{ id: 'all', label: 'Todo', color: 'all' }, ...projectMap.branches];
  $('#map-filters').innerHTML = filters.map(filter => `
    <button type="button" class="map-filter tone-${filter.color}${state.activeMapBranch === filter.id ? ' is-active' : ''}" data-map-filter="${filter.id}" aria-pressed="${state.activeMapBranch === filter.id}">
      ${filter.id === 'all' ? '' : '<span class="map-filter-dot" aria-hidden="true"></span>'}${escapeHtml(filter.label)}
    </button>`).join('');
  $$('[data-map-filter]').forEach(button => button.addEventListener('click', () => {
    state.activeMapBranch = button.dataset.mapFilter;
    renderMap();
  }));
}

function bindMapEvents() {
  $$('[data-branch-id]').forEach(button => button.addEventListener('click', () => {
    state.activeMapBranch = state.activeMapBranch === button.dataset.branchId ? 'all' : button.dataset.branchId;
    renderMap();
  }));
  $$('[data-asset-id]').forEach(button => button.addEventListener('click', () => openDrawer(button.dataset.assetId)));
}

function drawMapConnections() {
  const svg = $('#map-connections');
  if (!svg) return;
  svg.setAttribute('viewBox', '0 0 100 100');
  svg.setAttribute('preserveAspectRatio', 'none');
  svg.innerHTML = '';

  const nodes = buildProjectMapNodes();
  const nodeById = new Map(nodes.map(node => [node.id, node]));
  nodes.filter(node => node.parentId).forEach(node => {
    const parent = nodeById.get(node.parentId);
    if (!parent) return;
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const midX = (parent.x + node.x) / 2;
    path.setAttribute('d', `M ${parent.x} ${parent.y} C ${midX} ${parent.y}, ${midX} ${node.y}, ${node.x} ${node.y}`);
    path.setAttribute('class', `project-map-edge tone-${node.color}${state.activeMapBranch !== 'all' && node.branchId !== state.activeMapBranch ? ' is-dimmed' : ''}`);
    svg.appendChild(path);
  });
}

function bindMapViewControls() {
  window.addEventListener('resize', () => requestAnimationFrame(drawMapConnections));
}

function renderDiscovery(mode = 'phase') {
  const panel = $('#discover-panel');
  let items = [];
  if (mode === 'phase') {
    items = phases.map(phase => ({
      id: phase.id, label: phase.label, detail: `${useCases.filter(item => item.phases.includes(phase.id)).length} casos relacionados`, icon: phase.icon, action: 'phase'
    }));
  } else if (mode === 'activity') {
    items = [...new Set(useCases.map(item => item.category))].map(category => ({
      id: category, label: category, detail: `${useCases.filter(item => item.category === category).length} capacidades`, icon: activityIcon(category), action: 'activity'
    }));
  } else {
    items = roles.map(role => ({
      id: role.id, label: role.label, detail: `${role.useCases.length} usos directos`, icon: role.icon, action: 'role'
    }));
  }
  panel.innerHTML = `<div class="choice-grid">${items.map(item => `
    <button type="button" class="choice-item" data-discovery-action="${item.action}" data-discovery-id="${escapeHtml(item.id)}">
      ${icon(item.icon)}<span><strong>${escapeHtml(item.label)}</strong><small>${escapeHtml(item.detail)}</small></span>${icon('arrow-right')}
    </button>`).join('')}</div>`;
  $$('[data-discovery-action]').forEach(button => button.addEventListener('click', () => handleDiscovery(button.dataset.discoveryAction, button.dataset.discoveryId)));
  refreshIcons();
}

function activityIcon(category) {
  return ({ Analizar: 'search', Definir: 'list-checks', Diseñar: 'pen-tool', Desarrollar: 'code-2', Probar: 'flask-conical', Revisar: 'scan-search', Release: 'rocket', Operar: 'wrench', Documentar: 'file-text', Automatizar: 'workflow' })[category] || 'circle';
}

function handleDiscovery(action, id) {
  if (action === 'phase') {
    state.selectedPhase = id;
    renderLifecycle();
    $('#ciclo').scrollIntoView({ behavior: 'smooth' });
  } else if (action === 'role') {
    setActiveRole(id, { scroll: true });
  } else {
    state.useCaseFilter = id;
    renderUseCases();
    $('#casos').scrollIntoView({ behavior: 'smooth' });
  }
}

function bindDiscoveryTabs() {
  $$('[data-discover-tab]').forEach(button => button.addEventListener('click', () => {
    $$('[data-discover-tab]').forEach(item => item.setAttribute('aria-selected', String(item === button)));
    renderDiscovery(button.dataset.discoverTab);
  }));
}

function renderLifecycle() {
  const role = state.activeRole === 'all' ? null : getRole(state.activeRole);
  $('#lifecycle-track').innerHTML = phases.map(phase => {
    const relevant = role?.phases.includes(phase.id);
    return `<button type="button" role="tab" class="phase-tab${phase.id === state.selectedPhase ? ' is-active' : ''}${relevant ? ' is-role-relevant' : ''}" aria-selected="${phase.id === state.selectedPhase}" data-phase-id="${phase.id}"><span class="phase-number">${phase.order}</span><strong>${escapeHtml(phase.label)}</strong></button>`;
  }).join('');

  const chip = $('#phase-role-chip span');
  chip.textContent = role ? role.label : 'Todos los roles';
  const selected = getPhase(state.selectedPhase);
  let relatedCases = useCases.filter(item => item.phases.includes(selected.id));
  if (role) relatedCases = relatedCases.filter(item => item.roles.includes(role.id));

  $('#lifecycle-detail').innerHTML = `
    <div class="phase-summary"><span class="section-index">Fase ${selected.order}</span><h3>${escapeHtml(selected.label)}</h3><p>${escapeHtml(selected.description)}</p></div>
    <div class="phase-cases"><div class="panel-title"><span>Capacidades en esta intersección</span><span>${relatedCases.length}</span></div>
      <div class="compact-case-list">${relatedCases.length ? relatedCases.slice(0, 6).map(item => `<button type="button" class="compact-case" data-phase-case="${item.id}"><span>${escapeHtml(item.title)}</span>${icon('arrow-up-right')}</button>`).join('') : '<p class="empty-state">No hay una relación directa documentada para esta combinación.</p>'}</div>
    </div>`;
  $$('[data-phase-id]').forEach(button => button.addEventListener('click', () => {
    state.selectedPhase = button.dataset.phaseId;
    renderLifecycle();
  }));
  $$('[data-phase-case]').forEach(button => button.addEventListener('click', () => openDrawer(button.dataset.phaseCase)));
  refreshIcons();
}

function renderRoleWorkspace() {
  const role = getRole(state.workspaceRole) || roles[0];
  const roleCases = role.useCases.map(id => useCases.find(item => item.id === id)).filter(Boolean);
  let selected = roleCases.find(item => item.id === state.selectedUseCase);
  if (!selected) {
    selected = roleCases[0];
    state.selectedUseCase = selected.id;
  }

  $('#role-selector').innerHTML = roles.map(item => `
    <button type="button" role="tab" class="role-tab" aria-selected="${item.id === role.id}" data-role-id="${item.id}">${icon(item.icon)}<span>${escapeHtml(item.short)}</span></button>`).join('');
  $('#role-profile').innerHTML = `
    <span class="role-avatar">${icon(role.icon)}</span>
    <span class="section-index">Perfil activo</span>
    <h3>${escapeHtml(role.label)}</h3>
    <p>${escapeHtml(role.summary)}</p>
    <p class="role-value"><strong>Valor para el rol</strong><br />${escapeHtml(role.value)}</p>
    <div class="role-phases">${role.phases.map(id => `<span class="relation-chip">${escapeHtml(getPhase(id)?.short || id)}</span>`).join('')}</div>`;
  $('#role-usecase-count').textContent = `${roleCases.length} usos`;
  $('#role-activity-list').innerHTML = roleCases.map(item => `
    <button type="button" role="tab" class="activity-tab" aria-selected="${item.id === selected.id}" data-role-case="${item.id}">${icon(item.icon)}<span>${escapeHtml(item.title)}</span>${icon('chevron-right')}</button>`).join('');
  renderRoleOutcome(selected, role);

  $$('[data-role-id]').forEach(button => button.addEventListener('click', () => setActiveRole(button.dataset.roleId)));
  $$('[data-role-case]').forEach(button => button.addEventListener('click', () => {
    state.selectedUseCase = button.dataset.roleCase;
    renderRoleWorkspace();
  }));
  refreshIcons();
}

function renderRoleOutcome(useCase, role) {
  const relations = getUseCaseRelations(useCase);
  $('#role-outcome').innerHTML = `
    <div class="outcome-head"><div><span class="section-index">${escapeHtml(role.short)} · ${escapeHtml(useCase.category)}</span><h3>${escapeHtml(useCase.title)}</h3></div>${statusBadge(useCase.status)}</div>
    <p class="outcome-summary">${escapeHtml(useCase.summary)}</p>
    <div class="outcome-pipeline">
      <div class="pipeline-step"><span>Necesidad</span><strong>${escapeHtml(useCase.need)}</strong></div>
      <div class="pipeline-step"><span>Entradas</span><strong>${escapeHtml(useCase.inputs.join(' · '))}</strong></div>
      <div class="pipeline-step"><span>Resultado</span><strong>${escapeHtml(useCase.output)}</strong></div>
      <div class="pipeline-step"><span>Validación humana</span><strong>${escapeHtml(useCase.human)}</strong></div>
    </div>
    <div class="panel-title"><span>Activos que lo hacen posible</span><span>${relations.length}</span></div>
    <div class="outcome-assets">${relations.map(item => `<button type="button" class="relation-chip" data-outcome-asset="${item.id}">${icon(item.icon)}${escapeHtml(item.label || item.title)}</button>`).join('')}</div>
    <button type="button" class="button button-secondary" data-open-case="${useCase.id}" style="margin-top:22px">${icon('panel-right-open')}Ver trazabilidad completa</button>`;
  $$('[data-outcome-asset]').forEach(button => button.addEventListener('click', () => openDrawer(button.dataset.outcomeAsset)));
  $('[data-open-case]')?.addEventListener('click', event => openDrawer(event.currentTarget.dataset.openCase));
}

function renderUseCaseFilters() {
  const categories = ['Todos', ...new Set(useCases.map(item => item.category))];
  $('#usecase-filters').innerHTML = categories.map(category => `<button type="button" class="filter-button${category === state.useCaseFilter ? ' is-active' : ''}" data-usecase-filter="${escapeHtml(category)}">${escapeHtml(category)}</button>`).join('');
  $$('[data-usecase-filter]').forEach(button => button.addEventListener('click', () => {
    state.useCaseFilter = button.dataset.usecaseFilter;
    renderUseCases();
  }));
}

function renderUseCases() {
  renderUseCaseFilters();
  const filtered = state.useCaseFilter === 'Todos' ? useCases : useCases.filter(item => item.category === state.useCaseFilter);
  $('#usecase-table').innerHTML = filtered.map(item => {
    const primaryAgent = getAsset(item.agents?.[0]);
    const primaryTool = getAsset(item.tools?.[0]);
    return `<button type="button" class="usecase-row" data-usecase-id="${item.id}">
      <span class="usecase-icon">${icon(item.icon)}</span>
      <span class="usecase-name"><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.category)}</span></span>
      <p class="usecase-summary">${escapeHtml(item.summary)}</p>
      <span class="usecase-meta"><span>Agente</span><strong>${escapeHtml(primaryAgent?.label || 'Contexto general')}</strong></span>
      <span class="usecase-meta"><span>Tool</span><strong>${escapeHtml(primaryTool?.label || 'Sin tool específica')}</strong></span>
      ${icon('chevron-right')}
    </button>`;
  }).join('') || '<p class="empty-state">No hay casos para este filtro.</p>';
  $$('[data-usecase-id]').forEach(button => button.addEventListener('click', () => openDrawer(button.dataset.usecaseId)));
  refreshIcons();
}

function renderAssetExplorer() {
  $('#asset-categories').innerHTML = assetCategories.map(category => `
    <button type="button" class="asset-category-button${category.id === state.assetCategory ? ' is-active' : ''}" data-asset-category="${category.id}">${icon(categoryIcons[category.id])}<span>${escapeHtml(category.label)}</span><span class="count">${category.assets.length}</span></button>`).join('');
  $$('[data-asset-category]').forEach(button => button.addEventListener('click', () => {
    state.assetCategory = button.dataset.assetCategory;
    state.assetQuery = '';
    $('#asset-filter').value = '';
    renderAssetExplorer();
  }));

  const category = assetCategories.find(item => item.id === state.assetCategory) || assetCategories[0];
  $('#asset-category-kicker').textContent = `${category.assets.length} activos trazables`;
  $('#asset-category-title').textContent = category.label;
  const query = normalize(state.assetQuery);
  const filtered = category.assets.filter(item => normalize(`${item.label} ${item.summary} ${item.file || ''}`).includes(query));
  $('#asset-list').innerHTML = filtered.length ? filtered.map(item => `
    <button type="button" class="asset-row" data-asset-row="${item.id}">
      ${icon(item.icon)}<strong>${escapeHtml(item.label)}</strong><p>${escapeHtml(item.summary)}</p><span class="file-path">${escapeHtml(item.file || 'Relación semántica')}</span>${statusBadge(item.status)}
    </button>`).join('') : '<p class="empty-state">No hay activos que coincidan con el filtro.</p>';
  $$('[data-asset-row]').forEach(button => button.addEventListener('click', () => openDrawer(button.dataset.assetRow)));
  refreshIcons();
}

function bindAssetFilter() {
  $('#asset-filter').addEventListener('input', event => {
    state.assetQuery = event.target.value;
    renderAssetExplorer();
    $('#asset-filter').focus();
    $('#asset-filter').setSelectionRange(state.assetQuery.length, state.assetQuery.length);
  });
}

function openDrawer(assetId) {
  const asset = getAsset(assetId) || useCases.find(item => item.id === assetId);
  if (!asset) return;
  const isUseCase = useCases.some(item => item.id === asset.id);
  const relatedCases = isUseCase ? [] : getRelatedUseCases(asset.id);
  const relatedAssets = isUseCase ? getUseCaseRelations(asset) : [];
  const title = asset.label || asset.title;
  const category = asset.category || 'Activo';
  const status = asset.status || 'disponible';

  $('#drawer-status').textContent = statusLabels[status] || status;
  $('#drawer-status').dataset.status = status;
  $('#drawer-category').textContent = category;
  $('#drawer-body').innerHTML = `
    <div class="drawer-title-group"><span class="drawer-icon">${icon(asset.icon)}</span><h2 id="drawer-title">${escapeHtml(title)}</h2><p>${escapeHtml(asset.summary || '')}</p></div>
    ${isUseCase ? renderUseCaseDetail(asset) : ''}
    ${relatedAssets.length ? renderRelationsSection('Agentes, tools y conocimiento', relatedAssets) : ''}
    ${relatedCases.length ? renderRelationsSection('Casos de uso relacionados', relatedCases) : ''}
    ${asset.file ? `<div class="detail-section"><h3>Archivo del repositorio</h3><div class="file-block">${escapeHtml(asset.file)}</div></div>` : ''}
    <div class="detail-section"><h3>Estado</h3><p>${statusExplanation(status)}</p></div>`;
  $('#drawer-backdrop').hidden = false;
  $('#detail-drawer').setAttribute('aria-hidden', 'false');
  requestAnimationFrame(() => $('#detail-drawer').classList.add('is-open'));
  $$('[data-drawer-asset]').forEach(button => button.addEventListener('click', () => openDrawer(button.dataset.drawerAsset)));
  refreshIcons();
  $('[data-close-drawer]').focus();
}

function renderUseCaseDetail(item) {
  const roleLabels = item.roles.map(id => getRole(id)?.label).filter(Boolean);
  const phaseLabels = item.phases.map(id => getPhase(id)?.label).filter(Boolean);
  return `
    <div class="detail-section"><h3>Necesidad</h3><p>${escapeHtml(item.need)}</p></div>
    <div class="detail-section"><h3>Entradas</h3><ul class="detail-list">${item.inputs.map(value => `<li>${escapeHtml(value)}</li>`).join('')}</ul></div>
    <div class="detail-section"><h3>Resultado</h3><p>${escapeHtml(item.output)}</p></div>
    <div class="detail-section"><h3>Validación humana</h3><p>${escapeHtml(item.human)}</p></div>
    <div class="detail-section"><h3>Roles</h3><div class="outcome-assets">${roleLabels.map(value => `<span class="relation-chip">${escapeHtml(value)}</span>`).join('')}</div></div>
    <div class="detail-section"><h3>Fases</h3><div class="outcome-assets">${phaseLabels.map(value => `<span class="relation-chip">${escapeHtml(value)}</span>`).join('')}</div></div>`;
}

function renderRelationsSection(title, items) {
  return `<div class="detail-section"><h3>${escapeHtml(title)}</h3><div class="outcome-assets">${items.map(item => `<button type="button" class="relation-chip" data-drawer-asset="${item.id}">${icon(item.icon || 'circle')}${escapeHtml(item.label || item.title)}</button>`).join('')}</div></div>`;
}

function statusExplanation(status) {
  if (status === 'disponible') return 'Respaldado por archivos, configuración o código presentes en el repositorio.';
  if (status === 'aplicacion-potencial') return 'Puede aplicarse con activos actuales, pero no existe como workflow operativo completo.';
  return 'Requiere nuevos componentes o automatización adicional antes de considerarse operativo.';
}

function closeDrawer() {
  $('#detail-drawer').classList.remove('is-open');
  $('#detail-drawer').setAttribute('aria-hidden', 'true');
  window.setTimeout(() => { $('#drawer-backdrop').hidden = true; }, 220);
}

function buildSearchIndex() {
  return [
    ...roles.map(item => ({ ...item, searchType: 'role', searchLabel: item.label, searchSummary: item.summary })),
    ...phases.map(item => ({ ...item, searchType: 'phase', searchLabel: item.label, searchSummary: item.description })),
    ...allAssets.map(item => ({ ...item, searchType: 'asset', searchLabel: item.label || item.title, searchSummary: item.summary || '' }))
  ];
}

function renderSearchResults(query = '') {
  const normalizedQuery = normalize(query.trim());
  const index = buildSearchIndex();
  const priorityIds = ['tool-playwright-mcp', 'arch-testing', 'feature-switching-electricidad', 'agent-corrective', 'agent-architect', 'tool-pr'];
  const results = normalizedQuery
    ? index.filter(item => normalize(`${item.searchLabel} ${item.searchSummary} ${item.file || ''} ${item.category || ''}`).includes(normalizedQuery)).slice(0, 18)
    : priorityIds.map(id => index.find(item => item.id === id)).filter(Boolean);
  $('#search-results').innerHTML = results.length ? results.map(item => `
    <button type="button" class="search-result" data-search-type="${item.searchType}" data-search-id="${item.id}">
      <span class="result-icon">${icon(item.icon)}</span><span><strong>${escapeHtml(item.searchLabel)}</strong><small>${escapeHtml(item.searchSummary)}</small></span><span class="drawer-category">${escapeHtml(item.category || (item.searchType === 'role' ? 'Rol' : 'Fase'))}</span>
    </button>`).join('') : '<p class="empty-state">No se han encontrado resultados.</p>';
  $$('[data-search-id]').forEach(button => button.addEventListener('click', () => handleSearchResult(button.dataset.searchType, button.dataset.searchId)));
  refreshIcons();
}

function handleSearchResult(type, id) {
  closeSearch();
  if (type === 'role') {
    setActiveRole(id, { scroll: true });
  } else if (type === 'phase') {
    state.selectedPhase = id;
    renderLifecycle();
    $('#ciclo').scrollIntoView({ behavior: 'smooth' });
  } else {
    openDrawer(id);
  }
}

function openSearch(initialQuery = '') {
  $('#search-modal').hidden = false;
  $('#global-search-input').value = initialQuery;
  renderSearchResults(initialQuery);
  requestAnimationFrame(() => $('#global-search-input').focus());
}

function closeSearch() {
  $('#search-modal').hidden = true;
}

function bindGlobalInteractions() {
  $$('[data-open-search]').forEach(button => button.addEventListener('click', () => openSearch()));
  $('[data-close-search]').addEventListener('click', closeSearch);
  $('#search-modal').addEventListener('click', event => { if (event.target === $('#search-modal')) closeSearch(); });
  $('#global-search-input').addEventListener('input', event => renderSearchResults(event.target.value));
  $$('.search-hints button').forEach(button => button.addEventListener('click', () => openSearch(button.textContent)));
  $('[data-close-drawer]').addEventListener('click', closeDrawer);
  $('#drawer-backdrop').addEventListener('click', closeDrawer);
  $('[data-mobile-menu]').addEventListener('click', () => document.body.classList.toggle('mobile-nav-open'));
  $$('.nav-item').forEach(link => link.addEventListener('click', () => document.body.classList.remove('mobile-nav-open')));
  document.addEventListener('keydown', event => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      openSearch();
    }
    if (event.key === 'Escape') {
      if (!$('#search-modal').hidden) closeSearch();
      if ($('#detail-drawer').classList.contains('is-open')) closeDrawer();
      document.body.classList.remove('mobile-nav-open');
    }
  });
}

function bindSectionObserver() {
  const sections = $$('.section[id]');
  const observer = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    $$('[data-section-link]').forEach(link => link.classList.toggle('is-active', link.dataset.sectionLink === visible.target.id));
  }, { rootMargin: '-20% 0px -65% 0px', threshold: [0, 0.15, 0.4] });
  sections.forEach(section => observer.observe(section));
}

function init() {
  renderOverview();
  renderHeaderRoles();
  renderMap();
  bindMapViewControls();
  renderDiscovery();
  bindDiscoveryTabs();
  renderLifecycle();
  renderRoleWorkspace();
  renderUseCases();
  renderAssetExplorer();
  bindAssetFilter();
  bindGlobalInteractions();
  bindSectionObserver();
  refreshIcons();
}

init();