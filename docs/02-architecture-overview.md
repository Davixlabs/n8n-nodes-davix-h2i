# 02. Architecture Overview

## 02.1 High-Level System Context

This node executes inside n8n as a standard node class (`DavixH2I`) implementing `INodeType`, with one main input and one main output. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts` (`export class DavixH2I`, `inputs`, `outputs`).

At runtime, `execute()` reads workflow input items, branches by selected `resource`, builds either JSON or multipart request payloads, and sends HTTP requests through the shared helper `davixRequest`. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts` (`execute`, resource branches, `davixRequest.call(...)`).

`davixRequest` retrieves credentials, validates/normalizes base URL, injects `x-api-key`, then dispatches via `this.helpers.httpRequest(...)`. **Evidence:** `nodes/DavixH2I/GenericFunctions.ts` (`davixRequest`, `validateBaseUrl`, `buildDavixRequestOptions`).

The implemented request flow is:

n8n Workflow → `DavixH2I.execute()` → `davixRequest()` / `this.helpers.httpRequest()` → PixLab REST path (`/v1/h2i`, `/v1/image`, `/v1/pdf`, `/v1/tools`) → response JSON (optional URL download to binary) → n8n output items. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts` (`url: '/v1/h2i'|'/v1/image'|'/v1/pdf'|'/v1/tools'`, output pushes, binary download branches); `nodes/DavixH2I/GenericFunctions.ts` (`this.helpers.httpRequest`).

## 02.2 Node Internal Structure

Implemented structure in this repository:

- Node definition and runtime logic: `nodes/DavixH2I/DavixH2I.node.ts`. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts`.
- Request/error helper utilities: `nodes/DavixH2I/GenericFunctions.ts`. **Evidence:** `nodes/DavixH2I/GenericFunctions.ts`.
- Credential definition: `credentials/DavixH2IApi.credentials.ts`. **Evidence:** `credentials/DavixH2IApi.credentials.ts`.

The node registers one credential (`davixH2IApi`) and user-facing `resource`/`operation` options in `description.properties`. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts` (`credentials`, `properties` entries for `resource` and `operation`).

Execution routing is explicit conditional branching (`if (resource === 'h2i')`, `if (resource === 'image')`, `if (resource === 'pdf')`, `if (resource === 'tools')`) with operation-specific switch/if logic inside branches. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts` (resource branches and per-action logic).

Structural map (code-confirmed):

```text
DavixH2I (INodeType)
 ├─ description
 │   ├─ credentials: davixH2IApi
 │   └─ properties: resource/operation and per-operation fields
 └─ execute()
     ├─ per-item loop
     ├─ local helpers (gatherAllUrls, attachFiles, attachSingleFile, checkTotalBinarySize)
     ├─ resource branches (h2i/image/pdf/tools)
     ├─ request dispatch via davixRequest
     ├─ optional downloadToBinary + prepareBinaryData
     └─ error handling (continueOnFail vs throw)
```

**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts` (`description`, `execute`, local helper functions, resource branches, catch block).

## 02.3 Request Lifecycle (Step-by-Step)

1. Input items are loaded with `this.getInputData()`, then processed in a `for` loop by item index. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts` (`const items = this.getInputData();`, `for (let itemIndex = 0; itemIndex < items.length; itemIndex++)`).
2. `resource` and `operation` are read with `this.getNodeParameter(...)`. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts` (`const resource = ...`, `const operation = ...`).
3. Local per-item helper functions are defined to gather URLs, attach binary files to multipart `formData`, attach single files, and enforce a total upload size limit. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts` (`gatherAllUrls`, `attachFiles`, `attachSingleFile`, `checkTotalBinarySize`).
4. Branching by resource determines endpoint and payload style:
   - H2I builds JSON body and posts to `/v1/h2i`.
   - Image builds multipart `formData` and posts to `/v1/image`.
   - PDF builds multipart `formData` and posts to `/v1/pdf`.
   - Tools builds multipart `formData` and posts to `/v1/tools`.
   **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts` (resource branches and request objects).
5. Parameters are transformed before request (examples implemented):
   - numeric values serialized to strings in multipart payload helpers (`setNumber` variants);
   - booleans converted to `'true'/'false'` by `toBoolString`;
   - PDF reorder accepts JSON array and normalizes to comma-separated string;
   - PDF extract mode maps `range` → `single`.
   **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts` (`toBoolString`, `setNumber`, reorder parsing/validation, `normalizedMode`).
6. Credential/header/base URL injection happens in `davixRequest` (`getCredentials`, `validateBaseUrl`, `buildDavixRequestOptions` adding `x-api-key`). **Evidence:** `nodes/DavixH2I/GenericFunctions.ts`.
7. Request dispatch is `this.helpers.httpRequest(requestOptions)` inside `davixRequest`. **Evidence:** `nodes/DavixH2I/GenericFunctions.ts`.
8. Response handling:
   - default path pushes JSON response (`out.push({ json: response as any })`);
   - optional binary download uses URL(s) from response, `downloadToBinary`, then `this.helpers.prepareBinaryData(...)` and includes `binary` in output.
   **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts` (h2i/image/pdf output branches, `prepareBinaryData`); `nodes/DavixH2I/GenericFunctions.ts` (`downloadToBinary`).
9. On per-item error, `continueOnFail()` emits error JSON with optional `description`/`httpCode`; otherwise error is thrown. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts` (catch block).

## 02.4 Credential Injection Model

Credentials are defined as `baseUrl` and `apiKey`, both required in credential type `davixH2IApi`. **Evidence:** `credentials/DavixH2IApi.credentials.ts`.

