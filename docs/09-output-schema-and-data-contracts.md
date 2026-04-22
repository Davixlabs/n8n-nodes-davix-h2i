# 09. Output Schema and Data Contracts

## 09.1 Output Model Overview

- The node iterates input items and pushes one output item to `out` per processed input item in normal success paths, then returns `return [out]`. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1236-L1241`, `nodes/DavixH2I/DavixH2I.node.ts:L1933`
- Output is always emitted as n8n items containing `json`. In some branches, `binary` is added in addition to `json`. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1368-L1370`, `nodes/DavixH2I/DavixH2I.node.ts:L1642-L1644`, `nodes/DavixH2I/DavixH2I.node.ts:L1792-L1794`, `nodes/DavixH2I/DavixH2I.node.ts:L1910`
- Binary output is optional and controlled by operation-specific `downloadBinary` parameters (`downloadBinary`, `imageDownloadBinary`, `pdfDownloadBinary`), except image `metadata` which forces `downloadBinary` false in code. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1356-L1357`, `nodes/DavixH2I/DavixH2I.node.ts:L1626`, `nodes/DavixH2I/DavixH2I.node.ts:L1781`
- Output schema varies by operation/resource only in whether `binary` is attached; successful `json` payload is always the backend response object returned by `davixRequest` without response-field remapping in `execute()`. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1349-L1354`, `nodes/DavixH2I/DavixH2I.node.ts:L1368-L1370`, `nodes/DavixH2I/DavixH2I.node.ts:L1619-L1624`, `nodes/DavixH2I/DavixH2I.node.ts:L1642-L1644`, `nodes/DavixH2I/DavixH2I.node.ts:L1774-L1779`, `nodes/DavixH2I/DavixH2I.node.ts:L1792-L1794`, `nodes/DavixH2I/DavixH2I.node.ts:L1903-L1910`
- `this.helpers.returnJsonArray` is not used; output is manually built via `out.push(...)`. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1237`, `nodes/DavixH2I/DavixH2I.node.ts:L1368-L1370`, `nodes/DavixH2I/DavixH2I.node.ts:L1910`, `nodes/DavixH2I/DavixH2I.node.ts:L1933`

---

## 09.2 JSON Output Structure (Per Operation)

For all operations below, success output `item.json` is `response as any` from `davixRequest`.

The node returns backend response unmodified.

Evidence for this shared behavior: `out.push({ json: response as any ... })` in each resource branch. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1368-L1370`, `nodes/DavixH2I/DavixH2I.node.ts:L1642-L1644`, `nodes/DavixH2I/DavixH2I.node.ts:L1792-L1794`, `nodes/DavixH2I/DavixH2I.node.ts:L1910`

Schema example (success, all operations):

```json
{
  "json": {
    "<backend-defined-fields>": "returned unmodified by this node"
  }
}
```

### Resource: H2I
### Operation: image

- `item.json` = backend response object from `POST /v1/h2i`.
- No field rename or metadata injection in success path.
- May include `binary` when download is enabled (documented in 09.3).

**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1327-L1338`, `nodes/DavixH2I/DavixH2I.node.ts:L1349-L1354`, `nodes/DavixH2I/DavixH2I.node.ts:L1368-L1370`

### Resource: H2I
### Operation: pdf

- `item.json` = backend response object from `POST /v1/h2i`.
- No field rename or metadata injection in success path.
- May include `binary` when download is enabled (documented in 09.3).

**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1327-L1347`, `nodes/DavixH2I/DavixH2I.node.ts:L1349-L1354`, `nodes/DavixH2I/DavixH2I.node.ts:L1368-L1370`

### Resource: Image
### Operation: format

- `item.json` = backend response object from `POST /v1/image`.
- No success-path field rename.
- Optional binary attachment controlled by `imageDownloadBinary` (except metadata op only).

