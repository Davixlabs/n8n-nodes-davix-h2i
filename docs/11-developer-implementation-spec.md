# 11. Developer Implementation Specification

## 11.1 Repository Structure Overview

Repository structure observed in the current codebase:

```text
/root
 ├─ agent.md
 ├─ README.md
 ├─ LICENSE
 ├─ package.json
 ├─ package-lock.json
 ├─ tsconfig.json
 ├─ eslint.config.js
 ├─ src/
 │   └─ index.ts
 ├─ credentials/
 │   └─ DavixH2IApi.credentials.ts
 ├─ nodes/
 │   └─ DavixH2I/
 │       ├─ DavixH2I.node.ts
 │       ├─ GenericFunctions.ts
 │       └─ davixH2I.svg
 └─ tests/
     └─ GenericFunctions.test.js
```

Evidence: `rg --files` output (repository root listing), `package.json:L1-L54`, `tsconfig.json:L1-L22`, `eslint.config.js:L1-L8`, `src/index.ts:L1`, `credentials/DavixH2IApi.credentials.ts:L1-L27`, `nodes/DavixH2I/DavixH2I.node.ts:L1-L1935`, `nodes/DavixH2I/GenericFunctions.ts:L1-L176`, `tests/GenericFunctions.test.js:L1-L66`.

## 11.2 Node Registration and Definition

- Class name: `DavixH2I`. Evidence: `nodes/DavixH2I/DavixH2I.node.ts:L53`.
- The class implements `INodeType`. Evidence: `nodes/DavixH2I/DavixH2I.node.ts:L4-L5`, `nodes/DavixH2I/DavixH2I.node.ts:L53`.
- Node metadata is defined in `description: INodeTypeDescription`. Evidence: `nodes/DavixH2I/DavixH2I.node.ts:L54-L68`.
- Description object includes `displayName`, `name`, `icon`, `group`, `version`, `subtitle`, `defaults`, `inputs`, `outputs`, `credentials`, and `properties`. Evidence: `nodes/DavixH2I/DavixH2I.node.ts:L55-L68`.
- Group classification is `['transform']`. Evidence: `nodes/DavixH2I/DavixH2I.node.ts:L58`.
- Icon is file-based: `file:davixH2I.svg`. Evidence: `nodes/DavixH2I/DavixH2I.node.ts:L57`, `nodes/DavixH2I/davixH2I.svg`.
- Versioning in node definition is `version: 1`. Evidence: `nodes/DavixH2I/DavixH2I.node.ts:L59`.
- No separate `defaultVersion` field is visible in the node definition. Evidence: `nodes/DavixH2I/DavixH2I.node.ts:L54-L68`.

## 11.3 Execution Logic Structure

- Execution is implemented in `async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]>`. Evidence: `nodes/DavixH2I/DavixH2I.node.ts:L1235`.
- The method:
  - reads input items using `this.getInputData()`;
  - iterates item-by-item;
  - reads `resource` and `operation` per item via `this.getNodeParameter(...)`;
  - branches by resource (`h2i`, `image`, `pdf`, `tools`);
  - pushes output objects to `out`;
  - returns `[out]`.
  Evidence: `nodes/DavixH2I/DavixH2I.node.ts:L1236-L1243`, `nodes/DavixH2I/DavixH2I.node.ts:L1326-L1914`, `nodes/DavixH2I/DavixH2I.node.ts:L1933`.
- Shared helper closures in `execute()` include `gatherAllUrls`, `attachFiles`, `attachSingleFile`, and `checkTotalBinarySize`. Evidence: `nodes/DavixH2I/DavixH2I.node.ts:L1245-L1324`.
- Request dispatch uses helper functions imported from `GenericFunctions.ts`: `davixRequest` and `downloadToBinary`. Evidence: `nodes/DavixH2I/DavixH2I.node.ts:L11`, `nodes/DavixH2I/DavixH2I.node.ts:L1349-L1354`, `nodes/DavixH2I/DavixH2I.node.ts:L1619-L1624`, `nodes/DavixH2I/DavixH2I.node.ts:L1774-L1779`, `nodes/DavixH2I/DavixH2I.node.ts:L1903-L1908`.
- Operation-level logic is handled with resource conditionals and action-specific switches/conditionals:
  - `h2i`: conditional body fields based on action;
  - `image`: `switch (action)` for per-action form fields;
  - `pdf`: `if (action === ...)` blocks;
  - `tools`: `single` vs `multitask` with selected tool conditionals.
  Evidence: `nodes/DavixH2I/DavixH2I.node.ts:L1327-L1373`, `nodes/DavixH2I/DavixH2I.node.ts:L1409-L1617`, `nodes/DavixH2I/DavixH2I.node.ts:L1651-L1773`, `nodes/DavixH2I/DavixH2I.node.ts:L1801-L1902`.
