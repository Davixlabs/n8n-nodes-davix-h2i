# 08. Error Handling and Failure Modes

## 08.1 Error Handling Architecture Overview

- The node wraps per-item execution in a `try/catch` inside `execute()`. Each input item is processed in a loop; failures are handled at item scope, not by a global outer wrapper.  
  **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1240-L1243`, `nodes/DavixH2I/DavixH2I.node.ts:L1915-L1930`
- HTTP request failures from `davixRequest()` are caught and transformed into `NodeApiError`.  
  **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L115-L117`, `nodes/DavixH2I/GenericFunctions.ts:L152-L156`
- `davixRequest()` parses the response body via `parseDavixErrorEnvelope()` and may include parsed `code`, `message`, `hint`, and `requestId` in the thrown error message/description.  
  **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L54-L100`, `nodes/DavixH2I/GenericFunctions.ts:L125-L155`
- `continueOnFail` is explicitly implemented. When enabled, the node pushes an output item containing `error` and optional `description`/`httpCode`; when disabled, errors are re-thrown and execution stops.  
  **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1916-L1927`, `nodes/DavixH2I/DavixH2I.node.ts:L1929`
- Partial processing is supported when `continueOnFail()` returns true, because failed items are emitted as error objects and the loop continues to later items.  
  **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1240-L1241`, `nodes/DavixH2I/DavixH2I.node.ts:L1916-L1927`

## 08.2 Input Validation Errors

Runtime validation implemented in code:

- Credential base URL validation (`validateBaseUrl`):
  - Missing URL throws `Error('Missing Base URL in credentials.')`
  - Invalid absolute URL throws `Error('Base URL must be a valid absolute URL.')`
  - Non-HTTPS URL throws `Error('Base URL must use HTTPS.')`
  - Embedded credentials in URL throw `Error('Base URL must not include embedded credentials.')`  
  **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L18-L34`
- Missing API key throws `Error('Missing API Key in credentials.')`.  
  **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L109-L111`
- Binary property list validation:
  - Empty comma-separated binary-property list throws `Error('No binary property names provided.')`.  
  **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1265-L1270`
- Upload-size validation:
  - If accumulated binary size exceeds `52_428_800` bytes, throws `NodeOperationError('Total upload size exceeds 50 MB. Please reduce file size or number of files.')`.  
  **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1238`, `nodes/DavixH2I/DavixH2I.node.ts:L1301-L1322`
- Operation-specific validation:
  - Image multitask requires at least one action; otherwise throws `Error('Select at least one action for multitask.')`.  
    **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1513-L1515`
  - Tools single action requires one selected tool; otherwise throws `Error('Select one tool for single action.')`.  
    **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1819-L1822`
  - Tools multitask requires at least one selected tool; otherwise throws `NodeOperationError('Please select at least one tool for Multitask.')`.  
    **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1825-L1830`
- PDF reorder input validation:
  - Invalid JSON array syntax throws `NodeOperationError('Invalid order JSON. Please provide a valid JSON array like [3,1,2].')`.
  - Non-array / empty / non-positive-integer array throws `NodeOperationError('Invalid order array. Use positive integers only, for example [3,1,2].')`.  
  **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1723-L1741`
- Post-response download validation:
  - When binary download is enabled and no URL exists in the response, throws `Error('No URL returned to download.')`.  
  **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1356-L1359`, `nodes/DavixH2I/DavixH2I.node.ts:L1626-L1629`, `nodes/DavixH2I/DavixH2I.node.ts:L1781-L1784`

Schema-level required fields visible in node definition:
- `html` is declared as `required: true` in node properties.  
  **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L169-L177`

## 08.3 HTTP Transport Errors

- HTTP calls are made through `this.helpers.httpRequest` in `davixRequest()` and in `downloadToBinary()`.  
  **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L115-L117`, `nodes/DavixH2I/GenericFunctions.ts:L165-L170`
- `davixRequest()` has explicit transport-error handling:
  - Catches request errors.
  - Reads `statusCode` from either `err.statusCode` or `err.response?.statusCode`.
  - Reads response body from `err.error` or `err.response?.body`.
  - Parses possible envelope fields via `parseDavixErrorEnvelope()`.
  - Throws a `NodeApiError` with message/description/httpCode.  
  **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L117-L156`
- Status-specific handling exists only for:
  - `429` (rate limit message)
  - `503` (temporary unavailable message)
  - `413` (upload too large message)  
  **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L127-L134`
- No explicit status-specific handling is implemented for `400`, `401`, `403`, `404`, or `500`.  
  **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L127-L134`
- `downloadToBinary()` does not have a local `try/catch`; request failures bubble to `execute()` item handler.  
  **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L160-L176`, `nodes/DavixH2I/DavixH2I.node.ts:L1915-L1930`

## 08.4 Backend Error Surface (If Implemented)

