# 03. Authentication and Credentials

## 03.1 Credential Type Definition

The repository defines one custom credential type: `DavixH2IApi`. **Evidence:** `credentials/DavixH2IApi.credentials.ts:L3-L27`

- **Credential name:** `davixH2IApi`. **Evidence:** `credentials/DavixH2IApi.credentials.ts:L4`
- **Credential display name:** `Davix H2I (PixLab) API`. **Evidence:** `credentials/DavixH2IApi.credentials.ts:L5`
- **Credential fields:**
  1. **Base URL**
     - Internal name: `baseUrl`. **Evidence:** `credentials/DavixH2IApi.credentials.ts:L9-L11`
     - Type: `string`. **Evidence:** `credentials/DavixH2IApi.credentials.ts:L11`
     - Required: `true`. **Evidence:** `credentials/DavixH2IApi.credentials.ts:L15`
     - Default: `https://pixlab.davix.dev`. **Evidence:** `credentials/DavixH2IApi.credentials.ts:L12`
     - Placeholder: `https://pixlab.davix.dev`. **Evidence:** `credentials/DavixH2IApi.credentials.ts:L13`
     - Description: `PixLab API base URL (no trailing slash). Example: https://pixlab.davix.dev`. **Evidence:** `credentials/DavixH2IApi.credentials.ts:L14`
  2. **API Key**
     - Internal name: `apiKey`. **Evidence:** `credentials/DavixH2IApi.credentials.ts:L18-L20`
     - Type: `string`. **Evidence:** `credentials/DavixH2IApi.credentials.ts:L20`
     - Required: `true`. **Evidence:** `credentials/DavixH2IApi.credentials.ts:L23`
     - Default: empty string `''`. **Evidence:** `credentials/DavixH2IApi.credentials.ts:L22`
     - Description: `Your Davix PixLab API key.`. **Evidence:** `credentials/DavixH2IApi.credentials.ts:L24`
     - Secret input UI flag: `typeOptions: { password: true }`. **Evidence:** `credentials/DavixH2IApi.credentials.ts:L21`

### Validation rules confirmed in code

- Runtime validation enforces non-empty base URL. **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L18-L20`
- Runtime validation requires base URL to be a valid absolute URL. **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L21-L26`
- Runtime validation requires HTTPS protocol. **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L28-L30`
- Runtime validation rejects embedded credentials in base URL (`username`/`password`). **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L32-L34`
- Runtime validation enforces non-empty API key. **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L109-L112`

### Shared vs per-node

- The node declares one required credential reference (`davixH2IApi`) in its `description.credentials` array. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L67`
- Whether credentials are globally shared across workflows/users is not implemented in this repository code. **Not confirmed in code.**

## 03.2 Authentication Injection Mechanism

- The node obtains credentials inside `davixRequest` via `this.getCredentials('davixH2IApi')`. **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L102-L107`
- `baseUrl` and `apiKey` are read from credentials and validated/checked before dispatch. **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L108-L113`
- Authentication is injected by `buildDavixRequestOptions`, which adds header `x-api-key: apiKey`. **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L39-L51`
- Request URL is constructed from credentials `baseUrl` + request path (`options.url`) with slash normalization. **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L13-L16`, `nodes/DavixH2I/GenericFunctions.ts:L44-L47`
- The node’s resource operations call `davixRequest` for API calls (`/v1/h2i`, `/v1/image`, `/v1/pdf`, `/v1/tools`) rather than constructing auth headers inline in the node file. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1349-L1354`, `nodes/DavixH2I/DavixH2I.node.ts:L1619-L1624`, `nodes/DavixH2I/DavixH2I.node.ts:L1774-L1779`, `nodes/DavixH2I/DavixH2I.node.ts:L1903-L1908`
- No credential `authenticate` property is defined in the credential file; auth is manually injected in helper code. **Evidence:** `credentials/DavixH2IApi.credentials.ts:L3-L27`, `nodes/DavixH2I/GenericFunctions.ts:L39-L51`

## 03.3 Supported Authentication Methods

Confirmed methods implemented:

- **API key in custom header** (`x-api-key`). **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L47-L50`

