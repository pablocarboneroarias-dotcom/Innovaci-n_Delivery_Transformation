export const meta = {
  producto: 'IA Deloitte',
  cliente: 'Naturgy',
  proyecto: 'Naturgy NewCo Salesforce',
  descripcion:
    'Workspace de capacidades de IA aplicadas al análisis, diseño, desarrollo, testing, release y mantenimiento de Naturgy NewCo.',
  actualizado: '5 de septiembre de 2026',
  apiVersion: '66.0',
  indicadores: [
    { value: 8, label: 'agentes operativos', detail: 'Perfiles especializados versionados' },
    { value: 19, label: 'features documentadas', detail: 'Procesos funcionales y técnicos reales' },
    { value: 8, label: 'guías de arquitectura', detail: 'Patrones, testing e integraciones' },
    { value: 304, label: 'clases Apex de test', detail: 'Detectadas por nombre en el repositorio' }
  ]
};

export const phases = [
  { id: 'preparacion', order: '01', label: 'Preparación', short: 'Preparar', icon: 'settings-2', description: 'Alinear alcance, reglas, fuentes y forma de trabajo.' },
  { id: 'analisis', order: '02', label: 'Descubrimiento y análisis', short: 'Analizar', icon: 'search', description: 'Entender la necesidad, el proceso actual y sus dependencias.' },
  { id: 'definicion', order: '03', label: 'Definición', short: 'Definir', icon: 'list-checks', description: 'Cerrar requisitos, criterios y resultados esperados.' },
  { id: 'diseno', order: '04', label: 'Arquitectura y diseño', short: 'Diseñar', icon: 'network', description: 'Evaluar alternativas y diseñar dentro de los patrones del proyecto.' },
  { id: 'desarrollo', order: '05', label: 'Desarrollo', short: 'Desarrollar', icon: 'code-2', description: 'Implementar y documentar código conforme a las reglas NewCo.' },
  { id: 'testing', order: '06', label: 'Validación y testing', short: 'Validar', icon: 'shield-check', description: 'Generar evidencia con pruebas Apex, Jest y recorridos de navegador.' },
  { id: 'release', order: '07', label: 'Release y despliegue', short: 'Publicar', icon: 'rocket', description: 'Revisar cambios, preparar el hito y coordinar el despliegue.' },
  { id: 'operacion', order: '08', label: 'Operación y mantenimiento', short: 'Operar', icon: 'wrench', description: 'Diagnosticar incidencias, corregir y mantener la continuidad.' },
  { id: 'mejora', order: '09', label: 'Mejora continua', short: 'Mejorar', icon: 'refresh-cw', description: 'Devolver aprendizaje a las reglas, arquitectura y documentación.' }
];

export const roles = [
  {
    id: 'po', label: 'Product Owner', short: 'PO', icon: 'target',
    summary: 'Convierte una necesidad en alcance verificable y decide prioridades con impacto y dependencias visibles.',
    value: 'La IA relaciona la petición con procesos ya documentados y prepara preguntas, riesgos y criterios para la decisión humana.',
    phases: ['analisis', 'definicion', 'release', 'mejora'],
    useCases: ['entender-feature', 'analizar-impacto', 'enriquecer-requisito', 'preparar-release']
  },
  {
    id: 'ba', label: 'Analista funcional', short: 'Funcional', icon: 'clipboard-list',
    summary: 'Traduce el dominio energético a requisitos, reglas y escenarios concretos.',
    value: 'Accede a switching, contratación, renovaciones, atención e integraciones sin depender de conocimiento tácito.',
    phases: ['analisis', 'definicion', 'testing', 'mejora'],
    useCases: ['entender-feature', 'enriquecer-requisito', 'documentar-feature', 'preparar-uat']
  },
  {
    id: 'architect', label: 'Arquitectura de solución y técnica', short: 'Arquitectura', icon: 'blocks',
    summary: 'Diseña la solución dentro de las capas, patrones, integraciones y límites reales de NewCo.',
    value: 'La IA localiza precedentes, dependencias y reglas para comparar alternativas sin partir de una arquitectura genérica.',
    phases: ['analisis', 'diseno', 'desarrollo', 'release', 'mejora'],
    useCases: ['analizar-impacto', 'disenar-solucion', 'disenar-integracion', 'revisar-codigo']
  },
  {
    id: 'developer', label: 'Developer', short: 'Developer', icon: 'terminal-square',
    summary: 'Entiende el código existente, implementa por capas y prepara pruebas y revisión.',
    value: 'Las reglas críticas de sharing, bulkificación, APIs y frameworks se aplican desde el inicio de la tarea.',
    phases: ['diseno', 'desarrollo', 'testing', 'release', 'operacion'],
    useCases: ['entender-feature', 'implementar-cambio', 'generar-tests', 'validar-ui', 'revisar-codigo', 'corregir-incidencia']
  },
  {
    id: 'qa', label: 'QA / Test Engineer', short: 'QA', icon: 'flask-conical',
    summary: 'Define escenarios, genera pruebas y convierte el resultado en evidencia revisable.',
    value: 'Combina tests Apex y Jest con automatización de navegador disponible para validar recorridos reales.',
    phases: ['definicion', 'desarrollo', 'testing', 'release', 'operacion'],
    useCases: ['preparar-uat', 'generar-tests', 'validar-ui', 'analizar-fallo', 'regresion-e2e']
  },
  {
    id: 'release', label: 'Release Manager', short: 'Release', icon: 'git-pull-request',
    summary: 'Explica qué cambia, qué documentación queda afectada y qué debe validarse antes del hito.',
    value: 'El agente y PR Analyzer conectan Pull Requests, tickets, archivos y notas de versión.',
    phases: ['testing', 'release', 'operacion'],
    useCases: ['preparar-release', 'revisar-codigo', 'documentar-feature']
  },
  {
    id: 'ams', label: 'AMS / Support', short: 'AMS', icon: 'life-buoy',
    summary: 'Clasifica incidencias, reúne contexto, identifica causas y propone una resolución trazable.',
    value: 'Features, logs, código y herramientas operativas se combinan para reducir el tiempo de diagnóstico.',
    phases: ['operacion', 'testing', 'release', 'mejora'],
    useCases: ['triage-incidencia', 'analizar-fallo', 'corregir-incidencia', 'analizar-coherencia', 'documentar-rca']
  },
  {
    id: 'delivery', label: 'Delivery Lead / Project Manager', short: 'Delivery', icon: 'route',
    summary: 'Gobierna cobertura, riesgos, dependencias y uso responsable de las capacidades disponibles.',
    value: 'La vista conectada permite saber qué existe, qué es potencial y qué requiere evolución.',
    phases: phases.map(phase => phase.id),
    useCases: ['analizar-impacto', 'preparar-release', 'documentar-feature', 'triage-incidencia', 'cicd-calidad']
  }
];