- Backend-specific error parsing is implemented via `parseDavixErrorEnvelope()` for these fields when present:
  - `error.code` or top-level `code`
  - `error.message` or top-level `message`
  - `error.hint` or top-level `hint`
  - `request_id`, `requestId` (top-level or nested under `error`)  
  **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L54-L100`
- Parsed `code/message` are composed into the `NodeApiError` message; parsed `hint` and `requestId` are appended to the `description` remediation text.  
  **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L135-L155`
- No explicit mapping of backend error codes to different control flow is implemented (other than status-based messages for 429/503/413).  
  **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L127-L138`

## 08.5 continueOnFail Behavior

- `continueOnFail` support is explicitly implemented in `execute()`.
- On error and `continueOnFail() === true`, output contains:
  - `json.error` (from `err.message` or `'Unknown error'`)
  - Optional `json.description` and `json.httpCode`
  - `pairedItem` referencing the failed item index
- Processing continues with subsequent items.
- When `continueOnFail() === false`, the caught error is re-thrown.  
  **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1916-L1929`

## 08.6 Binary-Related Errors

Confirmed binary-related failure behaviors:

- Empty binary property list throws `Error('No binary property names provided.')`.  
  **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1265-L1270`
- Total binary upload size over 50 MB throws `NodeOperationError(...)`.  
  **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1238`, `nodes/DavixH2I/DavixH2I.node.ts:L1301-L1322`
- Missing URL to download after API response throws `Error('No URL returned to download.')`.  
  **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1356-L1359`, `nodes/DavixH2I/DavixH2I.node.ts:L1626-L1629`, `nodes/DavixH2I/DavixH2I.node.ts:L1781-L1784`
- Download requests in `downloadToBinary()` are not locally wrapped; request failures bubble upward.  
  **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L160-L176`

Not confirmed in code:
- Explicit invalid file-format validation before request send.
- Multipart-construction error transformation beyond thrown runtime/request errors.

## 08.7 Failure Mode Matrix

| Failure Type | Trigger Condition | Handling Strategy | Stops Execution | Evidence |
|--------------|------------------|------------------|----------------|----------|
| Missing base URL credential | `baseUrl` empty in credentials | Throw `Error('Missing Base URL in credentials.')` in `validateBaseUrl` | Yes, unless `continueOnFail` catches at item level | `nodes/DavixH2I/GenericFunctions.ts:L18-L20`; `nodes/DavixH2I/DavixH2I.node.ts:L1915-L1929` |
| Invalid base URL format | `new URL(baseUrl)` throws | Throw `Error('Base URL must be a valid absolute URL.')` | Yes, unless `continueOnFail` | `nodes/DavixH2I/GenericFunctions.ts:L22-L26`; `nodes/DavixH2I/DavixH2I.node.ts:L1915-L1929` |
| Insecure base URL | URL protocol is not `https:` | Throw `Error('Base URL must use HTTPS.')` | Yes, unless `continueOnFail` | `nodes/DavixH2I/GenericFunctions.ts:L28-L30`; `nodes/DavixH2I/DavixH2I.node.ts:L1915-L1929` |
| Embedded credential in base URL | URL has username/password | Throw `Error('Base URL must not include embedded credentials.')` | Yes, unless `continueOnFail` | `nodes/DavixH2I/GenericFunctions.ts:L32-L34`; `nodes/DavixH2I/DavixH2I.node.ts:L1915-L1929` |
| Missing API key | `apiKey` empty | Throw `Error('Missing API Key in credentials.')` | Yes, unless `continueOnFail` | `nodes/DavixH2I/GenericFunctions.ts:L109-L111`; `nodes/DavixH2I/DavixH2I.node.ts:L1915-L1929` |
| HTTP request error to PixLab endpoint | `this.helpers.httpRequest(requestOptions)` throws in `davixRequest` | Catch, parse response, throw `NodeApiError` with message/description/httpCode | Yes, unless `continueOnFail` | `nodes/DavixH2I/GenericFunctions.ts:L115-L156`; `nodes/DavixH2I/DavixH2I.node.ts:L1915-L1929` |
| Status 429/503/413 from request error | `statusCode` equals 429, 503, or 413 | Set status-specific message before throwing `NodeApiError` | Yes, unless `continueOnFail` | `nodes/DavixH2I/GenericFunctions.ts:L127-L134`; `nodes/DavixH2I/GenericFunctions.ts:L152-L156` |
| Binary property list empty | Comma-separated binary property list resolves to zero names | Throw `Error('No binary property names provided.')` | Yes, unless `continueOnFail` | `nodes/DavixH2I/DavixH2I.node.ts:L1265-L1270`; `nodes/DavixH2I/DavixH2I.node.ts:L1915-L1929` |
| Upload too large | Summed binary size exceeds `52_428_800` | Throw `NodeOperationError('Total upload size exceeds 50 MB...')` | Yes, unless `continueOnFail` | `nodes/DavixH2I/DavixH2I.node.ts:L1238`; `nodes/DavixH2I/DavixH2I.node.ts:L1307-L1322`; `nodes/DavixH2I/DavixH2I.node.ts:L1915-L1929` |
| Missing download URL after successful API response | `gatherAllUrls(response)` returns empty when download enabled | Throw `Error('No URL returned to download.')` | Yes, unless `continueOnFail` | `nodes/DavixH2I/DavixH2I.node.ts:L1356-L1359`; `nodes/DavixH2I/DavixH2I.node.ts:L1626-L1629`; `nodes/DavixH2I/DavixH2I.node.ts:L1781-L1784`; `nodes/DavixH2I/DavixH2I.node.ts:L1915-L1929` |
| Invalid image multitask selection | `selectedActions.length === 0` | Throw `Error('Select at least one action for multitask.')` | Yes, unless `continueOnFail` | `nodes/DavixH2I/DavixH2I.node.ts:L1513-L1515`; `nodes/DavixH2I/DavixH2I.node.ts:L1915-L1929` |
| Missing tools single selection | `tool` empty | Throw `Error('Select one tool for single action.')` | Yes, unless `continueOnFail` | `nodes/DavixH2I/DavixH2I.node.ts:L1819-L1822`; `nodes/DavixH2I/DavixH2I.node.ts:L1915-L1929` |
| Missing tools multitask selection | `tools.length === 0` | Throw `NodeOperationError('Please select at least one tool for Multitask.')` | Yes, unless `continueOnFail` | `nodes/DavixH2I/DavixH2I.node.ts:L1825-L1830`; `nodes/DavixH2I/DavixH2I.node.ts:L1915-L1929` |
| Invalid PDF reorder JSON | `JSON.parse(orderRaw)` fails | Throw `NodeOperationError('Invalid order JSON...')` | Yes, unless `continueOnFail` | `nodes/DavixH2I/DavixH2I.node.ts:L1727-L1735`; `nodes/DavixH2I/DavixH2I.node.ts:L1915-L1929` |
| Invalid PDF reorder array semantics | Parsed order is not non-empty positive-integer array | Throw `NodeOperationError('Invalid order array...')` | Yes, unless `continueOnFail` | `nodes/DavixH2I/DavixH2I.node.ts:L1737-L1741`; `nodes/DavixH2I/DavixH2I.node.ts:L1915-L1929` |
| Unsupported resource | Resource falls through all branches | Throw `NodeOperationError('Unsupported resource: ...')` | Yes, unless `continueOnFail` | `nodes/DavixH2I/DavixH2I.node.ts:L1914`; `nodes/DavixH2I/DavixH2I.node.ts:L1915-L1929` |
| Download transport failure | `this.helpers.httpRequest(...)` throws in `downloadToBinary` | No local transform; bubbles to `execute` catch | Yes, unless `continueOnFail` | `nodes/DavixH2I/GenericFunctions.ts:L165-L170`; `nodes/DavixH2I/GenericFunctions.ts:L160-L176`; `nodes/DavixH2I/DavixH2I.node.ts:L1915-L1929` |

