# 🚀 Curate — AI-Native Cloud IDE [**Live Demo**](https://curate-ecru-eight.vercel.app)

A browser-based **AI-native IDE** that integrates real-time collaboration, AI-assisted coding, GitHub workflows, and production-grade observability.

The platform combines modern frontend tooling, reactive backend infrastructure, background AI orchestration, and in-browser runtime execution to deliver a **fully cloud-native development environment directly inside the browser — without requiring any local setup.**

Curate demonstrates how **real-time databases, intelligent coding agents, browser runtimes, and observability tooling** can combine to create a **next-generation AI-augmented development platform.**

---

# ✨ What Makes Curate Different

- **Zero setup** — open a browser and start coding instantly via WebContainers
- **AI integrated into the editor workflow** — ghost text, quick edits, and a coding agent that can read and modify project files
- **Real-time infrastructure** — projects, files, and chat messages sync instantly
- **Cost-optimized AI architecture** — lightweight models for high-frequency tasks
- **Production-grade observability** — full error tracking, session replay, and AI telemetry

---

# 🧠 Core Architecture

| Technology | Purpose |
|------------|---------|
| ⚡ **Next.js 16 + TypeScript** | Frontend framework and application architecture |
| 🔄 **Convex** | Real-time database, backend logic, and API layer |
| 🔐 **Clerk** | Authentication, session management, and GitHub OAuth |
| ✏️ **CodeMirror 6** | Extensible browser-based code editor |
| 🧩 **Zustand** | Lightweight editor state management |
| 🤖 **Inngest + AgentKit** | AI orchestration and background workflows |
| 🌐 **Firecrawl** | Live web content ingestion for AI context |
| 📦 **WebContainers** | In-browser Node.js runtime for project previews |
| 🛰 **Sentry** | Error monitoring and AI telemetry |
| 💬 **Streamdown** | Streaming markdown rendering for AI responses |
| 🐰 **CodeRabbit** | AI-powered GitHub PR review workflow |
| 🎞 **Framer Motion** | UI animation and transitions |

---

# 💰 AI Cost Architecture

| Route | Model | Est. Cost / Call |
|-------|-------|------------------|
| 🔤 Title generation | Claude Haiku | ~$0.00006 |
| 💡 Inline suggestions | Claude Haiku | ~$0.00015 |
| ✏️ Quick edit | Claude Haiku | ~$0.0015 |
| 🤖 Coding agent | Claude Sonnet | ~$0.05 – $0.20 |

### Cost Optimization Strategy

Curate uses a **tiered AI architecture**.

Lightweight models handle high-frequency tasks:

- title generation
- ghost text suggestions
- quick edits

More advanced models are reserved for **complex reasoning tasks**, such as coding-agent workflows that require tool usage and multi-step reasoning.

This separation significantly reduces operational AI costs while maintaining strong reasoning performance when needed.

---

# 🧩 System Design Insights

Curate demonstrates several architectural patterns common in modern AI-powered developer tools.

### Real-Time Infrastructure

Convex enables **reactive backend infrastructure** where database mutations automatically propagate to connected clients.

This removes the need for:

- manual WebSocket infrastructure
- polling systems
- complex synchronization logic

The result is a **real-time collaborative environment** where project state updates instantly across the UI.

---

### AI-First Development Workflow

Instead of adding AI as a separate feature, Curate embeds AI **directly into the editing experience**.

Examples include:

- ghost-text inline suggestions
- natural language quick edits
- conversational debugging
- codebase-aware coding agents

This makes AI a **native extension of the development workflow.**

---

### Asynchronous AI Execution

AI tasks run through **Inngest background workflows**, ensuring that expensive LLM operations never block the user interface.

Advantages include:

- cancellable AI requests
- retry policies
- workflow durability
- scalable orchestration

---

### Observability-Driven Engineering

AI systems introduce operational complexity:

- token usage costs
- model latency
- hidden failures

Curate integrates **Sentry monitoring** to track:

- runtime errors
- AI request failures
- token usage trends
- session replays

This ensures full visibility into both system health and AI infrastructure.

---

# ⚙️ Key Capabilities

## 🔄 Real-Time Infrastructure

- Instant project and file synchronization
- Recursive file system with nested folders
- Optimistic UI updates for fast editing
- Live preview execution via WebContainers

---

## 🤖 AI-Augmented Development

- Inline **ghost text code suggestions**
- Instruction-based **AI quick edits** (`Cmd/Ctrl + K`)
- Persistent **AI conversation sidebar**
- **Coding agent** capable of modifying project files
- Multi-step reasoning workflows via AgentKit
- Background AI tasks with cancellation support
- Live documentation context via **Firecrawl scraping**

---

## 💻 IDE Experience