**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1410-L1415`, `nodes/DavixH2I/DavixH2I.node.ts:L1619-L1624`, `nodes/DavixH2I/DavixH2I.node.ts:L1626-L1644`

### Resource: Image
### Operation: resize

- Same success JSON contract as above; backend response unmodified.

**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1416-L1423`, `nodes/DavixH2I/DavixH2I.node.ts:L1619-L1624`, `nodes/DavixH2I/DavixH2I.node.ts:L1642-L1644`

### Resource: Image
### Operation: crop

- Same success JSON contract as above; backend response unmodified.

**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1424-L1433`, `nodes/DavixH2I/DavixH2I.node.ts:L1619-L1624`, `nodes/DavixH2I/DavixH2I.node.ts:L1642-L1644`

### Resource: Image
### Operation: transform

- Same success JSON contract as above; backend response unmodified.

**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1434-L1441`, `nodes/DavixH2I/DavixH2I.node.ts:L1619-L1624`, `nodes/DavixH2I/DavixH2I.node.ts:L1642-L1644`

### Resource: Image
### Operation: compress

- Same success JSON contract as above; backend response unmodified.

**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1442-L1449`, `nodes/DavixH2I/DavixH2I.node.ts:L1619-L1624`, `nodes/DavixH2I/DavixH2I.node.ts:L1642-L1644`

### Resource: Image
### Operation: enhance

- Same success JSON contract as above; backend response unmodified.

**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1450-L1461`, `nodes/DavixH2I/DavixH2I.node.ts:L1619-L1624`, `nodes/DavixH2I/DavixH2I.node.ts:L1642-L1644`

### Resource: Image
### Operation: padding

- Same success JSON contract as above; backend response unmodified.

**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1462-L1474`, `nodes/DavixH2I/DavixH2I.node.ts:L1619-L1624`, `nodes/DavixH2I/DavixH2I.node.ts:L1642-L1644`

### Resource: Image
### Operation: frame

- Same success JSON contract as above; backend response unmodified.

**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1475-L1482`, `nodes/DavixH2I/DavixH2I.node.ts:L1619-L1624`, `nodes/DavixH2I/DavixH2I.node.ts:L1642-L1644`

### Resource: Image
### Operation: background

- Same success JSON contract as above; backend response unmodified.

**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1483-L1490`, `nodes/DavixH2I/DavixH2I.node.ts:L1619-L1624`, `nodes/DavixH2I/DavixH2I.node.ts:L1642-L1644`

### Resource: Image
### Operation: watermark

- Same success JSON contract as above; backend response unmodified.

**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1491-L1500`, `nodes/DavixH2I/DavixH2I.node.ts:L1619-L1624`, `nodes/DavixH2I/DavixH2I.node.ts:L1642-L1644`

### Resource: Image
### Operation: pdf

- Same success JSON contract as above; backend response unmodified.

**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1525-L1532`, `nodes/DavixH2I/DavixH2I.node.ts:L1619-L1624`, `nodes/DavixH2I/DavixH2I.node.ts:L1642-L1644`

### Resource: Image
### Operation: metadata

- `item.json` = backend response object from `POST /v1/image`.
- Download binary is forced off for this operation (`['metadata'].includes(action) ? false : ...`).

**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1533-L1534`, `nodes/DavixH2I/DavixH2I.node.ts:L1619-L1626`, `nodes/DavixH2I/DavixH2I.node.ts:L1643-L1644`

### Resource: Image
### Operation: multitask

- `item.json` = backend response object from `POST /v1/image`.
- No response-field remapping in success path.

**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1535-L1617`, `nodes/DavixH2I/DavixH2I.node.ts:L1619-L1624`, `nodes/DavixH2I/DavixH2I.node.ts:L1642-L1644`

### Resource: PDF
### Operation: to-images

- `item.json` = backend response object from `POST /v1/pdf`.
- Optional binary attachment based on `pdfDownloadBinary`.

**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1678-L1684`, `nodes/DavixH2I/DavixH2I.node.ts:L1774-L1779`, `nodes/DavixH2I/DavixH2I.node.ts:L1781-L1794`