export const agents = [
  { id: 'agent-architect', label: 'Arquitecto Salesforce', category: 'Agente', status: 'disponible', icon: 'blocks', summary: 'Diseño técnico, evaluación de alternativas y validación de patrones.', file: '.github/agents/arquitecto.md' },
  { id: 'agent-evolution', label: 'Desarrollador Evolutivo', category: 'Agente', status: 'disponible', icon: 'code-2', summary: 'Implementación de features y mejoras conforme a la arquitectura NewCo.', file: '.github/agents/desarrollador-evolutivo.md' },
  { id: 'agent-corrective', label: 'Desarrollador Correctivo', category: 'Agente', status: 'disponible', icon: 'wrench', summary: 'Diagnóstico de bugs, hotfixes e incidencias de producción.', file: '.github/agents/desarrollador-correctivo.md' },
  { id: 'agent-qa', label: 'Testing / QA', category: 'Agente', status: 'disponible', icon: 'flask-conical', summary: 'Estrategia, generación y validación de pruebas Apex, Jest y UAT.', file: '.github/agents/testing-qa.md' },
  { id: 'agent-integration', label: 'Integraciones', category: 'Agente', status: 'disponible', icon: 'plug-zap', summary: 'APIs REST, Named Credentials, callouts y sistemas externos.', file: '.github/agents/integraciones.md' },
  { id: 'agent-docs', label: 'Documentalista', category: 'Agente', status: 'disponible', icon: 'file-text', summary: 'Documentación de features, diagramas, runbooks y RCA.', file: '.github/agents/documentalista.md' },
  { id: 'agent-review', label: 'Code Reviewer', category: 'Agente', status: 'disponible', icon: 'scan-search', summary: 'Revisión de Pull Requests, calidad y reglas críticas.', file: '.github/agents/code-reviewer.md' },
  { id: 'agent-release', label: 'Release Manager', category: 'Agente', status: 'disponible', icon: 'git-pull-request', summary: 'Análisis de subidas, impacto documental y release notes.', file: '.github/agents/release-manager.md' },
  { id: 'agent-incident-poc', label: 'Incident Agent', category: 'Agente experimental', status: 'evolucion', icon: 'siren', summary: 'Propuesta de gestión asistida de incidencias; no es un workflow operativo consolidado.', file: '.github/agents/incident-agent-proposal_v4_agentic_ready_completo.md' },
  { id: 'agent-incident-trends', label: 'Análisis de tendencias de incidencias', category: 'Agente experimental', status: 'evolucion', icon: 'chart-no-axes-combined', summary: 'Propuesta de razonamiento sobre tendencias para incident management.', file: '.github/agents/razonamiento_tendencias_agenticas_incident_agent.md' }
];

