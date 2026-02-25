# 07. Limits, Quotas, and Timeouts

## 07.1 Node-Enforced Limits

Implemented node-level limit and validation behavior:

- A local upload-size cap is enforced at `52_428_800` bytes (50 MB). The node sums input binary sizes and throws a `NodeOperationError` when the total exceeds this threshold.  
  **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1238-L1323`
- The node validates comma-separated binary property lists and throws when none are provided (`No binary property names provided.`).  
  **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1265-L1271`
- Image multitask requires at least one action (`selectedActions.length === 0` throws).  
  **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1513-L1516`
- Tools single mode requires one tool; tools multitask requires at least one selected tool (throws if empty).  
  **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1819-L1833`
- PDF reorder validates JSON-array input when provided in bracket form and rejects empty/non-positive/non-integer arrays.  
  **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1723-L1746`
- UI-level required-field enforcement exists for `html` (`required: true`) in H2I operations.  
  **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L172-L179`

No explicit maximum item count, explicit maximum loop iteration count, or explicit file-count upper bound is implemented in node code.

## 07.2 HTTP Timeout Behavior

Timeout behavior is not explicitly configured in this node.

- Request construction adds URL and API key header but does not set a `timeout` option.  
  **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L39-L52`
- The HTTP execution path calls `this.helpers.request(requestOptions)` without timeout-specific fields.  
  **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L113-L117`
- Individual node request calls (`/v1/h2i`, `/v1/image`, `/v1/pdf`, `/v1/tools`) pass method/url/json/body/formData only in the shown call sites.  
  **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1349-L1354`, `nodes/DavixH2I/DavixH2I.node.ts:L1619-L1624`, `nodes/DavixH2I/DavixH2I.node.ts:L1774-L1779`, `nodes/DavixH2I/DavixH2I.node.ts:L1903-L1908`

The code does not expose a timeout configuration parameter in node execution logic.

## 07.3 Retry and Backoff Behavior

Retry behavior is not implemented in this node.

- No retry/maxRetries/backoff request options are set when building request options.  
  **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L39-L52`
- Request errors are caught and rethrown as `NodeApiError`; there is no retry loop around `this.helpers.request`.  
  **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L115-L157`
- The 429 path only maps to an error message text (`Retry with backoff.`) and does not perform retry logic.  
  **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L128-L134`

Any retry behavior would therefore be external to this node implementation.

## 07.4 Quota Awareness

Quota awareness is not implemented in this node.

- The node does not read quota headers or maintain usage counters in request/response handling code. Error parsing only extracts `code`, `message`, `hint`, and `requestId`.  
  **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L54-L100`
- HTTP error handling includes a custom message for status 429, but no quota-state tracking or warning surface beyond error text.  
  **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L124-L155`

## 07.5 Concurrency and Batch Processing

- Input items are processed sequentially in a `for` loop (`itemIndex` from `0` to `items.length - 1`).  
  **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1240-L1241`
- Per-item processing uses awaited operations (`await davixRequest.call(...)`, `await downloadToBinary.call(...)`, binary preparation awaits), so each awaited step is serialized in item flow.  
  **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1349-L1354`, `nodes/DavixH2I/DavixH2I.node.ts:L1619-L1624`, `nodes/DavixH2I/DavixH2I.node.ts:L1774-L1779`, `nodes/DavixH2I/DavixH2I.node.ts:L1626-L1642`, `nodes/DavixH2I/DavixH2I.node.ts:L1781-L1792`
- Multiple files can be attached in a single multipart request (`images`/`files` arrays), which is request payload aggregation rather than parallel request execution.  
  **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1260-L1286`
- No explicit concurrency controls (worker pool, semaphore, parallel branch execution) are implemented in the node execution code.

## 07.6 Pagination Handling

Pagination handling is not implemented in this node.

- Request paths are single endpoint invocations per operation with no `page`, `offset`, `limit`, or continuation token handling logic in execute flow.  
  **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1326-L1373`, `nodes/DavixH2I/DavixH2I.node.ts:L1375-L1648`, `nodes/DavixH2I/DavixH2I.node.ts:L1650-L1798`, `nodes/DavixH2I/DavixH2I.node.ts:L1800-L1912`
- `gatherAllUrls` is used to collect result URLs from one response payload for optional binary downloads; it is not API page traversal.  
  **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1245-L1258`

## 07.7 Error Surface Related to Limits

Limit-related error handling is not implemented beyond default error propagation.

Implemented limit-adjacent error surfacing in code:

- 429, 503, and 413 statuses are mapped to specific status messages before throwing `NodeApiError`.  
  **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L124-L134`, `nodes/DavixH2I/GenericFunctions.ts:L152-L156`
- A local upload-size overflow throws `NodeOperationError` with explicit 50 MB message.  
  **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1317-L1321`
- No timeout-specific catch branch is implemented.
- No dedicated retry-on-429 or throttle recovery path is implemented.
- At node level, errors are either transformed into per-item error output when `continueOnFail()` is enabled or rethrown unchanged.  
  **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1915-L1930`

## Open Questions / Missing Evidence

- Effective runtime timeout behavior cannot be confirmed from this repository alone because no timeout value is set in node code; any default comes from n8n runtime internals outside this repository.
- Platform-level retry behavior (if any) cannot be confirmed from this repository because no retry mechanism is implemented in this node code.

## Evidence Index

- `nodes/DavixH2I/DavixH2I.node.ts` — execute flow, local size checks, validation checks, sequential processing model, endpoint call patterns, and item-level catch/continue behavior.
- `nodes/DavixH2I/GenericFunctions.ts` — request option builder, HTTP request dispatch, status-code message mapping (including 429), and error envelope parsing.