### Resource: PDF
### Operation: merge

- Same success JSON contract as above; backend response unmodified.

**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1669-L1671`, `nodes/DavixH2I/DavixH2I.node.ts:L1774-L1779`, `nodes/DavixH2I/DavixH2I.node.ts:L1792-L1794`

### Resource: PDF
### Operation: split

- Same success JSON contract as above; backend response unmodified.

**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1673-L1676`, `nodes/DavixH2I/DavixH2I.node.ts:L1774-L1779`, `nodes/DavixH2I/DavixH2I.node.ts:L1792-L1794`

### Resource: PDF
### Operation: compress

- Same success JSON contract as above; backend response unmodified.

**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1652-L1655`, `nodes/DavixH2I/DavixH2I.node.ts:L1774-L1779`, `nodes/DavixH2I/DavixH2I.node.ts:L1792-L1794`

### Resource: PDF
### Operation: extract-images

- Same success JSON contract as above; backend response unmodified.

**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1686-L1689`, `nodes/DavixH2I/DavixH2I.node.ts:L1774-L1779`, `nodes/DavixH2I/DavixH2I.node.ts:L1792-L1794`

### Resource: PDF
### Operation: watermark

- Same success JSON contract as above; backend response unmodified.

**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1691-L1705`, `nodes/DavixH2I/DavixH2I.node.ts:L1774-L1779`, `nodes/DavixH2I/DavixH2I.node.ts:L1792-L1794`

### Resource: PDF
### Operation: rotate

- Same success JSON contract as above; backend response unmodified.

**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1708-L1711`, `nodes/DavixH2I/DavixH2I.node.ts:L1774-L1779`, `nodes/DavixH2I/DavixH2I.node.ts:L1792-L1794`

### Resource: PDF
### Operation: metadata

- Same success JSON contract as above; backend response unmodified.

**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1713-L1721`, `nodes/DavixH2I/DavixH2I.node.ts:L1774-L1779`, `nodes/DavixH2I/DavixH2I.node.ts:L1792-L1794`

### Resource: PDF
### Operation: reorder

- Same success JSON contract as above; backend response unmodified.

**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1723-L1747`, `nodes/DavixH2I/DavixH2I.node.ts:L1774-L1779`, `nodes/DavixH2I/DavixH2I.node.ts:L1792-L1794`

### Resource: PDF
### Operation: delete-pages

- Same success JSON contract as above; backend response unmodified.

**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1749-L1751`, `nodes/DavixH2I/DavixH2I.node.ts:L1774-L1779`, `nodes/DavixH2I/DavixH2I.node.ts:L1792-L1794`

### Resource: PDF
### Operation: extract

- Same success JSON contract as above; backend response unmodified.

**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1753-L1759`, `nodes/DavixH2I/DavixH2I.node.ts:L1774-L1779`, `nodes/DavixH2I/DavixH2I.node.ts:L1792-L1794`

### Resource: PDF
### Operation: flatten

- Same success JSON contract as above; backend response unmodified.

**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1761-L1763`, `nodes/DavixH2I/DavixH2I.node.ts:L1774-L1779`, `nodes/DavixH2I/DavixH2I.node.ts:L1792-L1794`

### Resource: PDF
### Operation: encrypt

- Same success JSON contract as above; backend response unmodified.

**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1765-L1768`, `nodes/DavixH2I/DavixH2I.node.ts:L1774-L1779`, `nodes/DavixH2I/DavixH2I.node.ts:L1792-L1794`

### Resource: PDF
### Operation: decrypt

- Same success JSON contract as above; backend response unmodified.

**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1770-L1772`, `nodes/DavixH2I/DavixH2I.node.ts:L1774-L1779`, `nodes/DavixH2I/DavixH2I.node.ts:L1792-L1794`

### Resource: Tools
### Operation: single

- `item.json` = backend response object from `POST /v1/tools`.
- No success-path field rename or metadata injection.

**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1801-L1824`, `nodes/DavixH2I/DavixH2I.node.ts:L1903-L1910`