- Resizable **editor + preview layout**
- Multi-file tab system with pinning
- Breadcrumb navigation
- Syntax highlighting for multiple languages
- One Dark theme with minimap and indentation markers
- Autosave with smart debouncing
- Infinite nested file explorer
- File type icons via React Symbols

---

## 🔐 Authentication & Security

- Secure authentication via **Clerk**
- GitHub OAuth integration
- Route protection using Next.js middleware
- Internal backend keys for protected API routes
- AI provider keys stored server-side only

---

## 📊 Observability & Monitoring

- Full-stack error tracking via **Sentry**
- AI token usage and cost monitoring
- Structured logs for debugging
- Session replay for reproducing issues
- AI call telemetry via Vercel AI SDK

---

# 📚 Learning Notes & Implementation Details

This section documents the **technical lessons learned while building Curate** and acts as a reference for the architectural decisions used throughout the system.

---

## Real-Time Backend Architecture

Convex functions as both:

- a **database**
- a **serverless backend runtime**

Instead of traditional REST APIs, the system uses:

- **queries** → reactive reads that automatically re-run when data changes
- **mutations** → state updates that trigger real-time propagation to all connected clients
- **actions** → external integrations such as calling AI providers or third-party APIs

Convex automatically pushes updates to connected clients when data changes, eliminating the need for WebSocket infrastructure or polling.

In Curate, Convex manages:

- project creation, listing, and deletion
- recursive file system structure (files and folders as tree nodes)
- conversation history and message persistence
- real-time status updates for AI processing messages
- user ownership validation on every backend operation

The pattern of **optimistic UI updates** paired with Convex mutations creates a fast, responsive experience — the UI updates immediately while the backend confirms the change in the background.

---

## Authentication & Middleware

Clerk handles authentication including sign-in, sign-out, session management, and GitHub OAuth.

Next.js 16 introduced a naming change:

- the traditional `middleware.ts` file was renamed to **`proxy.ts`**

This middleware enforces route protection across authenticated paths.

Backend security uses **internal keys** — a secret shared between Next.js and Convex that gates access to sensitive mutations.

AI provider keys (Anthropic, Firecrawl, Sentry) are stored **server-side only** and never exposed to the client.

---

## Editor Architecture (CodeMirror 6)

The editor is built on **CodeMirror 6**, which uses a modular extension architecture.

Custom extensions implemented include:

- ghost-text suggestions with Tab acceptance
- quick edit overlays triggered by `Cmd/Ctrl+K`
- selection tooltips for code actions
- language detection (JS, TS, HTML, CSS, JSON, Markdown, Python)
- syntax highlighting via language packs
- indentation markers
- minimap rendering

CodeMirror 6 uses an **immutable state model**, meaning all edits occur through transactions. This guarantees reliable undo/redo behavior and consistent editor state across extensions.

Because each feature is an independent extension, they are composable and testable in isolation — adding new editor capabilities does not require touching existing ones.

---

## State Management Strategy

Editor state is managed with **Zustand**, controlling:

- active files
- open tabs
- pinned tabs
- preview pane visibility
- editor layout state

Zustand was chosen because it provides minimal boilerplate, predictable updates, and avoids unnecessary re-renders compared to heavier state libraries like Redux.

---

## File System Architecture

Projects are stored as a **recursive file tree inside Convex**.

Each node represents either a file or a folder, and stores a `parentId` reference to support hierarchical structure.

This model supports:

- infinite nested folders
- inline renaming via context menus
- file and folder creation and deletion
- optimistic UI updates for instant feedback

File type icons are rendered dynamically based on file extension using **React Symbols**, giving the explorer a familiar IDE feel without a large icon library.

---

## AI Suggestion System

Ghost-text suggestions are implemented through a **custom CodeMirror extension**.

Workflow:

1. Detect cursor position and current line
2. Gather surrounding context — previous 10 lines + next 5 lines
3. Send trimmed context to AI endpoint (full file is **not sent**)
4. Receive suggestion string
5. Render ghost text inline as faint overlay
6. Accept suggestion with **Tab**

Key optimization: sending only immediate cursor context instead of the full file reduces input tokens by ~70% per call and keeps latency low. `maxTokens` is capped at **150** since suggestions are never long.

---

## Quick Edit Architecture

Quick Edit allows developers to modify selected code using natural language instructions via `Cmd/Ctrl+K`.

The prompt includes:

- selected code block
- surrounding file context — trimmed to **100 lines around the selection**
- user instruction
- optional documentation scraped via Firecrawl, capped at **5000 characters per URL**

The model returns **only the edited code segment**, which replaces the original selection — preventing unintended modifications to the rest of the file.

`maxTokens` is capped at **2000** since code edits rarely need more output than the selected block.