- Error handling in execution:
  - wraps each item in `try/catch`;
  - if `continueOnFail()` is true, returns structured error JSON with paired item;
  - otherwise rethrows.
  Evidence: `nodes/DavixH2I/DavixH2I.node.ts:L1240-L1241`, `nodes/DavixH2I/DavixH2I.node.ts:L1915-L1930`.

## 11.4 Request Construction Implementation

- HTTP request options are centrally normalized in `buildDavixRequestOptions(options, baseUrl, apiKey)`. Evidence: `nodes/DavixH2I/GenericFunctions.ts:L39-L52`.
- URL construction combines credential base URL and endpoint path with slash normalization (`stripTrailingSlash`, `ensureLeadingSlash`). Evidence: `nodes/DavixH2I/GenericFunctions.ts:L9-L16`, `nodes/DavixH2I/GenericFunctions.ts:L46`.
- Headers are assembled by merging existing headers and injecting `x-api-key`. Evidence: `nodes/DavixH2I/GenericFunctions.ts:L47-L50`.
- Method and payload selection happens in `execute()` per resource:
  - `/v1/h2i` uses `POST` + JSON body;
  - `/v1/image` uses `POST` + multipart `formData`;
  - `/v1/pdf` uses `POST` + multipart `formData`;
  - `/v1/tools` uses `POST` + multipart `formData`.
  Evidence: `nodes/DavixH2I/DavixH2I.node.ts:L1349-L1354`, `nodes/DavixH2I/DavixH2I.node.ts:L1619-L1624`, `nodes/DavixH2I/DavixH2I.node.ts:L1774-L1779`, `nodes/DavixH2I/DavixH2I.node.ts:L1903-L1908`.
- Request objects are manually assembled in `execute()` using `this.getNodeParameter(...)`, local setter helpers (`setString`, `setNumber`, `setBool`), and file attachment helpers (`attachFiles`, `attachSingleFile`). Evidence: `nodes/DavixH2I/DavixH2I.node.ts:L1260-L1324`, `nodes/DavixH2I/DavixH2I.node.ts:L1329-L1347`, `nodes/DavixH2I/DavixH2I.node.ts:L1386-L1407`, `nodes/DavixH2I/DavixH2I.node.ts:L1659-L1667`, `nodes/DavixH2I/DavixH2I.node.ts:L1808-L1816`.

## 11.5 Response Handling Implementation

- Primary response capture is through `davixRequest`, which returns `this.helpers.request(...)` output. Evidence: `nodes/DavixH2I/GenericFunctions.ts:L102-L117`.
- JSON output handling:
  - success paths push `{ json: response }` (or `{ json: response, binary: ... }`);
  - tools resource always pushes JSON only.
  Evidence: `nodes/DavixH2I/DavixH2I.node.ts:L1368-L1371`, `nodes/DavixH2I/DavixH2I.node.ts:L1642-L1645`, `nodes/DavixH2I/DavixH2I.node.ts:L1792-L1794`, `nodes/DavixH2I/DavixH2I.node.ts:L1910`.
