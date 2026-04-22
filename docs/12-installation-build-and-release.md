# 12. Installation, Build, and Release

## 12.1 Installation Model

- This repository is an npm package (`name: @davixlabs/n8n-nodes-davix-h2i`).  
  **Evidence:** `package.json:L2`
- The package is labeled as an n8n community node via keyword `n8n-community-node-package` and n8n package metadata under `n8n.credentials` and `n8n.nodes`.  
  **Evidence:** `package.json:L14-L15`, `package.json:L46-L53`
- The README documents two installation methods: self-hosted n8n GUI install from **Settings > Community Nodes** and manual npm installation under `~/.n8n/nodes`.  
  **Evidence:** `README.md:L97-L116`
- The repository documents self-hosted installation paths only and notes that community-package availability depends on deployment mode, permissions, and whether community packages are enabled.  
  **Evidence:** `README.md:L97-L116`

## 12.2 Development Setup

- Node.js runtime requirement is declared in `package.json` as `engines.node: ">=20"` and CI uses Node 20 (`actions/setup-node` with `node-version: 20`).  
  **Evidence:** `package.json:L54-L56`, `.github/workflows/publish.yml:L19-L23`, `.github/workflows/publish.yml:L39-L43`
- A required n8n version is not pinned in `package.json`; only `peerDependencies.n8n-workflow` is set to `*`.  
  **Evidence:** `package.json:L43-L45`
- Dependency installation command used in automation is `npm ci`.  
  **Evidence:** `.github/workflows/publish.yml:L25`, `.github/workflows/publish.yml:L45`
- Build command is `npm run build` which runs `tsc && npm run copy:icons`.  
  **Evidence:** `package.json:L37-L38`, `README.md:L212-L227`
- Development mode is `npm run dev`, implemented as `tsc --watch`.  
  **Evidence:** `package.json:L39`, `README.md:L221-L227`
- Watch behavior is explicitly present through the `dev` script (`tsc --watch`).  
  **Evidence:** `package.json:L32`

## 12.3 Build Process

- The build is TypeScript-based (`typescript` devDependency, `tsc` in build script).  
  **Evidence:** `package.json:L30`, `package.json:L41`
- TypeScript compilation outputs to `dist` (`outDir: "dist"`) and emits declaration files (`declaration: true`).  
  **Evidence:** `tsconfig.json:L6-L8`
- Build script sequence: compile TypeScript, then run icon/index copy step via `copy:icons`.  
  **Evidence:** `package.json:L30-L31`
- The copy step copies `nodes/DavixH2I/davixH2I.svg` to `dist/nodes/DavixH2I/davixH2I.svg` and also copies `dist/src/index.js` and `dist/src/index.d.ts` to `dist/index.js` and `dist/index.d.ts` if present.  
  **Evidence:** `package.json:L31`
- `dist/` is the intended packaged output (`main`, `types`, and `files` only include `dist`).  
  **Evidence:** `package.json:L24-L28`
- Source maps are not explicitly enabled in `tsconfig.json` (`sourceMap` is not defined).  
  **Evidence:** `tsconfig.json:L2-L16`

## 12.4 Publishing and Distribution

- `publishConfig.access` is defined in `package.json` as `public`.  
  **Evidence:** `package.json:L64-L66`
- `private` is not set to `true` in `package.json` (no `private` field is present).  
  **Evidence:** `package.json:L1-L54`
- GitHub Actions publish automation exists in `.github/workflows/publish.yml`.  
  **Evidence:** `.github/workflows/publish.yml:L1-L48`
- Automated publish trigger includes tag pushes matching `v*.*.*`; publish job requires refs starting with `refs/tags/v`.  
  **Evidence:** `.github/workflows/publish.yml:L4-L7`, `.github/workflows/publish.yml:L35`
- Publish command is `npm publish --provenance --access public` with `NODE_AUTH_TOKEN` from `secrets.NPM_TOKEN`.  
  **Evidence:** `.github/workflows/publish.yml:L46-L48`
- npm registry URL is specified in setup-node steps as `https://registry.npmjs.org/`.  
  **Evidence:** `.github/workflows/publish.yml:L22`, `.github/workflows/publish.yml:L42`
- Semantic-release configuration is not present in the repository files analyzed.  
  **Evidence:** `package.json:L1-L54`, `.github/workflows/publish.yml:L1-L48`

## 12.5 Versioning Strategy

- Current package version is `1.0.0`.  
  **Evidence:** `package.json:L3`
- Node implementation metadata includes node `version: 1` in the node description object.  
  **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L59`
- No explicit version-bump npm script is defined in `scripts`.  
  **Evidence:** `package.json:L29-L36`
- No dedicated changelog file is present at repository root, and the current README does not include a changelog section.  
  **Evidence:** `README.md:L1-L250`
- A formal breaking-change policy is not defined in dedicated release policy files.  
  **Evidence:** `README.md:L1-L250`

## 12.6 CI/CD Automation (If Present)

- CI/CD configuration is present via GitHub Actions workflow `.github/workflows/publish.yml`.  
  **Evidence:** `.github/workflows/publish.yml:L1-L48`
- Verification pipeline includes: `npm ci`, `npm run lint`, `npm run build`, and `npm pack --dry-run`.  
  **Evidence:** `.github/workflows/publish.yml:L25-L30`
- Publish automation is separate from verify, depends on `verify`, and executes only for version-tag refs.  
  **Evidence:** `.github/workflows/publish.yml:L32-L36`

## 12.7 Distribution Constraints

- Distribution is npm-oriented based on npm package metadata and npm publish workflow commands.  
  **Evidence:** `package.json:L2`, `.github/workflows/publish.yml:L46`
- The package explicitly targets n8n community node loading paths via the `n8n` section and includes the keyword `n8n-community-node-package`.  
  **Evidence:** `package.json:L14`, `package.json:L46-L53`
- Packaged artifacts are constrained to `dist/` only via `files: ["dist"]`.  
  **Evidence:** `package.json:L26-L28`
- TypeScript source is in `credentials/**/*.ts`, `nodes/**/*.ts`, and `src/index.ts`; build output target is `dist/`.  
  **Evidence:** `tsconfig.json:L7`, `tsconfig.json:L17-L21`

## Open Questions / Missing Evidence

- Installation prerequisites include Node.js `>=20` as declared in `package.json` `engines`.
- There is no dedicated changelog file in the repository root, and release note generation rules are not defined.
- `publishConfig.access` is set to `public`, but package manager-level publishing behavior beyond this and the CI command flags is not explicitly documented.
- No dedicated semantic-release tooling/config file is present; version increment process outside tag-based publishing is not defined.

## Evidence Index

- `package.json` — package identity, version, scripts, dependency metadata, n8n packaging metadata, distributable files, and publish configuration.
- `tsconfig.json` — TypeScript build configuration, output directory, declaration output, and include scope.
- `.github/workflows/publish.yml` — CI verification flow, Node version used in automation, tag-triggered publish process, npm registry configuration, publish command.
- `README.md` — documented installation instructions, credential guidance, development commands, and support links.
- `nodes/DavixH2I/DavixH2I.node.ts` — node description-level version field (`version: 1`).