const featureData = [
  ['switching-electricidad', 'Switching entrante electricidad', 'Switching / ATR', 'Recepción regulatoria de mensajes ATR eléctricos vía WSO2.', '.github/features/switching-entrante-electricidad.md'],
  ['switching-gas', 'Switching entrante gas', 'Switching / ATR', 'Recepción de procesos regulatorios de gas y gestión de sus pasos.', '.github/features/switching-entrante-gas.md'],
  ['switching-saliente', 'Switching saliente', 'Switching / ATR', 'Generación y envío de solicitudes ATR a distribuidoras.', '.github/features/switching-saliente.md'],
  ['switching-orquestacion', 'Orquestación switching', 'Switching / ATR', 'Estados, rechazos, reintentos y baja pasiva del ciclo completo.', '.github/features/switching-orquestacion.md'],
  ['contratacion', 'Contratación Darwin', 'Contratación / CPQ', 'Checkout, Vlocity CPQ, contratos y assets del portal Darwin.', '.github/features/contratacion-darwin.md'],
  ['repricing', 'Repricing', 'Contratación / CPQ', 'Actualización masiva de precios sobre contratos activos.', '.github/features/repricing.md'],
  ['clm', 'CLM y documentos', 'Contratación / CPQ', 'Generación contractual, AWS S3, multiidioma y firma digital.', '.github/features/clm-documentos.md'],
  ['atencion', 'Atención al cliente', 'Canales y atención', 'Casos, tipificaciones, interacciones y auditoría de IBAN.', '.github/features/atencion.md'],
  ['whatsapp', 'WhatsApp', 'Canales y atención', 'Salesforce Messaging para atención automatizada y por agente.', '.github/features/whatsapp.md'],
  ['cti', 'CTI y Omnichannel', 'Canales y atención', 'Enrutamiento, pantallazos y registro de llamadas.', '.github/features/cti-omnichannel-llamadas.md'],
  ['error-log', 'Error Log Recording', 'Frameworks e infraestructura', 'Registro centralizado de errores con batch y eventos.', '.github/features/error-log-recording.md'],
  ['gdpr', 'Consentimientos GDPR', 'Frameworks e infraestructura', 'Registro y trazabilidad de consentimientos legales.', '.github/features/gdpr-consentimientos.md'],
  ['sap-events', 'Eventos SAP', 'Frameworks e infraestructura', 'Sincronización de contratos, clientes y facturación con SAP.', '.github/features/eventos-sap.md'],
  ['omega', 'Integración Omega / FUA', 'Frameworks e infraestructura', 'Aplicación Omega embebida en Salesforce mediante Canvas.', '.github/features/omega.md'],
  ['vigencias', 'Vigencias de precios', 'Precios y comercial', 'Aplicación, vencimiento y actualización de precios.', '.github/features/vigencias-precios.md'],
  ['renovaciones', 'Renovaciones', 'Precios y comercial', 'Renovación automática y manual de contratos.', '.github/features/renovaciones.md'],
  ['consumos', 'Consumos', 'Precios y comercial', 'Lectura, validación y procesamiento de consumos.', '.github/features/consumos.md'],
  ['alianzas', 'Alianzas', 'Precios y comercial', 'Partners comerciales, cuentas alianza y comisiones.', '.github/features/alianzas.md'],
  ['ventas', 'Estructura de ventas', 'Precios y comercial', 'Jerarquía comercial, zonas, delegaciones y asignaciones.', '.github/features/estructura-ventas.md']
];

export const features = featureData.map(([id, label, group, summary, file]) => ({
  id: `feature-${id}`, label, group, category: 'Feature', status: 'disponible', icon: 'puzzle', summary, file
}));

export const architectureAssets = [
  { id: 'arch-salesforce', label: 'Arquitectura Salesforce', category: 'Arquitectura', status: 'disponible', icon: 'layers-3', summary: 'Capas, frameworks, record types y modelo de sharing.', file: '.github/architecture/salesforce.md' },
  { id: 'arch-patterns', label: 'Patrones de diseño', category: 'Arquitectura', status: 'disponible', icon: 'waypoints', summary: 'Strategy, Factory, DAO, BaseScript e integración de herramientas.', file: '.github/architecture/patterns.md' },
  { id: 'arch-conventions', label: 'Convenciones', category: 'Arquitectura', status: 'disponible', icon: 'ruler', summary: 'Nomenclatura, ApexDoc, formato y patrón de triggers.', file: '.github/architecture/conventions.md' },
  { id: 'arch-integration', label: 'Arquitectura de integración', category: 'Arquitectura', status: 'disponible', icon: 'unplug', summary: 'Named Credentials, endpoints y sistemas externos.', file: '.github/architecture/integration.md' },
  { id: 'arch-testing', label: 'Estrategia de testing', category: 'Arquitectura', status: 'disponible', icon: 'test-tube-diagonal', summary: 'Pruebas Apex y LWC, factorías, mocks y comandos.', file: '.github/architecture/testing.md' },
  { id: 'arch-inventory', label: 'Inventario técnico', category: 'Arquitectura', status: 'disponible', icon: 'database', summary: 'Catálogo de triggers, metadatos y componentes críticos.', file: '.github/architecture/inventory.md' },
  { id: 'arch-bulk', label: 'Framework Bulk API', category: 'Arquitectura', status: 'disponible', icon: 'rows-3', summary: 'Patrón para operaciones de datos de gran volumen.', file: '.github/architecture/bulk-api-framework.md' },
  { id: 'arch-ai', label: 'IA en el delivery', category: 'Arquitectura', status: 'disponible', icon: 'workflow', summary: 'Relación entre conocimiento, agentes, Playwright, controles y entrega.', file: '.github/architecture/ai-delivery-accelerator.md' }
];