### Resource: Tools
### Operation: multitask

- `item.json` = backend response object from `POST /v1/tools`.
- No success-path field rename or metadata injection.

**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1825-L1833`, `nodes/DavixH2I/DavixH2I.node.ts:L1903-L1910`

---

## 09.3 Binary Output Structure (If Implemented)

Binary output is implemented for H2I, Image, and PDF branches when their download flags evaluate true.

- Binary is attached as `item.binary` while preserving `item.json` (binary supplements JSON; it does not replace JSON). **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1368`, `nodes/DavixH2I/DavixH2I.node.ts:L1642`, `nodes/DavixH2I/DavixH2I.node.ts:L1792`
- `this.helpers.prepareBinaryData(...)` is used to construct binary data from downloaded buffers. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1367`, `nodes/DavixH2I/DavixH2I.node.ts:L1640`, `nodes/DavixH2I/DavixH2I.node.ts:L1790`
- MIME type is taken from HTTP `content-type` during `downloadToBinary` (`res.headers['content-type']`) and passed to `prepareBinaryData`. **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L165-L175`, `nodes/DavixH2I/DavixH2I.node.ts:L1367`, `nodes/DavixH2I/DavixH2I.node.ts:L1640`, `nodes/DavixH2I/DavixH2I.node.ts:L1790`
- Binary property naming:
  - H2I: single property name from `outputBinaryProperty`. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1360`, `nodes/DavixH2I/DavixH2I.node.ts:L1368`
  - Image: property base from `imageOutputBinaryProperty`; if multiple URLs, suffix `_0`, `_1`, ... **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1630`, `nodes/DavixH2I/DavixH2I.node.ts:L1637-L1639`
  - PDF: property base from `pdfOutputBinaryProperty`; if multiple URLs, suffix `_0`, `_1`, ... **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1785`, `nodes/DavixH2I/DavixH2I.node.ts:L1787-L1789`
- Download filename defaults used before `prepareBinaryData`:
  - H2I image/pdf: `h2i.<ext>` or `h2i.pdf`. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1365`
  - Image operations: `pixlab-image.<ext>`. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1635`, `nodes/DavixH2I/DavixH2I.node.ts:L1639`
  - PDF operations: `pixlab-pdf-result.bin`. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1789`
- H2I binary download consumes only the first discovered URL (`urls[0]`), while Image/PDF loop through all URLs. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1361`, `nodes/DavixH2I/DavixH2I.node.ts:L1637-L1640`, `nodes/DavixH2I/DavixH2I.node.ts:L1787-L1790`

---

## 09.4 Multiple Item Emission

- The node processes each input item in a `for` loop and pushes one output item for that input in both success and continue-on-fail branches. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1240-L1241`, `nodes/DavixH2I/DavixH2I.node.ts:L1368-L1370`, `nodes/DavixH2I/DavixH2I.node.ts:L1642-L1644`, `nodes/DavixH2I/DavixH2I.node.ts:L1792-L1794`, `nodes/DavixH2I/DavixH2I.node.ts:L1918-L1925`
- The node does not split backend array responses into separate n8n items. It keeps response arrays nested inside a single `json` object for that output item (if backend returns arrays). **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1368-L1370`, `nodes/DavixH2I/DavixH2I.node.ts:L1642-L1644`, `nodes/DavixH2I/DavixH2I.node.ts:L1792-L1794`, `nodes/DavixH2I/DavixH2I.node.ts:L1910`
- The node does not aggregate multiple input items into one output item; it returns `out` as-is (`return [out]`). **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1237`, `nodes/DavixH2I/DavixH2I.node.ts:L1933`

---

## 09.5 Output Variability