- Binary attachment is conditionally supported for `h2i`, `image`, and `pdf` when their corresponding `downloadBinary` flags are true; files are downloaded via `downloadToBinary` and converted with `this.helpers.prepareBinaryData(...)`. Evidence: `nodes/DavixH2I/DavixH2I.node.ts:L1356-L1369`, `nodes/DavixH2I/DavixH2I.node.ts:L1626-L1642`, `nodes/DavixH2I/DavixH2I.node.ts:L1781-L1792`, `nodes/DavixH2I/GenericFunctions.ts:L160-L176`.
- Output shape differs by operation/resource branch because some branches return JSON-only and others include binary objects keyed by configured property names. Evidence: `nodes/DavixH2I/DavixH2I.node.ts:L1360-L1369`, `nodes/DavixH2I/DavixH2I.node.ts:L1630-L1643`, `nodes/DavixH2I/DavixH2I.node.ts:L1785-L1793`, `nodes/DavixH2I/DavixH2I.node.ts:L1910`.
- Error responses in continue-on-fail mode are transformed to JSON with keys `error`, optional `description`, optional `httpCode`. Evidence: `nodes/DavixH2I/DavixH2I.node.ts:L1916-L1925`.

## 11.6 Credential Integration Implementation

- Credential type class: `DavixH2IApi implements ICredentialType`. Evidence: `credentials/DavixH2IApi.credentials.ts:L1-L4`.
- Credential fields defined are `baseUrl` and `apiKey` (`apiKey` marked as password field). Evidence: `credentials/DavixH2IApi.credentials.ts:L7-L25`.
- Node references this credential by name in the node description credentials array (`davixH2IApi`, required). Evidence: `nodes/DavixH2I/DavixH2I.node.ts:L67`.
- Runtime credential access uses `this.getCredentials('davixH2IApi')` in `davixRequest`. Evidence: `nodes/DavixH2I/GenericFunctions.ts:L106`.
- Credentials are injected into request processing by:
  - validating `baseUrl` through `validateBaseUrl`;
  - requiring non-empty `apiKey`;
  - adding API key to headers via `buildDavixRequestOptions`.
  Evidence: `nodes/DavixH2I/GenericFunctions.ts:L18-L37`, `nodes/DavixH2I/GenericFunctions.ts:L108-L113`, `nodes/DavixH2I/GenericFunctions.ts:L47-L50`.
- Credential validation visible in code:
  - base URL must be present, absolute URL, HTTPS, no embedded credentials;
  - API key must be present.
  Evidence: `nodes/DavixH2I/GenericFunctions.ts:L19-L34`, `nodes/DavixH2I/GenericFunctions.ts:L111`.

## 11.7 TypeScript and Build Configuration

- TypeScript is used for source implementation (`.ts` files in `nodes/`, `credentials/`, `src/`). Evidence: `tsconfig.json:L17-L21`, `nodes/DavixH2I/DavixH2I.node.ts:L1-L1935`, `nodes/DavixH2I/GenericFunctions.ts:L1-L176`, `credentials/DavixH2IApi.credentials.ts:L1-L27`.
- Compiler target is `ES2022`. Evidence: `tsconfig.json:L3`.
- Module format is `CommonJS` with `moduleResolution: Node`. Evidence: `tsconfig.json:L4-L5`.
- Build output directory is `dist`; declaration files are enabled. Evidence: `tsconfig.json:L6-L8`.
- Build script is `tsc && npm run copy:icons`; icon/script also copies `dist/src/index.js` and `dist/src/index.d.ts` to top-level `dist/index.*` when present. Evidence: `package.json:L30-L31`.
- Source maps are not explicitly enabled in `tsconfig.json` (no `sourceMap` compiler option present). Evidence: `tsconfig.json:L2-L16`.
- Compiled output is intended as publish artifact (`files: ["dist"]`, `main`/`types` point to `dist`), and n8n package entries point to `dist` JS files. Evidence: `package.json:L24-L28`, `package.json:L46-L53`.
- A `dist/` directory is not present in the current repository file listing at analysis time. Evidence: `rg --files` output used in Section 11.1.

## 11.8 Testing Strategy (If Present)