export const tools = [
  { id: 'tool-playwright-mcp', label: 'Playwright MCP', category: 'Tool', status: 'disponible', icon: 'mouse-pointer-click', summary: 'Expone automatización de navegador a la IA mediante CDP en el puerto 9222.', file: '.vscode/mcp.json' },
  { id: 'tool-sf-browser', label: 'Salesforce Browser', category: 'Tool', status: 'disponible', icon: 'monitor-check', summary: 'Automatización Python sobre Salesforce PRE con perfil persistente.', file: 'tools/sf_browser/README.md' },
  { id: 'tool-e2e', label: 'POC E2E Playwright', category: 'Testing', status: 'aplicacion-potencial', icon: 'route', summary: 'Scripts de login, consulta y alta de casos; no están integrados en CI.', file: 'tools/e2e_poc/README.md' },
  { id: 'tool-pr', label: 'PR Analyzer', category: 'Tool', status: 'disponible', icon: 'git-compare-arrows', summary: 'Extrae tickets, archivos, impacto documental y contenido de release.', file: 'tools/pr_analyzer/README.md' },
  { id: 'tool-ticket', label: 'Ticket Analyzer', category: 'Tool', status: 'disponible', icon: 'ticket-check', summary: 'Analiza tickets con una base de conocimiento acumulativa.', file: 'tools/ticket_analyzer/README.md' },
  { id: 'tool-coherence', label: 'Asset Coherence Analyzer', category: 'Tool', status: 'disponible', icon: 'list-checks', summary: 'Comprueba coherencia entre Assets Vlocity y contratos.', file: 'tools/asset_coherence_analyzer/README.md' },
  { id: 'tool-errors', label: 'Error Log Archiver', category: 'Tool', status: 'disponible', icon: 'archive', summary: 'Archiva y elimina logs a gran escala mediante Bulk API v2.', file: 'tools/error_log_archiver/README.md' },
  { id: 'tool-profiles', label: 'Profile Tool', category: 'Tool', status: 'disponible', icon: 'shield-user', summary: 'Recupera, ordena y formatea perfiles Salesforce.', file: 'tools/profile_tool/README.md' },
  { id: 'tool-xml', label: 'Generador XML de reclamaciones', category: 'Tool', status: 'disponible', icon: 'file-code-2', summary: 'Genera XML regulatorios de electricidad y gas.', file: 'tools/recl_xml_gen/README.md' },
  { id: 'tool-webapp', label: 'Webapp operativa Salesforce', category: 'Tool', status: 'disponible', icon: 'layout-dashboard', summary: 'Módulos Flask para pedidos, scripts, mensajería, SOQL, renovación y plantillas.', file: 'tools/webapp/README.md' },
  { id: 'tool-cicd', label: 'Pipeline E2E y quality gates', category: 'Automatización', status: 'evolucion', icon: 'git-branch-plus', summary: 'No existe un workflow CI/CD versionado que ejecute Jest, Apex y Playwright.', file: 'package.json' }
];

export const knowledgeAssets = [
  { id: 'knowledge-rules', label: 'Reglas del proyecto', category: 'Gobierno', status: 'disponible', icon: 'book-lock', summary: 'Reglas críticas Salesforce, routing de agentes y convenciones de trabajo.', file: '.github/copilot-instructions.md' },
  { id: 'knowledge-prompts', label: 'Biblioteca de prompts', category: 'Conocimiento', status: 'disponible', icon: 'messages-square', summary: 'Casos reutilizables para arquitectura, desarrollo, testing, revisión y release.', file: '.github/COPILOT-PROMPTS-LIBRARY.md' },
  { id: 'knowledge-agent-matrix', label: 'Matriz de agentes', category: 'Gobierno', status: 'disponible', icon: 'users-round', summary: 'Responsabilidades y secuencias recomendadas para evolutivos y AMS.', file: '.github/agents/README.md' },
  { id: 'knowledge-feature-index', label: 'Índice de features', category: 'Conocimiento', status: 'disponible', icon: 'library-big', summary: 'Entrada a la documentación funcional y técnica del dominio.', file: '.github/features/INDEX.md' },
  { id: 'feature-template', label: 'Plantilla de feature', category: 'Conocimiento', status: 'disponible', icon: 'file-plus-2', summary: 'Estructura común para documentar nuevas funcionalidades de forma consistente.', file: '.github/features/feature-template.md' },
  { id: 'knowledge-prompts-folder', label: 'Prompts ejecutables', category: 'Conocimiento', status: 'disponible', icon: 'command', summary: 'Diez accesos guiados para activar agentes y tareas recurrentes.', file: '.github/prompts/' },
  { id: 'knowledge-code', label: 'Código y metadata Salesforce', category: 'Código', status: 'disponible', icon: 'cloud-cog', summary: 'Implementación NewCo sobre Salesforce, Vlocity y OmniStudio.', file: 'force-app/main/default/' },
  { id: 'knowledge-apex-tests', label: 'Tests Apex', category: 'Testing', status: 'disponible', icon: 'badge-check', summary: '304 clases localizadas mediante el patrón de nombre de test.', file: 'force-app/main/default/classes/' },
  { id: 'knowledge-jest', label: 'Tests Jest LWC', category: 'Testing', status: 'disponible', icon: 'braces', summary: 'Tres suites Jest existentes para componentes LWC.', file: 'force-app/main/default/lwc/' },
  { id: 'knowledge-hooks', label: 'Formato y lint pre-commit', category: 'Automatización', status: 'aplicacion-potencial', icon: 'git-commit-horizontal', summary: 'Husky y lint-staged están configurados en package.json, pero la carpeta de hooks no está versionada.', file: 'package.json' },
  { id: 'automation-flows', label: 'Flows Salesforce', category: 'Automatización', status: 'disponible', icon: 'workflow', summary: '84 automatizaciones declarativas para procesos de negocio y operación.', file: 'force-app/main/default/flows/' },
  { id: 'automation-bots', label: 'Einstein Bots', category: 'Automatización', status: 'disponible', icon: 'messages-square', summary: '18 bots para atención y operaciones de cliente.', file: 'force-app/main/default/bots/' },
  { id: 'automation-triggers', label: 'Triggers Apex', category: 'Automatización', status: 'disponible', icon: 'zap', summary: '35 triggers que conectan eventos de datos con handlers y gateways.', file: 'force-app/main/default/triggers/' }
];