The node references this credential by name in `description.credentials`. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts` (`credentials: [{ name: 'davixH2IApi', required: true }]`).

Injection is manual in helper code:

- `getCredentials('davixH2IApi')` reads values.
- `validateBaseUrl` enforces absolute HTTPS URL and strips trailing slash.
- `buildDavixRequestOptions` prefixes relative endpoint path with base URL and injects `x-api-key` request header.

**Evidence:** `nodes/DavixH2I/GenericFunctions.ts` (`davixRequest`, `validateBaseUrl`, `buildDavixRequestOptions`).

Base URL is configurable through credentials (`default: https://pixlab.davix.dev`, editable field). **Evidence:** `credentials/DavixH2IApi.credentials.ts`.

## 02.5 Data Flow Diagram (Text-Based)

```text
[Workflow Input Items]
      ↓
[this.getNodeParameter(resource, operation, fields)]
      ↓
[Resource branch: h2i | image | pdf | tools]
      ↓
[Payload builder: JSON body or multipart formData (+ binary attachments)]
      ↓
[davixRequest(): credentials + base URL validation + x-api-key]
      ↓
[this.helpers.httpRequest() to /v1/h2i | /v1/image | /v1/pdf | /v1/tools]
      ↓
[Response handling: JSON pass-through OR URL download to binary]
      ↓
[out.push(...) as n8n output items]
```

**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts` (`execute` flow); `nodes/DavixH2I/GenericFunctions.ts` (`davixRequest`, `downloadToBinary`).

## 02.6 Response Handling Model

- Raw API JSON response is emitted in `json` for all resource branches. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts` (`out.push({ json: response as any })` in h2i/image/pdf/tools).
- Optional binary output exists for H2I, Image, and PDF via URL download and `prepareBinaryData`. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts` (h2i `downloadBinary`, image `imageDownloadBinary`, pdf `pdfDownloadBinary` branches).
- Tools branch emits JSON only (no binary download branch in tools section). **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts` (tools branch ends with JSON push).
- Multiple binaries can be emitted from one input item when response contains multiple result URLs (loop with indexed binary property names). **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts` (image/pdf loops over `urls`).
- No pagination loop over API pages is implemented. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts` (no page token/next-page control flow; only item loop and URL-result loops).

## 02.7 Error Propagation Model (High-Level)

Request-layer errors are caught in `davixRequest`, parsed (`parseDavixErrorEnvelope`), and re-thrown as `NodeApiError` with optional message/description/httpCode. **Evidence:** `nodes/DavixH2I/GenericFunctions.ts`.

Node execution has an outer per-item `try/catch`:

- If `continueOnFail()` is true, it emits structured error JSON and preserves item pairing.
- If false, it rethrows the error.

**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts` (catch block).

Validation errors are thrown before dispatch for specific invalid inputs (for example empty multitask selections, invalid PDF reorder JSON/array, upload size > 50 MB). **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts` (`throw new Error` / `NodeOperationError` checks).

## 02.8 Architectural Constraints

The following constraints are directly visible in code:

- Processing is synchronous per input item within one `for` loop; no explicit parallel dispatch is implemented. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts` (`for (let itemIndex ... )`, awaited requests).
- Each input item executes exactly one resource endpoint request (`/v1/h2i`, `/v1/image`, `/v1/pdf`, or `/v1/tools`). **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts` (resource branch `continue` pattern after one request).
- Multipart uploads are limited by an in-node total-size check (`maxUploadBytes = 52_428_800` and error message indicating 50 MB). **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts` (`maxUploadBytes`, `checkTotalBinarySize`).
- Retry behavior is not implemented in node code (no retry loop/backoff around `davixRequest` calls). **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts` (single awaited request per branch); `nodes/DavixH2I/GenericFunctions.ts` (`davixRequest` single `this.helpers.httpRequest` call).
- No idempotency keys or request identifiers are attached to outgoing requests in code. **Evidence:** `nodes/DavixH2I/GenericFunctions.ts` (`buildDavixRequestOptions` only adds `x-api-key`; no idempotency/request-id headers).
- Environment switching is only credential-driven via configurable `baseUrl`; there is no dedicated dev/prod toggle parameter in node properties. **Evidence:** `credentials/DavixH2IApi.credentials.ts` (`baseUrl` field); `nodes/DavixH2I/DavixH2I.node.ts` (no environment property).

## Open Questions / Missing Evidence

- No explicit transport timeout settings were found in request options; timeout behavior is therefore not confirmed in node code. Checked `nodes/DavixH2I/GenericFunctions.ts` and `nodes/DavixH2I/DavixH2I.node.ts`.
- No explicit HTTP retry configuration is present in repository code; lower-level n8n runtime defaults are not documented here. Checked `nodes/DavixH2I/GenericFunctions.ts`.
- No source code in this repository confirms server-side handling semantics for `request_id`; only parsing of response fields is implemented. Checked `nodes/DavixH2I/GenericFunctions.ts`.

## Evidence Index

- `nodes/DavixH2I/DavixH2I.node.ts` — node description metadata, resource/operation registration, `execute()` control flow, parameter access, payload construction, endpoint selection, binary handling, per-item error behavior.
- `nodes/DavixH2I/GenericFunctions.ts` — base URL validation, credential retrieval, header injection, request dispatch, error envelope parsing/wrapping, binary download helper.
- `credentials/DavixH2IApi.credentials.ts` — credential schema (`baseUrl`, `apiKey`) and default base URL.