- Automated tests are present in `tests/GenericFunctions.test.js`. Evidence: `tests/GenericFunctions.test.js:L1-L66`.
- Test framework is Node.js built-in test runner (`node:test`) with `node:assert/strict`. Evidence: `tests/GenericFunctions.test.js:L2-L3`.
- `npm test` script runs `node --test tests/**/*.test.js`. Evidence: `package.json:L35`.
- Tests target helper behavior (`validateBaseUrl`, `parseDavixErrorEnvelope`, `buildDavixRequestOptions`) by importing compiled helper module from `dist/.../GenericFunctions.js`. Evidence: `tests/GenericFunctions.test.js:L5-L10`, `tests/GenericFunctions.test.js:L11-L66`.
- No coverage tooling configuration is visible in repository files reviewed. Evidence: `package.json:L29-L42`, `tests/GenericFunctions.test.js:L1-L66`.

## 11.9 Versioning Strategy

- Package version is `1.0.0` in `package.json`. Evidence: `package.json:L3`.
- Node definition version is `1`. Evidence: `nodes/DavixH2I/DavixH2I.node.ts:L59`.
- No versioned node export structure is visible in `src/index.ts` (`export {};` only). Evidence: `src/index.ts:L1`.
- No explicit backward-compatibility branch or migration handling is visible in the node implementation. Evidence: `nodes/DavixH2I/DavixH2I.node.ts:L53-L1935`.

## 11.10 Extension and Modification Points

Based on current file and code structure:

- New resources and operations would be added in two places within `DavixH2I.node.ts`:
  1) `description.properties` option lists and field definitions;
  2) `execute()` resource/action branching logic.
  Evidence: `nodes/DavixH2I/DavixH2I.node.ts:L68-L1232`, `nodes/DavixH2I/DavixH2I.node.ts:L1326-L1914`.
- Shared helper module `GenericFunctions.ts` centralizes HTTP request option construction, credential handling, error envelope parsing, and binary download helper; this is the existing shared utility layer used by all resource requests. Evidence: `nodes/DavixH2I/GenericFunctions.ts:L18-L176`, `nodes/DavixH2I/DavixH2I.node.ts:L11`, `nodes/DavixH2I/DavixH2I.node.ts:L1349-L1354`, `nodes/DavixH2I/DavixH2I.node.ts:L1619-L1624`, `nodes/DavixH2I/DavixH2I.node.ts:L1774-L1779`, `nodes/DavixH2I/DavixH2I.node.ts:L1903-L1908`.
- Current operation structure is modular by resource branch, but all operation-field mappings are implemented in a single node file (`DavixH2I.node.ts`) rather than split into per-operation modules. Evidence: `nodes/DavixH2I/DavixH2I.node.ts:L68-L1232`, `nodes/DavixH2I/DavixH2I.node.ts:L1235-L1935`.
- The project export entry file currently contains no exports (`export {};`), so discoverable runtime registration relies on package metadata paths to compiled files. Evidence: `src/index.ts:L1`, `package.json:L46-L53`.

## Open Questions / Missing Evidence

- The repository includes `src/index.ts` with `export {};`, but no explicit in-repo code showing runtime registration wiring beyond `package.json` metadata and expected compiled outputs. Not confirmed in code whether additional packaging steps outside this repository add exports.
  - Files checked: `src/index.ts`, `package.json`.
- Tests import from `dist/.../GenericFunctions.js`, but this document does not confirm CI ordering (build-before-test) beyond available npm scripts. Not confirmed in code.
  - Files checked: `tests/GenericFunctions.test.js`, `package.json`.

## Evidence Index

- `agent.md` — repository-level documentation constraints for generation.
- `package.json` — package metadata, scripts, n8n entrypoints, version, test script, lint/build config.
- `tsconfig.json` — TypeScript compiler target/module/output settings.
- `eslint.config.js` — lint baseline and ignore patterns.
- `src/index.ts` — export pattern at repository entrypoint.
- `credentials/DavixH2IApi.credentials.ts` — credential class, fields, required configuration.
- `nodes/DavixH2I/DavixH2I.node.ts` — node class, description metadata, operations/fields, execute branching, request/response handling.
- `nodes/DavixH2I/GenericFunctions.ts` — credential retrieval, URL/header construction, error parsing, HTTP request helper, binary download helper.
- `tests/GenericFunctions.test.js` — automated tests and tested helper functions.
- `nodes/DavixH2I/davixH2I.svg` — icon file referenced by node definition.
