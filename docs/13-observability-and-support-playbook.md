# 13. Observability and Support Playbook

## 13.1 Logging Implementation

This repository does not implement explicit logging within the node code.

- `execute()` in `DavixH2I.node.ts` processes inputs, builds requests, and pushes outputs/errors, but it does not call `console.log` or any logging framework methods. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1235-L1934`
- `GenericFunctions.ts` performs request construction, error parsing, API calls, and binary download without any explicit log statements. **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L39-L176`
- No debug flag/parameter is defined in the execution flow for enabling conditional logging. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1235-L1934`
- The only `console.log` in the repository is inside the `copy:icons` build script in `package.json`; it is not runtime node observability. **Evidence:** `package.json:L29-L36`

## 13.2 Error Visibility Model

- API request failures in `davixRequest()` are caught and transformed into `NodeApiError` with optional `message`, `description`, and `httpCode`. **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L115-L157`
- Error description text is enriched with remediation guidance and may include parsed backend `hint` and `request_id` if present. **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L140-L148`
- `execute()` uses `try/catch` per item. If `continueOnFail()` is enabled, it emits JSON error output containing `error` and optional `description`/`httpCode`, paired to the item index. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1240-L1243`, `nodes/DavixH2I/DavixH2I.node.ts:L1915-L1927`
- If `continueOnFail()` is not enabled, errors are re-thrown. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1928-L1929`
- The node uses both `NodeApiError` (HTTP/API wrapper) and `NodeOperationError` (validation/operation errors such as oversize upload, invalid reorder JSON, unsupported resource, missing multitask tool selections). **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L7`, `nodes/DavixH2I/GenericFunctions.ts:L152-L157`, `nodes/DavixH2I/DavixH2I.node.ts:L1318-L1321`, `nodes/DavixH2I/DavixH2I.node.ts:L1732-L1740`, `nodes/DavixH2I/DavixH2I.node.ts:L1827-L1829`, `nodes/DavixH2I/DavixH2I.node.ts:L1914`
- There is no explicit stack trace preservation or stack serialization logic in this repository. **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L102-L158`, `nodes/DavixH2I/DavixH2I.node.ts:L1915-L1930`

## 13.3 Debugging Workflow (Code-Based)

### Parameter retrieval issues

- Parameters are fetched via `this.getNodeParameter(...)` and then used directly in request builders/switch branches by resource/action. Debugging focuses on confirming `resource`, `operation`, and operation-specific fields per branch. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1243`, `nodes/DavixH2I/DavixH2I.node.ts:L1327-L1347`, `nodes/DavixH2I/DavixH2I.node.ts:L1409-L1617`, `nodes/DavixH2I/DavixH2I.node.ts:L1669-L1772`, `nodes/DavixH2I/DavixH2I.node.ts:L1819-L1901`
- Binary property list parsing is strict (`split(',')`, trim, filter). Empty lists throw. Debugging missing inputs requires checking binary property names and item binary data availability. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1260-L1271`, `nodes/DavixH2I/DavixH2I.node.ts:L1272-L1286`

### Request construction issues

- All network calls route through `davixRequest()`, which validates credentials/base URL and injects `x-api-key`. Request debug path is: credential retrieval → `validateBaseUrl()` → `buildDavixRequestOptions()` → `helpers.httpRequest()`. **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L18-L37`, `nodes/DavixH2I/GenericFunctions.ts:L39-L52`, `nodes/DavixH2I/GenericFunctions.ts:L106-L117`
- Operation request payloads are assembled as JSON (`/v1/h2i`) or multipart formData (`/v1/image`, `/v1/pdf`, `/v1/tools`) with branch-specific field population. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1349-L1354`, `nodes/DavixH2I/DavixH2I.node.ts:L1619-L1624`, `nodes/DavixH2I/DavixH2I.node.ts:L1774-L1779`, `nodes/DavixH2I/DavixH2I.node.ts:L1903-L1908`
- A 50 MB aggregate binary upload guard (`maxUploadBytes`) is enforced before multipart requests. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1238`, `nodes/DavixH2I/DavixH2I.node.ts:L1301-L1323`

### Response parsing issues

- URL extraction for downloadable outputs relies on `response.url` and `response.results[]`/`results[].url` via `gatherAllUrls()`. If none exist while download is enabled, execution throws. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1245-L1258`, `nodes/DavixH2I/DavixH2I.node.ts:L1356-L1360`, `nodes/DavixH2I/DavixH2I.node.ts:L1626-L1630`, `nodes/DavixH2I/DavixH2I.node.ts:L1781-L1784`
- Non-downloaded paths return API JSON as-is in `out.push({ json: response })`. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1369-L1370`, `nodes/DavixH2I/DavixH2I.node.ts:L1643-L1644`, `nodes/DavixH2I/DavixH2I.node.ts:L1793-L1794`, `nodes/DavixH2I/DavixH2I.node.ts:L1910`

### Binary handling issues