export const useCases = [
  {
    id: 'entender-feature', title: 'Entender una feature existente', category: 'Analizar', status: 'disponible', icon: 'book-open-check',
    summary: 'Recuperar proceso, objetos, reglas, estados e integraciones antes de decidir o cambiar código.',
    need: 'Comprender el comportamiento actual sin depender de conocimiento oral.', inputs: ['Necesidad o proceso', 'Feature o dominio'],
    output: 'Resumen funcional y técnico con componentes relacionados.', human: 'Validación del Product Owner o analista funcional.',
    roles: ['po', 'ba', 'developer', 'ams'], phases: ['analisis', 'definicion', 'operacion'], agents: ['agent-docs', 'agent-architect'], tools: [], assets: ['knowledge-feature-index', 'arch-inventory']
  },
  {
    id: 'analizar-impacto', title: 'Analizar impacto y dependencias', category: 'Analizar', status: 'disponible', icon: 'radar',
    summary: 'Relacionar una petición con arquitectura, features, integraciones y componentes existentes.',
    need: 'Saber qué puede verse afectado antes de estimar.', inputs: ['Requisito', 'Restricciones', 'Alcance'],
    output: 'Mapa de impacto, riesgos y preguntas abiertas.', human: 'Decisión de arquitectura y alcance.',
    roles: ['po', 'architect', 'delivery'], phases: ['analisis', 'definicion', 'diseno'], agents: ['agent-architect'], tools: [], assets: ['arch-inventory', 'arch-salesforce', 'knowledge-feature-index']
  },
  {
    id: 'enriquecer-requisito', title: 'Enriquecer un requisito', category: 'Definir', status: 'aplicacion-potencial', icon: 'list-plus',
    summary: 'Convertir una petición inicial en preguntas, reglas y criterios verificables usando el conocimiento disponible.',
    need: 'Reducir ambigüedad antes del diseño.', inputs: ['Petición de negocio', 'Feature relacionada'],
    output: 'Requisito enriquecido y criterios de aceptación.', human: 'Aprobación de negocio.',
    roles: ['po', 'ba'], phases: ['analisis', 'definicion'], agents: ['agent-architect', 'agent-docs'], tools: [], assets: ['knowledge-prompts', 'knowledge-feature-index']
  },
  {
    id: 'disenar-solucion', title: 'Diseñar una solución técnica', category: 'Diseñar', status: 'disponible', icon: 'pen-tool',
    summary: 'Comparar alternativas y producir un diseño coherente con capas, patrones y límites Salesforce.',
    need: 'Pasar de requisito aprobado a solución implementable.', inputs: ['Requisito', 'Impacto', 'Restricciones'],
    output: 'Diseño, decisiones y plan de implementación.', human: 'Aprobación del arquitecto.',
    roles: ['architect', 'developer'], phases: ['diseno'], agents: ['agent-architect'], tools: [], assets: ['arch-salesforce', 'arch-patterns', 'arch-conventions']
  },
  {
    id: 'disenar-integracion', title: 'Diseñar o modificar una integración', category: 'Diseñar', status: 'disponible', icon: 'plug',
    summary: 'Definir contratos, autenticación, errores, reintentos y mocks siguiendo las integraciones existentes.',
    need: 'Conectar Salesforce con un sistema externo.', inputs: ['Contrato API', 'Sistema', 'Volumen'],
    output: 'Diseño de integración y estrategia de validación.', human: 'Aprobación técnica y de seguridad.',
    roles: ['architect', 'developer', 'qa'], phases: ['diseno', 'desarrollo', 'testing'], agents: ['agent-integration', 'agent-architect'], tools: [], assets: ['arch-integration', 'arch-patterns']
  },
  {
    id: 'implementar-cambio', title: 'Implementar un cambio', category: 'Desarrollar', status: 'disponible', icon: 'code-xml',
    summary: 'Crear o modificar Apex, LWC y metadata respetando prefijos, capas y reglas críticas.',
    need: 'Materializar un diseño aprobado.', inputs: ['Diseño', 'Plan', 'Código relacionado'],
    output: 'Cambio de código mínimo, documentado y listo para validar.', human: 'Revisión del developer responsable.',
    roles: ['developer'], phases: ['desarrollo'], agents: ['agent-evolution', 'agent-integration'], tools: [], assets: ['knowledge-rules', 'knowledge-code', 'arch-conventions']
  },
  {
    id: 'generar-tests', title: 'Generar pruebas unitarias', category: 'Probar', status: 'disponible', icon: 'test-tubes',
    summary: 'Preparar tests Apex o Jest con factorías, mocks y escenarios límite del proyecto.',
    need: 'Validar el comportamiento del cambio y su cobertura.', inputs: ['Código', 'Criterios', 'Escenarios'],
    output: 'Clases Apex o suites Jest listas para ejecutar.', human: 'Revisión de QA y developer.',
    roles: ['developer', 'qa'], phases: ['desarrollo', 'testing'], agents: ['agent-qa', 'agent-evolution'], tools: [], assets: ['arch-testing', 'knowledge-apex-tests', 'knowledge-jest']
  },
  {
    id: 'preparar-uat', title: 'Preparar validación UAT', category: 'Probar', status: 'disponible', icon: 'clipboard-check',
    summary: 'Derivar escenarios funcionales, datos y resultados esperados desde los criterios del cambio.',
    need: 'Asegurar que negocio valida lo importante.', inputs: ['Criterios de aceptación', 'Feature'],
    output: 'Matriz UAT con escenarios y evidencia esperada.', human: 'Ejecución y aceptación de negocio.',
    roles: ['ba', 'qa', 'po'], phases: ['definicion', 'testing'], agents: ['agent-qa'], tools: [], assets: ['arch-testing', 'knowledge-feature-index']
  },
  {
    id: 'validar-ui', title: 'Validar un recorrido con Playwright', category: 'Probar', status: 'disponible', icon: 'mouse-pointer-2',
    summary: 'Abrir Salesforce, navegar un flujo y observar estados o errores con un navegador real.',
    need: 'Comprobar el comportamiento visible más allá del código.', inputs: ['Entorno accesible', 'Recorrido', 'Datos de prueba'],
    output: 'Evidencia del recorrido, estado final y errores observados.', human: 'Interpretación y aceptación de QA.',
    roles: ['developer', 'qa'], phases: ['testing', 'operacion'], agents: ['agent-qa', 'agent-corrective'], tools: ['tool-playwright-mcp', 'tool-sf-browser'], assets: ['arch-ai']
  },
  {
    id: 'regresion-e2e', title: 'Ejecutar regresión E2E automatizada', category: 'Probar', status: 'evolucion', icon: 'repeat-2',
    summary: 'Convertir los scripts actuales en una suite repetible integrada con el ciclo de entrega.',
    need: 'Detectar regresiones UI de forma sistemática.', inputs: ['Suite de escenarios', 'Entorno', 'Pipeline'],
    output: 'Informe E2E automatizado por hito.', human: 'Gestión de datos, flakiness y aceptación de QA.',
    roles: ['qa', 'developer', 'delivery'], phases: ['testing', 'release'], agents: ['agent-qa'], tools: ['tool-e2e', 'tool-cicd'], assets: ['arch-testing']
  },
  {
    id: 'revisar-codigo', title: 'Revisar código y Pull Request', category: 'Revisar', status: 'disponible', icon: 'scan-line',
    summary: 'Detectar riesgos, anti-patterns, regresiones y tests ausentes antes del merge.',
    need: 'Aplicar una puerta de calidad coherente.', inputs: ['Diff o Pull Request', 'Reglas del proyecto'],
    output: 'Hallazgos priorizados con rutas y acciones.', human: 'Decisión del reviewer.',
    roles: ['developer', 'architect', 'release'], phases: ['desarrollo', 'testing', 'release'], agents: ['agent-review'], tools: ['tool-pr'], assets: ['knowledge-rules', 'arch-conventions']
  },
  {
    id: 'preparar-release', title: 'Preparar un release', category: 'Release', status: 'disponible', icon: 'package-check',
    summary: 'Relacionar Pull Requests, tickets, archivos y documentación para explicar qué sube y qué validar.',
    need: 'Cerrar el hito con trazabilidad.', inputs: ['Pull Request de producción', 'Sub-PRs'],
    output: 'Inventario del hito, impacto documental y release notes.', human: 'Aprobación y coordinación del Release Manager.',
    roles: ['release', 'delivery', 'po'], phases: ['release'], agents: ['agent-release', 'agent-docs'], tools: ['tool-pr'], assets: ['knowledge-feature-index']
  },
  {
    id: 'triage-incidencia', title: 'Clasificar y contextualizar una incidencia', category: 'Operar', status: 'disponible', icon: 'siren',
    summary: 'Priorizar, agrupar y conectar un ticket con el proceso, logs y componentes relacionados.',
    need: 'Reducir el tiempo hasta un diagnóstico accionable.', inputs: ['Ticket', 'Evidencia', 'Criticidad'],
    output: 'Clasificación, contexto y plan de diagnóstico.', human: 'Prioridad y escalado decididos por AMS.',
    roles: ['ams', 'delivery'], phases: ['operacion'], agents: ['agent-corrective'], tools: ['tool-ticket'], assets: ['knowledge-feature-index', 'feature-error-log']
  },
  {
    id: 'analizar-fallo', title: 'Analizar un fallo', category: 'Operar', status: 'disponible', icon: 'bug',
    summary: 'Contrastar síntomas, logs, código y reglas del proceso para localizar una causa probable.',
    need: 'Explicar por qué falla un flujo.', inputs: ['Error', 'Logs', 'Registro afectado'],
    output: 'Hipótesis verificable, componentes afectados y comprobación recomendada.', human: 'Confirmación técnica de causa raíz.',
    roles: ['ams', 'qa', 'developer'], phases: ['operacion', 'testing'], agents: ['agent-corrective', 'agent-qa'], tools: ['tool-ticket', 'tool-playwright-mcp'], assets: ['feature-error-log', 'knowledge-code']
  },
  {
    id: 'corregir-incidencia', title: 'Corregir una incidencia', category: 'Operar', status: 'disponible', icon: 'bandage',
    summary: 'Aplicar un fix acotado, validar regresión y preparar el análisis posterior.',
    need: 'Restaurar el servicio sin ampliar innecesariamente el cambio.', inputs: ['Causa confirmada', 'Código', 'Plan de vuelta atrás'],
    output: 'Fix, tests, evidencia y plan de despliegue.', human: 'Aprobación técnica, QA y operación.',
    roles: ['ams', 'developer', 'qa'], phases: ['operacion', 'testing', 'release'], agents: ['agent-corrective', 'agent-qa', 'agent-review'], tools: ['tool-playwright-mcp'], assets: ['knowledge-rules', 'arch-testing']
  },
  {
    id: 'analizar-coherencia', title: 'Analizar coherencia de datos', category: 'Operar', status: 'disponible', icon: 'database-zap',
    summary: 'Comparar estados de Assets y Contracts para localizar inconsistencias operativas.',
    need: 'Diagnosticar anomalías de suministro o contrato.', inputs: ['Identificadores', 'Entorno Salesforce'],
    output: 'Informe de incoherencias y registros afectados.', human: 'Decisión sobre regularización de datos.',
    roles: ['ams'], phases: ['operacion'], agents: ['agent-corrective'], tools: ['tool-coherence'], assets: ['knowledge-code']
  },
  {
    id: 'documentar-feature', title: 'Actualizar conocimiento de una feature', category: 'Documentar', status: 'disponible', icon: 'file-pen-line',
    summary: 'Mantener flujo, componentes, decisiones y troubleshooting alineados con el comportamiento real.',
    need: 'Evitar que el conocimiento quede fuera del repositorio.', inputs: ['Cambio', 'Evidencia', 'Feature afectada'],
    output: 'Documento actualizado y relaciones trazables.', human: 'Validación funcional y técnica.',
    roles: ['ba', 'release', 'delivery'], phases: ['release', 'mejora'], agents: ['agent-docs', 'agent-release'], tools: ['tool-pr'], assets: ['knowledge-feature-index']
  },
  {
    id: 'documentar-rca', title: 'Documentar causa raíz y prevención', category: 'Operar', status: 'disponible', icon: 'file-warning',
    summary: 'Transformar una incidencia resuelta en aprendizaje operativo reutilizable.',
    need: 'Evitar recurrencia y pérdida de conocimiento.', inputs: ['Cronología', 'Causa', 'Fix', 'Evidencia'],
    output: 'RCA, acciones preventivas y gaps detectados.', human: 'Aprobación de AMS y arquitectura.',
    roles: ['ams', 'delivery'], phases: ['operacion', 'mejora'], agents: ['agent-docs', 'agent-corrective'], tools: ['tool-ticket'], assets: ['knowledge-feature-index']
  },
  {
    id: 'cicd-calidad', title: 'Automatizar controles en CI/CD', category: 'Automatizar', status: 'evolucion', icon: 'workflow',
    summary: 'Crear un pipeline versionado que ejecute lint, Jest, validaciones Salesforce y E2E.',
    need: 'Convertir controles disponibles en una puerta repetible.', inputs: ['Estrategia de ramas', 'Entornos', 'Credenciales seguras'],
    output: 'Workflow CI/CD con resultados y bloqueos.', human: 'Gobierno de releases y seguridad.',
    roles: ['delivery', 'release', 'qa', 'developer'], phases: ['preparacion', 'testing', 'release', 'mejora'], agents: ['agent-architect', 'agent-qa', 'agent-release'], tools: ['tool-cicd'], assets: ['arch-testing', 'knowledge-hooks']
  }
];

