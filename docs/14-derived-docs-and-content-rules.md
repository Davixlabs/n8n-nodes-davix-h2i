# 14. Derived Documentation and Content Rules

## 14.1 SSOT Authority Statement

The `/docs` directory is the authoritative documentation location for this repository’s canonical 15-file SSOT set.


No derived document may contradict the SSOT files under `/docs`.


Behavior claims in derived documentation must be traceable to repository code and definitions (for example node definitions, credentials, request helpers, and tests), using explicit file-based evidence.


External documentation is non-authoritative for this repository’s canonical claims.


SSOT section roles used as the derivation foundation in this file:

- UI definitions: Section 05 (`/docs/05-field-level-ui-specification.md`).
- Implementation details: Section 11 (`/docs/11-developer-implementation-spec.md`).
- Security details: Section 10 (`/docs/10-security-model.md`).
- Output schemas and contracts: Section 09 (`/docs/09-output-schema-and-data-contracts.md`).



## 14.2 Deriving User-Facing Documentation

Generate user-facing documentation using the SSOT files as follows:

- Field tooltips and field-reference content: derive from **Section 05** (`/docs/05-field-level-ui-specification.md`).
- User guides: derive from **Sections 04, 05, 06, and 09**.
- Tutorials: derive from operation definitions and operation-specific field contexts documented in Sections 04 and 05.
- Error troubleshooting guides: derive from **Section 08** (`/docs/08-error-handling-and-failure-modes.md`).
- FAQ entries: each answer must include traceability to the relevant SSOT section(s) and supporting code evidence.


Rules for all user-facing derived content:

- Do not invent behavior, defaults, request shapes, retries, pagination, binary behavior, or other runtime behavior not confirmed in code.
- Examples must only use documented resources, operations, fields, and data contracts present in SSOT and backed by code evidence.


## 14.3 Deriving Developer Documentation

Generate developer-oriented derived documentation from these SSOT sources:

- Architecture diagrams: from **Section 02** (`/docs/02-architecture-overview.md`).
- API mapping documentation: from **Section 04** (`/docs/04-resource-and-operation-model.md`).
- Output contracts: from **Section 09** (`/docs/09-output-schema-and-data-contracts.md`).
- Implementation guides: from **Section 11** (`/docs/11-developer-implementation-spec.md`).
- Installation/build/release guides: from **Section 12** (`/docs/12-installation-build-and-release.md`).


Developer documentation constraints:

- Implementation documentation must remain consistent with actual repository code paths and implementations.
- Do not add backend assumptions that are not represented in repository code and SSOT evidence.


## 14.4 Marketplace and Marketing Content Constraints

For marketplace listings, sponsor decks, and other promotional content derived from this repository:

- Do not claim unsupported features.
- Feature lists must originate from **Section 04**.
- Field descriptions must originate from **Section 05**.
- Security claims must originate from **Section 10**.
- Do not mention quotas or limits unless confirmed by **Section 07**.
- Do not claim reliability/resilience unless **Section 07** confirms retry/resilience behavior.


Additional constraints:

- Avoid brand-positioning claims not supported by repository evidence.
- Derived promotional copy must remain evidence-based and code-traceable.


## 14.5 Update and Change Workflow

Required documentation flow for this repository:

1. Code change occurs.
2. Update the relevant SSOT file(s) in `/docs`.
3. Regenerate derived documentation/content from updated SSOT files.
4. Do not publish documentation-first behavior claims without corresponding implemented code.


Repository guidance signals checked:

- No README-level contribution workflow is currently documented.

**Evidence:** `README.md:L1-L250`

Formal documentation update workflow is not defined in this repository.

## 14.6 Consistency Enforcement Rules

Consistency requirements for all derived documents:

- Every derived document must cite the SSOT section(s) used.
- No derived document may contradict SSOT.
- If contradiction occurs, SSOT prevails over derived documents.
- If SSOT contradicts implemented code, code prevails and SSOT must be updated.


## 14.7 Prohibited Content in Derived Docs

The following content is prohibited unless explicitly documented in SSOT and supported by repository code evidence:

- Backend PixLab internals not referenced in node code.
- Undocumented endpoints.
- Undocumented fields.
- Undocumented error handling.
- Undocumented retry behavior.
- Undocumented quotas.


## 14.8 Glossary Source of Truth

A dedicated glossary SSOT file is not present in the documented 15-file structure.

Glossary must be derived strictly from terminology used in this repository.

Do not invent glossary terms.


## 14.9 Documentation Integrity Principles

All derived documentation must follow these principles:

- Evidence-first
- No hallucination
- No assumption
- Code-traceable claims
- Deterministic documentation

These principles are enforced through the repository’s documentation instructions requiring source traceability, zero invention, and section-by-section verification before publishing claims.


## Open Questions / Missing Evidence

- No explicit repository file defines documentation ownership roles (individual/team responsibility not confirmed in code or repo policy files).
- No explicit governance process is defined for approving or versioning SSOT document changes.
- No explicit publishing model is defined for non-README derived artifacts (for example marketplace copy approval flow).
- No standalone `CONTRIBUTING.md` or PR-template policy file is present, and the current README does not define a contribution workflow.

Files checked for the above:

- `README.md`
- `package.json`
- `.github/workflows/publish.yml`

Why confirmation was not possible:

- The repository does not include explicit policy files covering documentation governance/ownership workflows beyond general contribution and release automation details.

## Evidence Index

- `README.md` — package overview, installation guidance, and support links.
- `package.json` — repository package metadata and script structure used as a structural governance signal.
- `.github/workflows/publish.yml` — release automation signal; checked for documentation workflow evidence.
