# 🚀 Curate — AI-Native Cloud IDE

## Overview

**Curate** is a browser-based **AI-native IDE** that combines real-time collaboration, AI-assisted coding, GitHub workflows, and production-grade observability.

It merges modern frontend tooling, real-time backend infrastructure, and background AI orchestration to create a **cloud-native development experience directly in the browser** — no local setup required.

---

## 🧠 Core Architecture

| Technology | Purpose |
|------------|---------|
| ⚡ **Next.js 16 + TypeScript** | Frontend framework & application structure |
| 🔄 **Convex** | Real-time database, backend logic & internal APIs |
| 🔐 **Clerk** | Authentication, session management & GitHub OAuth |
| ✏️ **CodeMirror 6** | Extensible in-browser code editor with language support |
| 🧩 **Zustand** | Lightweight editor state management |
| 🤖 **Inngest + AgentKit** | Background AI orchestration & durable agent workflows |
| 🌐 **Firecrawl** | Live web content ingestion for real-time AI context |
| 🛰 **Sentry** | Error monitoring, AI telemetry & session replay |
| 💬 **Streamdown** | Streaming markdown rendering for AI chat responses |
| 📦 **WebContainers** | In-browser Node.js runtime for live project previews |

---

## ⚙️ Key Capabilities

### 🔄 Real-Time Infrastructure

- Instant project and file synchronization via Convex
- Recursive file tree supporting text & binary assets
- Optimistic UI updates for responsive editing
- Live preview via WebContainers — no server required

---

### 🔐 Authentication & Security

- Clerk-managed authentication with session handling
- GitHub OAuth integration for import & export workflows
- Route protection via Next.js middleware
- Secure backend validation using internal keys
- All AI API keys server-side only — never exposed to client

---

### 🤖 AI-Augmented Development

- Inline **ghost text suggestions** using lightweight AI models
- Instruction-based **AI quick edits**
- Persistent **AI chat conversations** with full context history
- **Coding agent** capable of reading, creating, updating, renaming, and deleting files
- Multi-step reasoning workflows via AgentKit
- Background AI tasks with real-time cancellation support
- Context enrichment via **live web scraping** with Firecrawl
- Token-optimized prompts for cost-efficient AI usage

---

### 💻 IDE Experience

- Resizable **editor + preview** split layout via WebContainers
- Multi-file tab system with pinning support
- Breadcrumb navigation for deep file trees
- Language-aware syntax highlighting via CodeMirror 6
- Autosave with smart debouncing
- Infinite-nested file explorer
- `Cmd/Ctrl+K` quick edit — select code, type an instruction, apply AI edit inline

---

### 📊 Observability & Monitoring

- Full-stack error tracking with Sentry
- AI token usage & cost monitoring per model
- Structured logging across all services
- Session replay for debugging user workflows
- Per-model cost breakdown for optimizing AI workloads

---

## 🛠 Development Stages

1. UI scaffolding and project structure  
2. Authentication & GitHub OAuth integration  
3. Real-time database setup with Convex  
4. AI SDK integration + background job orchestration with Inngest  
5. Coding agent with file tools & multi-step reasoning  
6. Web context ingestion via Firecrawl  
7. WebContainers integration for live browser previews  
8. Monitoring & telemetry instrumentation with Sentry  
9. IDE interface — editor, tabs, file tree, resizable layout  
10. Advanced editor extensions — ghost text, quick edit, syntax highlighting  
11. AI conversation system with streaming markdown rendering  
12. Token & cost optimization across all AI routes  

---

## 🧩 Architectural Principles

- **AI-first development workflows** — every editing surface has AI assistance
- **Real-time sync without manual WebSockets** — Convex handles all reactivity
- **Asynchronous AI processing** — Inngest ensures no request timeouts
- **Security-first backend architecture** — all keys and mutations server-side
- **Full observability of AI usage & costs** — per-model token tracking
- **Modular, component-driven frontend** — composable UI across all surfaces
- **WebContainer-native project execution** — no external servers needed
- **Cost-optimized model selection** — right model for each task

---

## 🧰 Technology Stack

- ⚡ **Next.js 16**
- ⚛ **React 19**
- 🔄 **Convex**
- 🔐 **Clerk**
- ✏️ **CodeMirror 6**
- 🤖 **Inngest + AgentKit**
- 🧩 **Zustand**
- 🛰 **Sentry**
- 💬 **Streamdown**
- 📦 **WebContainers**
- 🌐 **Firecrawl**
- 🎞 **Framer Motion**

---

## 💰 AI Cost Architecture

| Route | Model | Est. Cost / Call |
|------|------|------------------|
| 🔤 Title generation | **Claude Haiku** | ~$0.00006 |
| 💡 Inline suggestions | **Claude Haiku** | ~$0.00015 |
| ✏️ Quick edit | **Claude Haiku** | ~$0.0015 |
| 🤖 Coding agent | **Claude Sonnet** | ~$0.05 – $0.20 |

### Cost Optimization Strategy

Curate uses a **tiered AI architecture** to control operational costs:

- **Claude Haiku** powers lightweight tasks such as title generation, inline suggestions, and quick edits.
- **Claude Sonnet** is reserved for complex coding-agent workflows that require deeper reasoning and tool usage.

This separation dramatically reduces AI infrastructure costs while preserving high-quality reasoning when needed.

---

## 💡 Key Insights

- Real-time databases dramatically improve **cloud IDE responsiveness**
- AI context is enriched using **live web data ingestion** at request time
- Background job systems are essential for **scalable, cancellable AI workflows**
- Observability is critical for **controlling AI costs in production**
- WebContainers eliminate the need for **any external preview infrastructure**
- Model selection per task is the single biggest lever for **AI cost control**
- Strong UI/UX design with Framer Motion directly improves **developer experience**

---

## 🏁 Conclusion

**Curate** demonstrates how modern real-time infrastructure, conversational AI, intelligent code editing, in-browser execution, and production-grade observability can combine to form a **fully integrated AI-powered development platform in the browser** — with no local setup, no DevOps overhead, and AI assistance at every layer of the development workflow.
