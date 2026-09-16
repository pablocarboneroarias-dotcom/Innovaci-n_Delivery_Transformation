/* =========================================================
   Skill catalogue data, keyed by delivery phase.

   Each skill record:
     id          slash-command name, also the SKILL.md folder
     title       short human label
     desc        one-sentence plain-English summary
     when        bullet list, "use this when ..."
     does        ordered list, what the skill actually does step-by-step
     outputs     bullet list of concrete artefacts you get back
     sample      placeholder-style prompt (with [bracket] tokens)
     realExample concrete prompt people actually paste
     pairsWith   array of slash IDs (or {id, note}) that combine well

   The right-rail "Open in VS Code" button URL is built as:
     /<id>\n\n<sample>
   ========================================================= */
window.SKILL_PHASES = [
  {
    id: "discovery",
    name: "Discovery & Requirements",
    blurb: "Gather business needs, run discovery sessions, and turn raw input into structured requirements before any story is written.",
    skills: [
      {
        id: "discovery",
        title: "discovery",
        desc: "Facilitates the discovery phase of a user story lifecycle. Use when identifying business needs, defining product vision, conducting stakeholder interviews, or performing process analysis before stories are written.",
        when: [
          "A new business need or opportunity is raised and no stories exist yet",
          "The team needs to understand current-state processes before writing stories",
          "A stakeholder asks to explore a new capability area",
          "\"We need to understand how the waitlist process works today\"",
          "\"KAB wants to explore a new integration with X - what do we need to know?\"",
          "\"Map the current process for tenant onboarding\"",
          "\"What are the pain points in the current invoicing workflow?\"",
          "\"Help me define the business case for this initiative\"",
          "\"Run a discovery on Behov 4.3\"",
          "`/discovery`"
        ],
        does: [
          "Asks you for the scope and the audience.",
          "Frames a structured interview guide (open questions first, validation questions second).",
          "Captures business needs, pain points, and the product vision into a single document.",
          "Flags the unknowns and the assumptions you'll need to validate."
        ],
        outputs: [
          "Full output format with all sections and sub-sections: [Output Format](./assets/output-format.md)"
        ],
        sample: "Run a discovery session for [feature or topic]. Frame stakeholder questions and capture the current pain points.",
        realExample: "Run a discovery session for the complaints intake flow. Interview the customer-service lead, capture today's pain points, and surface 5 open questions for the next workshop.",
        flow: [
          {
            name: "Run the discovery",
            steps: [
              {
                kind: "start",
                title: "You invoke it",
                short: "You run /discovery",
                body: "Type /discovery, name a business need (\"Run a discovery on Behov 4.3\"), or ask to explore a capability area before any stories exist."
              },
              {
                kind: "gate",
                title: "Scope and audience first",
                short: "What is the scope, and who is the audience?",
                body: "Nothing is framed until you answer. The scope decides what gets explored; the audience decides who the interview guide is written for."
              },
              {
                kind: "step",
                title: "Frames the interview guide",
                short: "Frame the structured interview guide",
                body: "Open questions first to surface the unknowns, validation questions second to confirm what you think you already know."
              },
              {
                kind: "step",
                title: "Captures the findings",
                short: "Capture needs, pain points, and vision in one document",
                body: "Business needs, pain points, and the product vision land in a single structured document, not scattered notes."
              },
              {
                kind: "step",
                title: "Flags what is still unknown",
                short: "Flag unknowns and assumptions to validate",
                body: "Every assumption is named so the next workshop can attack it instead of rediscovering it."
              },
              {
                kind: "end",
                title: "Hands off",
                short: "Hand off to process-map, meeting-transcript, or backlog-creation",
                body: "Map the as-is process, feed the workshop recording in afterwards, or turn the findings into draft stories. Each is a separate skill you invoke when ready."
              }
            ]
          }
        ],
        pairsWith: [
          {
            id: "meeting-transcript",
            note: "feed the recording in afterwards to extract action items"
          },
          {
            id: "process-map",
            note: "map the as-is process the discovery surfaced"
          },
          {
            id: "backlog-creation",
            note: "turn the discovery notes into draft stories"
          }
        ]
      },
      {
        id: "meeting-transcript",
        title: "meeting-transcript",
        desc: "Processes Teams meeting transcripts and translates them into actionable delivery artifacts — next steps, action items, user stories, epics, features, ADO work items, follow-up emails, and decision logs. Use when a user pastes a transcript, provides a transcript file, or asks to process a Teams meeting.",
        when: [
          "User pastes a meeting transcript into the chat",
          "User provides a `.vtt`, `.docx`, or `.txt` transcript file",
          "User asks to process a Teams meeting or extract action items from it",
          "User wants to turn meeting outcomes into ADO work items or follow-up emails",
          "\"Process this meeting transcript\"",
          "\"Extract actions from the refinement session\"",
          "\"What came out of the meeting?\"",
          "\"Turn this transcript into user stories\"",
          "\"Create work items from the meeting notes\"",
          "\"Draft follow-up emails from the sprint review transcript\"",
          "\"Summarize the meeting decisions and action items\"",
          "`/meeting-transcript`"
        ],
        does: [
          "Reads the transcript and identifies speakers, topics, and turns.",
          "Extracts decisions, action items, owners, and due dates.",
          "Drafts new user stories or epics for anything that sounded like a requirement.",
          "Writes a follow-up email summary you can paste into Outlook."
        ],
        outputs: [
          "Action items table (owner, action, due date).",
          "Decision log with reasoning.",
          "Draft user stories ready to refine.",
          "Follow-up email draft."
        ],
        sample: "Here is a Teams meeting transcript: [paste transcript]. Extract action items, decisions, and any new user stories or follow-ups.",
        realExample: "Here is the transcript from yesterday's complaints workshop with KAB and Deloitte. Pull out the decisions, the open action items with owners, and draft 3 new user stories for the intake form.",
        flow: [
          {
            name: "Transcript to artifacts",
            steps: [
              {
                kind: "start",
                title: "You give it a transcript",
                short: "Paste a transcript or point at a .vtt / .docx / .txt file",
                body: "Paste the Teams transcript into chat, provide the file, or just ask \"what came out of the meeting?\""
              },
              {
                kind: "step",
                title: "Parses the conversation",
                short: "Identify speakers, topics, and turns",
                body: "The raw transcript is segmented so every extracted item can be traced back to who said it."
              },
              {
                kind: "step",
                title: "Extracts the substance",
                short: "Extract decisions, action items, owners, due dates",
                body: "Decisions land in a log with the reasoning behind them; actions get an owner and a due date wherever the conversation named one."
              },
              {
                kind: "decision",
                title: "Did anything sound like a requirement?",
                short: "New requirements in the conversation?",
                body: "Anything that sounded like new scope is drafted, not silently dropped.",
                branches: [
                  {
                    body: "Drafted ready to refine — nothing is created in ADO from here.",
                    tone: "ok",
                    label: "Draft user stories or epics"
                  },
                  {
                    body: "The output sticks to decisions and action items.",
                    label: "No new requirements"
                  }
                ]
              },
              {
                kind: "step",
                title: "Writes the follow-up email",
                short: "Draft the follow-up email summary",
                body: "A paste-ready summary for Outlook covering decisions, actions, and open points."
              },
              {
                kind: "end",
                title: "Hands off",
                short: "Hand off to backlog-creation, communicate, or ado-comment",
                body: "Turn the draft stories into a proper backlog, polish the email for its audience, or post the decision log on the related ADO item."
              }
            ]
          }
        ],
        pairsWith: [
          {
            id: "communicate",
            note: "polish the follow-up email for the audience"
          },
          {
            id: "backlog-creation",
            note: "turn extracted stories into a proper backlog"
          },
          {
            id: "ado-comment",
            note: "post the decision log on the related ADO item"
          }
        ]
      },
      {
        id: "process-map",
        title: "process-map",
        desc: "Maps as-is or to-be business processes from KAB contract documents (bilags), working docs, and domain knowledge. Produces step-by-step process tables, pain point inventories, and scale context. Use when analysing current-state workflows, identifying bottlenecks, comparing as-is vs to-be, or preparing discovery input for backlog creation.",
        when: [
          "Analysing current-state workflows or identifying bottlenecks",
          "Comparing as-is vs to-be for a domain area",
          "Pre-discovery or pre-refinement research on a business process",
          "Preparing a process improvement business case",
          "\"Map the current process for tenant onboarding\"",
          "\"What are the pain points in the invoicing workflow?\"",
          "\"How does the waitlist process work today at KAB?\"",
          "\"Compare as-is and to-be for lease management\"",
          "\"Document the steps in the deactivation process\"",
          "\"What actors and systems are involved in the move-in flow?\"",
          "\"Identify bottlenecks in the current maintenance request process\"",
          "`/process-map`"
        ],
        does: [
          "Reads the relevant bilags (contract annexes) and working docs.",
          "Builds a numbered process table: step, actor, system, input, output.",
          "Inventories pain points and bottlenecks at each step.",
          "Optionally renders a flowchart if you ask for one."
        ],
        outputs: [
          "Step-by-step process table.",
          "Pain point inventory with severity.",
          "As-is vs to-be comparison when both are requested."
        ],
        sample: "Map the as-is process for [process name] using the KAB bilags as source. Highlight pain points and bottlenecks.",
        realExample: "Map the as-is process for new-tenancy allocation. Use Bilag 03A as source. Show actor, system, and the top 3 pain points per step.",
        flow: [
          {
            name: "Map the process",
            steps: [
              {
                kind: "start",
                title: "You invoke it",
                short: "You run /process-map on a workflow",
                body: "Name the process (\"Map the current process for tenant onboarding\") or ask where the pain points are in a workflow."
              },
              {
                kind: "step",
                title: "Reads the sources",
                short: "Read the bilags and working docs",
                body: "Contract annexes, working documents, and domain knowledge — the map is grounded in what is written, not guessed."
              },
              {
                kind: "step",
                title: "Builds the process table",
                short: "Build the numbered table: step, actor, system, input, output",
                body: "Every step is numbered so pain points and requirements can point at a specific row."
              },
              {
                kind: "step",
                title: "Inventories the pain points",
                short: "Inventory pain points and bottlenecks, with severity",
                body: "Each step gets checked for friction; findings carry a severity so the worst problems surface first."
              },
              {
                kind: "choice",
                title: "As-is only, or the comparison too?",
                short: "Render a flowchart or to-be comparison?",
                body: "Both are optional extras on top of the table.",
                branches: [
                  {
                    body: "A rendered diagram of the mapped process.",
                    label: "Draw the flowchart"
                  },
                  {
                    body: "Produced when you ask for both states.",
                    label: "Add the as-is vs to-be comparison"
                  },
                  {
                    body: "The numbered table and pain-point inventory stand on their own.",
                    label: "Table only"
                  }
                ]
              },
              {
                kind: "end",
                title: "Hands off",
                short: "Feed discovery or contractual-search",
                body: "Use the map as input to a discovery session, or validate the steps against formal KRAV with contractual-search."
              }
            ]
          }
        ],
        pairsWith: [
          {
            id: "discovery",
            note: "use the map as input to a discovery session"
          },
          {
            id: "contractual-search",
            note: "validate steps against formal KRAV"
          },
          {
            id: "diagrams-designer",
            note: "visualise the mapped process as a BPMN diagram"
          }
        ]
      },
      {
        id: "requirements-ingestion",
        title: "requirements-ingestion",
        desc: "Batch pipeline that scope-checks multiple Behov/Krav references and proposes a complete Epic-Feature-US-Task tree for consultant review. Two modes: new requirements (UC1) and change requests (UC2). Use when bulk-ingesting Behov/Krav from a workshop output or processing a change-request bundle.",
        when: [
          "Squad 3 (or any squad) defines a range of Behov/Krav for a new release",
          "A batch of change requests arrives affecting the existing Hovedleverance 1 solution",
          "You need to produce a full Epic → Feature → US → Task proposal from requirements text",
          "You want to validate multiple requirements against ADO before manual ADO entry",
          "\"Process Behov 4.1 through 4.8 into work items\"",
          "\"Ingest these 10 requirements from Bilag A\"",
          "\"Batch-create a work item hierarchy from this requirements list\"",
          "\"We have new krav for Sprint 15 - create the ADO structure\"",
          "\"A change request came in for the invoicing module - update the hierarchy\"",
          "\"Turn these 5 requirements into epics, features, and stories\"",
          "\"Validate these requirements against what already exists in ADO\"",
          "`/requirements-ingestion`"
        ],
        does: [
          "Reads each Behov/Krav reference and any linked context.",
          "Runs each through scope-gate to classify in scope, grey area, or out of scope.",
          "Proposes a full Epic to Task tree for the in-scope items.",
          "Drafts descriptions and acceptance criteria, ready for consultant review."
        ],
        outputs: [
          "Triage table: requirement, classification, evidence.",
          "Proposed work-item tree with parent links.",
          "Draft descriptions and Gherkin acceptance criteria.",
          "List of out-of-scope items with reasoning."
        ],
        sample: "Batch ingest these requirements: [list Behov/Krav refs]. Propose an Epic-Feature-US tree with descriptions and acceptance criteria.",
        realExample: "Batch ingest Behov 1.4.2, 1.4.3, 1.4.5 and Krav K-204 from the complaints workshop. Triage scope, propose the Epic-Feature-US tree, and draft Gherkin ACs.",
        flow: [
          {
            name: "Triage the bundle",
            steps: [
              {
                kind: "start",
                title: "You point it at a bundle",
                short: "You hand it a batch of Behov / Krav references",
                body: "Two modes: new requirements from a workshop output (UC1) or a change-request bundle (UC2)."
              },
              {
                kind: "step",
                title: "Reads every reference",
                short: "Read each reference and its linked context",
                body: "Each Behov/Krav is read together with whatever context it links to, so classification is not done on the title alone."
              },
              {
                kind: "decision",
                title: "scope-gate, per item",
                short: "Scope gate, per item",
                body: "Every item runs through scope-gate individually — the bundle is never classified as a whole.",
                branches: [
                  {
                    body: "Carries forward into the proposed tree.",
                    tone: "ok",
                    label: "In scope"
                  },
                  {
                    body: "Carries forward, flagged with the evidence so the consultant decides.",
                    tone: "warn",
                    label: "Grey area"
                  },
                  {
                    body: "Never enters the tree. Appears in a separate list with the contractual evidence.",
                    tone: "stop",
                    terminal: true,
                    label: "Out of scope, listed with reasoning"
                  }
                ]
              }
            ]
          },
          {
            name: "Propose the tree",
            steps: [
              {
                kind: "step",
                title: "Builds the full hierarchy",
                short: "Propose the Epic to Feature to Story to Task tree",
                body: "A complete tree with parent links for everything in scope — hierarchy levels are never skipped."
              },
              {
                kind: "step",
                title: "Drafts the content",
                short: "Draft descriptions and Gherkin acceptance criteria",
                body: "Every proposed item arrives with a description and ACs, ready for review rather than as bare titles."
              },
              {
                kind: "end",
                title: "Stops at the proposal",
                short: "STOP. Consultant review before anything is created",
                body: "Nothing is written to ADO. Review the triage table and the tree, then create the approved items with backlog-creation."
              }
            ]
          }
        ],
        pairsWith: [
          {
            id: "scope-gate",
            note: "embedded as the per-item classifier"
          },
          {
            id: "backlog-creation",
            note: "use this for bulk, backlog-creation for single asks"
          }
        ]
      },
      {
        id: "contractual-search",
        title: "contractual-search",
        desc: "Searches the Legally Binding Agreement PDFs/Excel (Bilag 03, 03A, 03B + context bilags) for contractual obligations relevant to a feature area. Distinguishes formal KRAV from process context. Use when you need to find what KAB formally requires, how processes work, or what Deloitte committed to deliver.",
        when: [
          "Starting design work on a new feature and need to know the contractual baseline",
          "Writing acceptance criteria that must comply with contractual obligations",
          "Checking what legal/regulatory references apply to a process area",
          "Verifying vendor commitments before sprint planning",
          "Preparing for refinement sessions where scope justification is needed",
          "\"What are we contractually obligated to deliver for inspections?\"",
          "\"Find contractual requirements for the waitlist process\"",
          "\"What did we commit to for genhusning?\"",
          "\"Search the bilags for obligations around document handling\"",
          "\"What does the contract say about integration L_INT 0140?\"",
          "`/contractual-search`"
        ],
        does: [
          "Searches the contract corpus (PDFs and Excel) for relevant clauses.",
          "Separates formal KRAV (from 03A) from process context (03 + 02.06) from Deloitte commitments (03B).",
          "Returns citations with bilag, section, and page reference."
        ],
        outputs: [
          "Full markdown structure template and HTML overview description: [Output Format Reference](./references/output-format.md)"
        ],
        sample: "Search the contract for obligations relating to [feature area]. Separate formal KRAV from process context.",
        realExample: "Search the contract for obligations on tenant complaints handling. Separate KRAV in 03A from process context in 03 and Deloitte commitments in 03B.",
        flow: [
          {
            name: "Search the contract",
            steps: [
              {
                kind: "start",
                title: "You ask what the contract requires",
                short: "You ask what the contract says about a feature area",
                body: "\"What does the contract require for complaints handling?\" or any question about formal obligations."
              },
              {
                kind: "step",
                title: "Searches the corpus",
                short: "Search the contract PDFs and Excel",
                body: "Bilag 03, 03A, 03B and the context bilags are searched as a corpus, not one file at a time."
              },
              {
                kind: "step",
                title: "Separates KRAV from context",
                short: "Separate formal KRAV from process context and commitments",
                body: "Formal KRAV (03A) is kept distinct from process context (03 and 02.06) and from what Deloitte committed to deliver (03B) — so nobody treats background prose as an obligation."
              },
              {
                kind: "step",
                title: "Cites everything",
                short: "Return citations: bilag, section, page",
                body: "Every claim carries a citation you can check, in the standard output format."
              },
              {
                kind: "end",
                title: "Hands off",
                short: "Feed scope-gate or milestone-review",
                body: "The citations become scope evidence in scope-gate, or the obligations list for a milestone review."
              }
            ]
          }
        ],
        pairsWith: [
          {
            id: "scope-gate",
            note: "use the citations as scope evidence"
          },
          {
            id: "milestone-review",
            note: "validate delivered value against the contract"
          }
        ]
      }
    ]
  },
  {
    id: "backlog-refinement",
    name: "Backlog & Refinement",
    blurb: "Write, refine, and prioritise user stories and tasks so the team can commit with confidence.",
    skills: [
      {
        id: "backlog-creation",
        title: "backlog-creation",
        desc: "Supports writing, structuring, and prioritizing user stories into a product backlog. Use when discovery is complete and the team needs to draft stories, define epics and themes, and prioritize work using frameworks like MoSCoW or WSJF.",
        when: [
          "Discovery is complete and team needs to draft stories",
          "Requirements need to be turned into user stories with epics/themes",
          "Backlog needs prioritization (MoSCoW, WSJF, value-vs-effort)",
          "Existing work items need validation against golden templates (routes to [`validate-workitem`](../validate-workitem/SKILL.md) skill)"
        ],
        does: [
          "Confirms the work-item type and picks a starting point (scratch, an existing ADO item, or a pasted brief).",
          "Asks 3-5 clarifying questions (scope, primary personas, framework, constraints).",
          "Drafts Epic to Task hierarchy, never skipping a level.",
          "Runs every story through scope-gate and tags in scope, grey area, or out of scope.",
          "Offers to create everything in ADO, create selected items, save as Markdown, or skip."
        ],
        outputs: [
          "Full story table with parent links and dependencies.",
          "Gherkin acceptance criteria per story.",
          "Prioritisation column (MoSCoW or WSJF).",
          "Out-of-scope items in a separate list, never silently created."
        ],
        sample: "Draft an initial backlog for [feature area]. Propose Epics, Features, 4-6 User Stories with Gherkin ACs and MoSCoW priority.",
        realExample: "Draft an initial backlog for the complaints intake redesign. Propose 1 Epic, 2 Features, 4 User Stories with Gherkin ACs and MoSCoW priority. Scope it through scope-gate first.",
        flow: [
          {
            name: "Draft the backlog",
            steps: [
              {
                kind: "start",
                title: "You invoke it",
                short: "Trigger: /backlog-creation or 'draft a backlog for X'",
                body: "Use it once discovery is done and findings need to become work items."
              },
              {
                kind: "gate",
                title: "Step 0 mandatory gate",
                short: "Step 0 mandatory gate: which ADO work item type?",
                body: "Never skipped. People say \"feature\" to mean a capability, not the ADO type Feature, so it always asks rather than guessing. The answer decides which template gets loaded.",
                branches: [
                  {
                    body: "The most common answer for functional requirements.",
                    label: "Load user-story template plus story-conventions.md"
                  },
                  {
                    body: "A different shape entirely: functional description, assumptions, documentation links.",
                    label: "Load feature-golden-template plus feature Definition of Done"
                  },
                  {
                    body: "Epic level. Groups Features, never holds User Stories directly.",
                    label: "Treat as theme grouping Features"
                  },
                  {
                    body: "All other ADO types are supported.",
                    label: "Bug, Task, Risk, Change Request, etc."
                  }
                ]
              },
              {
                kind: "choice",
                title: "Step 1 routing",
                short: "Step 1 routing: what are we starting from?",
                body: "Four routes into the same drafting engine.",
                branches: [
                  {
                    body: "Goes straight to questioning.",
                    label: "scratch"
                  },
                  {
                    body: "Fetches it and uses the context as the seed.",
                    label: "existing ADO item"
                  },
                  {
                    body: "Works from whatever you paste in.",
                    label: "pasted brief"
                  },
                  {
                    body: "Reads the images and pulls out personas, stages and actions.",
                    label: "screenshots"
                  }
                ]
              },
              {
                kind: "step",
                title: "Step 2 clarifying questions",
                short: "Step 2: single askQuestions call, scope, personas, framework, constraints",
                body: "Questions the context already answers are skipped."
              },
              {
                kind: "choice",
                title: "Step 3 enrichment research",
                short: "Step 3: run enrichment research?",
                body: "Optional, because it costs time and context.",
                branches: [
                  {
                    body: "Looks for related work items and metadata that already exists.",
                    label: "Scan ADO and Salesforce metadata, summarise in under 150 words"
                  },
                  {
                    body: "Drafts from what you have already given it.",
                    label: "Skip to drafting"
                  }
                ]
              },
              {
                kind: "step",
                title: "Step 4 draft",
                short: "Step 4: draft stories against INVEST, group Epic to Feature to Story, map dependencies, prioritise, draft AC",
                body: "Hierarchy levels are never skipped and the prioritisation framework is the one you picked in Step 2."
              },
              {
                kind: "decision",
                title: "Scope gate, per story",
                short: "Scope gate, per story",
                body: "Each story is checked individually against the scope baseline, not the batch as a whole.",
                branches: [
                  {
                    body: "In scope, carries on.",
                    tone: "ok",
                    label: "Include in the table"
                  },
                  {
                    body: "Grey area. Flagged so nobody commits to it blindly.",
                    tone: "warn",
                    label: "Include with a scope warning"
                  },
                  {
                    body: "Out of scope. Recommends a Change Request instead.",
                    tone: "stop",
                    terminal: true,
                    label: "Exclude. Present separately. Never created in ADO"
                  }
                ]
              },
              {
                kind: "step",
                title: "Step 5 present",
                short: "Step 5: present the backlog table and stop for approval",
                body: "Full story table with parent links, dependencies, acceptance criteria and the priority column."
              }
            ]
          },
          {
            name: "Create and hand off",
            steps: [
              {
                kind: "choice",
                title: "Step 6 create or save",
                short: "Step 6: create or save?",
                body: "Nothing is written to Azure DevOps before this answer.",
                branches: [
                  {
                    body: "Epic, Feature, User Story and Task, in order.",
                    label: "Create the full hierarchy in ADO"
                  },
                  {
                    body: "You pick which ones get created.",
                    label: "Create only the chosen items"
                  },
                  {
                    body: "The default. A local markdown file, nothing touches ADO.",
                    terminal: true,
                    label: "Write working/backlog-{date}-{slug}.md using the ADO field-mapped template"
                  },
                  {
                    body: "Skip. You manage ADO separately.",
                    tone: "stop",
                    terminal: true,
                    label: "No writes anywhere"
                  }
                ]
              },
              {
                kind: "step",
                title: "Hierarchy enforcement",
                short: "Enforce Epic to Feature to User Story to Task. Never link a Story straight to an Epic",
                body: "Applies even if you ask for the shortcut."
              },
              {
                kind: "gate",
                title: "Notify stakeholders",
                short: "Post a backlog summary as an ADO comment?",
                body: "Only after you say yes.",
                branches: [
                  {
                    body: "Posts the summary on the work item discussion thread.",
                    label: "workitem-comment skill"
                  },
                  {
                    body: "Nothing is posted.",
                    label: "No"
                  }
                ]
              },
              {
                kind: "end",
                title: "Stops there, deliberately",
                short: "STOP. Does not continue into refinement or sprint planning",
                body: "Those are separate skills you invoke when you are ready."
              }
            ]
          }
        ],
        pairsWith: [
          {
            id: "scope-gate",
            note: "embedded as the per-story validator"
          },
          {
            id: "story-refinement",
            note: "polish stories one-by-one after the initial draft"
          },
          {
            id: "ado-task-breakdown",
            note: "break each User Story into the standard 15-task template"
          }
        ]
      },
      {
        id: "story-refinement",
        title: "story-refinement",
        desc: "Refines user stories from a business analyst or product owner perspective. Use when stories are ambiguous, incomplete, missing acceptance criteria, missing business rules, or need dependencies, assumptions, and edge cases identified.",
        flow: [
          {
            name: "Intake to refined story",
            steps: [
              {
                kind: "start",
                title: "You invoke it",
                short: "You run /refine",
                body: "Type /refine or /story-refinement, name a work item (\"Refine US#4127\"), or just paste a story that feels too vague."
              },
              {
                kind: "step",
                title: "It loads the house rules first",
                short: "Load story conventions",
                body: "story-conventions.md sets the five mandatory sections, the Definition of Ready checklist, and the AC format. Nothing is written from general knowledge."
              },
              {
                kind: "choice",
                title: "Asks where the story comes from",
                short: "Where is the story from?",
                body: "One question, three routes. Skipped if you already gave it an ID or the full story text.",
                branches: [
                  { label: "Existing ADO item", body: "Fetches the work item with every field, plus the parent Feature and the last comments, so decisions already made in the thread are not lost." },
                  { label: "Pasted story text", body: "Works from what you gave it, no ADO calls." },
                  { label: "Brand new story", body: "Says so plainly and offers to hand over to backlog-creation instead." }
                ]
              },
              {
                kind: "gate",
                title: "Asks only the questions that matter",
                short: "Ask about the gaps",
                body: "It checks five gap categories: actor and intent, scope and behaviour, existing components, deployment target, stakeholder outcome. Only genuinely unclear ones become questions, all in a single prompt. A clear story skips this entirely."
              },
              {
                kind: "step",
                title: "Gathers context in parallel",
                short: "Gather context",
                body: "Persona of the requester, Salesforce metadata for the objects involved, sibling stories and dependencies in ADO. Field labels are resolved so the ACs read in business language, not API names."
              },
              {
                kind: "decision",
                title: "Runs the scope gate against the contract",
                short: "In the contract?",
                body: "Before anyone spends effort on acceptance criteria, it checks the ask against the scope baseline.",
                branches: [
                  { tone: "ok", label: "In scope", body: "Carries on, and cites the evidence in the output." },
                  { tone: "warn", label: "Grey area", body: "Shows you the evidence and asks whether to continue or escalate." },
                  { tone: "stop", terminal: true, label: "Out of scope", body: "Stops. Recommends a Change Request rather than quietly refining work nobody agreed to." }
                ]
              },
              {
                kind: "step",
                title: "Writes the refined story",
                short: "Write the refined story",
                body: "Five sections every time: Title, User Story Statement, Functional Context, Acceptance Criteria in Gherkin, and Solution Design."
              },
              {
                kind: "decision",
                title: "Checks it against Definition of Ready",
                short: "Definition of Ready met?",
                body: "The story is graded, not just produced.",
                branches: [
                  { tone: "ok", label: "Ready", body: "Marked ready for solution design or ready for implementation." },
                  { tone: "warn", label: "Not ready", body: "Marked \"needs more refinement\" with the unmet checklist items named." }
                ]
              }
            ]
          },
          {
            name: "Save and hand off",
            steps: [
              {
                kind: "gate",
                title: "Offers to tell the team",
                short: "Notify the team?",
                body: "Posts a refinement summary to the work item discussion, tagging the assignee and the author. Only after you say yes."
              },
              {
                kind: "choice",
                title: "Asks where it should live",
                short: "Where should it live?",
                body: "No ADO write happens without this answer.",
                branches: [
                  { label: "Update the existing item", body: "Writes the description and acceptance criteria back as clean HTML." },
                  { label: "Create a new User Story", body: "Asks which Feature it belongs to, then creates it as a child. Epic to Feature to Story hierarchy is enforced." },
                  { terminal: true, label: "Save locally", body: "Drops a markdown file into the gitignored backlog folder." },
                  { tone: "stop", terminal: true, label: "Skip", body: "Nothing is written anywhere." }
                ]
              },
              {
                kind: "step",
                title: "Links what the story depends on",
                short: "Link dependencies",
                body: "Scans the output for US#, Feature #, Epic # and Task # references and wires up the ADO relations, after confirming each one with you."
              },
              {
                kind: "end",
                title: "Offers the task breakdown",
                short: "Offer the task breakdown",
                body: "Finishes by offering to break the story into tasks, using whatever task template this project has configured. Projects without one are not offered a template at all."
              }
            ]
          }
        ],
        when: [
          "A user story is vague, incomplete, or missing acceptance criteria",
          "Business rules, edge cases, or dependencies need to be identified before build",
          "A story from backlog creation needs deeper analysis before sprint planning",
          "\"Refine US#1234\"",
          "\"This story is too vague - help me clarify it\"",
          "\"The acceptance criteria are incomplete for this story\"",
          "\"Add edge cases and business rules to this story\"",
          "\"What questions should we ask before building this?\"",
          "\"Review this story and tell me what's missing\"",
          "\"Make this story sprint-ready\"",
          "\"Refine the waitlist subscription story\"",
          "`/story-refinement`",
          "`/refine`"
        ],
        does: [
          "Reads the story plus its parent Feature and any linked items.",
          "Rewrites the description in the As a / I want / so that format.",
          "Adds Gherkin acceptance criteria for happy path, edge cases, and negative scenarios.",
          "Lists assumptions, open questions, and dependencies.",
          "Offers to post a refinement summary as an ADO comment."
        ],
        outputs: [
          "Use the standard output template: [Story Output Format](./assets/output-format.md)",
          "Scenario format, AC writing rules, and HTML conversion for Azure DevOps: [HTML Format Reference](./references/html-format.md)",
          "If any unresolved items remain after the initial questioning round, do **not** list them as plain text. Instead, use a second `vscode_askQuestions` call to ask them interactively in the chat window, following the same rules as the initial questioning round. Only fall back to listing them as text if the questions cannot be answered in the current session (e.g., require offline stakeholder input).",
          "List systems, teams, approvals, or data prerequisites.",
          "State one of:",
          "Ready for solution design",
          "Ready for implementation",
          "Needs more refinement",
          "Always include as the last section. Content depends on the story's readiness:",
          "If technical design is already done (T05.3/T05.4/T05.5 tasks), include the confirmed approach",
          "If not yet designed, state \"To be completed during technical design tasks (T05.3, T05.4, T05.5)\" and note any preliminary recommendations",
          "State whether recommendation is configuration or code",
          "Include constraints: security, licensing, limits, legal/privacy"
        ],
        sample: "Refine User Story US#[ID]. Tighten the description, add missing ACs, and surface assumptions and edge cases.",
        realExample: "Refine US#4127. Tighten the description, add Gherkin ACs for the validation rules, list assumptions about role-based access, and flag the BRE dependency.",
        pairsWith: [
          {
            id: "qa-validation",
            note: "QA validates the refined story"
          },
          {
            id: "ado-comment",
            note: "post the refinement summary on the work item"
          }
        ]
      },
      {
        id: "story-lifecycle",
        title: "story-lifecycle",
        desc: "Orchestrates the end-to-end handling of a user story across all 7 workflow stages and 15 roles (PO, BA, Dev, QA, RM, SM, TA, SA, PL, PSA, PM, TL, PMgr, DL, Sponsor). Use when a user story needs multi-role breakdown, lifecycle planning, role handoffs, or an overall execution path.",
        when: [
          "A user story needs end-to-end orchestration across all 7 stages",
          "You need a multi-role breakdown showing who does what at each stage",
          "Role handoffs, lifecycle planning, or an overall execution path is needed",
          "\"Take US#1234 end-to-end\"",
          "\"What's the full lifecycle for this story?\"",
          "\"Which roles need to act on this story and when?\"",
          "\"Walk me through the complete workflow for the waitlist story\"",
          "\"Orchestrate this story from discovery to release\"",
          "\"Show me the handoff points for US#1234\"",
          "\"What's the next stage for this story?\"",
          "`/story-lifecycle`",
          "`/run-pipeline type=story-lifecycle brief=\"...\"`"
        ],
        does: [
          "Walks the story through all 7 workflow stages.",
          "Assigns activities per stage to the right role (PO, BA, Dev, QA, RM, SM, TA, SA, PL, PSA, PM, TL, PMgr, DL, Sponsor).",
          "Lists the explicit handoff at every transition.",
          "Calls out where blockers usually appear."
        ],
        outputs: [
          "Stage-by-stage plan with owner per activity.",
          "Handoff checklist (artefacts produced, artefacts consumed).",
          "Risk markers per stage."
        ],
        sample: "Plan the end-to-end lifecycle for US#[ID] across the 7 workflow stages and assign role handoffs.",
        realExample: "Plan the end-to-end lifecycle for US#4127 (complaints intake). Show owners per stage and the artefacts handed off at every transition.",
        flow: [
          {
            name: "Plan the lifecycle",
            steps: [
              {
                kind: "start",
                title: "You name a story",
                short: "You run /story-lifecycle on a User Story",
                body: "Use it when a story needs a multi-role breakdown or an overall execution path across the whole workflow."
              },
              {
                kind: "step",
                title: "Walks the 7 stages",
                short: "Walk the story through all 7 workflow stages",
                body: "The project's standard stages, in order — none skipped, even for small stories."
              },
              {
                kind: "step",
                title: "Assigns the roles",
                short: "Assign activities per stage to the right role",
                body: "All 15 roles are in play: PO, BA, Dev, QA, RM, SM, TA, SA, PL, PSA, PM, TL, PMgr, DL, Sponsor. Role definitions come from the delivery playbook."
              },
              {
                kind: "step",
                title: "Names every handoff",
                short: "List the explicit handoff at every transition",
                body: "Each transition lists the artefacts produced and the artefacts the next role consumes — the checklist that stops work falling between roles."
              },
              {
                kind: "step",
                title: "Marks the usual blockers",
                short: "Call out where blockers usually appear",
                body: "Risk markers per stage, based on where stories on this project actually get stuck."
              },
              {
                kind: "end",
                title: "Execution plan",
                short: "Stage-by-stage plan with owners",
                body: "A plan with an owner per activity and a handoff checklist per transition. Refine the story first with story-refinement if it is not ready."
              }
            ]
          }
        ],
        pairsWith: [
          {
            id: "delivery-playbook",
            note: "look up role-to-stage activity mapping"
          },
          {
            id: "story-refinement",
            note: "ensure the story is refined before lifecycle planning"
          }
        ]
      },
      {
        id: "ado-task-breakdown",
        title: "ado-task-breakdown",
        desc: "Creates standardized 15-task breakdowns under Azure DevOps User Stories. Use when: bulk task creation under a Feature's child User Stories, applying the standard task template with assignees and estimates, creating tasks with the Txx.x naming convention. Triggers: 'opret tasks', 'task breakdown', 'create tasks under US', 'task template'.",
        when: [
          "Creating task breakdowns under User Stories that have no child tasks",
          "Applying the standard 15-task template to one or more User Stories",
          "Bulk-creating tasks under all child User Stories of a Feature",
          "\"opret tasks\"",
          "\"task breakdown\"",
          "\"create tasks under US\"",
          "\"task template\"",
          "\"create tasks for Feature #1234\"",
          "\"add standard tasks to US#5678\"",
          "`/task-breakdown`"
        ],
        does: [
          "Reads the User Story and any team-roster context.",
          "Applies the project's standard 15-task template (Apex, LWC, Flow, test, deploy, etc).",
          "Assigns each task to a default owner from the team roster.",
          "Sets effort estimates per task type.",
          "Pushes the tasks to ADO using the Txx.x naming convention, after confirmation."
        ],
        outputs: [
          "15 tasks per User Story with names, owners, and estimates.",
          "ADO push preview before commit.",
          "Confirmation receipt with the created task IDs."
        ],
        sample: "Create the standard 15-task breakdown under User Story US#[ID] with assignees and estimates.",
        realExample: "Create the standard 15-task breakdown under US#4127. Assign Apex tasks to Mads, LWC tasks to Sofie, and QA tasks to Lone. Estimate per template.",
        flow: [
          {
            name: "Draft the breakdown",
            steps: [
              {
                kind: "start",
                title: "You name a User Story",
                short: "You run /ado-task-breakdown on a story",
                body: "\"Create tasks under US#4127\" or bulk task creation under a Feature's child stories."
              },
              {
                kind: "step",
                title: "Reads story and roster",
                short: "Read the story and the team roster",
                body: "The roster supplies default owners; the story supplies the context the task names refer to."
              },
              {
                kind: "step",
                title: "Applies the task template",
                short: "Apply the standard 15-task template",
                body: "Apex, LWC, Flow, test, deploy and the rest — the project's configured template, not an improvised list."
              },
              {
                kind: "step",
                title: "Owners and estimates",
                short: "Assign default owners and per-type estimates",
                body: "Each task gets a default owner from the roster and an effort estimate for its type. Both are editable in the preview."
              }
            ]
          },
          {
            name: "Push to ADO",
            steps: [
              {
                kind: "gate",
                title: "Push preview",
                short: "Create these tasks in ADO?",
                body: "The full preview — names in the Txx.x convention, owners, estimates — is shown first. Nothing is created before you confirm.",
                branches: [
                  {
                    body: "Pushed to ADO under the User Story.",
                    label: "Create the tasks"
                  },
                  {
                    body: "Nothing is written. Keep the breakdown as a plan.",
                    tone: "stop",
                    terminal: true,
                    label: "Stop at the preview"
                  }
                ]
              },
              {
                kind: "end",
                title: "Receipt",
                short: "Confirmation receipt with the created task IDs",
                body: "Every created task ID is listed so you can verify the hierarchy in ADO."
              }
            ]
          }
        ],
        pairsWith: [
          {
            id: "backlog-creation",
            note: "run after the User Story is in ADO"
          },
          {
            id: "sprint-planning",
            note: "use the breakdown as sprint capacity input"
          }
        ]
      },
      {
        id: "validate-workitem",
        title: "validate-workitem",
        desc: "Validates ADO work items against golden templates. Produces a gap report, generates proposed content locally for review, and optionally updates ADO after approval.",
        when: [
          "Validate a Feature, Epic, or any work item against the golden template",
          "Audit a batch of work items for completeness before a sprint review",
          "Prepare proposed updates for work items that fail the template check",
          "\"validate feature 5719\"",
          "\"check if these stories match the template\"",
          "\"audit work items under Epic 21295\"",
          "`/validate-workitem`"
        ],
        does: [
          "Asks which work item type to validate (Feature, Epic, User Story, Task, Bug, etc.).",
          "Collects input: work item IDs, an ADO query URL, a parent ID, or custom WIQL.",
          "Fetches each item from ADO and compares against the golden template for that type.",
          "Generates a local gap report (personal-context/) with a summary table and per-item detail.",
          "On request, creates proposed markdown files structured per the template for you to edit.",
          "On explicit confirmation, pushes the edited content back to ADO."
        ],
        outputs: [
          "Gap report at personal-context/validate-workitem-report.md with ADO links.",
          "Per-item proposed markdown files at personal-context/validate-workitem/.",
          "ADO updates (only after explicit confirmation)."
        ],
        sample: "Provide work item IDs or an ADO link containing the items to validate.",
        realExample: "validate feature 5719 against the golden template and show me what's missing",
        flow: [
          {
            name: "Audit against the template",
            steps: [
              {
                kind: "start",
                title: "You invoke it",
                short: "You run /validate-workitem",
                body: "Use it when work items may have drifted from the golden templates and you want a gap report before fixing anything."
              },
              {
                kind: "gate",
                title: "Which type?",
                short: "Which work item type to validate?",
                body: "Feature, Epic, User Story, Task, Bug and the rest each have their own golden template — the answer decides which one is loaded.",
                branches: [
                  {
                    body: "Validated against the story golden template.",
                    label: "User Story"
                  },
                  {
                    body: "Validated against the feature or epic template.",
                    label: "Feature or Epic"
                  },
                  {
                    body: "Every ADO type with a golden template is supported.",
                    label: "Task, Bug, or other"
                  }
                ]
              },
              {
                kind: "choice",
                title: "How do you point at the items?",
                short: "IDs, query URL, parent ID, or WIQL?",
                body: "Four ways into the same audit.",
                branches: [
                  {
                    body: "A list of specific items.",
                    label: "Work item IDs"
                  },
                  {
                    body: "Everything the saved query returns.",
                    label: "ADO query URL"
                  },
                  {
                    body: "All children of an Epic or Feature.",
                    label: "Parent ID"
                  },
                  {
                    body: "Your own query, verbatim.",
                    label: "Custom WIQL"
                  }
                ]
              },
              {
                kind: "step",
                title: "Fetches and compares",
                short: "Fetch each item and compare to the golden template",
                body: "Field by field, section by section — missing sections and malformed content are both gaps."
              },
              {
                kind: "step",
                title: "Writes the gap report",
                short: "Write the gap report to personal-context/",
                body: "A summary table plus per-item detail with ADO links, at personal-context/validate-workitem-report.md. Read-only up to this point."
              }
            ]
          },
          {
            name: "Fix and push",
            steps: [
              {
                kind: "gate",
                title: "Generate proposed content?",
                short: "Generate proposed markdown to edit?",
                body: "On request only — proposed files land locally for you to edit, never straight into ADO.",
                branches: [
                  {
                    body: "Per-item markdown files at personal-context/validate-workitem/, structured per the template.",
                    label: "Generate the proposals"
                  },
                  {
                    body: "The gap report stands on its own.",
                    tone: "stop",
                    terminal: true,
                    label: "Stop at the report"
                  }
                ]
              },
              {
                kind: "gate",
                title: "Push back to ADO?",
                short: "Push the edited content to ADO?",
                body: "Only after explicit confirmation, and only the files you approved.",
                branches: [
                  {
                    body: "The edited content is written back to ADO.",
                    label: "Update the items"
                  },
                  {
                    body: "You apply the fixes yourself.",
                    tone: "stop",
                    terminal: true,
                    label: "No writes"
                  }
                ]
              },
              {
                kind: "end",
                title: "Audit trail",
                short: "ADO updated, gap report kept",
                body: "Follow up with ado-quality-guardian to score the results, or backlog-creation to create items that follow the template from the start."
              }
            ]
          }
        ],
        pairsWith: [
          {
            id: "backlog-creation",
            note: "create items that already follow the golden template"
          },
          {
            id: "ado-quality-guardian",
            note: "run a scoring audit after validation fixes are applied"
          }
        ]
      }
    ]
  },
  {
    id: "planning",
    name: "Sprint Planning",
    blurb: "Plan the next iteration and commit work the team can actually finish.",
    skills: [
      {
        id: "sprint-planning",
        title: "sprint-planning",
        desc: "Supports sprint planning activities including sprint goal definition, task breakdown, and test strategy planning. Use when a refined backlog is ready and the team needs to commit to a sprint scope, decompose stories into sub-tasks, and define the test approach.",
        when: [
          "Refined stories need to be committed into a sprint with task breakdown",
          "A sprint goal needs to be defined from the prioritized backlog",
          "Stories need to be decomposed into sub-tasks with ownership and effort estimates",
          "\"Plan Sprint 15\"",
          "\"Break down stories for the next sprint\"",
          "\"What should we commit to this sprint?\"",
          "\"Decompose US#1234 into dev tasks\"",
          "\"Define the sprint goal for the upcoming sprint\"",
          "\"Create sub-tasks for the stories in Sprint 14\"",
          "\"What's our capacity and what can we fit?\"",
          "\"Plan the test strategy for this sprint\"",
          "`/sprint-planning`"
        ],
        does: [
          "Reads the proposed sprint scope and the team's capacity.",
          "Drafts a one-sentence sprint goal.",
          "Decomposes each committed story into sub-tasks.",
          "Drafts a test strategy: what to automate, what to test manually, what to leave."
        ],
        outputs: [
          "Full output format with all sections and sub-sections: [Output Format](./assets/output-format.md)"
        ],
        sample: "Plan sprint [number]. Set the sprint goal, decompose committed stories into sub-tasks, and define the test approach.",
        realExample: "Plan sprint 17. Set the sprint goal around 'complaints intake MVP', decompose US#4127, US#4128, US#4131 into tasks, and define the test approach (Selenium for AC1-3, manual for AC4).",
        flow: [
          {
            name: "Plan the sprint",
            steps: [
              {
                kind: "start",
                title: "You invoke it",
                short: "You run /sprint-planning",
                body: "Use it when the refined backlog is ready and the team needs to commit to a sprint scope."
              },
              {
                kind: "step",
                title: "Reads scope and capacity",
                short: "Read the proposed scope and the team's capacity",
                body: "The commitment conversation starts from what the team can actually absorb, not from the wishlist."
              },
              {
                kind: "step",
                title: "Drafts the sprint goal",
                short: "Draft a one-sentence sprint goal",
                body: "One sentence, deliberately — if the goal needs a paragraph, the scope is not coherent yet."
              },
              {
                kind: "step",
                title: "Decomposes the stories",
                short: "Decompose each committed story into sub-tasks",
                body: "Every committed story is broken down so estimation and assignment have something concrete to hold."
              },
              {
                kind: "step",
                title: "Drafts the test strategy",
                short: "Test strategy: automate, manual, or leave",
                body: "An explicit decision per area — what gets automated, what is tested manually, and what is consciously left out."
              },
              {
                kind: "end",
                title: "Hands off",
                short: "Hand off to ado-task-breakdown and qa-validation",
                body: "Apply the standard task template to each story, and feed the QA-validated stories into the sprint."
              }
            ]
          }
        ],
        pairsWith: [
          {
            id: "ado-task-breakdown",
            note: "apply the standard task template to each story"
          },
          {
            id: "qa-validation",
            note: "feed in the QA-validated stories"
          }
        ]
      }
    ]
  },
  {
    id: "design",
    name: "Solution Design",
    blurb: "Turn a refined story into a concrete technical approach with options and trade-offs.",
    skills: [
      {
        id: "solution-design",
        title: "solution-design",
        desc: "Produces solution design output for a user story from an architect or solution designer perspective. Use when the story affects architecture, integrations, data model, security, process flow, or needs implementation options and design decisions.",
        when: [
          "A story impacts architecture, integrations, data model, or security",
          "Design options need to be compared before committing to a build approach",
          "A technical decision record is needed",
          "\"Design the integration approach for US#1234\"",
          "\"What's the data model for the waitlist feature?\"",
          "\"Compare design options for this story\"",
          "\"Review the architecture impact of this change\"",
          "\"How should we implement the external system integration?\"",
          "\"This story touches multiple objects - help me design the solution\"",
          "\"Create a solution design for the tenant portal\"",
          "`/solution-design`"
        ],
        does: [
          "Reads the story and any linked technical context.",
          "Maps integrations, data flows, and the data-model impact.",
          "Lists 2-3 implementation options with pros, cons, and effort.",
          "Captures the recommended option and the design decisions.",
          "Flags security and compliance considerations."
        ],
        outputs: [
          "Full output format with all sections and sub-sections: [Output Format](./assets/output-format.md)"
        ],
        sample: "Produce a solution design for US#[ID]. Cover architecture, integrations, data model impact, and 2-3 implementation options with trade-offs.",
        realExample: "Produce a solution design for US#4127 (complaints intake). Cover the Service Cloud integration, the Complaint__c data model, security via permission sets, and 2 implementation options (LWC vs Flow Screen) with trade-offs.",
        flow: [
          {
            name: "Design the solution",
            steps: [
              {
                kind: "start",
                title: "You invoke it",
                short: "You run /solution-design on a story",
                body: "Use it when the story touches architecture, integrations, the data model, or security — anything that needs options weighed before code."
              },
              {
                kind: "step",
                title: "Reads the story and context",
                short: "Read the story and linked technical context",
                body: "The refined story, its ACs, and whatever technical context is already linked."
              },
              {
                kind: "step",
                title: "Maps the impact",
                short: "Map integrations, data flows, data-model impact",
                body: "What talks to what, which objects change, and where the data moves."
              },
              {
                kind: "step",
                title: "Lays out the options",
                short: "List 2-3 options with pros, cons, effort",
                body: "Always more than one option, so the recommendation is a choice rather than a foregone conclusion."
              },
              {
                kind: "step",
                title: "Captures the decision",
                short: "Record the recommended option and design decisions",
                body: "The recommendation states whether it is configuration or code, and the decisions are written down so they survive the handoff."
              },
              {
                kind: "step",
                title: "Flags the constraints",
                short: "Flag security and compliance considerations",
                body: "Security, licensing, limits, and legal/privacy constraints are named before anyone commits to a build."
              },
              {
                kind: "end",
                title: "Hands off",
                short: "Hand off to dev-plan or sf-codegen",
                body: "The developer plans the build from the design, or code is generated from the chosen option."
              }
            ]
          }
        ],
        pairsWith: [
          {
            id: "sf-codegen",
            note: "generate code from the chosen option"
          },
          {
            id: "dev-plan",
            note: "hand off the design to the developer"
          },
          {
            id: "diagrams-designer",
            note: "create a BPMN or sequence diagram from the design"
          }
        ]
      },
      {
        id: "diagrams-designer",
        title: "diagrams-designer",
        desc: "Create draw.io BPMN diagrams from a text file or solution design document. Use when the user wants a business process BPMN, process flow diagram, or sequence diagram, or needs help choosing the right diagram type and abstraction level.",
        when: [
          "Create a BPMN diagram from a text file, design document, or process description.",
          "Create a process flow diagram from a design document or text description.",
          "Create a sequence diagram from a design document or text description.",
          "Generate one or more draw.io diagrams from written documentation.",
          "Decide whether a process is better represented as a BPMN, process flow, or sequence diagram.",
          "Do not use this skill for freeform brainstorming without a source document or description, or for diagrams that are primarily data models, class diagrams, infrastructure topology diagrams, or network diagrams."
        ],
        does: [
          "Reads the source document (ADO work item or local file).",
          "Recommends the best diagram type (BPMN, process flow, or sequence) if not specified.",
          "Generates a draw.io XML file with correct BPMN notation, swimlanes, and connectors.",
          "Outputs one or more .drawio files ready to open in draw.io or VS Code."
        ],
        outputs: [
          "One or more draw.io (.drawio) XML files.",
          "Diagram type recommendation with rationale when asked."
        ],
        sample: "Create a BPMN diagram from [source document or ADO ID]. Output as a draw.io file.",
        realExample: "Create a BPMN diagram for the new-tenancy allocation process from Feature 2048. Show swimlanes per actor and highlight the decision points.",
        flow: [
          {
            name: "Document to diagram",
            steps: [
              {
                kind: "start",
                title: "You point it at a source",
                short: "You give it an ADO work item or a local file",
                body: "A solution design document, a process description, or any text that should become a diagram."
              },
              {
                kind: "choice",
                title: "Which diagram type?",
                short: "BPMN, process flow, or sequence?",
                body: "Name the type if you know it; otherwise it recommends one with the rationale.",
                branches: [
                  {
                    body: "Swimlanes and correct BPMN notation.",
                    label: "Business process BPMN"
                  },
                  {
                    body: "A simpler flow when full BPMN is overkill.",
                    label: "Process flow"
                  },
                  {
                    body: "For interactions between systems over time.",
                    label: "Sequence diagram"
                  },
                  {
                    body: "It picks the type and abstraction level and tells you why.",
                    label: "Let it recommend"
                  }
                ]
              },
              {
                kind: "step",
                title: "Generates the XML",
                short: "Generate the draw.io XML",
                body: "Correct notation, swimlanes, and connectors — not a picture, an editable diagram file."
              },
              {
                kind: "end",
                title: "Ready to open",
                short: "One or more .drawio files",
                body: "Open them in draw.io or the VS Code extension and edit from there."
              }
            ]
          }
        ],
        pairsWith: [
          {
            id: "solution-design",
            note: "design the solution first, then diagram the process"
          },
          {
            id: "process-map",
            note: "map the process steps first, then visualise as BPMN"
          }
        ]
      }
    ]
  },
  {
    id: "dev-plan",
    name: "Implementation",
    blurb: "Build, ship, and operate on the Salesforce platform.",
    skills: [
      {
        id: "sf-story-pipeline",
        title: "sf-story-pipeline",
        desc: "End-to-end /implement orchestrator. Takes one Ready User Story and drives it to a PR, chaining readiness check, branch, code/config generation, a local build-test-fix loop against kab_dev, and PR review, with three human approval gates. Manual invocation only.",
        when: [
          "A developer picks up a User Story that is marked Ready for Development",
          "You want the full build pipeline (context, readiness, branch, generate, validate, PR)",
          "You want the three human gates enforced (files, deploy, PR)"
        ],
        does: [
          "Loads the story context and scores it against a deterministic Definition of Ready (hard stop if not ready).",
          "Creates the feature branch and generates config metadata + Apex + tests.",
          "Runs a validate-only build-test-fix loop against kab_dev, then opens a PR after review.",
          "Enforces three human gates: staged files, deploy, and PR."
        ],
        outputs: [
          "A branch, generated + tested artifacts, and a PR to the integration branch. See SKILL.md for full detail."
        ],
        sample: "/story-pipeline US#1234",
        realExample: "/story-pipeline US#1234",
        flow: [
          {
            name: "Readiness and generation",
            steps: [
              {
                kind: "start",
                title: "You hand it a Ready story",
                short: "You run /sf-story-pipeline on one story",
                body: "Manual invocation only. One Ready-for-Development User Story goes in; a reviewed PR comes out."
              },
              {
                kind: "decision",
                title: "Definition of Ready check",
                short: "Deterministic Definition of Ready score",
                body: "The story is scored against a deterministic checklist before anything is built.",
                branches: [
                  {
                    body: "The pipeline continues.",
                    tone: "ok",
                    label: "Ready, proceed"
                  },
                  {
                    body: "Not ready. Back to story-refinement — the pipeline refuses to build on a vague story.",
                    tone: "stop",
                    terminal: true,
                    label: "Hard stop"
                  }
                ]
              },
              {
                kind: "step",
                title: "Creates the branch",
                short: "Create the feature branch",
                body: "A dedicated branch for this story, named by convention."
              },
              {
                kind: "step",
                title: "Generates the code",
                short: "Generate config metadata, Apex, and tests",
                body: "Configuration first, code second, tests always — via the same conventions sf-codegen enforces."
              },
              {
                kind: "gate",
                title: "Gate 1: staged files",
                short: "Human gate: review the staged files",
                body: "You see exactly what will be committed before anything is."
              }
            ]
          },
          {
            name: "Build, test, PR",
            steps: [
              {
                kind: "step",
                title: "Build-test-fix loop",
                short: "Validate-only build-test-fix loop against kab_dev",
                body: "Iterates until the validate-only deploy and tests are green. Nothing is actually deployed."
              },
              {
                kind: "gate",
                title: "Gate 2: deploy",
                short: "Human gate: approve the deploy",
                body: "The second stop point — the org is only touched after you approve."
              },
              {
                kind: "gate",
                title: "Gate 3: the PR",
                short: "Human gate: review, then open the PR",
                body: "PR review runs first; the PR to the integration branch opens only after you approve."
              },
              {
                kind: "end",
                title: "PR opened",
                short: "Branch, tested artifacts, and a PR",
                body: "A reviewed PR to the integration branch, with generated and tested artifacts behind it."
              }
            ]
          }
        ],
        pairsWith: [
          {
            id: "ado-comment"
          },
          {
            id: "ado-pr-review"
          },
          {
            id: "deployment-sequencer"
          },
          {
            id: "loop"
          }
        ]
      },
      {
        id: "dev-plan",
        title: "dev-plan",
        desc: "Handles user stories from a developer or technical lead perspective. Use when a story is ready for build and needs technical decomposition, implementation planning, coding approach, task breakdown, validation steps, or developer handoff notes.",
        when: [
          "A story is approved for build and needs technical task breakdown",
          "Developer needs to know which files, modules, or configs to change",
          "The implementation sequence needs to be defined for safety and correctness",
          "\"Break this story into dev tasks\"",
          "\"What files need to change for US#1234?\"",
          "\"Plan the implementation for the waitlist feature\"",
          "\"Create technical tasks for this story\"",
          "\"What's the safe order to implement these changes?\"",
          "\"Prepare developer handoff notes for this story\"",
          "\"How should I implement this Apex trigger?\"",
          "\"Build a task list for US#1234\"",
          "`/dev-plan`"
        ],
        does: [
          "Reads the story, ACs, and the solution design (if any).",
          "Breaks the story into technical sub-tasks.",
          "Suggests a coding approach for each sub-task.",
          "Outlines validation steps and a developer handoff note."
        ],
        outputs: [
          "Full output format with all sections and sub-sections: [Output Format](./assets/output-format.md)"
        ],
        sample: "Help me implement US#[ID]. Break it into technical tasks, suggest a coding approach, and outline validation steps.",
        realExample: "Help me implement US#4127. Break it into technical tasks (Complaint__c object, intake LWC, validation rules, test class), suggest a coding approach, and outline validation steps.",
        flow: [
          {
            name: "Plan the build",
            steps: [
              {
                kind: "start",
                title: "You invoke it",
                short: "You run /dev-plan on a story",
                body: "Use it when a story is ready for build and needs a technical plan before anyone opens the IDE."
              },
              {
                kind: "step",
                title: "Reads the inputs",
                short: "Read the story, ACs, and solution design",
                body: "The solution design is used when it exists; the plan says so when it does not."
              },
              {
                kind: "step",
                title: "Breaks the story down",
                short: "Break the story into technical sub-tasks",
                body: "Decomposition a developer can pick up task by task."
              },
              {
                kind: "step",
                title: "Suggests the approach",
                short: "Suggest a coding approach per sub-task",
                body: "Each sub-task gets an approach, so review happens at plan time instead of PR time."
              },
              {
                kind: "step",
                title: "Defines done",
                short: "Outline validation steps and the handoff note",
                body: "How each piece is verified, and the note the next developer needs to continue."
              },
              {
                kind: "end",
                title: "Hands off",
                short: "Hand off to sf-codegen, QA plans in parallel",
                body: "Generate the scaffolded code from the plan while qa-validation prepares the tests."
              }
            ]
          }
        ],
        pairsWith: [
          {
            id: "solution-design",
            note: "run this after the design is agreed"
          },
          {
            id: "sf-codegen",
            note: "generate the scaffolded code"
          },
          {
            id: "qa-validation",
            note: "QA prepares tests in parallel"
          }
        ]
      },
      {
        id: "sf-codegen",
        title: "sf-codegen",
        desc: "Generates Salesforce artifacts (Apex classes, triggers, test classes, Flows, LWC components) from refined User Stories following project conventions. All output is staged for human review before deployment. Use when a refined User Story is ready and needs scaffolded Apex / LWC / Flow artifacts staged for review.",
        when: [
          "A refined User Story is ready for development and you want to accelerate the coding phase",
          "You want to generate boilerplate Apex + test classes following existing project-knowledge/source-code conventions",
          "You want to scaffold a Flow or LWC from acceptance criteria"
        ],
        does: [
          "Reads the story and any solution design.",
          "Generates Apex classes, triggers, test classes, Flows, and LWC bundles.",
          "Applies project conventions: naming, prefix, package layout, header comments with US# traceability.",
          "Stages the output in the working tree for review before deploy."
        ],
        outputs: [
          "Apex class + matching test class.",
          "LWC bundle (html, js, css, metadata).",
          "Flow XML when relevant.",
          "Metadata for custom objects and fields.",
          "Diff summary you can review before commit."
        ],
        sample: "Generate the Salesforce artifacts for US#[ID]: Apex class, trigger, test class, and any LWC components needed. Stage for review.",
        realExample: "Generate the Salesforce artefacts for US#4127: a ComplaintIntakeController Apex class, a complaint-intake-form LWC, a Complaint__c trigger, and matching test classes with at least 90% coverage. Stage for review.",
        flow: [
          {
            name: "Story to staged code",
            steps: [
              {
                kind: "start",
                title: "You hand it a refined story",
                short: "You run /sf-codegen on a refined story",
                body: "Use it once a story is refined and, ideally, designed. Design first, generate second."
              },
              {
                kind: "step",
                title: "Reads story and design",
                short: "Read the story and any solution design",
                body: "The chosen design option drives what gets generated."
              },
              {
                kind: "step",
                title: "Generates the artifacts",
                short: "Generate Apex, triggers, test classes, Flows, LWC",
                body: "Every Apex class arrives with its matching test class; LWC comes as the full bundle; Flow XML and object metadata where relevant."
              },
              {
                kind: "step",
                title: "Applies the conventions",
                short: "Apply naming, prefix, package layout, US# headers",
                body: "Project conventions are applied mechanically, including header comments with US# traceability that feature-registry later relies on."
              },
              {
                kind: "end",
                title: "Staged, not deployed",
                short: "Staged in the working tree for review",
                body: "All output stops in the working tree with a diff summary. You review before commit; pipeline-inspector debugs the build after."
              }
            ]
          }
        ],
        pairsWith: [
          {
            id: "solution-design",
            note: "design first, generate second"
          },
          {
            id: "test-case-generation",
            note: "generate matching manual test cases"
          },
          {
            id: "pipeline-inspector",
            note: "trigger the PR pipeline after commit"
          }
        ]
      },
      {
        id: "pipeline-inspector",
        title: "pipeline-inspector",
        desc: "Inspect Azure DevOps CI/CD pipelines and branch deltas for the kab-package. Use when explaining a pipeline YAML end-to-end (stages, triggers, jobs), diagnosing a failed build, or showing what is unique in a branch vs its integration branch.",
        when: [
          "\"Give me the full picture of sf-qa\"",
          "\"Explain the develop pipeline\"",
          "\"What stages does sf-release have?\"",
          "\"What are the updates / changes in prototype/qa?\"",
          "\"What's in hotfix/qa that hasn't been merged yet?\"",
          "\"What commits are unique to feature/X?\"",
          "**Also load** `.github/skills/pipeline-inspector/references/pipeline-scripting-patterns.md` when:",
          "Authoring or reviewing `- bash:` steps in any pipeline YAML",
          "Debugging a pipeline step that handles `.buildversion` files or artifact downloads",
          "Checking the correct key format for `install_package_dependencies.sh`",
          "**Do NOT** answer branch status questions with `git log --since` or plain",
          "`git log origin/<branch>`. Always use the diff-against-reference approach",
          "(Step 2b below)."
        ],
        does: [
          "Reads the pipeline YAML (stages, triggers, jobs, secrets references).",
          "Explains it stage by stage in plain English.",
          "Pulls the last run's logs and identifies the failing step.",
          "Diffs the branch against its integration target and surfaces only the changed files."
        ],
        outputs: [
          "Pipeline summary (triggers, stages, jobs).",
          "Failure diagnosis with the offending log lines.",
          "Branch delta as a file list with reasons."
        ],
        sample: "Explain the [pipeline name] YAML end-to-end and diagnose the last failed build.",
        realExample: "Explain the sf-pr-check.yaml pipeline end-to-end, then diagnose the build that failed on PR #312 with 'apex-tests failed'.",
        flow: [
          {
            name: "Inspect the pipeline",
            steps: [
              {
                kind: "start",
                title: "You name a pipeline or a failure",
                short: "You point it at a pipeline or a failed build",
                body: "\"Explain this pipeline\", \"why did the build fail?\", or \"what is unique in this branch?\""
              },
              {
                kind: "step",
                title: "Reads the YAML",
                short: "Read stages, triggers, jobs, secret references",
                body: "The actual pipeline definition, not an assumed one."
              },
              {
                kind: "step",
                title: "Explains it",
                short: "Explain the pipeline stage by stage",
                body: "Plain English, in execution order — what runs, when, and why."
              },
              {
                kind: "step",
                title: "Finds the failing step",
                short: "Pull the last run's logs, isolate the failure",
                body: "The diagnosis names the failing step and quotes the offending log lines."
              },
              {
                kind: "step",
                title: "Diffs the branch",
                short: "Diff the branch against its integration target",
                body: "Only the changed files surface, each with the reason it differs."
              },
              {
                kind: "end",
                title: "Diagnosis",
                short: "Summary, failure diagnosis, branch delta",
                body: "Pairs with sf-codegen: generate code, commit, then debug the resulting build here."
              }
            ]
          }
        ],
        pairsWith: [
          {
            id: "sf-codegen",
            note: "use after generating code to debug the resulting build"
          }
        ]
      },
      {
        id: "create-org-shape",
        title: "create-org-shape",
        desc: "Creates a Salesforce org shape from a source org (Dev Hub or sandbox) to capture features, licenses, and preferences for scratch org creation. Use when setting up or refreshing the org shape template.",
        when: [
          "Initial project setup: capturing production-like features/licenses for scratch orgs",
          "Source org features changed (new license purchased, feature enabled)",
          "Current shape is stale or was deleted",
          "Scratch org creation fails with \"feature not available\" errors",
          "Migrating to a new Dev Hub and need to re-establish the shape",
          "\"Create an org shape\"",
          "\"Set up org shape for the Dev Hub\"",
          "\"Refresh the org shape\"",
          "\"Our scratch orgs are missing a feature, update the shape\"",
          "\"Register org shape\""
        ],
        does: [
          "See SKILL.md for detailed steps."
        ],
        outputs: [
          "See SKILL.md for outputs."
        ],
        sample: "Create an org shape",
        realExample: "Create an org shape from the Dev Hub to capture the latest features and licenses for scratch org provisioning.",
        flow: [
          {
            name: "Capture the shape",
            steps: [
              {
                kind: "start",
                title: "You invoke it",
                short: "You run /create-org-shape",
                body: "Use it when setting up or refreshing the org shape template that scratch orgs are created from."
              },
              {
                kind: "step",
                title: "Step 0: discovery",
                short: "Select Dev Hub, pick the source org, check existing shapes",
                body: "Finds the Dev Hub, determines the source org (Dev Hub or sandbox), and checks whether a shape already exists before creating another."
              },
              {
                kind: "step",
                title: "Validates the source",
                short: "Check connectivity and inspect features",
                body: "Confirms the source org is reachable and reports its features, licenses, and preferences for the record."
              },
              {
                kind: "step",
                title: "Creates the shape",
                short: "Create the org shape and verify it",
                body: "The shape captures features, licenses, and preferences so scratch orgs match the real org."
              },
              {
                kind: "step",
                title: "Updates the definition file",
                short: "Create or update the scratch org definition",
                body: "The definition file is pointed at the new shape, so create-scratch-org picks it up automatically."
              },
              {
                kind: "choice",
                title: "Prove it works?",
                short: "Validate with a test scratch org?",
                body: "Optional, because it costs a scratch org slot.",
                branches: [
                  {
                    body: "Confirms the shape actually provisions.",
                    label: "Spin up a test org"
                  },
                  {
                    body: "The shape is reported as created but unproven.",
                    label: "Skip validation"
                  }
                ]
              },
              {
                kind: "end",
                title: "Report",
                short: "Shape ready, next steps listed",
                body: "Follow with create-org-snapshot to capture a full snapshot on top of the shape."
              }
            ]
          }
        ],
        pairsWith: [
          {
            id: "create-org-snapshot",
            note: "create a snapshot after the shape is configured"
          }
        ]
      },
      {
        id: "create-org-snapshot",
        title: "create-org-snapshot",
        desc: "Creates a Salesforce org snapshot from a provisioned scratch org. Use when the team needs a reusable snapshot for fast scratch org creation, nightly pipeline refresh, or onboarding.",
        when: [
          "After provisioning a scratch org that should become the team's baseline",
          "Nightly pipeline needs a fresh snapshot with latest package version",
          "Current snapshot is stale (package version behind QA) or about to expire",
          "Onboarding scenario where a known-good state must be captured",
          "\"Create a snapshot from my scratch org\"",
          "\"Snapshot this org for the team\"",
          "\"Refresh the dev snapshot\"",
          "\"Take a snapshot of the current scratch org\""
        ],
        does: [
          "See SKILL.md for detailed steps."
        ],
        outputs: [
          "See SKILL.md for outputs."
        ],
        sample: "Create a snapshot from my scratch org",
        realExample: "Create a snapshot from my scratch org so new developers can spin up orgs quickly.",
        flow: [
          {
            name: "Snapshot the org",
            steps: [
              {
                kind: "start",
                title: "You invoke it",
                short: "You run /create-org-snapshot",
                body: "Use it when the team needs a reusable snapshot for fast scratch org creation, nightly refresh, or onboarding."
              },
              {
                kind: "step",
                title: "Step 0: discovery",
                short: "Select Dev Hub, validate the source scratch org",
                body: "Identifies the provisioned scratch org to snapshot, checks it is ready, and lists existing snapshots so you do not duplicate one."
              },
              {
                kind: "gate",
                title: "Snapshot details",
                short: "Name the snapshot",
                body: "The name is validated against the platform rules before anything is created."
              },
              {
                kind: "step",
                title: "Creates and monitors",
                short: "Create the snapshot, monitor until done",
                body: "Snapshot creation is asynchronous — it is watched until the platform reports a result."
              },
              {
                kind: "decision",
                title: "Did it go Active?",
                short: "Snapshot Active?",
                body: "Only an Active snapshot is usable.",
                branches: [
                  {
                    body: "Verified, optionally by provisioning from it.",
                    tone: "ok",
                    label: "Active"
                  },
                  {
                    body: "The error is reported with the fix, per the skill's error handling.",
                    tone: "stop",
                    label: "Failed"
                  }
                ]
              },
              {
                kind: "end",
                title: "Report",
                short: "Summary plus pipeline config reminder",
                body: "Feeds create-scratch-org, and reminds you to point the nightly pipeline at the new snapshot."
              }
            ]
          }
        ],
        pairsWith: [
          {
            id: "create-scratch-org",
            note: "use the snapshot to create new scratch orgs"
          },
          {
            id: "snapshot-freshness-monitor",
            note: "validate the snapshot stays current"
          }
        ]
      },
      {
        id: "create-scratch-org",
        title: "create-scratch-org",
        desc: "Creates a Salesforce scratch org from a snapshot or via org shape, installs 2GP packages, deploys unpackaged metadata, and loads sample data. Use when a developer needs a fresh scratch org for feature work or testing.",
        when: [
          "Developer needs a new scratch org for feature work",
          "QA needs a test org with the latest package version",
          "Onboarding a new team member who needs a working environment",
          "Existing scratch org is corrupted or expired",
          "\"Create a scratch org\"",
          "\"Spin up a new dev org\"",
          "\"I need a fresh scratch org from snapshot\"",
          "\"Create a scratch org with the latest QA packages\""
        ],
        does: [
          "See SKILL.md for detailed steps."
        ],
        outputs: [
          "See SKILL.md for outputs."
        ],
        sample: "Create a scratch org",
        realExample: "Create a scratch org from the latest snapshot with QA packages installed.",
        flow: [
          {
            name: "Pre-flight",
            steps: [
              {
                kind: "start",
                title: "You invoke it",
                short: "You run /create-scratch-org",
                body: "Quick mode reuses your saved defaults; otherwise it walks the inputs. Use it whenever you need a fresh org for feature work or testing."
              },
              {
                kind: "step",
                title: "Pre-flight checks",
                short: "Dev Hub, alias, pool capacity, conflicts, org shape",
                body: "Selects the Dev Hub, auto-generates an alias, checks pool capacity so the team's slots are not exhausted, and checks for alias conflicts and an available org shape."
              },
              {
                kind: "choice",
                title: "Snapshot or org shape?",
                short: "Provision from snapshot or org shape?",
                body: "Two paths to the same provisioned org.",
                branches: [
                  {
                    body: "Lists snapshots, checks freshness, creates from the snapshot, and installs the version delta if the snapshot is stale.",
                    label: "Snapshot path"
                  },
                  {
                    body: "Creates from the shape, resolves the package version, and installs the 2GP packages.",
                    label: "Org shape path"
                  }
                ]
              }
            ]
          },
          {
            name: "Provision",
            steps: [
              {
                kind: "step",
                title: "Deploys unpackaged metadata",
                short: "Deploy pre-package, pre-release, post-release folders",
                body: "Connected Apps and credentials first, then sharing rules, queues, and role hierarchy, then reports and dashboards (non-blocking)."
              },
              {
                kind: "step",
                title: "Loads sample data",
                short: "Load the sample data set",
                body: "The org is usable for feature work immediately, not empty."
              },
              {
                kind: "end",
                title: "Org ready",
                short: "Fresh scratch org, ready to work in",
                body: "Delete it with scratch-org-delete when you are done, so the pool stays free."
              }
            ]
          }
        ],
        pairsWith: [
          {
            id: "scratch-org-delete",
            note: "clean up when the org is no longer needed"
          }
        ]
      },
      {
        id: "scratch-org-delete",
        title: "scratch-org-delete",
        desc: "Deletes a Salesforce scratch org by signup username (email). Use when cleaning up a finished scratch org so the team's pool isn't exhausted.",
        when: [
          "A scratch org is no longer needed and should be cleaned up",
          "DevHub org limit is approaching and old orgs need removal",
          "A failed scratch org creation left a dangling org",
          "\"Delete the scratch org for test-abc@example.com\"",
          "\"Remove my scratch org\"",
          "\"Clean up the old scratch org\"",
          "\"Delete the scratch org I created yesterday\"",
          "\"Free up a scratch org slot\""
        ],
        does: [
          "Looks up the scratch org by signup username.",
          "Shows the org details (alias, edition, expiry) for confirmation.",
          "Deletes the org via sf cli after you confirm.",
          "Cleans up the local org metadata."
        ],
        outputs: [
          "Pre-delete confirmation summary.",
          "Delete receipt with the freed slot count."
        ],
        sample: "Delete the scratch org with signup username [email].",
        realExample: "Delete the scratch org with signup username sofie.test+complaints@example.com. Confirm before deleting.",
        flow: [
          {
            name: "Delete the org",
            steps: [
              {
                kind: "start",
                title: "You give the username",
                short: "You name the scratch org by signup username",
                body: "The email-style signup username identifies exactly one org — no fuzzy matching on aliases."
              },
              {
                kind: "step",
                title: "Looks it up",
                short: "Look up the org and its details",
                body: "Alias, edition, and expiry are fetched so you can see what you are about to delete."
              },
              {
                kind: "gate",
                title: "Confirm the delete",
                short: "Delete this org?",
                body: "The org details are shown first. Deletes are irreversible, so nothing happens without a yes.",
                branches: [
                  {
                    body: "Removed via the sf CLI.",
                    label: "Delete it"
                  },
                  {
                    body: "Nothing is deleted.",
                    tone: "stop",
                    terminal: true,
                    label: "Keep it"
                  }
                ]
              },
              {
                kind: "step",
                title: "Cleans up locally",
                short: "Clean up the local org metadata",
                body: "The local auth and org records go too, so stale entries do not linger in your CLI."
              },
              {
                kind: "end",
                title: "Receipt",
                short: "Delete receipt with the freed slot count",
                body: "The pool count confirms the slot is back for the team."
              }
            ]
          }
        ],
        pairsWith: []
      },
      {
        id: "environment-drift-scanner",
        title: "environment-drift-scanner",
        desc: "Compares installed package versions and unpackaged metadata fingerprints across all environments. Flags when an env is behind or has rogue manual changes. Use on-demand or as a scheduled health check.",
        when: [
          "Daily health check (scheduled or manual)",
          "Before a promotion to verify the target env is in expected state",
          "After a failed deployment to check if manual changes caused the conflict",
          "When debugging \"it works in QA but not UAT\" issues",
          "When `release-gate-keeper` agent requests drift data",
          "\"Show me which envs are behind\"",
          "\"Is UAT in sync with what we deployed?\"",
          "\"Check for manual metadata changes in production\"",
          "\"Run a drift scan across all environments\"",
          "`/environment-drift-scanner`"
        ],
        does: [
          "See SKILL.md for detailed steps."
        ],
        outputs: [
          "See SKILL.md for outputs."
        ],
        sample: "[describe your task]",
        realExample: "Show me which envs are behind",
        flow: [
          {
            name: "Scan for drift",
            steps: [
              {
                kind: "start",
                title: "You invoke it",
                short: "You run /environment-drift-scanner",
                body: "Before a promotion, or as the nightly health check on environment sync."
              },
              {
                kind: "step",
                title: "Collects installed versions",
                short: "Collect installed package versions per environment",
                body: "Every environment reports what it actually has, not what the plan says it should have."
              },
              {
                kind: "step",
                title: "Gets the latest release",
                short: "Get the latest released version",
                body: "The reference point every environment is compared against."
              },
              {
                kind: "step",
                title: "Computes the delta",
                short: "Compute the version delta per environment",
                body: "Which environments are behind, and by how many versions."
              },
              {
                kind: "step",
                title: "Checks unpackaged drift",
                short: "Fingerprint unpackaged metadata, if orgs are reachable",
                body: "Metadata fingerprints catch rogue manual changes that version numbers never show."
              },
              {
                kind: "end",
                title: "Drift matrix",
                short: "Drift report with remediation commands",
                body: "Each drifted environment comes with the exact command to bring it back in line."
              }
            ]
          }
        ],
        pairsWith: []
      },
      {
        id: "snapshot-freshness-monitor",
        title: "snapshot-freshness-monitor",
        desc: "Validates that scratch org snapshots are current: latest released version installed, base data loaded, permission sets assigned. Flags stale snapshots before developers hit them. Use as a nightly check or on-demand.",
        when: [
          "Nightly post-refresh validation (scheduled)",
          "When a developer reports \"my scratch org is missing X\"",
          "After a new package version is released (verify snapshot includes it)",
          "When planning a new sprint and want to confirm dev environment readiness",
          "\"Are the scratch org snapshots up to date?\"",
          "\"Check if the dev snapshot has the latest version\"",
          "\"Why is my new scratch org missing the Flow changes?\"",
          "\"Validate snapshot freshness\"",
          "`/snapshot-freshness-monitor`"
        ],
        does: [
          "See SKILL.md for detailed steps."
        ],
        outputs: [
          "See SKILL.md for outputs."
        ],
        sample: "[describe your task]",
        realExample: "Are the scratch org snapshots up to date?",
        flow: [
          {
            name: "Check the snapshots",
            steps: [
              {
                kind: "start",
                title: "You invoke it",
                short: "You run /snapshot-freshness-monitor",
                body: "Before a sprint, or after a new package release — before developers hit a stale snapshot, not after."
              },
              {
                kind: "step",
                title: "Lists the snapshots",
                short: "List active snapshots",
                body: "Only Active snapshots matter; the rest are noise."
              },
              {
                kind: "step",
                title: "Compares versions",
                short: "Check installed version vs the latest release",
                body: "Each snapshot's installed package version against what has actually shipped."
              },
              {
                kind: "step",
                title: "Validates configuration",
                short: "Check permission sets, custom metadata, base data",
                body: "Key permission sets assigned, required configuration records present, and test records on the key objects."
              },
              {
                kind: "decision",
                title: "Freshness score",
                short: "Fresh or stale?",
                body: "A score per snapshot, not a single pass/fail for the pool.",
                branches: [
                  {
                    body: "Safe to provision from.",
                    tone: "ok",
                    label: "Fresh"
                  },
                  {
                    body: "Flagged, with the exact refresh commands included.",
                    tone: "warn",
                    label: "Stale"
                  }
                ]
              },
              {
                kind: "end",
                title: "Freshness report",
                short: "Report with refresh commands for stale snapshots",
                body: "Feed the refresh work into create-org-snapshot."
              }
            ]
          }
        ],
        pairsWith: []
      }
    ]
  },
  {
    id: "qa",
    name: "QA & Test",
    blurb: "Validate stories before build and produce executable test coverage after.",
    skills: [
      {
        id: "qa-validation",
        title: "qa-validation",
        desc: "Validates user stories from a QA or test analyst perspective. Use when test scenarios, traceability to acceptance criteria, negative testing, edge cases, regression impact, or defect retesting are required.",
        when: [
          "A story is built and needs test scenario coverage",
          "Acceptance criteria need to be validated for testability and completeness",
          "Regression scope, edge cases, or negative test paths need identification",
          "\"Write test scenarios for US#1234\"",
          "\"What should we test for this story?\"",
          "\"Validate the acceptance criteria coverage\"",
          "\"What are the edge cases for the deactivation flow?\"",
          "\"Check if the AC are testable\"",
          "\"What's the regression impact of this change?\"",
          "\"Design negative test cases for the waitlist feature\"",
          "\"Is this story ready for UAT?\"",
          "`/qa-validation`"
        ],
        does: [
          "Reads the story, ACs, and the related Feature.",
          "Builds positive, negative, and edge-case scenarios.",
          "Maps every scenario back to a specific AC line for traceability.",
          "Notes regression impact and which areas of the platform need retesting."
        ],
        outputs: [
          "Full output format with all sections and sub-sections: [Output Format](./assets/output-format.md)"
        ],
        sample: "Validate US#[ID] from a QA perspective. Produce test scenarios, traceability to ACs, and edge cases.",
        realExample: "Validate US#4127 from a QA perspective. Produce 8-12 test scenarios, trace each back to AC1-AC5, and call out the regression impact on the existing case-creation flow.",
        flow: [
          {
            name: "Validate the story",
            steps: [
              {
                kind: "start",
                title: "You invoke it",
                short: "You run /qa-validation on a story",
                body: "Use it when a story needs test scenarios, AC traceability, or a regression view — ideally in parallel with the build."
              },
              {
                kind: "step",
                title: "Reads the story",
                short: "Read the story, ACs, and the related Feature",
                body: "The Feature context catches scenarios the story text alone would miss."
              },
              {
                kind: "step",
                title: "Builds the scenarios",
                short: "Build positive, negative, and edge-case scenarios",
                body: "Negative testing and edge cases are built deliberately, not left to whoever executes."
              },
              {
                kind: "step",
                title: "Traces every scenario",
                short: "Map every scenario to a specific AC line",
                body: "Full traceability — an AC without a scenario, or a scenario without an AC, is a finding in itself."
              },
              {
                kind: "step",
                title: "Notes the blast radius",
                short: "Note regression impact and retest areas",
                body: "Which areas of the platform need retesting when this story lands."
              },
              {
                kind: "end",
                title: "Hands off",
                short: "Hand off to test-case-generation, loop with refinement",
                body: "Promote the scenarios into Azure Test Plans, or bounce back to story-refinement when the ACs need tightening."
              }
            ]
          }
        ],
        pairsWith: [
          {
            id: "story-refinement",
            note: "feedback loop with refinement when ACs need tightening"
          },
          {
            id: "test-case-generation",
            note: "promote scenarios into Azure Test Plans"
          }
        ]
      },
      {
        id: "test-case-generation",
        title: "test-case-generation",
        desc: "Generates and publishes manual test cases for Salesforce user stories in the KAB DNA project. Covers test plans, suites, linking, tester assignment, runs, and naming convention checks. Use when writing test cases, building test suites, or managing test runs for a refined User Story.",
        when: [
          "A story needs manual test cases written from its acceptance criteria",
          "Azure Test Plans, test suites, or test runs need to be created or managed",
          "Test cases need linking to user stories or assigning to testers",
          "\"Write test cases for US#1234\"",
          "\"Create a test plan for Sprint 14\"",
          "\"Build test suites for the waitlist feature\"",
          "\"Link test cases to the deactivation story\"",
          "\"Assign Gunjan as tester for these test cases\"",
          "\"Generate test steps from the acceptance criteria\"",
          "\"Create a test run for the pre-release check\"",
          "\"How many test cases do we have for this feature?\"",
          "`/test-case-generation`"
        ],
        does: [
          "Reads the validated scenarios from qa-validation.",
          "Writes each test case with steps, expected results, and the linked AC.",
          "Builds the Azure Test Plan and suite structure.",
          "Assigns testers from the team roster.",
          "Creates the test runs after confirmation."
        ],
        outputs: [
          "Test cases in the project's naming convention.",
          "Test suite linked to the parent User Story.",
          "Tester assignments and test runs.",
          "Coverage report against the story's ACs."
        ],
        sample: "Generate manual test cases for US#[ID] and stage them as an Azure Test Plan linked to the story.",
        realExample: "Generate manual test cases for US#4127, build a 'Complaints intake - Sprint 17' suite, link to the story, assign Lone and Henrik as testers, and create the runs.",
        flow: [
          {
            name: "Write the cases",
            steps: [
              {
                kind: "start",
                title: "You invoke it",
                short: "You run /test-case-generation on a story",
                body: "Run qa-validation first — this skill turns validated scenarios into published test cases."
              },
              {
                kind: "step",
                title: "Reads the scenarios",
                short: "Read the validated scenarios from qa-validation",
                body: "The scenarios, with their AC traceability, are the input — not the raw story."
              },
              {
                kind: "step",
                title: "Writes each case",
                short: "Write steps, expected results, linked AC",
                body: "Every case follows the project naming convention and links back to the AC it proves."
              },
              {
                kind: "step",
                title: "Builds the structure",
                short: "Build the Azure Test Plan and suite structure",
                body: "The suite is linked to the parent User Story so coverage is visible from the story."
              },
              {
                kind: "step",
                title: "Assigns the testers",
                short: "Assign testers from the team roster",
                body: "Default assignments from the roster, editable before anything is created."
              }
            ]
          },
          {
            name: "Publish",
            steps: [
              {
                kind: "gate",
                title: "Create the runs?",
                short: "Create the test runs in Azure Test Plans?",
                body: "Nothing lands in Test Plans before this answer.",
                branches: [
                  {
                    body: "Cases, suites, assignments, and runs are created.",
                    label: "Create them"
                  },
                  {
                    body: "Keep the cases as a local draft.",
                    tone: "stop",
                    terminal: true,
                    label: "Stop before publishing"
                  }
                ]
              },
              {
                kind: "end",
                title: "Published",
                short: "Runs created, coverage report against the ACs",
                body: "Execute the runs before release — release-readiness expects the results."
              }
            ]
          }
        ],
        pairsWith: [
          {
            id: "qa-validation",
            note: "run validation first to get scenarios"
          },
          {
            id: "release-readiness",
            note: "execute the runs before release"
          }
        ]
      }
    ]
  },
  {
    id: "release",
    name: "Release & Reporting",
    blurb: "Get a sprint demo-ready, ship it, document what changed, and report on delivered value.",
    skills: [
      {
        id: "release-readiness",
        title: "release-readiness",
        desc: "Handles sprint review, story acceptance, deployment, release verification, and retrospective activities. Use when a completed story needs demo preparation, PO sign-off, deployment execution, production verification, or team retrospective facilitation.",
        when: [
          "A sprint is complete and needs demo preparation or sprint review facilitation",
          "A story needs formal PO acceptance against the Definition of Done",
          "Deployment needs go/no-go assessment, production verification, or rollback planning",
          "\"Prepare the sprint review demo for Sprint 14\"",
          "\"Is this story ready to deploy?\"",
          "\"Run the go/no-go checklist for the release\"",
          "\"Check production health after the deployment\"",
          "\"Facilitate the retrospective for this sprint\"",
          "\"Create the deployment runbook for this release\"",
          "\"Get PO sign-off on US#1234\"",
          "\"What's the rollback plan if this deployment fails?\"",
          "`/release-readiness`"
        ],
        does: [
          "Pulls the committed sprint scope and the current state of each item.",
          "Confirms PO sign-offs and demo material exists.",
          "Builds the deployment plan with rollback steps.",
          "Lists production-verification checks.",
          "Drafts the retro prompts (what went well, what didn't, what to try)."
        ],
        outputs: [
          "Release checklist, risks, go-live recommendation, and retrospective templates: [Templates](./assets/templates.md)"
        ],
        sample: "Run release-readiness checks for sprint [number]. Confirm sign-offs, deployment plan, and demo readiness.",
        realExample: "Run release-readiness checks for sprint 17. Confirm PO sign-offs on US#4127 and US#4131, produce the deployment plan, and draft 4 retro prompts.",
        flow: [
          {
            name: "Ready the release",
            steps: [
              {
                kind: "start",
                title: "You invoke it",
                short: "You run /release-readiness at sprint end",
                body: "Use it when completed stories need demo prep, sign-off, deployment, and verification pulled into one picture."
              },
              {
                kind: "step",
                title: "Pulls the scope",
                short: "Pull the committed scope and each item's state",
                body: "The real board state, so the release conversation starts from facts."
              },
              {
                kind: "step",
                title: "Checks the sign-offs",
                short: "Confirm PO sign-offs and demo material",
                body: "Anything unsigned or undemoed is flagged before the go/no-go, not during it."
              },
              {
                kind: "step",
                title: "Builds the deployment plan",
                short: "Deployment plan with rollback steps",
                body: "Every deployment plan includes the way back, not just the way forward."
              },
              {
                kind: "step",
                title: "Lists the verification",
                short: "List production-verification checks",
                body: "What gets checked in production, by whom, right after go-live."
              },
              {
                kind: "step",
                title: "Drafts the retro",
                short: "Draft the retrospective prompts",
                body: "What went well, what didn't, what to try — ready for the ceremony."
              },
              {
                kind: "end",
                title: "Go-live recommendation",
                short: "Checklist, risks, and a recommendation",
                body: "Hands off to release-notes for the changelog and to communicate for the stakeholder email."
              }
            ]
          }
        ],
        pairsWith: [
          {
            id: "release-notes",
            note: "generate the changelog from the same sprint scope"
          },
          {
            id: "communicate",
            note: "draft the release email to stakeholders"
          }
        ]
      },
      {
        id: "release-notes",
        title: "release-notes",
        desc: "Generates structured release notes for a sprint or release by combining completed Azure DevOps work items with the feature registry and deployment metadata. Use when generating changelogs, sprint-review summaries, or pre-deployment release documentation.",
        when: [
          "At the end of a sprint when preparing release documentation",
          "Before a production deployment to document what's being released",
          "When stakeholders ask for a change log or release summary",
          "During sprint review to present delivered capabilities",
          "\"What shipped in Sprint 14?\"",
          "\"Generate a changelog for the release\"",
          "\"Create release notes for the stakeholder meeting\"",
          "\"Prepare release documentation for the deployment\"",
          "\"Summarize what we delivered this sprint\"",
          "\"Write release notes for the waitlist feature release\"",
          "\"What's going into production this week?\"",
          "`/release-notes`"
        ],
        does: [
          "Pulls all completed ADO items in the date range or sprint.",
          "Joins them with the feature registry to add module context.",
          "Groups by Epic and Feature.",
          "Drafts the prose summary, bug-fix list, and known-issues list.",
          "Adds deployment metadata (version, environment, date)."
        ],
        outputs: [
          "Sprint or release notes in Markdown.",
          "Grouped 'what's new', 'fixes', 'known issues' sections.",
          "Deployment metadata footer."
        ],
        sample: "Generate release notes for sprint [number] combining completed work items with feature-registry context.",
        realExample: "Generate release notes for sprint 17. Group by Feature, write a one-paragraph 'what's new', list the 4 bug fixes, and add the deployment metadata for prod release v2.4.0.",
        flow: [
          {
            name: "Generate the notes",
            steps: [
              {
                kind: "start",
                title: "You invoke it",
                short: "You run /release-notes for a sprint or release",
                body: "Use it for changelogs, sprint-review summaries, or pre-deployment release documentation."
              },
              {
                kind: "step",
                title: "Pulls the completed work",
                short: "Pull completed ADO items for the range",
                body: "Date range or sprint — only items that actually completed make the notes."
              },
              {
                kind: "step",
                title: "Joins the registry",
                short: "Join with the feature registry for module context",
                body: "Refresh the registry first with feature-registry if it is stale — the notes inherit its context."
              },
              {
                kind: "step",
                title: "Groups the work",
                short: "Group by Epic and Feature",
                body: "Readers see capabilities, not a flat ticket list."
              },
              {
                kind: "step",
                title: "Drafts the sections",
                short: "Draft what's new, fixes, known issues",
                body: "Prose summary plus the bug-fix and known-issues lists."
              },
              {
                kind: "end",
                title: "Markdown notes",
                short: "Notes with a deployment metadata footer",
                body: "Version, environment, and date stamped at the bottom. Produce them once release-readiness signs the sprint off."
              }
            ]
          }
        ],
        pairsWith: [
          {
            id: "feature-registry",
            note: "refresh the registry first if it's stale"
          },
          {
            id: "release-readiness",
            note: "produce notes once the sprint is signed off"
          }
        ]
      },
      {
        id: "feature-registry",
        title: "feature-registry",
        desc: "Generates and maintains a living feature registry by scanning Salesforce metadata and correlating with completed ADO work items. Use when refreshing the feature registry before a demo, sprint review, or stakeholder update.",
        when: [
          "After a sprint is completed and stories are accepted",
          "When a stakeholder asks \"what has been built?\"",
          "When preparing release documentation or sprint review decks",
          "When onboarding a new team member to understand delivered capabilities",
          "\"What features have been built so far?\"",
          "\"Update the feature registry after Sprint 14\"",
          "\"Scan project-knowledge/source-code for new metadata and update the registry\"",
          "\"What Salesforce objects and flows do we have?\"",
          "\"Show me what's been delivered for the waitlist capability\"",
          "\"Refresh the feature registry before the sprint review\"",
          "\"Which stories have Apex code linked to them?\"",
          "`/feature-registry`"
        ],
        does: [
          "Scans Salesforce metadata (objects, fields, Flows, LWC).",
          "Correlates with completed ADO work items via the US# traceability comments.",
          "Builds the feature registry table.",
          "Flags features that exist in metadata but have no traceable ADO item, and vice versa."
        ],
        outputs: [
          "Feature registry table: feature, owner, delivered in, ADO link, metadata refs.",
          "Drift report: metadata-without-ADO and ADO-without-metadata.",
          "Exportable Markdown or CSV."
        ],
        sample: "Regenerate the feature registry by scanning Salesforce metadata and correlating with completed ADO items.",
        realExample: "Regenerate the feature registry for the complaints area. Scan Salesforce metadata under the complaints capability package, correlate with completed ADO items, and flag drift.",
        flow: [
          {
            name: "Rebuild the registry",
            steps: [
              {
                kind: "start",
                title: "You invoke it",
                short: "You run /feature-registry",
                body: "Refresh before a demo, sprint review, or stakeholder update — the registry is only useful when it is current."
              },
              {
                kind: "step",
                title: "Scans the metadata",
                short: "Scan Salesforce objects, fields, Flows, LWC",
                body: "What actually exists in the org's metadata, straight from source."
              },
              {
                kind: "step",
                title: "Correlates with ADO",
                short: "Correlate via US# traceability comments",
                body: "The header comments sf-codegen writes are the join key between code and completed work items."
              },
              {
                kind: "step",
                title: "Builds the table",
                short: "Build the registry: feature, owner, delivered in, links",
                body: "Feature, owner, the release it shipped in, the ADO link, and the metadata references."
              },
              {
                kind: "decision",
                title: "Traceability check",
                short: "Everything traceable?",
                body: "Both directions are checked.",
                branches: [
                  {
                    body: "Every feature maps both ways.",
                    tone: "ok",
                    label: "Fully traced"
                  },
                  {
                    body: "Metadata with no traceable ADO item, or ADO items with no metadata — both land in the drift report.",
                    tone: "warn",
                    label: "Drift found"
                  }
                ]
              },
              {
                kind: "end",
                title: "Registry plus drift report",
                short: "Exportable registry, Markdown or CSV",
                body: "The registry feeds release-notes its module context."
              }
            ]
          }
        ],
        pairsWith: [
          {
            id: "release-notes",
            note: "registry feeds the release-notes context"
          }
        ]
      },
      {
        id: "milestone-review",
        title: "milestone-review",
        desc: "Compares delivered value against contractual milestones, SLAs, and timelines. Reads ADO state + A/B-bilags, checks scope deviations and GK 0092 buffer. Produces a steering-ready report. Use when preparing a phase review, steering meeting, or delivered-value vs business-case comparison.",
        when: [
          "Phase milestone review (\"where are we against the contract?\")",
          "Steering meeting preparation",
          "Delivered value vs business case comparison",
          "SLA attainment reporting",
          "GK 0092 buffer consumption tracking",
          "Sprint-over-sprint progress assessment",
          "Programme Manager or Sponsor asks about project health",
          "\"Where are we against the contract milestones?\"",
          "\"Prepare the milestone report for the steering meeting\"",
          "\"How much of the GK 0092 buffer have we consumed?\"",
          "\"Compare delivered features against what was promised\"",
          "\"Are we on track for the H1 2026 delivery?\"",
          "\"Show me SLA attainment for the current phase\"",
          "\"What's our progress against the A-bilag commitments?\"",
          "`/milestone-review`"
        ],
        does: [
          "Reads ADO board state and the contractual milestones in the A/B bilags.",
          "Compares delivered vs committed per milestone.",
          "Pulls SLA attainment from the relevant data sources.",
          "Checks GK 0092 buffer consumption.",
          "Drafts the steering-meeting report."
        ],
        outputs: [
          "Milestone status table (committed, delivered, variance).",
          "SLA attainment summary.",
          "Buffer consumption status.",
          "Steering-meeting paper draft."
        ],
        sample: "Prepare a milestone review for [phase]. Compare delivered value vs contractual milestones and SLA attainment.",
        realExample: "Prepare a milestone review for phase 2 (rollout). Compare delivered value vs Bilag A milestones M2.1-M2.5, show SLA attainment for incident response, and report GK 0092 buffer use.",
        flow: [
          {
            name: "Review the milestone",
            steps: [
              {
                kind: "start",
                title: "You invoke it",
                short: "You run /milestone-review before a steering meeting",
                body: "Use it when preparing a phase review or a delivered-value vs business-case comparison."
              },
              {
                kind: "step",
                title: "Reads both sides",
                short: "Read ADO board state and the milestone bilags",
                body: "What was delivered, against what was contractually committed — from the A/B bilags, not from memory."
              },
              {
                kind: "step",
                title: "Compares per milestone",
                short: "Compare delivered vs committed, with variance",
                body: "A status table per milestone: committed, delivered, variance."
              },
              {
                kind: "step",
                title: "Pulls SLA attainment",
                short: "Pull SLA attainment from the data sources",
                body: "The SLA picture sits alongside the milestone picture in the same paper."
              },
              {
                kind: "step",
                title: "Checks the buffer",
                short: "Check GK 0092 buffer consumption",
                body: "How much contractual buffer has been consumed, and what remains."
              },
              {
                kind: "end",
                title: "Steering paper",
                short: "Steering-meeting report, ready to table",
                body: "Pairs with contractual-search for exact obligations and scope-register for the open deviations."
              }
            ]
          }
        ],
        pairsWith: [
          {
            id: "contractual-search",
            note: "look up exact contract obligations"
          },
          {
            id: "scope-register",
            note: "include open scope deviations"
          }
        ]
      },
      {
        id: "deployment-sequencer",
        title: "deployment-sequencer",
        desc: "Reads the package manifest and unpackaged metadata folders to determine the correct deployment execution order. Detects dependency violations such as fields referenced before objects exist. Use as a pre-install pipeline hook.",
        when: [
          "As a pre-install validation step in the pipeline",
          "When debugging \"Cannot find field X\" or \"Entity Y not found\" deploy errors",
          "When adding new unpackaged metadata folders and need to verify ordering",
          "When `release-gate-keeper` agent requests deployment plan validation",
          "\"What order should we deploy these changes?\"",
          "\"Validate the deployment sequence for the current package\"",
          "\"Why did the deploy fail with missing reference?\"",
          "\"Check if unpackaged metadata has dependency issues\"",
          "`/deployment-sequencer`"
        ],
        does: [
          "See SKILL.md for detailed steps."
        ],
        outputs: [
          "See SKILL.md for outputs."
        ],
        sample: "[describe your task]",
        realExample: "What order should we deploy these changes?",
        flow: [
          {
            name: "Sequence the deploy",
            steps: [
              {
                kind: "start",
                title: "You invoke it",
                short: "You run /deployment-sequencer",
                body: "In a pre-install pipeline to validate ordering, or when debugging a dependency-related deploy failure."
              },
              {
                kind: "step",
                title: "Scans the sources",
                short: "Scan the package manifest and unpackaged folders",
                body: "Everything that will deploy, across packaged and unpackaged metadata."
              },
              {
                kind: "step",
                title: "Builds the dependency graph",
                short: "Build the dependency graph across metadata",
                body: "Apex references, field-to-object parents, formula references in validation rules, Flow lookups, and permission-set references."
              },
              {
                kind: "decision",
                title: "Is the ordering valid?",
                short: "Ordering violations?",
                body: "The graph is checked against the planned order.",
                branches: [
                  {
                    body: "The planned order deploys cleanly.",
                    tone: "ok",
                    label: "Sequence confirmed"
                  },
                  {
                    body: "Fields referenced before their objects exist, and similar breaks — named per item.",
                    tone: "stop",
                    label: "Violations flagged"
                  }
                ]
              },
              {
                kind: "step",
                title: "Checks destructive changes",
                short: "Check destructive-changes safety",
                body: "Pre- and post-destructive changes are verified against what the rest of the deploy still needs."
              },
              {
                kind: "end",
                title: "Deployment plan",
                short: "The 9-step install sequence, validated",
                body: "Auth, pre-destructive, pre-install metadata, package install, post-install metadata, permissions, data, post-destructive, tests — in that order."
              }
            ]
          }
        ],
        pairsWith: []
      },
      {
        id: "hotfix-conflict-detector",
        title: "hotfix-conflict-detector",
        desc: "Analyzes the diff between main (hotfix source) and develop (sprint work) to predict metadata conflicts that will surface during back-merge. Use when a hotfix branch is created or before back-merging a hotfix.",
        when: [
          "When a hotfix branch is created from `master`",
          "Before back-merging a completed hotfix into `develop`",
          "When planning parallel hotfix and sprint work",
          "When `release-gate-keeper` needs conflict risk data for a hotfix promotion",
          "\"What conflicts will this hotfix cause when we back-merge?\"",
          "\"Analyze hotfix/US#123 against develop\"",
          "\"Which files are touched by both the hotfix and current sprint?\"",
          "\"Risk report for back-merging the production fix\"",
          "`/hotfix-conflict-detector`"
        ],
        does: [
          "See SKILL.md for detailed steps."
        ],
        outputs: [
          "See SKILL.md for outputs."
        ],
        sample: "[describe your task]",
        realExample: "What conflicts will this hotfix cause when we back-merge?",
        flow: [
          {
            name: "Predict the conflicts",
            steps: [
              {
                kind: "start",
                title: "A hotfix exists",
                short: "You run it when a hotfix branch is created",
                body: "Or right before back-merging a completed hotfix into develop."
              },
              {
                kind: "step",
                title: "Finds the divergence",
                short: "Fetch refs, identify the common ancestor",
                body: "The comparison starts where main and develop actually diverged."
              },
              {
                kind: "step",
                title: "Diffs both sides",
                short: "Diff the hotfix and develop since divergence",
                body: "What the hotfix touches versus what sprint work has touched in the meantime."
              },
              {
                kind: "step",
                title: "Finds the overlap",
                short: "Find the overlapping files",
                body: "Only files changed on both sides can conflict — those are the candidates."
              },
              {
                kind: "decision",
                title: "Classifies the risk",
                short: "Conflict risk per file",
                body: "Each overlapping file is classified, not just listed.",
                branches: [
                  {
                    body: "The back-merge is clean.",
                    tone: "ok",
                    label: "No overlap"
                  },
                  {
                    body: "Overlapping files where the changes do not collide.",
                    tone: "warn",
                    label: "Low risk"
                  },
                  {
                    body: "Real collisions, with detail and the developer who owns the develop-side change.",
                    tone: "stop",
                    label: "HIGH risk"
                  }
                ]
              },
              {
                kind: "end",
                title: "Conflict report",
                short: "Risk report plus the suggested merge order",
                body: "Complete the hotfix, back-merge immediately, resolve the named files, run the full suite on develop."
              }
            ]
          }
        ],
        pairsWith: []
      },
      {
        id: "package-ancestry-validator",
        title: "package-ancestry-validator",
        desc: "Validates that the target org's installed version is a valid ancestor of the version being installed. Prevents 'ancestor not found' failures that block deploys. Use as a pre-install gate in promotion pipelines or on-demand before manual installs.",
        when: [
          "Before any package install to a non-empty org",
          "As a pre-install pipeline hook (called by `release-gate-keeper` agent)",
          "When debugging a failed install that reports ancestor issues",
          "When verifying that a hotfix version can be installed on top of the current production version",
          "\"Can I install 04tXXX on the QA org?\"",
          "\"Validate ancestor chain for this version before promoting\"",
          "\"Why did the install fail with ancestor error?\"",
          "\"Check upgrade path from current prod to this version\"",
          "`/package-ancestry-validator`"
        ],
        does: [
          "See SKILL.md for detailed steps."
        ],
        outputs: [
          "See SKILL.md for outputs."
        ],
        sample: "[describe your task]",
        realExample: "Can I install 04tXXX on the QA org?",
        flow: [
          {
            name: "Validate the upgrade path",
            steps: [
              {
                kind: "start",
                title: "An install is planned",
                short: "You run it before installing into a non-empty org",
                body: "Prevents the 'ancestor not found' failure that blocks deploys halfway through a release."
              },
              {
                kind: "step",
                title: "Reads the target org",
                short: "Get the currently installed version",
                body: "What the org actually has installed today."
              },
              {
                kind: "step",
                title: "Reads the new version",
                short: "Get the ancestry chain of the version to install",
                body: "The full ancestor chain, not just the direct parent."
              },
              {
                kind: "decision",
                title: "Is the chain valid?",
                short: "Installed version in the ancestor chain?",
                body: "Three outcomes, checked in order.",
                branches: [
                  {
                    body: "The installed version is the direct ancestor. Clean upgrade.",
                    tone: "ok",
                    label: "MATCH: direct ancestor"
                  },
                  {
                    body: "The installed version appears earlier in the chain. The upgrade path is still valid.",
                    tone: "ok",
                    label: "Multi-hop: found further back"
                  },
                  {
                    body: "The installed version is not in the chain. Stop — installing would fail against the org.",
                    tone: "stop",
                    terminal: true,
                    label: "NOT FOUND: install will fail"
                  }
                ]
              },
              {
                kind: "end",
                title: "Verdict",
                short: "Upgrade path verdict with the evidence",
                body: "Feed a failed verdict into the release plan before it becomes a mid-deploy incident."
              }
            ]
          }
        ],
        pairsWith: []
      },
      {
        id: "promotion-readiness-scorer",
        title: "promotion-readiness-scorer",
        desc: "Scores a package version's readiness to move to the next environment. Checks code coverage, linked work item states, open blockers, test pass rate, and back-merge status. Use before any environment promotion.",
        when: [
          "Before promoting a package from QA to UAT",
          "Before promoting from UAT to production",
          "As part of `release-gate-keeper` agent's aggregated verdict",
          "When RM needs a data-backed go/no-go recommendation",
          "\"Is this version ready to promote to UAT?\"",
          "\"Score the readiness for the current QA build\"",
          "\"Can we go to production?\"",
          "\"What's blocking promotion?\"",
          "`/promotion-readiness-scorer`"
        ],
        does: [
          "See SKILL.md for detailed steps."
        ],
        outputs: [
          "See SKILL.md for outputs."
        ],
        sample: "[describe your task]",
        realExample: "Is this version ready to promote to UAT?",
        flow: [
          {
            name: "Score the promotion",
            steps: [
              {
                kind: "start",
                title: "A version wants to move",
                short: "You run it before promoting to the next environment",
                body: "One scorecard answers whether this package version is ready to move up."
              },
              {
                kind: "step",
                title: "Runs the checks",
                short: "Coverage, work items, blockers, tests, back-merge, ancestry",
                body: "Code coverage, linked work-item states, open blockers, test pass rate, back-merge status, and ancestry validation — the full rubric, every time."
              },
              {
                kind: "decision",
                title: "Scores against the rubric",
                short: "Ready to promote?",
                body: "The rubric decides; opinions do not.",
                branches: [
                  {
                    body: "Promote.",
                    tone: "ok",
                    label: "Ready"
                  },
                  {
                    body: "Promotable, with the soft findings named.",
                    tone: "warn",
                    label: "Ready with warnings"
                  },
                  {
                    body: "The blocking items are listed individually — fix those, re-score.",
                    tone: "stop",
                    label: "Blocked"
                  }
                ]
              },
              {
                kind: "end",
                title: "Scorecard",
                short: "Promotion readiness scorecard",
                body: "A record of why the promotion happened, or why it waited."
              }
            ]
          }
        ],
        pairsWith: []
      },
      {
        id: "rollback-advisor",
        title: "rollback-advisor",
        desc: "When a package install fails mid-deploy, determines the safest recovery path: install previous version, partial metadata revert, or manual intervention. Use after a failed deployment.",
        when: [
          "A package install failed mid-way and the org is in an inconsistent state",
          "A promotion succeeded but a critical bug was found in the new version",
          "RM needs to decide between rollback, hotfix-forward, or manual intervention",
          "When `package-build-doctor` agent diagnoses a failure that requires rollback",
          "\"The install to UAT failed, what do I do?\"",
          "\"We need to rollback production to the previous version\"",
          "\"The deploy partially completed, is the org safe?\"",
          "\"What's the rollback plan for this release?\"",
          "`/rollback-advisor`"
        ],
        does: [
          "See SKILL.md for detailed steps."
        ],
        outputs: [
          "See SKILL.md for outputs."
        ],
        sample: "[describe your task]",
        realExample: "The install to UAT failed, what do I do?",
        flow: [
          {
            name: "Advise the recovery",
            steps: [
              {
                kind: "start",
                title: "An install failed",
                short: "A package install failed mid-deploy, or a critical bug shipped",
                body: "The moment things are on fire is the wrong time to improvise a recovery path — this skill walks it."
              },
              {
                kind: "step",
                title: "Assesses the org",
                short: "Assess the current org state",
                body: "What actually landed before the failure, captured before anything else changes."
              },
              {
                kind: "step",
                title: "Classifies the failure",
                short: "Classify the failure type",
                body: "A mid-install failure and a post-install critical bug call for different recoveries."
              },
              {
                kind: "decision",
                title: "Picks the safest path",
                short: "Which recovery path?",
                body: "The recommendation comes with feasibility validated, and the alternatives it considered.",
                branches: [
                  {
                    body: "Roll back to the last known-good version, with the execution commands.",
                    tone: "ok",
                    label: "Install previous version"
                  },
                  {
                    body: "Surgical revert of what broke, when a full rollback costs too much.",
                    tone: "warn",
                    label: "Partial metadata revert"
                  },
                  {
                    body: "Automation is not safe here — the advisory says exactly what a human must do.",
                    tone: "stop",
                    label: "Manual intervention"
                  }
                ]
              },
              {
                kind: "end",
                title: "Advisory",
                short: "Recovery plan plus post-rollback actions",
                body: "Capture state, execute, verify — then open the ADO incident, notify the affected teams, and fix the root cause on develop."
              }
            ]
          }
        ],
        pairsWith: []
      },
      {
        id: "version-changelog-generator",
        title: "version-changelog-generator",
        desc: "Generates a structured changelog by diffing two package version IDs. Extracts new fields, modified classes, flow changes, and permission changes. Pure metadata diff, no ADO dependency. Use after promoting a version.",
        when: [
          "After promoting a new version to production (release notes)",
          "When comparing what changed between two specific versions",
          "When stakeholders ask \"what's in this release?\"",
          "When audit requires a metadata-level change manifest",
          "\"What changed between v1.2 and v1.3?\"",
          "\"Generate changelog for the latest release\"",
          "\"What metadata was added in this version?\"",
          "\"Show me the diff between these two package versions\"",
          "`/version-changelog-generator`"
        ],
        does: [
          "See SKILL.md for detailed steps."
        ],
        outputs: [
          "See SKILL.md for outputs."
        ],
        sample: "[describe your task]",
        realExample: "What changed between v1.2 and v1.3?",
        flow: [
          {
            name: "Diff the versions",
            steps: [
              {
                kind: "start",
                title: "You give two versions",
                short: "You give it two package version IDs",
                body: "A pure metadata diff — no ADO dependency, so it works for audit as well as release notes."
              },
              {
                kind: "step",
                title: "Fetches the metadata",
                short: "Get both versions' metadata",
                body: "The actual shipped content of each version."
              },
              {
                kind: "step",
                title: "Diffs the source",
                short: "Diff the source between the versions",
                body: "What genuinely changed between the two, file by file."
              },
              {
                kind: "step",
                title: "Classifies the changes",
                short: "Classify: schema, logic, flow, configuration",
                body: "Changes are grouped by kind so readers can jump to what they care about."
              },
              {
                kind: "step",
                title: "Extracts the meaning",
                short: "Extract meaningful diffs, not raw XML",
                body: "New fields with object and type, method-level summaries for modified classes, changed Flow elements, and permission access added or removed."
              },
              {
                kind: "end",
                title: "Structured changelog",
                short: "Changelog with per-category sections and statistics",
                body: "Feed it into release-notes, or keep it as the audit record of what shipped."
              }
            ]
          }
        ],
        pairsWith: [
          {
            id: "release-notes"
          }
        ]
      }
    ]
  },
  {
    id: "scope",
    name: "Scope & Change Control",
    blurb: "Validate new asks against the contract and track scope deviations over time.",
    skills: [
      {
        id: "scope-gate",
        title: "scope-gate",
        desc: "Validates a requirement, ask, or change against the KAB contract (A/B-bilags), SLAs, compliance, and the GK 0092 buffer. Returns a classification with evidence; standalone or embedded as a pre-check. Use when scoping a new ask, gating an ADO work item, or as a pre-check inside another skill.",
        when: [
          "A new requirement arrives from KAB",
          "An existing requirement is being changed or expanded",
          "During story refinement when scope is unclear",
          "During backlog creation to flag out-of-scope stories",
          "When a client ask feels like it might exceed the contract",
          "When compliance, legal, or SLA implications need checking",
          "\"Is this in scope?\"",
          "\"Does the contract cover integration with external system X?\"",
          "\"Check if KAB can ask for a custom reporting dashboard\"",
          "\"Is the waitlist email notification in our scope?\"",
          "\"This feels like scope creep - validate against the bilags\"",
          "\"Run a scope check on Behov 4.7\"",
          "\"Can we be asked to build a mobile app?\"",
          "`/scope-gate`"
        ],
        does: [
          "Reads the ask plus the relevant bilags.",
          "Classifies as IN_SCOPE, GREY_AREA, or OUT_OF_SCOPE.",
          "Returns evidence: which bilag, section, and clause supports the classification.",
          "Recommends ADO tags and a routing suggestion (proceed, change request, descope).",
          "Logs the result to the Scope Deviation Register if it's grey or out."
        ],
        outputs: [
          "Classification + confidence.",
          "Evidence table with citations.",
          "Recommended ADO tags.",
          "Register entry (when applicable)."
        ],
        sample: "Validate this ask against scope: [describe the ask]. Return classification with evidence and recommended ADO tags.",
        realExample: "Validate this ask against scope: 'Add SMS notifications when a complaint changes state.' Return classification with citations from Bilag 03A and recommended tags.",
        flow: [
          {
            name: "Classify the ask",
            steps: [
              {
                kind: "start",
                title: "An ask arrives",
                short: "A requirement, ask, or change hits the gate",
                body: "Run standalone on a new ask, or embedded as the pre-check inside backlog-creation, story-refinement, and requirements-ingestion."
              },
              {
                kind: "step",
                title: "Reads the baseline",
                short: "Read the ask plus the relevant bilags",
                body: "The scope baseline is the statement of work and contract — the classification is evidence-based, never a gut call."
              },
              {
                kind: "decision",
                title: "Classifies it",
                short: "In scope, grey area, or out?",
                body: "Three outcomes, each with a confidence score.",
                branches: [
                  {
                    body: "Carries on, evidence attached.",
                    tone: "ok",
                    label: "IN_SCOPE, proceed"
                  },
                  {
                    body: "Logged to the Scope Deviation Register so it gets a decision instead of drifting.",
                    tone: "warn",
                    label: "GREY_AREA, logged"
                  },
                  {
                    body: "Routed to a Change Request or descoped — and logged. Never silently built.",
                    tone: "stop",
                    label: "OUT_OF_SCOPE, logged"
                  }
                ]
              },
              {
                kind: "step",
                title: "Returns the evidence",
                short: "Evidence table: bilag, section, clause",
                body: "Every classification cites the exact clause that supports it."
              },
              {
                kind: "step",
                title: "Recommends the routing",
                short: "Recommend ADO tags and routing",
                body: "Proceed, change request, or descope — plus the tags that make the decision visible on the work item."
              },
              {
                kind: "end",
                title: "Register entry",
                short: "Grey and out items land in the register",
                body: "scope-register manages the entries from here; milestone-review reports on them."
              }
            ]
          }
        ],
        pairsWith: [
          {
            id: "scope-register",
            note: "review and resolve register entries"
          },
          {
            id: "backlog-creation",
            note: "embedded as the per-story validator"
          }
        ]
      },
      {
        id: "scope-register",
        title: "scope-register",
        desc: "Manages the Scope Deviation Register (.github/data/scope-deviations.json). Use when you need to list deviations, update resolution status, generate steering-meeting reports, or analyze scope drift trends. Complements scope-gate, which creates entries.",
        when: [
          "List all open scope deviations",
          "Update a deviation's status (resolved, absorbed, escalated)",
          "Generate a steering-meeting-ready scope report",
          "Analyze scope drift trends over time",
          "Export deviations for a specific sprint or date range",
          "\"Show all open scope deviations\"",
          "\"Update SD-003 to resolved\"",
          "\"Prepare the scope report for steering\"",
          "\"How many scope deviations do we have this sprint?\"",
          "\"What's the scope drift trend over the last 3 sprints?\"",
          "\"Export grey area items for the steering meeting\"",
          "\"Mark the reporting deviation as absorbed\"",
          "`/scope-register`"
        ],
        does: [
          "Reads the JSON-backed scope deviation register.",
          "Lists, filters, and groups deviations.",
          "Updates resolution status with confirmation.",
          "Generates steering-meeting summary reports.",
          "Plots drift trends by month or phase."
        ],
        outputs: [
          "Open-deviations report grouped by status.",
          "Updated register file with audit trail.",
          "Trend analysis (Markdown or chart on request)."
        ],
        sample: "Generate a steering-meeting report of all open scope deviations grouped by status.",
        realExample: "Generate a steering-meeting report of all open scope deviations grouped by status. Include resolution proposals for the 3 oldest.",
        flow: [
          {
            name: "Manage the register",
            steps: [
              {
                kind: "start",
                title: "You invoke it",
                short: "You run /scope-register",
                body: "scope-gate creates the entries; this skill is how you work with them afterwards."
              },
              {
                kind: "choice",
                title: "What do you need?",
                short: "List, update, report, or trends?",
                body: "Four jobs on the same JSON-backed register.",
                branches: [
                  {
                    body: "Grouped by status, filterable.",
                    label: "List and filter deviations"
                  },
                  {
                    body: "Status changes only with confirmation, and every change lands in the audit trail.",
                    label: "Update resolution status"
                  },
                  {
                    body: "A summary ready to table.",
                    label: "Steering-meeting report"
                  },
                  {
                    body: "Deviations plotted by month or phase.",
                    label: "Drift trends"
                  }
                ]
              },
              {
                kind: "step",
                title: "Reads the register",
                short: "Read the scope deviation register",
                body: "The JSON file is the single source of truth — no side lists."
              },
              {
                kind: "end",
                title: "Report",
                short: "Report, updated register, or trend analysis",
                body: "Include the report in milestone papers via milestone-review."
              }
            ]
          }
        ],
        pairsWith: [
          {
            id: "scope-gate",
            note: "scope-gate creates entries, scope-register manages them"
          },
          {
            id: "milestone-review",
            note: "include the report in milestone papers"
          }
        ]
      }
    ]
  },
  {
    id: "ado-ops",
    name: "ADO Operations",
    blurb: "Direct utility on Azure Boards: comment, attach, delete, audit, report.",
    skills: [
      {
        id: "ado-comment",
        title: "ado-comment",
        desc: "Posts discussion comments on ADO work items with @mention support. Use when notifying a person, posting a refinement summary, asking a stakeholder, flagging a blocker, or sharing QA results.",
        when: [
          "You need to notify someone of a refinement decision.",
          "You're flagging a blocker, asking a stakeholder, or sharing QA results.",
          "You want a refinement summary on the work item."
        ],
        does: [
          "Reads the work item and any context you give.",
          "Drafts the comment in clean HTML (the only format ADO renders properly).",
          "Adds @mentions in the format ADO requires.",
          "Posts after you confirm."
        ],
        outputs: [
          "Comment preview before post.",
          "Post receipt with the new comment ID."
        ],
        sample: "Post a comment on US#[ID]: [comment text]. Mention [person] if relevant.",
        realExample: "Post a comment on US#4127 summarising today's refinement: tightened ACs, surfaced BRE dependency. Mention Sofie and Mads.",
        flow: [
          {
            name: "Draft and post",
            steps: [
              {
                kind: "start",
                title: "You name an item and a message",
                short: "You give a work item and what to say",
                body: "Notify a person, post a refinement summary, ask a stakeholder, flag a blocker, or share QA results."
              },
              {
                kind: "step",
                title: "Drafts in clean HTML",
                short: "Draft the comment in clean HTML",
                body: "HTML is the only format ADO renders properly — markdown pasted raw turns into soup."
              },
              {
                kind: "step",
                title: "Adds the mentions",
                short: "Add @mentions in ADO's required format",
                body: "Mentions only notify people when they are formatted exactly the way ADO expects."
              },
              {
                kind: "gate",
                title: "Preview first",
                short: "Post this comment?",
                body: "You see the rendered comment before it goes anywhere.",
                branches: [
                  {
                    body: "Lands on the work item's discussion thread.",
                    label: "Post it"
                  },
                  {
                    body: "Nothing is written.",
                    tone: "stop",
                    terminal: true,
                    label: "Don't post"
                  }
                ]
              },
              {
                kind: "end",
                title: "Receipt",
                short: "Post receipt with the comment ID",
                body: "Pairs with communicate for drafting the message persona-aware first."
              }
            ]
          }
        ],
        pairsWith: [
          {
            id: "story-refinement",
            note: "post the refinement summary automatically"
          },
          {
            id: "communicate",
            note: "draft the wording first"
          }
        ]
      },
      {
        id: "ado-image",
        title: "ado-image",
        desc: "Adds images or screenshots to Azure DevOps work items — either embedded in the description or posted as a discussion comment. Use when a user wants to attach a screenshot, embed a reference image, or add a visual to a work item. Supports images provided in the chat, image URLs, and links as fallback.",
        when: [
          "Someone asked for a screenshot of a bug or UI state.",
          "A reference image needs to live on the work item.",
          "You want to embed a process diagram in the description."
        ],
        does: [
          "Accepts an image dropped in chat, a URL, or a path.",
          "Uploads to the work item's attachments store.",
          "Embeds the image in the description or posts it as a discussion comment, your choice.",
          "Falls back to a link if embedding fails."
        ],
        outputs: [
          "Updated work-item description or new comment with the image.",
          "Attachment URL for reference."
        ],
        sample: "Attach this screenshot to US#[ID] in the description (or as a comment).",
        realExample: "Attach this complaint-intake mockup screenshot to US#4127 in the description, right under the ACs. Caption: 'Approved by KAB design review, 2 June 2026.'",
        flow: [
          {
            name: "Attach the image",
            steps: [
              {
                kind: "start",
                title: "You provide an image",
                short: "Drop an image in chat, or give a URL or path",
                body: "A screenshot for a bug, a reference mockup, any visual a work item needs."
              },
              {
                kind: "step",
                title: "Uploads it",
                short: "Upload to the work item's attachments store",
                body: "The image lives on the work item itself, not on an external link that rots."
              },
              {
                kind: "choice",
                title: "Where should it show?",
                short: "Embed in description, or post as comment?",
                body: "Your choice per image.",
                branches: [
                  {
                    body: "The image renders inline in the work item description.",
                    label: "Embed in the description"
                  },
                  {
                    body: "The image lands in the discussion thread instead.",
                    label: "Post as a discussion comment"
                  }
                ]
              },
              {
                kind: "step",
                title: "Falls back safely",
                short: "Fall back to a link if embedding fails",
                body: "Embedding quirks never lose the image — worst case you get the attachment link."
              },
              {
                kind: "end",
                title: "Done",
                short: "Updated work item plus the attachment URL",
                body: "The URL is returned for reference elsewhere."
              }
            ]
          }
        ],
        pairsWith: [
          {
            id: "ado-comment",
            note: "use comment-mode for ephemeral references"
          }
        ]
      },
      {
        id: "ado-delete",
        title: "ado-delete",
        desc: "Deletes ADO work items individually, in bulk, or by hierarchy. Filters by type, parent, area path, iteration, state, ID range. Interactive preview and confirmation at every step. Use when cleaning up a project, removing test data, pruning stale items, or deleting everything under a specific Epic or Feature.",
        when: [
          "Cleaning up test data after a workshop.",
          "Pruning stale Removed-state items.",
          "Deleting everything under a deprecated Epic or Feature."
        ],
        does: [
          "Lets you filter by type, parent, area path, iteration, state, or ID range.",
          "Shows the full preview list before any delete.",
          "Asks for explicit confirmation, with the count and a sample.",
          "Performs the deletes with progress feedback.",
          "Writes an audit summary."
        ],
        outputs: [
          "Preview table.",
          "Confirmation prompt with safety message.",
          "Delete receipts and audit log."
        ],
        sample: "Help me clean up: delete all work items under Feature F#[ID] in state Removed.",
        realExample: "Help me clean up: delete all work items under Feature F#3902 in state Removed, created before 1 May 2026. Show preview first.",
        flow: [
          {
            name: "Select what goes",
            steps: [
              {
                kind: "start",
                title: "You invoke it",
                short: "You run /ado-delete",
                body: "Cleaning up a project, removing test data, pruning stale items, or clearing everything under an Epic or Feature."
              },
              {
                kind: "step",
                title: "Filters the candidates",
                short: "Filter by type, parent, area path, iteration, state, ID range",
                body: "The filters compose, so 'all closed Tasks under Feature 210 in iteration 12' is one selection."
              },
              {
                kind: "step",
                title: "Shows the full preview",
                short: "Preview the complete list before any delete",
                body: "Every item that would be deleted is listed — no sampling at this stage."
              }
            ]
          },
          {
            name: "Delete with a receipt",
            steps: [
              {
                kind: "gate",
                title: "Explicit confirmation",
                short: "Delete N items? Confirm explicitly",
                body: "The count and a sample are shown, with a safety message. Nothing is deleted without a clear yes.",
                branches: [
                  {
                    body: "Runs with progress feedback as it goes.",
                    label: "Delete them"
                  },
                  {
                    body: "Nothing is deleted.",
                    tone: "stop",
                    terminal: true,
                    label: "Cancel"
                  }
                ]
              },
              {
                kind: "end",
                title: "Audit summary",
                short: "Delete receipts and the audit log",
                body: "A record of exactly what was removed, and by whose confirmation."
              }
            ]
          }
        ],
        pairsWith: []
      },
      {
        id: "ado-quality-guardian",
        title: "ado-quality-guardian",
        desc: "Scans the ADO project, scores every work item against the quality rubric, and detects MECE gaps/overlaps at Feature level. Read-only; produces a prioritised improvement report. Use when auditing backlog quality or detecting MECE gaps before a sprint review.",
        when: [
          "Periodic quality health check on the full project",
          "Before a release, to ensure all stories meet the quality bar",
          "After a batch of new items are created (e.g. after `requirements-ingestion`)",
          "When a manager or Scrum Master asks about ADO board quality",
          "\"Is our ADO board in good shape?\"",
          "\"Run a quality check on the backlog\"",
          "\"Score the stories under Epic#1234\"",
          "\"Check acceptance criteria quality across all stories\"",
          "\"Find work items with weak descriptions or missing AC\"",
          "\"Are there orphaned stories or hierarchy violations?\"",
          "\"Quality scan the items created in Sprint 14\"",
          "`/ado-quality-guardian`"
        ],
        does: [
          "Scans every active work item.",
          "Scores against the quality rubric (title, description, ACs, owner, estimate, etc).",
          "Detects MECE gaps and overlaps at Feature level.",
          "Produces a prioritised improvement report (top fixes first)."
        ],
        outputs: [
          "Rubric scores per work item.",
          "Top-N improvement list.",
          "MECE gap and overlap matrix at Feature level."
        ],
        sample: "Run the quality guardian scan across the project and produce a prioritised improvement report.",
        realExample: "Run the quality guardian scan across the complaints area. Produce a prioritised improvement report and call out any MECE gaps between Features.",
        flow: [
          {
            name: "Audit the backlog",
            steps: [
              {
                kind: "start",
                title: "You invoke it",
                short: "You run /ado-quality-guardian",
                body: "Auditing backlog quality, or hunting MECE gaps before a sprint review. Read-only, always."
              },
              {
                kind: "step",
                title: "Scans everything active",
                short: "Scan every active work item",
                body: "The whole active backlog, not a sample."
              },
              {
                kind: "step",
                title: "Scores each item",
                short: "Score against the quality rubric",
                body: "Title, description, ACs, owner, estimate and the rest — a rubric score per item."
              },
              {
                kind: "step",
                title: "Checks the Feature level",
                short: "Detect MECE gaps and overlaps",
                body: "Features that overlap each other, and gaps nothing covers — the structural problems item-level scores miss."
              },
              {
                kind: "end",
                title: "Improvement report",
                short: "Prioritised report, top fixes first",
                body: "Read-only by design. Fix stories via story-refinement, notify owners via ado-comment or communicate."
              }
            ]
          }
        ],
        pairsWith: [
          {
            id: "ado-quality-report",
            note: "send the report by email after review"
          },
          {
            id: "story-refinement",
            note: "fix the top issues one-by-one"
          }
        ]
      },
      {
        id: "ado-quality-report",
        title: "ado-quality-report",
        desc: "Runs live ADO consistency checks on active Features, User Stories, and Tasks in the DNA project and opens a unified HTML error-table email in Outlook. Read-only. Recipients fixed during rollout phase. Use when generating the manual quality consistency email for the rollout-phase stakeholders.",
        when: [
          "Henrik or another stakeholder asks for a list of inconsistent work items",
          "You want to proactively share an ADO health snapshot before a sprint or steering meeting",
          "Any trigger like \"generate ADO quality report\", \"check ADO consistency\", `/ado-quality-report`"
        ],
        does: [
          "Runs the same checks as the quality guardian, scoped to active Features, Stories, and Tasks.",
          "Builds a single HTML error table.",
          "Opens the email in Outlook with the fixed recipient list pre-filled.",
          "Leaves the send action to you."
        ],
        outputs: [
          "HTML error-table email open in Outlook, ready to review and send."
        ],
        sample: "Run the live ADO quality report and prepare the HTML email for the recipients.",
        realExample: "Run the live ADO quality report for the rollout-phase Features and prepare the HTML email for the standard recipients.",
        flow: [
          {
            name: "Build the email",
            steps: [
              {
                kind: "start",
                title: "You invoke it",
                short: "You run /ado-quality-report",
                body: "The manual quality consistency email for the rollout-phase stakeholders. Read-only against ADO."
              },
              {
                kind: "step",
                title: "Runs the checks",
                short: "Run the guardian checks on active Features, Stories, Tasks",
                body: "Same rubric as ado-quality-guardian, scoped to what is currently active."
              },
              {
                kind: "step",
                title: "Builds one table",
                short: "Build a single HTML error table",
                body: "One unified table, because stakeholders read one email, not seven reports."
              },
              {
                kind: "step",
                title: "Opens Outlook",
                short: "Open the email with recipients pre-filled",
                body: "The recipient list is fixed during the rollout phase, so it is pre-filled, not asked."
              },
              {
                kind: "end",
                title: "You press send",
                short: "The send stays with you",
                body: "The skill never sends the email itself — review it in Outlook and send when satisfied."
              }
            ]
          }
        ],
        pairsWith: [
          {
            id: "ado-quality-guardian",
            note: "deeper audit, no email"
          }
        ]
      },
      {
        id: "ado-pr-review",
        title: "ado-pr-review",
        desc: ">",
        when: [
          "\"Review PR 12345\"",
          "\"Check this pull request: https://dev.azure.com/.../pullrequest/12345\"",
          "\"Does PR 12345 fulfill the linked story?\"",
          "\"Review this PR against the wiki and documentation\"",
          "\"Check PR comments, checks, and related user stories\"",
          "`/ado-pr-review`"
        ],
        does: [
          "See SKILL.md for detailed steps."
        ],
        outputs: [
          "See SKILL.md for outputs."
        ],
        sample: "[describe your task]",
        realExample: "/ado-pr-review [real example — update manually]",
        flow: [
          {
            name: "Review the PR",
            steps: [
              {
                kind: "start",
                title: "You give a PR",
                short: "You give a PR ID or URL",
                body: "\"Review PR 12345\" or \"does this PR fulfil the linked story?\""
              },
              {
                kind: "step",
                title: "Resolves the PR",
                short: "Fetch metadata: branches, reviewers, linked items",
                body: "Repository, source and target branch, status, and linked work-item references, all from the PR itself. It asks one question only if the repository cannot be resolved."
              },
              {
                kind: "step",
                title: "Gathers the evidence",
                short: "Gather the diff and commit evidence",
                body: "The actual changes, not the description's claims about them."
              },
              {
                kind: "step",
                title: "Resolves the stories",
                short: "Resolve the linked user stories",
                body: "The review's yardstick is the story and its acceptance criteria."
              },
              {
                kind: "step",
                title: "Loads the docs",
                short: "Load the relevant project documentation",
                body: "Conventions and standards the diff should be judged against."
              },
              {
                kind: "decision",
                title: "Reviews and verdicts",
                short: "Does the PR fulfil the story?",
                body: "The report includes a before-approval checklist either way.",
                branches: [
                  {
                    body: "Verdict with the checklist confirmed.",
                    tone: "ok",
                    label: "Meets the story"
                  },
                  {
                    body: "Each gap tied to the AC or convention it violates.",
                    tone: "warn",
                    label: "Gaps called out"
                  }
                ]
              },
              {
                kind: "gate",
                title: "Post it?",
                short: "Post the review as a PR comment?",
                body: "Optional, and only with your yes.",
                branches: [
                  {
                    body: "The review lands on the PR.",
                    label: "Post the comment"
                  },
                  {
                    body: "The report stays with you.",
                    label: "Keep it in chat"
                  }
                ]
              },
              {
                kind: "end",
                title: "Review report",
                short: "Report, checklist, verdict",
                body: "Pairs with dev-plan on the build side."
              }
            ]
          }
        ],
        pairsWith: [
          {
            id: "dev-plan"
          }
        ]
      }
    ]
  },
  {
    id: "governance",
    name: "Governance & Compliance",
    blurb: "Audit the repo and keep documentation in sync after changes.",
    skills: [
      {
        id: "governance-audit",
        title: "governance-audit",
        desc: "Runs the repo-wide governance & AI-readiness audit across 7 dimensions (tokens, AI credits, security, compliance, AI Act, GenAI policy, context). Produces a scored report. Use when asked to audit, score, or assess the repository's governance posture.",
        when: [
          "Triggers: \"audit the repo\", \"score the repo\", \"run all dimensions\", \"run governance checks\", \"AI readiness check\", \"EU AI Act check\", \"re-assess governance\"."
        ],
        does: [
          "Runs all 7 dimension checks (hash-chain verification, skills-budget audit, dry-run secret scan, AI Act register coverage, GenAI policy coverage, GDPR register coverage, context budget audit).",
          "Scores each dimension.",
          "Produces a prioritised remediation list."
        ],
        outputs: [
          "Produce a markdown table:",
          "```",
          "| Dim | Area | Score | Findings |",
          "| --- | --- | --- | --- |",
          "| 1 | Token efficiency | 9.5 | always-loaded 312 lines (under budget) |",
          "| 2 | AI Credits | 9.0 | ledger working, multipliers correct |",
          "| ... |",
          "| **Overall** | | **9.1** | weighted |",
          "```",
          "Then list:",
          "**Top 3 fixes** (highest leverage)",
          "**Residual risks** (cannot be auto-fixed — needs human action)",
          "**Verification commands** (so user can re-run)"
        ],
        sample: "Run the full governance and AI-readiness audit and produce the scored report.",
        realExample: "Run the full governance and AI-readiness audit before the Q3 steering meeting. Produce the scorecard and the top 5 remediations.",
        flow: [
          {
            name: "Audit the repo",
            steps: [
              {
                kind: "start",
                title: "You invoke it",
                short: "You run /governance-audit",
                body: "Whenever you need the repository's governance posture audited, scored, or assessed."
              },
              {
                kind: "step",
                title: "Runs all 7 dimensions",
                short: "Tokens, AI credits, security, compliance, AI Act, GenAI policy, context",
                body: "Hash-chain verification, skills-budget audit, dry-run secret scan, AI Act register coverage, GenAI policy coverage, GDPR register coverage, and the context budget audit — all of them, every run."
              },
              {
                kind: "step",
                title: "Scores each dimension",
                short: "Score per dimension, weighted overall",
                body: "A markdown scorecard with findings per dimension and a weighted overall score."
              },
              {
                kind: "end",
                title: "Remediation list",
                short: "Top 3 fixes, residual risks, verification commands",
                body: "Highest-leverage fixes first, risks that need a human named separately, and the commands to re-run the checks yourself. Hand the fixes to doc-impact for the doc updates."
              }
            ]
          }
        ],
        pairsWith: [
          {
            id: "doc-impact",
            note: "draft doc updates for the remediations"
          }
        ]
      },
      {
        id: "doc-impact",
        title: "doc-impact",
        desc: "Identifies docs that need updating after a requirement closes, process changes, or a new agreement lands. Auto-drafts edits for local repo files; lists shared delivery docs for manual review. Use when a requirement closes, a process changes, or a new agreement lands and you need to know which docs drift.",
        when: [
          "A requirement or user story has been developed and documentation needs catching up",
          "A new process decision or client agreement was made that may affect existing documents",
          "A developer, solution architect, or BA wants to know which docs are impacted by their work",
          "Before a release, to ensure documentation is current",
          "\"What documents need updating after US#1234?\"",
          "\"Update documentation for the waitlist changes\"",
          "\"Which docs are impacted by this new agreement?\"",
          "\"Check if any project documents are out of date\"",
          "\"Run a doc impact analysis for the deactivation feature\"",
          "\"We changed the invoicing process - what docs need updating?\"",
          "\"Ensure all documentation is current before the release\"",
          "`/doc-impact`"
        ],
        does: [
          "Searches across the repo legs (instructions, skills, preferences, agents) for overlapping content.",
          "Lists local repo files that need updates.",
          "Drafts the concrete edits for local files.",
          "Lists shared delivery docs (Confluence, OneDrive) for manual review."
        ],
        outputs: [
          "Local-files-to-edit list with concrete diffs.",
          "Shared-docs-to-review list with reasons."
        ],
        sample: "Identify which project documents need updating after this change: [describe change]. Draft concrete edits for local docs.",
        realExample: "Identify which project documents need updating after the complaints intake form went live. Draft concrete edits for the local instructions and the user-guides wiki section.",
        flow: [
          {
            name: "Find the drift",
            steps: [
              {
                kind: "start",
                title: "Something changed",
                short: "A requirement closed, a process changed, or an agreement landed",
                body: "The moment documentation starts drifting — this skill finds where."
              },
              {
                kind: "step",
                title: "Searches the repo legs",
                short: "Search instructions, skills, preferences, agents",
                body: "Every leg of the repo that could mention the changed thing."
              },
              {
                kind: "step",
                title: "Lists what needs updating",
                short: "List the local files that need updates",
                body: "Each file with the reason it is affected."
              },
              {
                kind: "step",
                title: "Drafts the edits",
                short: "Draft concrete edits for local files",
                body: "Actual diffs, not 'consider updating' notes."
              },
              {
                kind: "end",
                title: "Two lists",
                short: "Local diffs plus shared docs for manual review",
                body: "Repo files get drafted edits; Confluence and OneDrive docs get listed with reasons, because those need a human. Runs well after a governance-audit remediation list."
              }
            ]
          }
        ],
        pairsWith: [
          {
            id: "governance-audit",
            note: "run after a governance remediation list"
          }
        ]
      }
    ]
  },
  {
    id: "domain",
    name: "Domain Knowledge",
    blurb: "KAB-specific feature knowledge baked into the agents. Loaded on demand when a skill needs domain expertise.",
    skills: [
      {
        id: "bre-new-tenancy",
        title: "bre-new-tenancy",
        desc: "Domain knowledge for New Tenancy Allocation and BRE setup. Use when writing or refining stories for tenant allocation, waitlist distribution, decision tables, priority cascades, or applicant search logic.",
        when: [
          "Writing or refining stories under Feature #5642 (BRE Setup) or Feature #5643 (New Tenancy Offer)",
          "Understanding the 36-step rotation cycle and distribution principles",
          "Working with priority cascades and flexible criteria",
          "Reviewing applicant search logic, re-run scenarios, or offer generation",
          "Working on Decision Table 1 (Distribution Principle) or Decision Table 2 (Flexible Criteria)",
          "\"Refine the BRE allocation story\"",
          "\"How does the distribution principle rotation work?\"",
          "\"Write a story for the applicant search flow\"",
          "\"What priority groups exist for Kommunal anvisning?\"",
          "\"Explain the new tenancy allocation process\"",
          "`/bre-new-tenancy`"
        ],
        does: [
          "Provides authoritative domain context for the allocation process.",
          "Recommends KRAV references from the contract corpus.",
          "Suggests test scenarios specific to allocation logic.",
          "Flags edge cases the team has hit before."
        ],
        outputs: [
          "Domain-aware story refinements.",
          "Recommended BRE decision-table structure.",
          "Edge-case checklist."
        ],
        sample: "Refine a user story for tenant allocation that fits the BRE distribution principles.",
        realExample: "Refine a story for the waitlist auto-purge after offer rejection. Apply the BRE priority cascade rules and call out the edge cases for special-needs applicants.",
        flow: [
          {
            name: "Domain context on tap",
            steps: [
              {
                kind: "start",
                title: "The topic matches",
                short: "Loaded automatically for allocation and BRE stories",
                body: "Case assignment, waitlist distribution, decision tables, priority cascades, applicant search — when the story touches these, the context loads."
              },
              {
                kind: "step",
                title: "Injects the domain",
                short: "Provide authoritative allocation-process context",
                body: "The allocation process as this project actually runs it, not a generic description."
              },
              {
                kind: "step",
                title: "Anchors to the contract",
                short: "Recommend KRAV references from the corpus",
                body: "The formal requirements behind the domain rules, cited."
              },
              {
                kind: "step",
                title: "Suggests the tests",
                short: "Suggest allocation-specific test scenarios",
                body: "Scenarios specific to allocation logic, including the BRE decision-table structure."
              },
              {
                kind: "step",
                title: "Names the traps",
                short: "Flag edge cases the team has hit before",
                body: "The edge-case checklist exists because someone already paid for each entry."
              },
              {
                kind: "end",
                title: "Domain-aware refinement",
                short: "Feeds story-refinement automatically",
                body: "The refined story arrives already knowing the domain."
              }
            ]
          }
        ],
        pairsWith: [
          {
            id: "story-refinement",
            note: "loaded automatically when the topic matches"
          }
        ]
      },
      {
        id: "complaints-case",
        title: "complaints-case",
        desc: "Domain knowledge skill for the Complaints Case feature area. Use when writing or refining stories related to complaint record types, support processes, complaint subtypes (illegal subletting, house rule violations, consumption/decision complaints), and Guidance to Success content.",
        when: [
          "Writing or refining stories under Feature #5650 (Complaints Case)",
          "Working with complaint subtypes and their specific fields",
          "Defining Guidance to Success content for complaint handling",
          "Understanding the complaint support process and status model",
          "\"Refine the complaints case story\"",
          "\"What subtypes exist for complaints?\"",
          "\"Write Guidance to Success text for complaints\"",
          "\"What fields are needed for illegal subletting?\"",
          "`/complaints-case`"
        ],
        does: [
          "Provides domain context for each complaint subtype.",
          "Recommends record-type structure and support processes.",
          "Suggests user journeys per subtype.",
          "Flags compliance considerations (GDPR, special-category data)."
        ],
        outputs: [
          "Domain-aware story refinements.",
          "Suggested record-type structure.",
          "Compliance call-outs."
        ],
        sample: "Refine a user story for the [complaint subtype] support process.",
        realExample: "Refine the user story for the illegal-subletting complaint subtype. Recommend the record-type fields and the Guidance to Success content for the case officer.",
        flow: [
          {
            name: "Domain context on tap",
            steps: [
              {
                kind: "start",
                title: "The topic matches",
                short: "Loaded automatically for Complaints Case stories",
                body: "Complaint record types, support processes, and subtypes — illegal subletting, house-rule violations, consumption and decision complaints."
              },
              {
                kind: "step",
                title: "Injects the domain",
                short: "Provide context per complaint subtype",
                body: "Each subtype behaves differently; the context keeps them distinct."
              },
              {
                kind: "step",
                title: "Recommends the structure",
                short: "Recommend record types and support processes",
                body: "The record-type structure that fits the subtypes, before someone invents a parallel one."
              },
              {
                kind: "step",
                title: "Suggests the journeys",
                short: "Suggest user journeys per subtype",
                body: "How each complaint type actually moves from intake to resolution."
              },
              {
                kind: "step",
                title: "Flags compliance",
                short: "Flag GDPR and special-category data",
                body: "Complaints carry sensitive data — the compliance call-outs come with the domain, not as an afterthought."
              },
              {
                kind: "end",
                title: "Domain-aware refinement",
                short: "Feeds story-refinement automatically",
                body: "The refined story arrives already knowing the domain."
              }
            ]
          }
        ],
        pairsWith: [
          {
            id: "story-refinement",
            note: "loaded automatically when the topic matches"
          }
        ]
      },
      {
        id: "queues-routing",
        title: "queues-routing",
        desc: "Domain knowledge skill for case routing, queue ownership, public-group-based assignment, and housing-department-based eligibility in Boligplatform. Use when creating or refining user stories for routing logic, queue management, fallback behaviour, workload balancing, and SLA-based prioritisation.",
        when: [
          "Writing or refining stories under Feature #5653 (Queues/Routing)",
          "Understanding how cases are routed to queues based on Housing Organization",
          "Working with Public Group membership and user-organization relations",
          "Defining routing fallback behaviour and exception handling",
          "Working on SLA prioritisation, workload balancing, or audit trail requirements",
          "\"Write stories for the routing feature\"",
          "\"Refine the queue access story\"",
          "\"How does case routing work?\"",
          "\"What happens when a case can't be routed?\"",
          "`/queues-routing`"
        ],
        does: [
          "Provides domain context for the queues model.",
          "Recommends public-group-based assignment patterns.",
          "Suggests fallback rules for unrouted cases.",
          "Maps housing-department eligibility to queue membership."
        ],
        outputs: [
          "Routing logic specification.",
          "Queue ownership matrix.",
          "Fallback behaviour rules."
        ],
        sample: "Define case routing logic for [scenario] using public-group-based assignment and housing-department eligibility.",
        realExample: "Define case routing logic for incoming complaints by department: route to the local-team queue first, fall back to the central complaints queue if no owner in 4 hours, escalate to the legal queue if the complaint subtype is illegal subletting.",
        flow: [
          {
            name: "Domain context on tap",
            steps: [
              {
                kind: "start",
                title: "The topic matches",
                short: "Loaded automatically for routing and queue stories",
                body: "Case routing, queue ownership, public-group-based assignment, workload balancing, SLA-based prioritisation."
              },
              {
                kind: "step",
                title: "Injects the model",
                short: "Provide the queues model context",
                body: "How queues, ownership, and eligibility fit together on this project."
              },
              {
                kind: "step",
                title: "Recommends the pattern",
                short: "Recommend public-group-based assignment",
                body: "The assignment pattern the platform actually supports well, with the ownership matrix."
              },
              {
                kind: "step",
                title: "Covers the fallbacks",
                short: "Suggest fallback rules for unrouted cases",
                body: "Every routing design needs an answer for the case nothing matches."
              },
              {
                kind: "step",
                title: "Maps the eligibility",
                short: "Map housing-department eligibility to queues",
                body: "Department eligibility becomes queue membership, specified rather than implied."
              },
              {
                kind: "end",
                title: "Routing specification",
                short: "Feeds story-refinement automatically",
                body: "Routing logic spec, ownership matrix, and fallback rules land in the refined story."
              }
            ]
          }
        ],
        pairsWith: [
          {
            id: "story-refinement",
            note: "loaded automatically when the topic matches"
          }
        ]
      },
      {
        id: "delivery-playbook",
        title: "delivery-playbook",
        desc: "Complete reference for the KAB Salesforce delivery studio — team structure, all 15 roles, 7-stage lifecycle, RACI, and role-to-stage activity mapping. Use when answering questions about who does what, which role owns a stage, who is on the team, or when you need to cross-reference roles, activities, stages, or responsibilities.",
        when: [
          "Answering questions about who does what, which role owns a stage, who is on the team",
          "Cross-referencing roles, activities, stages, or responsibilities",
          "\"Who owns the testing stage?\"",
          "\"What does the BA do during refinement?\"",
          "\"Show me the RACI matrix\"",
          "\"Who is on the KAB delivery team?\"",
          "\"What are the Scrum Master's responsibilities?\"",
          "\"Which roles are involved in sprint planning?\"",
          "\"What's the org chart for the project?\"",
          "\"Who is the Technical Architect?\""
        ],
        does: [
          "Provides authoritative role descriptions (PO, BA, Dev, QA, RM, SM, TA, SA, PL, PSA, PM, TL, PMgr, DL, Sponsor).",
          "Maps activities to stages and roles.",
          "Answers RACI questions per activity.",
          "Cross-references to the matching skills and agents."
        ],
        outputs: [
          "Role lookup with responsibilities.",
          "Stage-by-stage activity map.",
          "RACI matrix for any activity."
        ],
        sample: "Who owns the [stage] activity in the KAB delivery studio? Show the RACI.",
        realExample: "Who owns the 'sprint planning' activity in the KAB delivery studio? Show the RACI and the skills/agents that support it.",
        flow: [
          {
            name: "Answer the who-does-what",
            steps: [
              {
                kind: "start",
                title: "You ask who does what",
                short: "You ask about roles, stages, or responsibilities",
                body: "\"Who owns UAT?\", \"what does the RM do in stage 4?\", or any RACI question."
              },
              {
                kind: "step",
                title: "Looks up the role",
                short: "Authoritative descriptions for all 15 roles",
                body: "PO, BA, Dev, QA, RM, SM, TA, SA, PL, PSA, PM, TL, PMgr, DL, Sponsor — as this delivery studio defines them."
              },
              {
                kind: "step",
                title: "Maps to the lifecycle",
                short: "Map activities to the 7 stages and roles",
                body: "The stage-by-stage activity map — which role does what, when."
              },
              {
                kind: "step",
                title: "Answers the RACI",
                short: "RACI per activity",
                body: "Responsible, accountable, consulted, informed — per activity, not per vague area."
              },
              {
                kind: "end",
                title: "Cross-references",
                short: "Points at the matching skills and agents",
                body: "Feeds its role mapping straight into story-lifecycle plans."
              }
            ]
          }
        ],
        pairsWith: [
          {
            id: "story-lifecycle",
            note: "feeds the role mapping into the lifecycle plan"
          }
        ]
      },
      {
        id: "datamodel-page-audit",
        title: "datamodel-page-audit",
        desc: ">",
        when: [
          "\"Review `<Object>.md` and ensure it aligns with the solution\"",
          "\"Verify the Tenancy datamodel page against source\"",
          "\"Update the Account object page to match the latest metadata\"",
          "\"Audit every datamodel page\" (loop the process per page)",
          "\"Does this datamodel page reflect the deployed fields / layouts?\"",
          "`/datamodel-page-audit`",
          "Do **not** use for generating code, ADO work items, or editing Salesforce metadata. This skill only reads source and edits the wiki `.md` page."
        ],
        does: [
          "See SKILL.md for detailed steps."
        ],
        outputs: [
          "Report verified vs corrected per area (object resolution, fields, record types, compact layouts, page layouts, object config, template), noting which areas were skipped because the object lacks that shape. If fully aligned, say so explicitly with the evidence checked. Always end with a Confidence label and a `Sources:` table citing the metadata files inspected."
        ],
        sample: "[describe your task]",
        realExample: "/datamodel-page-audit [real example — update manually]",
        flow: [
          {
            name: "Audit the page",
            steps: [
              {
                kind: "start",
                title: "You name an object page",
                short: "You point it at a datamodel page",
                body: "\"Verify the Service Request page against source\" or \"update the Account page to match the metadata.\""
              },
              {
                kind: "decision",
                title: "Step 0: resolve the object",
                short: "What shape is this object?",
                body: "The object's shape decides which checks even apply.",
                branches: [
                  {
                    body: "All applicable steps run.",
                    tone: "ok",
                    label: "Standard or custom object"
                  },
                  {
                    body: "Fields and publish behaviour only — no record types, layouts, or sharing to check.",
                    label: "Platform event"
                  },
                  {
                    body: "Managed-package or not yet deployed. Only checkable claims are verified, the Status callout is confirmed, and nothing is fabricated.",
                    tone: "warn",
                    label: "No source folder"
                  }
                ]
              },
              {
                kind: "step",
                title: "Verifies the content",
                short: "Inventory fields, record types, compact layouts",
                body: "Every claimed field and layout checked against the actual metadata source."
              },
              {
                kind: "step",
                title: "Verifies the config",
                short: "Verify FlexiPages and object-level config",
                body: "Including the facet indirection FlexiPages hide things behind."
              },
              {
                kind: "step",
                title: "Fixes the drift",
                short: "Enforce the template, fix drift",
                body: "The page is corrected to match source and the standard page template."
              },
              {
                kind: "step",
                title: "Adds the history",
                short: "Populate ADO refs and deleted-field notes from git",
                body: "Git history supplies the ADO references and the notes on fields that used to exist."
              },
              {
                kind: "end",
                title: "Audit report",
                short: "Verified vs corrected, per area",
                body: "Worth pairing with learn to capture recurring drift patterns."
              }
            ]
          }
        ],
        pairsWith: [
          {
            id: "learn"
          }
        ]
      }
    ]
  },
  {
    id: "comms",
    name: "Communication",
    blurb: "Talk to the team with the right tone for the right audience, using up-to-date persona profiles.",
    skills: [
      {
        id: "communicate",
        title: "communicate",
        desc: "Drafts persona-aware messages for ADO comments, emails, slides, and bug reports. Auto-suggests recipients from team profiles and lets you pick before curating tone and detail. Use when drafting any communication that needs to reach specific team members.",
        when: [
          "You need to write a message and want it tuned to the recipient.",
          "You want recipient suggestions before writing.",
          "The same content needs different versions for different audiences."
        ],
        does: [
          "Suggests recipients based on intent (e.g. 'tell the QA leads' picks Lone and Henrik).",
          "Asks you to confirm or pick from the suggested list.",
          "Tailors tone and level of detail to the audience.",
          "Drafts the artefact (ADO comment, email, slide, bug report).",
          "Confirms before sending or posting."
        ],
        outputs: [
          "Recipient suggestion list.",
          "Draft message in the chosen format.",
          "Send-or-post confirmation."
        ],
        sample: "Draft a [comment, email, or slide] for [audience] about [topic]. Suggest the right recipients first.",
        realExample: "Draft an email to the KAB product owner and the Deloitte QA lead about the complaints intake demo on Friday. Suggest recipients first, then draft a short professional update.",
        flow: [
          {
            name: "Draft for the audience",
            steps: [
              {
                kind: "start",
                title: "You say who to tell",
                short: "You describe the message and the audience",
                body: "\"Tell the QA leads the regression run is green\" — intent in, persona-aware draft out."
              },
              {
                kind: "step",
                title: "Suggests the recipients",
                short: "Suggest recipients from the intent",
                body: "\"The QA leads\" resolves to actual people from the team profiles."
              },
              {
                kind: "gate",
                title: "You confirm the list",
                short: "Confirm or adjust the recipients",
                body: "Nothing is drafted for people you did not pick."
              },
              {
                kind: "step",
                title: "Tailors the tone",
                short: "Tailor tone and detail to the audience",
                body: "The same news reads differently to a sponsor and to a developer — the personas drive the register."
              },
              {
                kind: "step",
                title: "Drafts the artefact",
                short: "Draft the ADO comment, email, slide, or bug report",
                body: "The format you asked for, ready to review."
              },
              {
                kind: "gate",
                title: "Send or post?",
                short: "Send it, post it, or keep the draft?",
                body: "Sending and posting only happen after this answer.",
                branches: [
                  {
                    body: "Via ado-comment, with the preview flow that skill enforces.",
                    label: "Post as ADO comment"
                  },
                  {
                    body: "After your confirmation.",
                    label: "Send the email"
                  },
                  {
                    body: "Nothing leaves the chat.",
                    tone: "stop",
                    terminal: true,
                    label: "Keep the draft"
                  }
                ]
              },
              {
                kind: "end",
                title: "Delivered",
                short: "Message out, in the audience's language",
                body: "New team members become available recipients via create-persona."
              }
            ]
          }
        ],
        pairsWith: [
          {
            id: "ado-comment",
            note: "use as the comment poster"
          },
          {
            id: "release-readiness",
            note: "draft the release email"
          }
        ]
      },
      {
        id: "create-persona",
        title: "create-persona",
        desc: "Creates a new team persona file from LinkedIn and Deloitte People Network (DPN) profiles. Use when onboarding a new team member, adding a person to the delivery studio, or refreshing an existing persona with updated profile data. Prompts for LinkedIn URL and DPN URL, scrapes both profiles, and generates a structured persona markdown file.",
        when: [
          "A new team member joins the project and needs a persona file",
          "An existing persona needs enriching with LinkedIn/DPN data",
          "You want a consistent, project-relevant persona — not a CV dump",
          "\"Add a new team member to the project\"",
          "\"Create a persona for [name]\"",
          "\"Update [name]'s persona with their LinkedIn info\"",
          "\"Onboard a new developer - set up their persona\"",
          "\"Refresh the persona file for the new QA engineer\"",
          "\"We have a new Scrum Master - create their profile\""
        ],
        does: [
          "Asks for the LinkedIn URL and the DPN URL.",
          "Scrapes both profiles.",
          "Generates a structured persona markdown file under .claude/personas/.",
          "Refreshes an existing persona if one is found."
        ],
        outputs: [
          "Persona markdown file with role, expertise, contact, language preferences.",
          "Diff if refreshing an existing file."
        ],
        sample: "Create a new persona file for [name] using their LinkedIn and DPN profiles.",
        realExample: "Create a persona for Sofie Lindholm. LinkedIn: linkedin.com/in/sofie-lindholm. DPN: dpn.deloitte.com/sofie-lindholm. Save under .claude/personas/.",
        flow: [
          {
            name: "Build the persona",
            steps: [
              {
                kind: "start",
                title: "Someone joins",
                short: "You run /create-persona for a team member",
                body: "Onboarding a new person, or refreshing an existing persona with updated profile data."
              },
              {
                kind: "gate",
                title: "The two URLs",
                short: "LinkedIn URL and DPN URL?",
                body: "Both profiles are asked for up front — the persona is built from real data, not guesses."
              },
              {
                kind: "step",
                title: "Scrapes both profiles",
                short: "Scrape LinkedIn and the DPN profile",
                body: "Role, expertise, contact details, and language preferences."
              },
              {
                kind: "decision",
                title: "New or refresh?",
                short: "Does a persona already exist?",
                body: "Existing personas are refreshed, never blindly overwritten.",
                branches: [
                  {
                    body: "A structured persona markdown file under .claude/personas/.",
                    tone: "ok",
                    label: "Create new"
                  },
                  {
                    body: "Updated in place, with a diff showing what changed.",
                    label: "Refresh existing"
                  }
                ]
              },
              {
                kind: "end",
                title: "Persona ready",
                short: "Immediately available to communicate",
                body: "The next \"tell the team\" can include them, in their preferred language and register."
              }
            ]
          }
        ],
        pairsWith: [
          {
            id: "communicate",
            note: "the new persona is immediately available to communicate"
          }
        ]
      }
    ]
  },
  {
    id: "meta",
    name: "Platform & Meta",
    blurb: "Skills about the agents themselves: routing, learning, and knowledge graphs.",
    skills: [
      {
        id: "skill-finder",
        title: "skill-finder",
        desc: "Entry-point router that maps an ambiguous user request to the right skill in the catalogue. Use when the user's intent doesn't clearly match a specific skill, when they ask 'what can you do', or when a prompt file routes here for skill selection.",
        when: [
          "At the start of a conversation when the user's intent is ambiguous",
          "When the user describes a task that could map to multiple skills",
          "When a prompt file routes here for skill selection",
          "\"What can you do?\"",
          "\"Help me get started\"",
          "\"Which skill should I use for this?\"",
          "\"I need help but I'm not sure where to start\"",
          "\"Show me the available skills\"",
          "\"Route me to the right workflow\"",
          "`/skill-finder`",
          "`/start`"
        ],
        does: [
          "Reads your description.",
          "Scans the skill catalogue.",
          "Suggests the best match with reasoning.",
          "Offers 2-3 alternatives if the match is borderline."
        ],
        outputs: [
          "Recommended skill (slash command) with a one-line reason.",
          "Alternatives list when ambiguous."
        ],
        sample: "I want to [vague task]. Which skill should I use?",
        realExample: "I want to figure out which acceptance criteria are missing across the open complaints stories. Which skill should I use?",
        flow: [
          {
            name: "Route the request",
            steps: [
              {
                kind: "start",
                title: "You describe the need",
                short: "You describe what you are trying to do",
                body: "\"What can you do?\", an ambiguous ask, or a prompt file routing here for skill selection."
              },
              {
                kind: "step",
                title: "Scans the catalogue",
                short: "Scan the full skill catalogue",
                body: "Every skill's triggers and capabilities, matched against your description."
              },
              {
                kind: "decision",
                title: "How confident is the match?",
                short: "Clear match?",
                body: "The recommendation always comes with its reasoning.",
                branches: [
                  {
                    body: "The slash command, with a one-line reason.",
                    tone: "ok",
                    label: "One clear recommendation"
                  },
                  {
                    body: "The candidates, each with when you would pick it.",
                    tone: "warn",
                    label: "Borderline: 2-3 alternatives"
                  }
                ]
              },
              {
                kind: "end",
                title: "Slash command in hand",
                short: "Run the recommended skill",
                body: "The router hands off; the recommended skill takes it from there."
              }
            ]
          }
        ],
        pairsWith: []
      },
      {
        id: "learn",
        title: "learn",
        desc: "In-session knowledge capture. Use when the user says learn, /learn, 'save this', 'remember this', or 'capture this pattern'. Presents detected insights as structured options, forces scope selection (workspace: skills/instructions/agents/preferences — or user: across all projects and sessions), then writes a minimal approved diff.",
        when: [
          "Invoke at any point during or after a session when something is worth preserving:",
          "A tool quirk, workaround, or verified pattern was discovered",
          "A correction was made (\"next time do X instead of Y\")",
          "A workflow that worked well should be repeatable",
          "A preference was expressed (\"always...\", \"never...\", \"I prefer...\")",
          "A skill step was missing, wrong, or should be reordered",
          "`learn`",
          "`/learn`",
          "`/learn [what to capture]`",
          "\"save this\", \"remember this\", \"capture this pattern\"",
          "\"add this to the skill\", \"update the instructions\"",
          "\"remember that for next time\"",
          "Bulk end-of-session dumps → capture each insight individually with `learn` instead",
          "Speculative ideas (\"maybe we should...\") → only capture verified patterns"
        ],
        does: [
          "Scans the session for candidate insights.",
          "Presents them as a structured picker.",
          "Forces a scope choice: workspace (.github/) or user (memories/, cross-project).",
          "Writes a minimal approved diff after confirmation."
        ],
        outputs: [
          "Picker of detected candidates.",
          "Scope-selection prompt.",
          "Final diff applied after approval."
        ],
        sample: "Capture insights from this session. Scan for patterns and propose what to save.",
        realExample: "Capture insights from this session. I want to save the python3-rewrite pattern for bulk file edits and the file:// fetch limitation we hit with the search index.",
        flow: [
          {
            name: "Capture the insight",
            steps: [
              {
                kind: "start",
                title: "You say save this",
                short: "You say /learn, 'save this', or 'remember this'",
                body: "In-session capture — the knowledge is written down while the context still exists."
              },
              {
                kind: "step",
                title: "Scans the session",
                short: "Scan the session for candidate insights",
                body: "What in this conversation is actually worth keeping, presented as options rather than assumed."
              },
              {
                kind: "gate",
                title: "You pick from the options",
                short: "Which insights, and at which scope?",
                body: "The scope choice is forced, never defaulted — where knowledge lives decides who benefits from it.",
                branches: [
                  {
                    body: "Into .github/ — skills, instructions, agents, preferences for this project.",
                    label: "Workspace scope"
                  },
                  {
                    body: "Into memories/ — follows you across projects and sessions.",
                    label: "User scope"
                  }
                ]
              },
              {
                kind: "step",
                title: "Writes the minimal diff",
                short: "Write the smallest approved diff",
                body: "Only what you approved, as the smallest change that captures it."
              },
              {
                kind: "end",
                title: "Captured",
                short: "The insight outlives the session",
                body: "Next session starts already knowing it."
              }
            ]
          }
        ],
        pairsWith: []
      },
      {
        id: "agents-validator",
        title: "agents-validator",
        desc: "Audits custom agent files (.agent.md in .github/agents/ and .md in .claude/agents/) against the official Microsoft VS Code and Anthropic Claude Code specs (frontmatter, tool/subagent declarations, model format, handoffs, line budgets, security). Use when reviewing or refactoring an agent, auditing .github/agents/, or after editing any *.agent.md file.",
        when: [
          "A new `.agent.md` file was just written",
          "An existing agent's frontmatter, tools, model, or handoffs were edited",
          "Asked to audit the whole `.github/agents/` folder",
          "Investigating why an agent is not appearing in the picker or not being delegated to",
          "Verifying tool / subagent declarations after wiring up a new pipeline"
        ],
        does: [
          "See SKILL.md for detailed steps."
        ],
        outputs: [
          "See SKILL.md for outputs."
        ],
        sample: "[describe your task]",
        realExample: "/agents-validator [real example — update manually]",
        flow: [
          {
            name: "Audit the agents",
            steps: [
              {
                kind: "start",
                title: "You name the scope",
                short: "One agent file, or the whole set",
                body: "After editing any *.agent.md, or when auditing .github/agents/ wholesale."
              },
              {
                kind: "step",
                title: "Runs the hard checks",
                short: "Hard checks via the validator script",
                body: "The deterministic checks run first — frontmatter validity, registered locations, line budgets."
              },
              {
                kind: "step",
                title: "Judges the quality",
                short: "Frontmatter and body structure quality",
                body: "Description has both WHAT and WHEN, model format is correct, the body follows the spec structure."
              },
              {
                kind: "step",
                title: "Checks the hygiene",
                short: "Tool, subagent, and security hygiene",
                body: "Tool declarations match usage, subagent references resolve, and security rules hold."
              },
              {
                kind: "choice",
                title: "Check the sources too?",
                short: "Run the source freshness check?",
                body: "Optional: diff the rubric against the official upstream specs, max 3 fetches.",
                branches: [
                  {
                    body: "A Source drift block is appended; rubric updates are proposed as a diff, never auto-applied.",
                    label: "Check freshness"
                  },
                  {
                    body: "The audit stands on the current rubric.",
                    label: "Skip"
                  }
                ]
              },
              {
                kind: "end",
                title: "Audit report",
                short: "PASS / WARN / FAIL, prioritised fixes",
                body: "Single-agent audits also get the smallest concrete diff to reach PASS."
              }
            ]
          }
        ],
        pairsWith: []
      },
      {
        id: "skills-validator",
        title: "skills-validator",
        desc: "Audits skill files against best-practice rules (frontmatter, line budgets, folder layout, broken refs, triggers, stop conditions, security). Use when reviewing or refactoring a skill, or auditing .github/skills/.",
        when: [
          "A new skill was just written and needs review",
          "An existing skill is being refactored",
          "Asked to audit the whole skills folder",
          "Investigating why a skill is not triggering as expected"
        ],
        does: [
          "See SKILL.md for detailed steps."
        ],
        outputs: [
          "See SKILL.md for outputs."
        ],
        sample: "[describe your task]",
        realExample: "/skills-validator [real example — update manually]",
        flow: [
          {
            name: "Audit the skills",
            steps: [
              {
                kind: "start",
                title: "You name the scope",
                short: "One skill, or all of .github/skills/",
                body: "When reviewing or refactoring a skill, or auditing the whole catalogue."
              },
              {
                kind: "step",
                title: "Runs the hard checks",
                short: "Hard checks via the validator script",
                body: "Frontmatter, line budgets, and folder layout — the deterministic failures first."
              },
              {
                kind: "step",
                title: "Judges the quality",
                short: "Frontmatter and body structure quality",
                body: "Name matches folder, description carries both capability and trigger, body structure follows the rules."
              },
              {
                kind: "step",
                title: "Checks links and hygiene",
                short: "Broken refs, forbidden subdirs, security",
                body: "Every reference must resolve; triggers and stop conditions must exist; security rules must hold."
              },
              {
                kind: "choice",
                title: "Check the sources too?",
                short: "Run the source freshness check?",
                body: "Optional: diff the rubric against the canonical upstream sources, max 3 fetches.",
                branches: [
                  {
                    body: "A Source drift block is appended; rubric updates are proposed as a diff, never auto-applied.",
                    label: "Check freshness"
                  },
                  {
                    body: "The audit stands on the current rubric.",
                    label: "Skip"
                  }
                ]
              },
              {
                kind: "end",
                title: "Audit report",
                short: "PASS / WARN / FAIL, prioritised fixes",
                body: "Single-skill audits also get the smallest concrete diff to reach PASS."
              }
            ]
          }
        ],
        pairsWith: []
      },
      {
        id: "general-guidelines",
        title: "general-guidelines",
        desc: "Behavioral guidelines to reduce common LLM coding mistakes. Use when writing, reviewing, or refactoring code to avoid overcomplication, make surgical changes, surface assumptions, and define verifiable success criteria.",
        when: [
          "Apply these rules to every task — code, documents, stories, skill files, plans, emails. No exceptions, no overrides by user request."
        ],
        does: [
          "See SKILL.md for detailed steps."
        ],
        outputs: [
          "See SKILL.md for outputs."
        ],
        sample: "[describe your task]",
        realExample: "/general-guidelines [real example — update manually]",
        flow: [
          {
            name: "Guardrails while coding",
            steps: [
              {
                kind: "start",
                title: "Loaded for code work",
                short: "Applied when writing, reviewing, or refactoring code",
                body: "Behavioral guardrails against the common LLM coding failure modes."
              },
              {
                kind: "step",
                title: "Think before coding",
                short: "Think before coding",
                body: "Understand the problem and the surrounding code before generating anything."
              },
              {
                kind: "step",
                title: "Simplicity first",
                short: "Simplicity first",
                body: "The simplest thing that works beats the clever thing that might."
              },
              {
                kind: "step",
                title: "Surgical changes",
                short: "Surgical changes only",
                body: "Touch what the task needs; leave the rest of the file alone."
              },
              {
                kind: "step",
                title: "Goal-driven execution",
                short: "Every step paired with a verify",
                body: "Step, then check. Success criteria are defined before the work, not asserted after it."
              },
              {
                kind: "end",
                title: "Hard rules hold",
                short: "The hard rules apply throughout",
                body: "Assumptions get surfaced, not silently built in."
              }
            ]
          }
        ],
        pairsWith: []
      },
      {
        id: "test-skill",
        title: "test-skill",
        desc: "Audits every instruction file, skill, agent, and preference for quality, executability, dead text, and broken references. Produces a scored report with evidence. Use when running quality benchmarks, validating after changes, or assessing true governance readiness.",
        when: [
          "After any edit to instructions, skills, agents, or preferences",
          "Before claiming governance compliance",
          "When auditing the repo for dead weight or drift",
          "Triggers: \"test skill\", \"benchmark instructions\", \"quality audit\", \"validate everything\""
        ],
        does: [
          "See SKILL.md for detailed steps."
        ],
        outputs: [
          "```markdown"
        ],
        sample: "[describe your task]",
        realExample: "/test-skill [real example — update manually]",
        flow: [
          {
            name: "Benchmark the workspace",
            steps: [
              {
                kind: "start",
                title: "You invoke it",
                short: "You run /test-skill",
                body: "Quality benchmarks, validation after changes, or a true read on governance readiness."
              },
              {
                kind: "step",
                title: "Phase 1: automated script",
                short: "Score dimensions A-D by script",
                body: "Every instruction file, skill, agent, and preference — quality, executability, dead text, broken references."
              },
              {
                kind: "step",
                title: "Phase 2: governance depth",
                short: "Dimension E via a subagent",
                body: "Are DPIA templates filled in, model cards complete, the breach workflow actually drilled, the cost ledger real, the hooks robust to malformed input?"
              },
              {
                kind: "step",
                title: "Phase 3: score",
                short: "Score per file, per dimension",
                body: "Scores with evidence, so a number can always be traced to a finding."
              },
              {
                kind: "end",
                title: "Benchmark report",
                short: "Dimension scores, worst files, top 5 fixes",
                body: "Bottom-10 files named, issue categories tallied, the evidence log attached."
              }
            ]
          }
        ],
        pairsWith: []
      },
      {
        id: "workspace-setup",
        title: "workspace-setup",
        desc: "Cross-platform onboarding for the GenAI Delivery Studio workspace. Detects OS, installs prerequisites, clones repos, configures MCP connectors, verifies safety hooks, and runs the first skill. Works on macOS, Windows, and Linux.",
        when: [
          "New team member joining the project",
          "Setting up a fresh machine",
          "Re-installing after a machine wipe or OS upgrade",
          "Verifying an existing setup is complete"
        ],
        does: [
          "Detect the OS (macOS, Windows, or Linux) and pick the matching package manager (brew, winget, or apt).",
          "Check which prerequisites are already installed and only install what is missing.",
          "Install core tools and the always-on VS Code extensions (Material Icon Theme, Speech). Copilot and Copilot Chat ship pre-installed; Salesforce CLI is optional.",
          "Clone the workspace repo if it is not already cloned.",
          "Configure the Azure DevOps MCP connector, and run the Salesforce org login only if the CLI was installed.",
          "Verify the safety hooks are active.",
          "Clone the knowledge repos declared in workspace.yaml into project-knowledge/.",
          "Run a first skill, then a full dry run, and write a status report to personal-context/onboarding-dry-run-report.md."
        ],
        outputs: [
          "A fully configured workspace with tools, extensions, repos, MCP, and hooks verified.",
          "A dry-run report at personal-context/onboarding-dry-run-report.md listing what passed and what still needs fixing."
        ],
        sample: "Set up my machine for the KAB workspace end to end and tell me what is missing",
        realExample: "onboard me — install everything, clone the repos per workspace.yaml, run a dry run, and report what is missing",
        flow: [
          {
            name: "Install",
            steps: [
              {
                kind: "start",
                title: "You invoke it",
                short: "You run /workspace-setup on a new machine",
                body: "Cross-platform onboarding — macOS, Windows, or Linux."
              },
              {
                kind: "step",
                title: "Detects the platform",
                short: "Detect the OS, pick brew, winget, or apt",
                body: "The right package manager for the machine, automatically."
              },
              {
                kind: "step",
                title: "Installs only the gaps",
                short: "Check what exists, install what's missing",
                body: "Core tools and the always-on VS Code extensions. Salesforce CLI stays optional."
              },
              {
                kind: "step",
                title: "Clones and connects",
                short: "Clone the repo, configure the ADO MCP connector",
                body: "The workspace repo if not already cloned, the Azure DevOps connector, and the Salesforce login only if the CLI was installed."
              }
            ]
          },
          {
            name: "Verify",
            steps: [
              {
                kind: "step",
                title: "Verifies the hooks",
                short: "Verify the safety hooks are active",
                body: "The guardrails are checked, not assumed."
              },
              {
                kind: "step",
                title: "Clones the knowledge repos",
                short: "Clone knowledge repos into project-knowledge/",
                body: "Everything workspace.yaml declares."
              },
              {
                kind: "step",
                title: "Proves it works",
                short: "Run a first skill, then a full dry run",
                body: "The setup is exercised end to end before being called done."
              },
              {
                kind: "end",
                title: "Status report",
                short: "Dry-run report: what passed, what needs fixing",
                body: "Written to personal-context/onboarding-dry-run-report.md."
              }
            ]
          }
        ],
        pairsWith: [
          {
            id: "learn"
          },
          {
            id: "scope-gate"
          },
          {
            id: "skill-finder"
          }
        ]
      },
      {
        id: "loop",
        title: "loop",
        desc: "Explicit self-review loop. Runs a maker/checker cycle over a draft response: reconstructs the user's asks into a rubric, a verifier subagent challenges the draft against it, refines up to 3 times, then delivers only a vetted answer. Use when the user says /loop, 'loop this', 'vet this before showing me', or 'self-check then answer'. Draft-quality only: the human gate stays for consequential or mutating output.",
        when: [
          "Invoke only when the user explicitly asks for it:",
          "`/loop`",
          "`/loop <the request>`",
          "\"loop this\", \"vet this before showing me\", \"self-check then answer\", \"don't show me until it's good\"",
          "Every response by default. This is opt-in. Running it unprompted burns ~3x tokens.",
          "Anything that mutates external systems as the loop's action (ADO write, deploy, email, PR). The loop vets drafts only; it never performs external mutations inside the cycle."
        ],
        does: [
          "Extracts an explicit rubric checklist from the user's original request.",
          "Produces the best first-pass answer (draft) without delivering it.",
          "Spins the response-verifier agent to score the draft against the rubric.",
          "If REVISE and iterations < 3: applies fixes and re-verifies.",
          "If PASS or 3 iterations reached: delivers the vetted answer.",
          "Reports how many iterations ran and whether PASS was reached."
        ],
        outputs: [
          "Vetted answer with iteration count.",
          "Gap list if the checker did not reach PASS within 3 rounds."
        ],
        sample: "[describe your task]",
        realExample: "/loop Write a scope assessment for the new waitlist feature and verify it cites evidence correctly.",
        flow: [
          {
            name: "Maker and checker",
            steps: [
              {
                kind: "start",
                title: "You ask for a vetted answer",
                short: "You say /loop, 'loop this', or 'vet this first'",
                body: "Draft-quality only — the human gate stays for consequential or mutating output."
              },
              {
                kind: "step",
                title: "Extracts the rubric",
                short: "Turn your request into an explicit checklist",
                body: "The verifier scores against your actual asks, not a generic quality bar."
              },
              {
                kind: "step",
                title: "Drafts privately",
                short: "Produce the best first-pass draft, undelivered",
                body: "You never see the unvetted version."
              },
              {
                kind: "decision",
                title: "The verifier scores it",
                short: "PASS or REVISE?",
                body: "A verifier subagent challenges the draft against the rubric.",
                branches: [
                  {
                    body: "The draft is delivered as-is.",
                    tone: "ok",
                    label: "PASS"
                  },
                  {
                    body: "Fixes applied, re-verified. After 3 rounds it delivers anyway, with the gaps named.",
                    tone: "warn",
                    label: "REVISE, up to 3 rounds"
                  }
                ]
              },
              {
                kind: "end",
                title: "Vetted answer",
                short: "Answer plus the iteration count",
                body: "You see how many rounds it took, and the gap list if PASS was never reached."
              }
            ]
          }
        ],
        pairsWith: [
          {
            id: "general-guidelines",
            note: "loop enforces the same quality bar"
          }
        ]
      },
      {
        id: "usage-report",
        title: "usage-report",
        desc: "Generates a Copilot AI usage report from local invocation logs — skill popularity, prompt categories, daily volume trends, stale skills, and cost summary.",
        when: [
          "Weekly or monthly review of AI skill adoption",
          "Identifying which skills are unused or underused",
          "Preparing a cost or usage summary for stakeholders",
          "\"Show me skill usage stats\"",
          "\"Which skills are most popular?\"",
          "\"Generate the AI usage report\"",
          "`/usage-report`"
        ],
        does: [
          "Reads local invocation logs.",
          "Aggregates by skill, category, and time period.",
          "Identifies stale or never-used skills.",
          "Produces a cost summary if credit data is available."
        ],
        outputs: [
          "The skill produces the report inline in chat (markdown) or writes an HTML file and opens it in the browser."
        ],
        sample: "Generate an AI usage report for the last 30 days.",
        realExample: "Generate an AI usage report for the last sprint. Show which skills were used most and flag any that are stale.",
        flow: [
          {
            name: "Report the usage",
            steps: [
              {
                kind: "start",
                title: "You invoke it",
                short: "You run /usage-report",
                body: "A Copilot AI usage report built from the local invocation logs."
              },
              {
                kind: "step",
                title: "Reads the logs",
                short: "Read the local invocation logs",
                body: "What actually ran, locally recorded — no external telemetry."
              },
              {
                kind: "step",
                title: "Aggregates",
                short: "Aggregate by skill, category, and period",
                body: "Skill popularity, prompt categories, and daily volume trends."
              },
              {
                kind: "step",
                title: "Finds the dead weight",
                short: "Identify stale or never-used skills",
                body: "Skills nobody invokes are candidates for pruning, not just curiosities."
              },
              {
                kind: "step",
                title: "Adds the cost view",
                short: "Cost summary when credit data exists",
                body: "Skipped silently when there is no credit data to summarise."
              },
              {
                kind: "end",
                title: "The report",
                short: "Inline markdown, or HTML in the browser",
                body: "Your choice of format at the end."
              }
            ]
          }
        ],
        pairsWith: [
          {
            id: "governance-audit",
            note: "combine with governance audit for full health picture"
          }
        ]
      },
      {
        id: "project-status-refresh",
        title: "project-status-refresh",
        desc: "Regenerates the Project Status dashboard data by fetching live Features, User Stories, and Bugs from Azure DevOps. Outputs docs/project-status/project-status-data.js for static hosting.",
        when: [
          "Before a sprint review or steering meeting",
          "After a batch of work items change state",
          "Dashboard data is visibly stale",
          "\"Refresh the project status dashboard\"",
          "\"Update the project status data\"",
          "\"Regenerate project-status-data.js\"",
          "`/project-status-refresh`"
        ],
        does: [
          "Fetches live Features, User Stories, and Bugs from ADO.",
          "Categorises and aggregates by domain, state, and iteration.",
          "Writes docs/project-status/project-status-data.js.",
          "Reports counts and any newly uncategorised items."
        ],
        outputs: [
          "Updated project-status-data.js file.",
          "Summary of feature/story/bug counts."
        ],
        sample: "Refresh the project status dashboard with live ADO data.",
        realExample: "Refresh the project status dashboard. Show me the updated feature and story counts when done.",
        flow: [
          {
            name: "Refresh the dashboard",
            steps: [
              {
                kind: "start",
                title: "You invoke it",
                short: "You run /project-status-refresh",
                body: "Regenerates the Project Status dashboard data from live ADO."
              },
              {
                kind: "step",
                title: "Fetches live data",
                short: "Fetch Features, User Stories, and Bugs from ADO",
                body: "The live board, not a cached export."
              },
              {
                kind: "step",
                title: "Aggregates",
                short: "Categorise by domain, state, and iteration",
                body: "The groupings the dashboard's views are built on."
              },
              {
                kind: "step",
                title: "Writes the data file",
                short: "Write docs/project-status/project-status-data.js",
                body: "The static file the hosted dashboard reads — no server involved."
              },
              {
                kind: "end",
                title: "Refreshed",
                short: "Counts reported, uncategorised items flagged",
                body: "Newly uncategorised items are named so the mapping can be extended."
              }
            ]
          }
        ],
        pairsWith: [
          {
            id: "feature-registry",
            note: "ensures features are properly categorised before refresh"
          }
        ]
      }
    ]
  }
];