Not confirmed/implemented in this repository:

- Bearer token header authentication. **Not confirmed in code.**
- OAuth authentication flows or token exchange. **Not confirmed in code.**
- Basic authentication. **Not confirmed in code.**
- Query-string-based auth parameters. **Not confirmed in code.**

## 03.4 Base URL and Environment Handling

- Base URL is configurable via credential field `baseUrl`. **Evidence:** `credentials/DavixH2IApi.credentials.ts:L9-L16`
- A default base URL value is hardcoded in credential defaults: `https://pixlab.davix.dev`. **Evidence:** `credentials/DavixH2IApi.credentials.ts:L12`
- Runtime base URL handling includes:
  - absolute URL validation,
  - HTTPS-only enforcement,
  - rejection of embedded credentials,
  - trailing slash stripping. **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L18-L37`
- No dev/prod environment-switching logic is implemented. **Not confirmed in code.**
- No environment-variable-based base URL selection is implemented in request logic. **Not confirmed in code.**
- No multiple-base-URL selection model is implemented beyond providing one credential `baseUrl` value. **Evidence:** `credentials/DavixH2IApi.credentials.ts:L9-L16`

## 03.5 Credential Security Handling

- The API key credential field is marked with `typeOptions: { password: true }`. **Evidence:** `credentials/DavixH2IApi.credentials.ts:L21`
- There is no explicit masking/redaction utility in repository code for logs/errors. **Not confirmed in code.**
- `davixRequest` error messages include remediation text (e.g., “Check that your API key is valid and active.”) but do not interpolate or print the API key value. **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L140-L156`
- Credentials are directly referenced in request construction helper (`davixRequest`) and not read in the node operation file directly. **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L106-L113`, `nodes/DavixH2I/DavixH2I.node.ts:L1349-L1354`

## 03.6 Authentication Error Handling

- There is no explicit branch for 401 or 403 status codes.
- HTTP request errors are caught in `davixRequest`, parsed, and rethrown as `NodeApiError` with composed message/description/httpCode. **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L115-L157`
- Special handling exists only for status codes 429, 503, and 413 (custom status message strings). **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L127-L134`
- Node-level execution catches thrown errors only for `continueOnFail()` behavior and otherwise rethrows. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1915-L1930`
- No custom token refresh or auth-retry flow is implemented. **Not confirmed in code.**

## 03.7 Credential Scope and Limitations

- The node requires one credential type (`davixH2IApi`) in its type description. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L67`
- Each API request in this node uses the same credential retrieval path (`getCredentials('davixH2IApi')`) inside `davixRequest`. **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L102-L107`
- The repository does not implement per-resource alternate credential selection or override parameters in node properties. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L67-L68`
- Credential reuse/override behavior at platform/workflow scope is not defined in this repository code. **Not confirmed in code.**

## Open Questions / Missing Evidence

1. How n8n persists/encrypts credential values at rest is not defined in this repository. (Checked: credential and node/helper source files.)
2. Whether credential entries are shared across users/projects is not defined in this repository. (Checked: node description and credentials file.)
3. Any OAuth/token-refresh capability is absent from implementation; no related flow can be documented from code.
4. Any auth-specific handling for 401/403 is not implemented as a separate path.
5. Any explicit API key redaction mechanism in this repository is not present.

## Evidence Index

- `credentials/DavixH2IApi.credentials.ts` — credential type name/display name, field schema, required/default/description/password flag.
- `nodes/DavixH2I/GenericFunctions.ts` — base URL validation, API key presence check, auth header injection (`x-api-key`), request URL composition, request execution, and error transformation.
- `nodes/DavixH2I/DavixH2I.node.ts` — node credential requirement declaration, API calls routed through `davixRequest`, node-level error propagation/continue-on-fail behavior.