## 08.8 Unhandled Failure Paths

- `downloadToBinary()` has no internal `try/catch`; failures from download transport are not wrapped in `NodeApiError` by that function. They propagate to `execute()` error handling.  
  **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L160-L176`, `nodes/DavixH2I/DavixH2I.node.ts:L1915-L1930`
- Several explicit `throw new Error(...)` calls in `execute()` are not locally transformed before the `execute()` catch block (they are either output as item errors via `continueOnFail` or re-thrown).  
  **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1270`, `nodes/DavixH2I/DavixH2I.node.ts:L1359`, `nodes/DavixH2I/DavixH2I.node.ts:L1515`, `nodes/DavixH2I/DavixH2I.node.ts:L1629`, `nodes/DavixH2I/DavixH2I.node.ts:L1784`, `nodes/DavixH2I/DavixH2I.node.ts:L1821`, `nodes/DavixH2I/DavixH2I.node.ts:L1915-L1929`

## Open Questions / Missing Evidence

- Behavior for HTTP status codes `400`, `401`, `403`, `404`, and `500` is not explicitly customized in code. Generic `NodeApiError` wrapping occurs, but no status-specific message branch exists for those statuses.  
  **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L127-L134`, `nodes/DavixH2I/GenericFunctions.ts:L152-L156`
- No repository-local evidence confirms how `this.helpers.httpRequest` structures all possible thrown error objects beyond fields read by this node (`statusCode`, `response.statusCode`, `error`, `response.body`).  
  **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L118-L126`
- No explicit retry mechanism is implemented in this node code.  
  **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L102-L158`, `nodes/DavixH2I/DavixH2I.node.ts:L1235-L1934`

## Evidence Index

- `nodes/DavixH2I/DavixH2I.node.ts` — `execute()` control flow, per-item try/catch, continueOnFail behavior, item-level validation throws, binary size checks, operation-specific validation, unsupported resource handling.
- `nodes/DavixH2I/GenericFunctions.ts` — credential validation (`validateBaseUrl`), API request wrapper (`davixRequest`), HTTP error parsing/transformation to `NodeApiError`, status-specific messaging branches (429/503/413), and binary download helper without local error wrapping.
