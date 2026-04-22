# 06. File and Binary Handling Model

## 06.1 Input Data Model

The node implements binary input handling for the `image`, `pdf`, and `tools` resources.

- `image` expects a comma-separated list of binary property names from the `imageBinaryProps` parameter (default `data`). **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L291-L299`, `nodes/DavixH2I/DavixH2I.node.ts:L1378-L1384`
- `pdf` expects a comma-separated list of binary property names from the `pdfBinaryProps` parameter (default `data`). **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L857-L865`, `nodes/DavixH2I/DavixH2I.node.ts:L1654-L1657`
- `tools` expects a comma-separated list of binary property names from the `toolsBinaryProps` parameter (default `data`). **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1025-L1033`, `nodes/DavixH2I/DavixH2I.node.ts:L1803-L1806`

Files are retrieved from incoming n8n item binary data using `this.helpers.getBinaryDataBuffer(itemIndex, propertyName)`. Metadata (`fileName`, `mimeType`, optional `fileSize`) is read from `items[itemIndex].binary?.[name]`. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1272-L1277`, `nodes/DavixH2I/DavixH2I.node.ts:L1291-L1295`, `nodes/DavixH2I/DavixH2I.node.ts:L1309-L1315`

Multiple files are supported because binary property parameters are split by comma and iterated. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1265-L1268`, `nodes/DavixH2I/DavixH2I.node.ts:L1272-L1286`

For `h2i`, input is JSON fields (`html`, `css`, dimensions, and rendering options) and does not require input binary properties. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1329-L1347`

No `binaryPropertyName` parameter is implemented; the node uses resource-specific property-list parameters (`imageBinaryProps`, `pdfBinaryProps`, `toolsBinaryProps`) and optional output binary property names for downloads. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L291-L299`, `nodes/DavixH2I/DavixH2I.node.ts:L857-L865`, `nodes/DavixH2I/DavixH2I.node.ts:L1025-L1033`, `nodes/DavixH2I/DavixH2I.node.ts:L278-L285`, `nodes/DavixH2I/DavixH2I.node.ts:L838-L850`, `nodes/DavixH2I/DavixH2I.node.ts:L1013-L1019`

## 06.2 Multipart / Form Construction

`h2i` uses a JSON request body (`body`) and does not use multipart for upload. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1329-L1354`

`image`, `pdf`, and `tools` send requests using `formData`, so multipart form construction is implemented for those resources.

- Image endpoint: `POST /v1/image` with `formData`. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1619-L1624`
- PDF endpoint: `POST /v1/pdf` with `formData`. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1774-L1779`
- Tools endpoint: `POST /v1/tools` with `formData`. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1903-L1908`

Multipart file field names are static in code:

- `attachFiles('images', ...)` for image and tools uploads. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1384`, `nodes/DavixH2I/DavixH2I.node.ts:L1806`
- `attachFiles('files', ...)` for pdf uploads. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1657`
- Optional single-file field `watermarkImage` via `attachSingleFile`. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1405-L1407`, `nodes/DavixH2I/DavixH2I.node.ts:L1705`

File metadata is preserved when attaching multipart parts:

- filename: from binary metadata `fileName`, fallback to generated names.
- content type: from binary metadata `mimeType`.

**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1274-L1284`, `nodes/DavixH2I/DavixH2I.node.ts:L1292-L1298`

Multiple files are looped and appended into `formData.images` or `formData.files` arrays. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1265-L1286`

## 06.3 Binary Output Handling

Binary output handling is implemented, but only when download toggles are enabled.

- `h2i`: if `downloadBinary` is true, the node gathers URLs from response, downloads the first URL, converts download to n8n binary with `prepareBinaryData`, and attaches under `outputBinaryProperty`. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1356-L1369`, `nodes/DavixH2I/GenericFunctions.ts:L160-L176`
- `image`: if `imageDownloadBinary` is true (except forced false for `metadata` action), node downloads all gathered URLs and stores binary outputs under `imageOutputBinaryProperty` (suffix `_0`, `_1`, ... for multi-file). **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1626-L1643`, `nodes/DavixH2I/GenericFunctions.ts:L160-L176`
- `pdf`: if `pdfDownloadBinary` is true, node downloads all gathered URLs and stores under `pdfOutputBinaryProperty` (suffix `_0`, `_1`, ... for multi-file). **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1781-L1793`, `nodes/DavixH2I/GenericFunctions.ts:L160-L176`
- `tools`: response is returned as JSON only; no binary download/attachment path exists in the tools branch. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1903-L1911`

The download helper uses `this.helpers.httpRequest` with `encoding: 'arraybuffer'` and `returnFullResponse: true`, then returns `res.body as Buffer` and `content-type` for binary preparation. **Evidence:** `nodes/DavixH2I/GenericFunctions.ts:L165-L175`

## 06.4 Multiple Item Handling

