# 10. Security Model

## 10.1 Credential Handling

- The credential type defines two fields: `baseUrl` (`type: 'string'`) and `apiKey` (`type: 'string'`).
- The `apiKey` field is marked with `typeOptions: { password: true }` in the credential definition.
- The node also defines operation-level password-style fields for PDF operations: `userPassword`, `ownerPassword`, and `password`, each with `typeOptions: { password: true }`.
- Credentials are retrieved at request time via `this.getCredentials('davixH2IApi')`, then read as `creds.baseUrl` and `creds.apiKey`.
- The API key is not transformed (no hashing, encoding, or signing in this repository code); it is inserted directly into request headers.
- Credential values are reused across requests by calling `davixRequest`, which fetches credentials and injects `x-api-key` for each outbound request.
- No explicit credential logging statements are present in node runtime code.

**Evidence:** `credentials/DavixH2IApi.credentials.ts:L7-L26`  
**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1000-L1002`  
**Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L102-L114`  
**Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L39-L50`

---

## 10.2 Authentication Transmission

- Authentication is transmitted in an HTTP header: `x-api-key`.
- Header injection occurs in `buildDavixRequestOptions`, which merges any existing headers and adds `x-api-key: apiKey`.
- The base URL is credential-configurable through the `baseUrl` credential field.
- The code enforces HTTPS base URLs in `validateBaseUrl`; non-HTTPS protocols are rejected.
- The code rejects embedded URL credentials (`https://user:pass@...`) in the base URL.
- Endpoint paths are appended to the validated base URL (`/v1/h2i`, `/v1/image`, `/v1/pdf`, `/v1/tools`).

**Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L39-L50`  
**Evidence:** `credentials/DavixH2IApi.credentials.ts:L9-L16`  
**Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L18-L37`  
**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1349-L1354`  
**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1619-L1624`  
**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1774-L1779`  
**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1903-L1908`

---

## 10.3 Request Construction and Data Exposure

- H2I requests send JSON `body` with selected fields (`action`, `html`, `css`, width/height, and operation-dependent fields).
- Image/PDF/Tools requests use multipart `formData`; files are attached from input binary properties via `attachFiles`/`attachSingleFile`.
- User-provided PDF password fields (`userPassword`, `ownerPassword`, `password`) are copied into `formData` when relevant operations are selected.
- The implementation does not forward entire input JSON automatically; it explicitly builds request `body`/`formData` from declared node parameters.
- Some filtering exists in helper setters (`setString`, `setNumber`) that omit empty/zero values for many fields; booleans are always stringified via `toBoolString` where those setters are used.
- No runtime logging of raw request payloads is implemented.

**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1329-L1354`  
**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1260-L1299`  
**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1376-L1394`  
**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1655-L1666`  
**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1765-L1772`  
**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1804-L1816`  
**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1243`

---

## 10.4 Logging and Debug Behavior

- No `console.log` statements are present in node runtime files under `nodes/`.
- No explicit debug mode flags were found in node runtime code.
- No credential masking/redaction function is implemented in runtime request/response handling.
- Error output includes structured `message`, plus optional `description` and `httpCode`; this is passed to output JSON when `continueOnFail()` is enabled.
- The build script in `package.json` includes a `console.log` in a packaging helper command, but this is not runtime node request handling.

**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1916-L1923`  
**Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L152-L156`  
**Evidence:** `package.json:L31`

---

## 10.5 Input Validation and Sanitization

- Base URL validation is implemented:
  - must be present,
  - must parse as an absolute URL,
  - must use `https:`,
  - must not contain embedded credentials.
- Total upload size validation is implemented for multipart operations; if accumulated size exceeds `52_428_800` bytes, execution throws a `NodeOperationError` with a 50 MB message.
- `reorder` PDF operation performs JSON-array validation when bracketed JSON is supplied; invalid JSON or non-positive/non-integer arrays are rejected.
- Selected operation/tool presence checks exist (e.g., multitask actions/tools must be non-empty).
- No regex-based sanitization or URL/path sanitization for arbitrary user-provided fields (other than base URL) is implemented in this repository.
- Binary verification is limited to retrieving buffers and checking aggregate size; no file content-type security validation logic beyond passing existing mime metadata was found.

**Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L18-L37`  
**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1238-L1323`  
**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1723-L1746`  
**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1514-L1516`  
**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1820-L1827`  
**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1260-L1286`

---

## 10.6 Output Data Exposure

- Node outputs include full API response JSON as `json: response` for all resource branches.
- For download-enabled paths, binary data is added while still returning full JSON response.
- Response headers from API POST calls are not surfaced directly in node output.
- Error details are transformed in `davixRequest` into `NodeApiError` with composed messages/descriptions; if `continueOnFail()` is enabled, error `message`, optional `description`, and optional `httpCode` are returned in output JSON.
- No explicit stripping/redaction of backend response fields is implemented in node output mapping.
- Credentials are injected into outbound headers only; no code path in this repository writes credential fields into output JSON objects.

**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1368-L1370`  
**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1642-L1644`  
**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1792-L1794`  
**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1910`  
**Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L115-L117`  
**Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L152-L156`  
**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1916-L1923`

---

## 10.7 Security Limitations (Implementation-Level)

Confirmed, implementation-visible limitations:

- No request signing or message authentication beyond static `x-api-key` header injection.
- No OAuth-related implementation is present.
- No runtime redaction/masking layer for request/response payloads is implemented.
- No explicit retry mechanism is implemented in request helper code.
- No explicit response-field filtering before output; API response objects are forwarded as returned.
- Binary downloads for result URLs are fetched via direct `GET` on returned URLs without additional URL allowlisting logic in repository code.

**Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L39-L50`  
**Evidence:** `credentials/DavixH2IApi.credentials.ts:L7-L26`  
**Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L102-L157`  
**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1368-L1370`  
**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1642-L1644`  
**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1792-L1794`  
**Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L160-L170`

---

## 10.8 Recommendations (Non-Authoritative)

- Consider adding explicit response-field filtering options when users only need selected fields.
- Consider adding optional redaction in error descriptions for environments where workflow outputs are widely shared.
- Consider adding explicit allowlist checks for downloaded result URLs before `GET` requests.

(These are non-authoritative suggestions and are not currently implemented in this repository.)

---

## Open Questions / Missing Evidence

- Whether underlying n8n runtime automatically masks credential values in execution UI/log storage is not confirmed in this repository code.
- Whether upstream API result URLs are always HTTPS is not confirmed in this repository code.
- Whether backend-side encryption, key management, retention, or access controls exist is not confirmed in this repository code.

## Evidence Index

- `credentials/DavixH2IApi.credentials.ts` — credential fields, base URL default/configuration, API key password flag.
- `nodes/DavixH2I/GenericFunctions.ts` — base URL validation, header injection, credential access, error transformation, binary download implementation.
- `nodes/DavixH2I/DavixH2I.node.ts` — request body/formData construction, file attachment, size check, operation-specific validation, output/error mapping.
- `package.json` — non-runtime build-script `console.log` occurrence.