- Downloads use `downloadToBinary()` with `returnFullResponse: true`, then `prepareBinaryData(...)` for output binary fields. **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L165-L175`, `nodes/DavixH2I/DavixH2I.node.ts:L1362-L1368`, `nodes/DavixH2I/DavixH2I.node.ts:L1637-L1642`, `nodes/DavixH2I/DavixH2I.node.ts:L1787-L1792`
- Multipart upload uses `getBinaryDataBuffer(...)` and file metadata (`fileName`, `mimeType`) from incoming item binary data. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1273-L1277`, `nodes/DavixH2I/DavixH2I.node.ts:L1278-L1285`, `nodes/DavixH2I/DavixH2I.node.ts:L1289-L1298`

## 13.4 Request and Response Traceability

- `parseDavixErrorEnvelope()` extracts request identifiers from `request_id`/`requestId` in top-level or nested `error` envelopes. **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L54-L100`
- Extracted `requestId` is not stored as a dedicated structured field in normal success outputs; it is only referenced in error remediation text (`Provide request_id ...`). **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L140-L148`
- Response headers are read only in `downloadToBinary()` to derive `mimeType`; headers are not returned to node output JSON. **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L169-L175`
- The node does not implement explicit correlation ID propagation or request config output for end-user inspection. **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L102-L157`, `nodes/DavixH2I/DavixH2I.node.ts:L1235-L1934`

Request traceability features are not implemented in this node.

## 13.5 Common Failure Patterns (Derived from Code)

- Missing credentials/base URL/API key (`Missing Base URL`, invalid URL format, non-HTTPS URL, embedded credentials, missing API key). **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L18-L34`, `nodes/DavixH2I/GenericFunctions.ts:L111`
- Missing or invalid binary input configuration (`No binary property names provided`). **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1265-L1271`
- Upload over 50 MB total (`Total upload size exceeds 50 MB`). **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1238`, `nodes/DavixH2I/DavixH2I.node.ts:L1301-L1321`
- Missing selected actions/tools (`Select at least one action for multitask`, `Please select at least one tool for Multitask`, missing single tool selection). **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1514-L1515`, `nodes/DavixH2I/DavixH2I.node.ts:L1821-L1829`
- Invalid reorder payload for PDF reorder (`Invalid order JSON`, `Invalid order array`). **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1724-L1745`
- Download expected but URL absent (`No URL returned to download`). **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1358-L1360`, `nodes/DavixH2I/DavixH2I.node.ts:L1628-L1630`, `nodes/DavixH2I/DavixH2I.node.ts:L1783-L1784`
- Unsupported resource fallback (`Unsupported resource: ...`). **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1914`
- Backend HTTP errors transformed with status-aware descriptions for 429/503/413 and envelope extraction. **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L124-L157`

## 13.6 Support and Maintenance Signals

- Maintainer/author in package metadata: `Davix Labs`. **Evidence:** `package.json:L28-L30`
- Repository owner/signal in package metadata: Git URL points to `github.com/Davixlabs/n8n-nodes-davix-h2i`. **Evidence:** `package.json:L6-L9`
- Issue tracker URL exists in package metadata (`/issues`). **Evidence:** `package.json:L10-L12`
- README includes support/contact references for the GitHub issue tracker and H2I service support. **Evidence:** `README.md:L229-L245`
- No GitHub issue template or dedicated contribution guideline file was found in repository files (only workflow under `.github/workflows`). **Evidence:** `.github/workflows/publish.yml:L1-L48`, `rg --files .github`

## 13.7 Operational Limitations

- No explicit runtime logging inside node execution/helper code. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1235-L1934`, `nodes/DavixH2I/GenericFunctions.ts:L102-L176`
- No retry/backoff logic is implemented around HTTP requests; failures are converted to `NodeApiError` and returned/thrown. **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L115-L157`
- Trace/correlation propagation is not implemented beyond parsing request IDs from error envelopes and embedding them in description text. **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L54-L100`, `nodes/DavixH2I/GenericFunctions.ts:L140-L148`
- Stack traces are not explicitly exposed/serialized by node code. **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L115-L157`, `nodes/DavixH2I/DavixH2I.node.ts:L1915-L1930`
- Binary download depends on response URL presence; no alternate retrieval path exists when URL is missing. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1245-L1258`, `nodes/DavixH2I/DavixH2I.node.ts:L1358-L1360`, `nodes/DavixH2I/DavixH2I.node.ts:L1628-L1630`, `nodes/DavixH2I/DavixH2I.node.ts:L1783-L1784`

## Open Questions / Missing Evidence

- Whether n8n runtime itself adds request/trace metadata to execution logs for this node is not confirmed in this repository.
- Whether downstream platform-level error stack visibility differs by n8n deployment mode is not confirmed in this repository.

## Evidence Index

- `nodes/DavixH2I/DavixH2I.node.ts` — execute flow, per-resource request building, upload/download handling, continueOnFail behavior, validation errors.
- `nodes/DavixH2I/GenericFunctions.ts` — base URL validation, auth header injection, error envelope parsing, NodeApiError wrapping, binary download response handling.
- `package.json` — maintainer metadata, repository/bugs URLs, build script console logging.
- `README.md` — troubleshooting/support/contribution text included in repository.
- `.github/workflows/publish.yml` — verification hooks and absence of issue templates/contribution policy files in `.github`.
- Command evidence: `rg --files .github` — repository `.github` contents listing.