The node processes items one-by-one in a `for` loop over all input items and appends one output item per input item to `out`. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1236-L1241`, `nodes/DavixH2I/DavixH2I.node.ts:L1933`

Within one input item, the node can attach multiple binary outputs in a single output item when multiple result URLs are returned (image/pdf download branches use indexed property names). It does not emit extra n8n items per URL. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1636-L1643`, `nodes/DavixH2I/DavixH2I.node.ts:L1786-L1793`

No batching primitive is implemented beyond iterating input items and executing one HTTP request per item/resource branch. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1240-L1243`, `nodes/DavixH2I/DavixH2I.node.ts:L1349-L1354`, `nodes/DavixH2I/DavixH2I.node.ts:L1619-L1624`, `nodes/DavixH2I/DavixH2I.node.ts:L1774-L1779`, `nodes/DavixH2I/DavixH2I.node.ts:L1903-L1908`

## 06.5 Temporary Data and Memory Handling

- Temporary in-memory `Buffer` objects are created when reading input binary and when downloading files. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1273`, `nodes/DavixH2I/DavixH2I.node.ts:L1291`, `nodes/DavixH2I/GenericFunctions.ts:L172`
- Files are not written to disk in node code.
- Streaming APIs are not implemented in node code.
- No explicit cleanup/finalizer logic is implemented for temporary buffers.

Evidence for implemented memory-only path and absence of disk path in this implementation: uploads use `getBinaryDataBuffer` and multipart values directly from buffer; downloads return `Buffer` and are passed to `prepareBinaryData`. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1273-L1285`, `nodes/DavixH2I/GenericFunctions.ts:L165-L176`, `nodes/DavixH2I/DavixH2I.node.ts:L1362-L1368`, `nodes/DavixH2I/DavixH2I.node.ts:L1639-L1641`, `nodes/DavixH2I/DavixH2I.node.ts:L1789-L1790`

## 06.6 File-Related Constraints (Node-Level Only)

Implemented node-level constraints:

1. **Required binary property list for uploads:** if parsed property-name list is empty, an error is thrown: `No binary property names provided.` **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1265-L1271`
2. **Total upload size validation:** total binary size per item is checked against `52_428_800` bytes (50 MB). Exceeding it throws `NodeOperationError` with explicit message. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1238`, `nodes/DavixH2I/DavixH2I.node.ts:L1301-L1323`
3. **Tool selection validation for tools/single and tools/multitask:** empty selection throws errors, but this is tool-selection validation rather than binary file type/size validation. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1819-L1828`
4. **Download path requires URL in response:** download branches throw `No URL returned to download.` if no URL is present. **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1358-L1360`, `nodes/DavixH2I/DavixH2I.node.ts:L1628-L1630`, `nodes/DavixH2I/DavixH2I.node.ts:L1783-L1785`

Not implemented in node code:

- No MIME/type validation of uploaded files before request construction.
- No per-file count limit beyond whatever is implied by comma-separated property list processing.
- No explicit required single watermark binary property (watermark file is optional; function returns if empty).

**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1265-L1286`, `nodes/DavixH2I/DavixH2I.node.ts:L1289-L1291`, `nodes/DavixH2I/DavixH2I.node.ts:L1405-L1407`

## 06.7 Data Flow Diagram (File Path)

### Upload + optional download flow implemented in this node

[n8n Item Binary]
    ↓
[this.helpers.getBinaryDataBuffer()]
    ↓
[formData construction: images/files/watermarkImage]
    ↓
[davixRequest() using this.helpers.httpRequest()]
    ↓
[API JSON response with url/results]
    ↓ (if download toggle enabled)
[downloadToBinary() GET URL -> Buffer]
    ↓
[this.helpers.prepareBinaryData()]
    ↓
[n8n Output Item json + binary]

**Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1260-L1286`, `nodes/DavixH2I/DavixH2I.node.ts:L1619-L1624`, `nodes/DavixH2I/DavixH2I.node.ts:L1774-L1779`, `nodes/DavixH2I/DavixH2I.node.ts:L1356-L1369`, `nodes/DavixH2I/DavixH2I.node.ts:L1626-L1643`, `nodes/DavixH2I/DavixH2I.node.ts:L1781-L1793`, `nodes/DavixH2I/GenericFunctions.ts:L115-L117`, `nodes/DavixH2I/GenericFunctions.ts:L165-L176`

## Open Questions / Missing Evidence

- The node uses `this.helpers.httpRequest` for both API and file download paths; behavior details such as HTTP agent reuse, streaming internals, and memory management below n8n helper level are not confirmed in this repository. Not confirmed in code.
- The exact API-side interpretation of multipart arrays (`images[]`/`files[]`) is not defined in this repository; only client-side construction is confirmed.

## Evidence Index

- `nodes/DavixH2I/DavixH2I.node.ts` — Node parameter model, execute-path branching, multipart construction, binary upload/download orchestration, output emission, and item loop behavior.
- `nodes/DavixH2I/GenericFunctions.ts` — HTTP helper usage (`this.helpers.httpRequest`), request wrapper, and binary download helper returning `Buffer` + MIME type.
