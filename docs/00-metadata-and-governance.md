# 00. Metadata and Governance

## 00.1 Purpose and Scope
- This SSOT document covers this n8n community node repository only.
  **Evidence:** `agent.md:6-13`
- The SSOT set is intended to be the source for derived documentation artifacts.
  **Evidence:** `agent.md:52-61`

## 00.2 Intended Audiences
- Users
- Workflow builders
- Developers
- Operators
- Reviewers/sponsors
  **Evidence:** `agent.md:54-60`

## 00.3 Repository Identification
- Repository name (discoverable from repository URL): `n8n-nodes-davix-h2i`.
  **Evidence:** `package.json:6-9`
- Node/package name: `n8n-nodes-davix-h2i`.
  **Evidence:** `package.json:2-2`
- Node display name(s):
  - `Davix H2I` (node display name and default node instance name)
    **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:55-55`
    **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:62-64`
  - `Davix H2I (PixLab) API` (credential display name)
    **Evidence:** `credentials/DavixH2IApi.credentials.ts:4-6`
- Short canonical description (from node definition): “Use Davix H2I Engine (Pixlab) public API endpoints (H2I, Image, PDF, Tools).”
  **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:61-61`

## 00.4 Compatibility Matrix
- Node version (package): `1.0.0`.
  **Evidence:** `package.json:3-3`
- n8n compatibility declaration:
  - `peerDependencies` declares `n8n-workflow: "*"`.
    **Evidence:** `package.json:43-45`
  - No explicit minimum/maximum n8n version constraint was found.
    **Evidence:** `package.json:1-54`
- Node runtime (Node.js):
  - CI and publish workflows run on Node.js `20`.
    **Evidence:** `.github/workflows/publish.yml:19-23`
    **Evidence:** `.github/workflows/publish.yml:39-43`
  - Runtime requirement for end users is declared in package `engines` as Node.js `>=20`.
    **Evidence:** `package.json:54-56`
- Language/module format:
  - Source is TypeScript (`.ts` files included by compiler).
    **Evidence:** `tsconfig.json:17-21`
  - Compiler emits CommonJS modules.
    **Evidence:** `tsconfig.json:4-4`
  - Distributed entrypoint is JavaScript (`dist/index.js`) with TypeScript declarations (`dist/index.d.ts`).
    **Evidence:** `package.json:24-25`

- PixLab base URL and credential naming evidence:
  - Credential internal name: `davixH2IApi`.
    **Evidence:** `credentials/DavixH2IApi.credentials.ts:4-4`
  - Credential field `baseUrl` defaults to `https://pixlab.davix.dev`.
    **Evidence:** `credentials/DavixH2IApi.credentials.ts:9-13`
  - Request helper uses credential `baseUrl` and `apiKey` and injects header `x-api-key`.
    **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:106-114`
    **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:47-50`
- Runtime/distribution configuration files present:
  - `package.json` defines build, lint, and test scripts; npm package publishes `dist` and maps n8n node/credential build artifacts.
    **Evidence:** `package.json:26-36`
    **Evidence:** `package.json:46-53`
  - `tsconfig.json` controls compilation target/output/module format.
    **Evidence:** `tsconfig.json:2-8`
  - `eslint.config.js` applies `@n8n/eslint-plugin-community-nodes` recommended config and ignores `dist/**`.
    **Evidence:** `eslint.config.js:1-8`

## 00.5 Ownership and Maintenance
- Package author is `Davixlabs`.
  **Evidence:** `package.json:21-23`
- Repository organization in URLs is `Davixlabs` (GitHub repository and issues URL).
  **Evidence:** `package.json:8-12`
- License is MIT; LICENSE file includes copyright attribution to `davixlabs`.
  **Evidence:** `package.json:5-5`
  **Evidence:** `LICENSE:1-4`
- Support channels present in repository:
  - GitHub Issues URL.
    **Evidence:** `package.json:10-12`
  - README support/contact section includes website, project URL, and issue reporting guidance.
    **Evidence:** `README.md:298-303`

## 00.6 Release and Versioning Policy (Evidence-Based)
- Release automation exists via GitHub Actions workflow `Publish to npm`.
  **Evidence:** `.github/workflows/publish.yml:1-1`
- Release trigger includes tag push pattern `v*.*.*` and manual dispatch.
  **Evidence:** `.github/workflows/publish.yml:3-8`
- Release process runs a verify job before publish (`npm ci`, lint, build, test, pack dry-run, n8n package scan).
  **Evidence:** `.github/workflows/publish.yml:14-31`
- Publish step uses `npm publish --provenance --access public` and `NODE_AUTH_TOKEN` from `secrets.NPM_TOKEN`.
  **Evidence:** `.github/workflows/publish.yml:45-48`
- Versioning guidance in repository text says semantic versioning is used.
  **Evidence:** `README.md:262-263`
  **Evidence:** `README.md:286-289`

## 00.7 Documentation Governance
- Doc-first workflow rule: SSOT files are authoritative and derived docs must come from these files.
  **Evidence:** `agent.md:52-61`
- Requirement that factual claims are evidence-based and non-invented.
  **Evidence:** `agent.md:67-93`
- How changes should be proposed:
  - README contributor guidance specifies fork, feature branch, local build/test, and pull request.
    **Evidence:** `README.md:254-260`
  - No separate formal documentation change policy file was found.
    **Evidence:** `README.md:1-308`

## 00.8 Change Log (Initial)
| Date | Doc Version | Node Version | Summary | Author |
|---|---|---|---|---|
| Not confirmed in code. | Not confirmed in code. | Not confirmed in code. | Not confirmed in code. | Not confirmed in code. |

**Evidence:** `README.md:286-289`

## Open Questions / Missing Evidence
- Repository name is inferred from repository URL; no explicit standalone repository identifier file was found.
- Explicit n8n core version compatibility range is not confirmed in code.
- End-user Node.js runtime requirement is confirmed in code via `engines.node: ">=20"`.
- Formal CODEOWNERS or maintainer policy file is not confirmed in code.
- Formal release notes/changelog file beyond README statements is not confirmed in code.
- Dedicated documentation governance process beyond `agent.md` constraints is not confirmed in code.
- Runtime environment variables for the node itself are not confirmed in code.

## Evidence Index
- `agent.md` — SSOT purpose, scope, and evidence-only documentation requirements.
- `package.json` — package identity, version, license, repository URLs, author, build/test scripts, n8n registration, peer dependency.
- `nodes/DavixH2I/DavixH2I.node.ts` — node display name/default name and node description text.
- `credentials/DavixH2IApi.credentials.ts` — credential type name/display name and PixLab base URL default field.
- `.github/workflows/publish.yml` — release trigger, verification and publish steps, Node.js version in CI.
- `tsconfig.json` — TypeScript usage and CommonJS module target.
- `LICENSE` — license text and copyright attribution.
- `README.md` — contributing flow, semantic versioning statements, changelog note, and support channels.
