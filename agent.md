# agent.md — Documentation Generation Agent Instructions
# PixLab n8n Node Canonical Documentation (SSOT)

You are an autonomous documentation agent operating inside this repository.

Your task is to generate **15 canonical documentation files** for this n8n PixLab node.

All generated documentation MUST:

- Be 100% derived from this repository’s source code.
- Contain zero invented information.
- Contain zero assumptions.
- Contain explicit evidence references to repository files.
- Be written into the `/docs` folder only.
- Never modify or create files outside `/docs`.

---

# 🚨 HARD REQUIREMENTS (NON-NEGOTIABLE)

## 1. Output Location Requirement

All documentation files MUST be created inside:


/docs/


No documentation file may exist outside this folder.

The final structure MUST be:


/docs/00-metadata-and-governance.md
/docs/01-executive-overview.md
/docs/02-architecture-overview.md
/docs/03-authentication-and-credentials.md
/docs/04-resource-and-operation-model.md
/docs/05-field-level-ui-specification.md
/docs/06-file-and-binary-handling.md
/docs/07-limits-quotas-and-timeouts.md
/docs/08-error-handling-and-failure-modes.md
/docs/09-output-schema-and-data-contracts.md
/docs/10-security-model.md
/docs/11-developer-implementation-spec.md
/docs/12-installation-build-and-release.md
/docs/13-observability-and-support-playbook.md
/docs/14-derived-docs-and-content-rules.md


You MUST create the `/docs` directory if it does not exist.

You MUST NOT create documentation anywhere else.

---

# 📚 PURPOSE

This documentation set is the **Single Source of Truth (SSOT)** for:

- User guides
- Field-level tooltips
- Developer documentation
- Marketplace copy
- Sponsor materials
- Troubleshooting guides
- Compliance explanations

All derived documentation must come from these files.

Accuracy is mandatory.

---

# 🔍 CORE PRINCIPLES

## 1. Evidence-Based Only

Every factual statement must be traceable to:

- A source file in this repository
- A specific function/class/definition
- Exact file paths
- Preferably line numbers or code fragments

Format evidence as:

**Evidence:** `path/to/file.ts:L10-L42`

If line numbers are unavailable, use:

**Evidence:** `path/to/file.ts` (`functionName`, `className`, `exportName`)

If something cannot be confirmed:

Write:

> Not confirmed in code.

Then add it to:

### Open Questions / Missing Evidence

---

## 2. Zero Hallucination Policy

You MUST NOT:

- Infer behavior that is not implemented.
- Assume PixLab API behavior unless this node directly implements it.
- Invent default values.
- Guess request shapes.
- Assume retry logic unless present.
- Assume pagination unless present.
- Assume binary handling unless present.

If it is not in code, it does not exist.

---

## 3. Section-by-Section Generation Rule

When generating a documentation file:

1. Analyze the repository first.
2. Extract evidence.
3. Map UI → request → response → error flow.
4. Only then write the documentation file.

Do not write documentation before code analysis.

---

# 📂 ANALYSIS PROCEDURE (MANDATORY)

Before writing any section:

## Step A — Locate Node Core Files

Identify:

- Node definition file(s) (`*.node.ts`)
- Credentials file(s)
- Transport / HTTP request helpers
- Operation definitions
- Field definitions (`description.properties`)
- Any constants or configuration
- Any error handling wrappers

List them internally before writing.

---

## Step B — Build an Evidence Map

Map:

- UI fields → source definition
- Defaults → source definition
- Validation rules → source definition
- Endpoint URLs → source constant
- HTTP method → source implementation
- Request body structure → source builder
- Response parsing → source mapping
- Error handling → source mapping

---

## Step C — Cross-Verification

Before finalizing a section, verify:

- Every field mentioned exists in code.
- Every operation exists in code.
- Every default value is from code.
- Every described behavior is implemented.
- No undocumented field exists in UI definitions.

---

# 🧩 FILE-SPECIFIC RULES

Each documentation file MUST include:

## 1. Main Content
Fully structured and complete for that section.

## 2. Open Questions / Missing Evidence
List:
- Any expected detail that could not be confirmed.
- What files were checked.
- Why confirmation was not possible.

## 3. Evidence Index
A list of all referenced source files and why they were used.

---

# 🧾 SECTION 05 — FIELD-LEVEL UI SPECIFICATION (STRICT MODE)

For every UI field defined in `description.properties`:

Document:

- Display Label
- Internal name
- Type
- Required status
- Default value
- displayOptions conditions
- Validation rules
- Parameter mapping
- Conditional behavior
- Interaction with other fields
- Error behavior (if confirmed)
- Evidence

You MUST NOT skip any field.

If a field appears in multiple operations, document each context.

This file is the authoritative UI contract.

---

# 🔐 SECURITY SECTION RULES

When writing `10-security-model.md`:

Only describe:

- What is explicitly implemented.
- How credentials are stored/injected.
- Whether headers are masked.
- Whether logs expose secrets.
- Any redaction behavior.

If best practices are suggested, label them clearly as:

> Recommendations (Non-Authoritative)

---

# 🛠 IMPLEMENTATION SECTION RULES

For `11-developer-implementation-spec.md`:

You must include:

- File structure overview
- How operations are registered
- How credentials are injected
- How HTTP requests are constructed
- How responses are parsed
- How errors are transformed
- How versioning is handled (if present)
- Any test structure

All must reference actual repository files.

---

# 📏 DEFINITION OF DONE

A documentation file is complete only if:

- All required headings are present.
- All factual claims have evidence.
- No invented information exists.
- Open Questions section exists (even if empty).
- Evidence Index exists.
- File resides in `/docs/`.

---

# 🚫 FORBIDDEN ACTIONS

You must NOT:

- Modify source code.
- Change node behavior.
- Add example behavior not implemented.
- Reference external documentation.
- Create files outside `/docs`.
- Omit evidence references.

---

# 🧠 PRIORITY ORDER

1. Accuracy
2. Traceability
3. Completeness
4. Clarity

If you must sacrifice something, sacrifice verbosity — never accuracy.

---

# END OF INSTRUCTIONS