export const projectMap = {
  center: {
    id: 'map-center',
    label: 'IA Deloitte',
    subtitle: 'GitHub Copilot · Naturgy NewCo',
    summary: 'Punto de conexión entre conocimiento, agentes, arquitectura y herramientas de verificación.'
  },
  branches: [
    {
      id: 'verification',
      label: 'Verificación y automatización',
      color: 'cyan',
      summary: 'Herramientas que ejecutan comprobaciones, automatizan el navegador y aportan evidencia al delivery.',
      items: [
        { assetId: 'tool-playwright-mcp', label: 'Playwright · MCP' },
        { assetId: 'tool-sf-browser', label: 'Navegador SF PRE' },
        { assetId: 'tool-e2e', label: 'Pruebas E2E' },
        { assetId: 'knowledge-apex-tests', label: 'Apex + Jest' },
        { assetId: 'tool-pr', label: 'PR Analyzer' },
        { assetId: 'tool-ticket', label: 'Ticket Analyzer' },
        { assetId: 'tool-webapp', label: 'Panel Bulk API' },
        { assetId: 'knowledge-hooks', label: 'Lint + pre-commit' }
      ]
    },
    {
      id: 'features',
      label: 'Funcionalidades documentadas',
      color: 'orange',
      summary: 'Conocimiento funcional y técnico de los procesos que ya existen en Naturgy NewCo.',
      groups: [
        {
          id: 'feature-switching',
          label: 'Switching · ATR',
          items: [
            { assetId: 'feature-switching-electricidad', label: 'Entrante electricidad' },
            { assetId: 'feature-switching-gas', label: 'Entrante gas' },
            { assetId: 'feature-switching-saliente', label: 'Saliente' },
            { assetId: 'feature-switching-orquestacion', label: 'Orquestación' }
          ]
        },
        {
          id: 'feature-contracting',
          label: 'Contratación y precios',
          items: [
            { assetId: 'feature-contratacion', label: 'Contratación Darwin' },
            { assetId: 'feature-clm', label: 'CLM · Documentos' },
            { assetId: 'feature-renovaciones', label: 'Renovaciones' },
            { assetId: 'feature-repricing', label: 'Repricing' },
            { assetId: 'feature-vigencias', label: 'Vigencias de precios' },
            { assetId: 'feature-consumos', label: 'Consumos' }
          ]
        },
        {
          id: 'feature-service',
          label: 'Atención y canales',
          items: [
            { assetId: 'feature-atencion', label: 'Atención al cliente' },
            { assetId: 'feature-whatsapp', label: 'WhatsApp' },
            { assetId: 'feature-cti', label: 'CTI · Omnichannel' }
          ]
        },
        {
          id: 'feature-commercial',
          label: 'Comercial',
          items: [
            { assetId: 'feature-alianzas', label: 'Alianzas' },
            { assetId: 'feature-ventas', label: 'Estructura de ventas' }
          ]
        },
        {
          id: 'feature-frameworks',
          label: 'Frameworks técnicos',
          items: [
            { assetId: 'feature-error-log', label: 'Error Log Recording' },
            { assetId: 'feature-sap-events', label: 'Eventos SAP' },
            { assetId: 'feature-gdpr', label: 'GDPR · Consentimientos' },
            { assetId: 'feature-omega', label: 'Integración Omega' }
          ]
        },
        {
          id: 'feature-templates',
          label: 'Plantillas',
          items: [
            { assetId: 'knowledge-feature-index', label: 'Índice de features' },
            { assetId: 'feature-template', label: 'Plantilla de feature', file: '.github/features/feature-template.md' }
          ]
        }
      ]
    },
    {
      id: 'agents',
      label: 'Agentes especializados',
      color: 'green',
      summary: 'Perfiles especializados que aplican una metodología consistente según la tarea del equipo.',
      items: [
        { assetId: 'agent-architect', label: 'Arquitecto' },
        { assetId: 'agent-evolution', label: 'Desarrollador evolutivo' },
        { assetId: 'agent-corrective', label: 'Desarrollador correctivo' },
        { assetId: 'agent-qa', label: 'Testing & QA' },
        { assetId: 'agent-integration', label: 'Integraciones' },
        { assetId: 'agent-docs', label: 'Documentalista' },
        { assetId: 'agent-review', label: 'Code Reviewer' },
        { assetId: 'agent-release', label: 'Release Manager' },
        { assetId: 'agent-incident-poc', label: 'Incident Agent · propuesta' }
      ]
    },
    {
      id: 'context',
      label: 'Contexto base y gobierno',
      color: 'blue',
      summary: 'Reglas, prompts y referencias que aportan contexto gobernado antes de ejecutar una tarea.',
      items: [
        { assetId: 'knowledge-rules', label: 'copilot-instructions.md' },
        { assetId: 'knowledge-prompts', label: 'Biblioteca de prompts' },
        { assetId: 'knowledge-prompts-folder', label: 'prompts/ · 10 accesos' },
        { assetId: 'knowledge-feature-index', label: 'features/ · índice' }
      ]
    },
    {
      id: 'architecture',
      label: 'Arquitectura y patrones',
      color: 'purple',
      summary: 'Decisiones, patrones, convenciones e inventario que gobiernan cómo se construye la solución.',
      items: [
        { assetId: 'arch-salesforce', label: 'salesforce.md' },
        { assetId: 'arch-patterns', label: 'patterns.md' },
        { assetId: 'arch-conventions', label: 'conventions.md' },
        { assetId: 'arch-integration', label: 'integration.md' },
        { assetId: 'arch-testing', label: 'testing.md' },
        { assetId: 'arch-inventory', label: 'inventory.md' },
        { assetId: 'arch-bulk', label: 'bulk-api-framework.md' },
        { assetId: 'arch-ai', label: 'ai-delivery-accelerator.md' }
      ]
    }
  ]
};

export const mapDomains = projectMap.branches;
export const mapRelationships = projectMap.branches.map(branch => ['map-center', branch.id, 'alimenta']);

export const allAssets = [
  ...agents,
  ...features,
  ...architectureAssets,
  ...tools,
  ...knowledgeAssets,
  ...useCases.map(item => ({ ...item, label: item.title, category: `Caso de uso · ${item.category}`, file: item.assets?.[0] ? undefined : '' }))
];

export const getAsset = id => allAssets.find(item => item.id === id);
export const getRole = id => roles.find(item => item.id === id);
export const getPhase = id => phases.find(item => item.id === id);