- Success output shape differs by branch only in optional `binary` presence. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1368-L1370`, `nodes/DavixH2I/DavixH2I.node.ts:L1642-L1644`, `nodes/DavixH2I/DavixH2I.node.ts:L1792-L1794`, `nodes/DavixH2I/DavixH2I.node.ts:L1910`
- Output fields inside `json` are not normalized by this node and therefore depend on backend response shape. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1368-L1370`, `nodes/DavixH2I/DavixH2I.node.ts:L1642-L1644`, `nodes/DavixH2I/DavixH2I.node.ts:L1792-L1794`, `nodes/DavixH2I/DavixH2I.node.ts:L1910`
- URL extraction logic (`response.url` and `response.results` entries) is used only to fetch downloadable binaries, not to rewrite `json`. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1245-L1258`, `nodes/DavixH2I/DavixH2I.node.ts:L1358-L1363`, `nodes/DavixH2I/DavixH2I.node.ts:L1628-L1630`, `nodes/DavixH2I/DavixH2I.node.ts:L1783-L1785`

---

## 09.6 Metadata and Augmented Fields

- Success outputs do not inject `request_id`, status flags, timestamps, or operation identifiers into `json` in `execute()`. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1368-L1370`, `nodes/DavixH2I/DavixH2I.node.ts:L1642-L1644`, `nodes/DavixH2I/DavixH2I.node.ts:L1792-L1794`, `nodes/DavixH2I/DavixH2I.node.ts:L1910`
- Response headers are not preserved in output items; headers are only read in `downloadToBinary` to derive MIME type for binary metadata. **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L169-L174`, `nodes/DavixH2I/GenericFunctions.ts:L175`
- Credentials are not echoed into output items in success or continue-on-fail paths. **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L106-L113`, `nodes/DavixH2I/DavixH2I.node.ts:L1918-L1924`

---

## 09.7 Error Output Shape (continueOnFail)

continueOnFail is implemented and alters output structure for failed items.

- If `this.continueOnFail()` is true, node pushes:
  - `json.error` (message string fallback `"Unknown error"`)
  - optional `json.description`
  - optional `json.httpCode`
  - `pairedItem: { item: itemIndex }`
- Execution continues to next input item.

Schema example (continue-on-fail item):

```json
{
  "json": {
    "error": "<message>",
    "description": "<optional>",
    "httpCode": "<optional>"
  },
  "pairedItem": {
    "item": 0
  }
}
```

**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1916-L1927`

---

## 09.8 Data Contract Stability

- The node does not enforce a stable, operation-specific success JSON schema in code; it forwards backend response object directly. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1368-L1370`, `nodes/DavixH2I/DavixH2I.node.ts:L1642-L1644`, `nodes/DavixH2I/DavixH2I.node.ts:L1792-L1794`, `nodes/DavixH2I/DavixH2I.node.ts:L1910`
- Binary augmentation is conditional and operation/parameter dependent, so output envelope may vary between `json`-only and `json + binary`. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1356-L1370`, `nodes/DavixH2I/DavixH2I.node.ts:L1626-L1644`, `nodes/DavixH2I/DavixH2I.node.ts:L1781-L1794`
- Output is tightly coupled to backend response fields (not normalized by node). **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1368-L1370`, `nodes/DavixH2I/DavixH2I.node.ts:L1642-L1644`, `nodes/DavixH2I/DavixH2I.node.ts:L1792-L1794`, `nodes/DavixH2I/DavixH2I.node.ts:L1910`
- Output schema versioning mechanism is not confirmed in code.

---

## Open Questions / Missing Evidence

- Exact key-level JSON payload for each successful operation is not confirmed in node code because response fields are backend-defined and passed through unmodified.
- Whether backend always returns `url` or `results` for downloadable operations is not guaranteed by node code; node throws if no downloadable URL is found when download is enabled.
- No explicit schema contract/version field for output is implemented in this node.

## Evidence Index

- `nodes/DavixH2I/DavixH2I.node.ts` — execute flow, output item construction, continue-on-fail shape, resource/operation action unions, binary attachment behavior.
- `nodes/DavixH2I/GenericFunctions.ts` — request/response helper behavior, binary download MIME extraction, credential usage context.