---

## Coding Agent Architecture

The coding agent uses **AgentKit tool-based reasoning**.

Available tools include:

- list files
- read files
- update files — preferred over delete + recreate
- create files
- rename files
- delete files
- scrape documentation URLs

The agent operates in a **bounded iteration loop (max 5 iterations)**, preventing runaway reasoning while still enabling multi-step codebase modifications.

Model configuration:

- `claude-sonnet-4-5-20250929`
- `max_tokens: 8000` — reduced from 16000, sufficient for most agent responses
- `temperature: 0.2` for consistent, structured output

---

## Agent System Prompt Design

The coding agent system prompt encodes environment constraints explicitly:

- supported project types and their required file structures (static HTML, Vite + React, Express)
- WebContainer limitations — no SSR frameworks, no native modules
- that `npm install` and `npm run dev` run automatically — never include them in generated scripts
- always use `dev` as the primary script name
- preferred CDN libraries for static projects (Tailwind, Chart.js, Lucide, Animate.css)
- silent execution — no narration, only a final summary after all actions are complete

Getting the system prompt right was one of the highest-impact changes in the project. A well-structured prompt directly determines whether the agent produces runnable output consistently.

---

## Prompt Optimization Strategy

Token costs were optimized across all AI routes after profiling actual usage:

| Route | Optimization Applied | Estimated Saving |
|-------|---------------------|-----------------|
| Suggestions | Removed full file, trimmed to 10 prev + 5 next lines, `maxTokens: 150` | ~70% |
| Quick edit | Trimmed `fullCode` to 100 lines around selection, capped docs at 5000 chars, `maxTokens: 2000` | ~60% |
| Coding agent | Reduced context history from 10 to 5 messages, `max_tokens: 8000`, `maxIter: 5` | ~45% |
| Title generation | `max_tokens: 50`, `temperature: 0` | ~80% |

The core principle: **send only what the model needs, cap what it can return.** Most token waste comes from sending full file contents when only nearby context is relevant.

---

## Background Job System

AI tasks execute asynchronously via **Inngest workflows**, enabling:

- non-blocking UI — the editor stays fully responsive during AI processing
- cancellation support — users can cancel in-progress runs via `message/cancel` events
- retry policies — transient failures are retried automatically
- durable execution — workflows survive server restarts

The `onFailure` handler updates the assistant message in Convex with a user-facing error if a job crashes, ensuring the UI never gets stuck in a loading state.

This pattern is essential for any AI product where LLM calls can take 10–60 seconds.

---

## WebContainer Runtime

WebContainers run **Node.js entirely inside the browser**, enabling:

- dependency installation
- full project execution
- instant previews via localhost
- sandboxed environments

`npm install` and `npm run dev` run automatically when a project loads. The agent system prompt is designed around this — it always uses `dev` as the script name and never includes `npm install` in generated scripts.

**Supported:**

- Static HTML, CSS, JS with CDN links
- Vite + React
- Express.js
- Pure JavaScript npm packages

**Not supported:**

- Next.js, Nuxt, Remix, or any SSR framework
- Native Node modules (bcrypt, sharp, canvas, etc.)
- Python, Ruby, or non-JS runtimes
- Packages requiring OS-level binaries

This constraint directly shaped the agent system prompt — the coding agent is explicitly instructed never to generate projects using unsupported frameworks.

---

## Observability and AI Monitoring

Sentry provides visibility into:

- frontend runtime errors
- backend API failures
- Inngest background job crashes
- AI request tracking and latency
- token usage patterns per model

Session replay allows developers to **reconstruct exact user workflows that led to failures**, making debugging significantly more efficient than stack traces alone.

AI telemetry via the Vercel AI SDK tracks:

- token input/output per request
- per-model costs
- request frequency per route

This visibility is critical for operating AI-powered SaaS sustainably — without it, unexpected token spikes can go unnoticed until the billing cycle.

---

## Key Engineering Takeaways

- real-time infrastructure simplifies collaborative tooling — Convex eliminates an entire layer of WebSocket complexity
- AI must be embedded directly into development workflows, not added as a separate chat window
- tool-based agents outperform plain chat assistants for file-system tasks
- prompt design and context trimming strongly affect both AI reliability and cost
- background job orchestration is essential for scalable, cancellable AI systems
- observability is mandatory when operating AI-powered products — token costs can spike silently
- browser-native runtimes can fully replace traditional local development environments for most use cases
- model selection per task is the single largest lever for reducing AI infrastructure costs
- agent system prompts must encode environment constraints explicitly to produce reliable output
- optimistic UI updates are essential for a responsive real-time experience
- `proxy.ts` in Next.js 16 replaces the traditional `middleware.ts` naming convention
