# 01. Executive Overview

## 01.1 What This Node Is
`Davix H2I` is an n8n transform node (`group: ['transform']`, version `1`) that requires `davixH2IApi` credentials and exposes a resource/operation UI for `h2i`, `image`, `pdf`, and `tools`. Evidence: `nodes/DavixH2I/DavixH2I.node.ts:L55-L67`, `nodes/DavixH2I/DavixH2I.node.ts:L73-L83`.

The node description states it uses Davix H2I Engine (Pixlab) public API endpoints and dynamically changes operation choices per selected resource. Evidence: `nodes/DavixH2I/DavixH2I.node.ts:L61`, `nodes/DavixH2I/DavixH2I.node.ts:L87-L163`.

## 01.2 What This Node Enables
The node enables HTML rendering via the `h2i` resource with two operations: `image` and `pdf` (Render HTML to Image / Render HTML to PDF). Evidence: `nodes/DavixH2I/DavixH2I.node.ts:L87-L98`, `nodes/DavixH2I/DavixH2I.node.ts:L1327-L1354`.

The node enables image-processing workflows via the `image` resource with operations `format`, `resize`, `crop`, `transform`, `compress`, `enhance`, `padding`, `frame`, `background`, `watermark`, `pdf`, `metadata`, and `multitask`. Evidence: `nodes/DavixH2I/DavixH2I.node.ts:L101-L123`, `nodes/DavixH2I/DavixH2I.node.ts:L1409-L1616`.

The node enables PDF workflows via the `pdf` resource with operations `to-images`, `merge`, `split`, `compress`, `extract-images`, `watermark`, `rotate`, `metadata`, `reorder`, `delete-pages`, `extract`, `flatten`, `encrypt`, and `decrypt`. Evidence: `nodes/DavixH2I/DavixH2I.node.ts:L126-L149`, `nodes/DavixH2I/DavixH2I.node.ts:L1669-L1772`.

The node enables image analysis workflows via the `tools` resource with operation modes `single` and `multitask`, and tool selections including metadata/colors/detect-format/orientation/hash/similarity/dimensions/palette/transparency/quality/efficiency. Evidence: `nodes/DavixH2I/DavixH2I.node.ts:L152-L163`, `nodes/DavixH2I/DavixH2I.node.ts:L1035-L1075`, `nodes/DavixH2I/DavixH2I.node.ts:L1818-L1833`.

## 01.3 Relationship to PixLab (Evidence-Based)
Connection is implemented as HTTP requests using `davixRequest`, which validates credential `baseUrl`, injects the `x-api-key` header, and merges relative endpoint paths with the configured base URL. Evidence: `nodes/DavixH2I/GenericFunctions.ts:L18-L52`, `nodes/DavixH2I/GenericFunctions.ts:L102-L114`.

The credential schema makes `Base URL` and `API Key` required, with default base URL `https://pixlab.davix.dev`. Evidence: `credentials/DavixH2IApi.credentials.ts:L7-L25`.

Endpoint paths used by this node are hardcoded as `/v1/h2i`, `/v1/image`, `/v1/pdf`, and `/v1/tools`, and each resource executes `POST` against its endpoint. Evidence: `nodes/DavixH2I/DavixH2I.node.ts:L1349-L1354`, `nodes/DavixH2I/DavixH2I.node.ts:L1619-L1624`, `nodes/DavixH2I/DavixH2I.node.ts:L1774-L1779`, `nodes/DavixH2I/DavixH2I.node.ts:L1903-L1908`.

No additional internal/admin endpoint paths are implemented in request construction; requests are constrained to the four resource paths above. Evidence: `nodes/DavixH2I/DavixH2I.node.ts:L1349-L1354`, `nodes/DavixH2I/DavixH2I.node.ts:L1619-L1624`, `nodes/DavixH2I/DavixH2I.node.ts:L1774-L1779`, `nodes/DavixH2I/DavixH2I.node.ts:L1903-L1908`.

## 01.4 Supported Use Cases (Derived from Code)
HTML-to-output workflows are supported by submitting HTML/CSS and render settings to `h2i` action `image` or `pdf`, with optional binary download of returned URL(s). Evidence: `nodes/DavixH2I/DavixH2I.node.ts:L1330-L1347`, `nodes/DavixH2I/DavixH2I.node.ts:L1356-L1371`.

Image transformation workflows are supported by uploading one or more input image binaries and sending action-specific form fields for format/resize/crop/transform/compress/enhance/padding/frame/background/watermark/PDF export/metadata/multitask. Evidence: `nodes/DavixH2I/DavixH2I.node.ts:L1376-L1616`, `nodes/DavixH2I/DavixH2I.node.ts:L1260-L1287`.

PDF workflows are supported by uploading PDF binaries and executing merge/split/to-images/extract-images/watermark/rotate/metadata/reorder/delete-pages/extract/flatten/encrypt/decrypt requests with operation-specific parameters. Evidence: `nodes/DavixH2I/DavixH2I.node.ts:L1651-L1772`, `nodes/DavixH2I/DavixH2I.node.ts:L1260-L1287`.

Tools workflows are supported by uploading image binaries and running one tool or multiple tools in a single request; tool-specific parameters are conditionally added when applicable. Evidence: `nodes/DavixH2I/DavixH2I.node.ts:L1801-L1901`, `nodes/DavixH2I/DavixH2I.node.ts:L1035-L1075`.

Batch processing at n8n item level is supported because execution iterates over all input items (`for (let itemIndex = 0; itemIndex < items.length; itemIndex++)`) and performs per-item request handling. Evidence: `nodes/DavixH2I/DavixH2I.node.ts:L1240-L1244`.

File upload support is implemented through multipart `formData` with helper functions attaching `images`, `files`, and optional single `watermarkImage` binaries. Evidence: `nodes/DavixH2I/DavixH2I.node.ts:L1260-L1299`, `nodes/DavixH2I/DavixH2I.node.ts:L1383-L1384`, `nodes/DavixH2I/DavixH2I.node.ts:L1656-L1657`, `nodes/DavixH2I/DavixH2I.node.ts:L1705`.

Binary output support is implemented through optional URL download and `prepareBinaryData` attachment for H2I, Image, and PDF branches; Tools outputs JSON only in current code path. Evidence: `nodes/DavixH2I/DavixH2I.node.ts:L1356-L1371`, `nodes/DavixH2I/DavixH2I.node.ts:L1626-L1645`, `nodes/DavixH2I/DavixH2I.node.ts:L1781-L1795`, `nodes/DavixH2I/DavixH2I.node.ts:L1910-L1911`.

Pagination support is not confirmed in code; there are no pagination parameters or iterative page-fetch loops in request execution. Evidence: `nodes/DavixH2I/DavixH2I.node.ts:L1240-L1934`.

## 01.5 Non-Goals and Boundaries (Code-Confirmed)
The node is scoped to four API families (`h2i`, `image`, `pdf`, `tools`) and throws an explicit error for unsupported resources. Evidence: `nodes/DavixH2I/DavixH2I.node.ts:L73-L83`, `nodes/DavixH2I/DavixH2I.node.ts:L1914`.

Total uploaded binary size is bounded by a 50 MB check before upload for image/pdf/tools binary property lists. Evidence: `nodes/DavixH2I/DavixH2I.node.ts:L1238`, `nodes/DavixH2I/DavixH2I.node.ts:L1301-L1322`.

Webhook handling is not confirmed in code. Evidence: `nodes/DavixH2I/DavixH2I.node.ts:L53-L1935`, `src/index.ts:L1`.

Subscription management is not confirmed in code. Evidence: `nodes/DavixH2I/DavixH2I.node.ts:L53-L1935`.

Diagnostics/admin endpoint features are not confirmed in code. Evidence: `nodes/DavixH2I/DavixH2I.node.ts:L1349-L1354`, `nodes/DavixH2I/DavixH2I.node.ts:L1619-L1624`, `nodes/DavixH2I/DavixH2I.node.ts:L1774-L1779`, `nodes/DavixH2I/DavixH2I.node.ts:L1903-L1908`.

## 01.6 Summary of Capabilities Table

| Resource | Operation | Description | Evidence |
|----------|----------|-------------|----------|
| h2i | image | Render HTML input to image output via `/v1/h2i` with `action=image`. | `nodes/DavixH2I/DavixH2I.node.ts:L95-L97`, `nodes/DavixH2I/DavixH2I.node.ts:L1327-L1354` |
| h2i | pdf | Render HTML input to PDF output via `/v1/h2i` with `action=pdf`. | `nodes/DavixH2I/DavixH2I.node.ts:L95-L97`, `nodes/DavixH2I/DavixH2I.node.ts:L1327-L1354` |
| image | format | Process uploaded image(s) with format conversion fields. | `nodes/DavixH2I/DavixH2I.node.ts:L109`, `nodes/DavixH2I/DavixH2I.node.ts:L1410-L1415` |
| image | resize | Process uploaded image(s) with width/height/enlarge controls. | `nodes/DavixH2I/DavixH2I.node.ts:L110`, `nodes/DavixH2I/DavixH2I.node.ts:L1416-L1423` |
| image | crop | Process uploaded image(s) with crop coordinates and dimensions. | `nodes/DavixH2I/DavixH2I.node.ts:L111`, `nodes/DavixH2I/DavixH2I.node.ts:L1424-L1433` |
| image | transform | Process uploaded image(s) with rotate/flip/colorspace controls. | `nodes/DavixH2I/DavixH2I.node.ts:L112`, `nodes/DavixH2I/DavixH2I.node.ts:L1434-L1441` |
| image | compress | Process uploaded image(s) with target size/quality controls. | `nodes/DavixH2I/DavixH2I.node.ts:L113`, `nodes/DavixH2I/DavixH2I.node.ts:L1442-L1449` |
| image | enhance | Process uploaded image(s) with blur/sharpen/tonal controls. | `nodes/DavixH2I/DavixH2I.node.ts:L114`, `nodes/DavixH2I/DavixH2I.node.ts:L1450-L1461` |
| image | padding | Process uploaded image(s) with padding parameters. | `nodes/DavixH2I/DavixH2I.node.ts:L115`, `nodes/DavixH2I/DavixH2I.node.ts:L1462-L1474` |
| image | frame | Process uploaded image(s) with frame/border parameters. | `nodes/DavixH2I/DavixH2I.node.ts:L116`, `nodes/DavixH2I/DavixH2I.node.ts:L1475-L1482` |
| image | background | Process uploaded image(s) with background controls. | `nodes/DavixH2I/DavixH2I.node.ts:L117`, `nodes/DavixH2I/DavixH2I.node.ts:L1483-L1490` |
| image | watermark | Process uploaded image(s) with watermark text/image controls. | `nodes/DavixH2I/DavixH2I.node.ts:L118`, `nodes/DavixH2I/DavixH2I.node.ts:L1601-L1611` |
| image | pdf | Export image input to PDF mode in image endpoint branch. | `nodes/DavixH2I/DavixH2I.node.ts:L119`, `nodes/DavixH2I/DavixH2I.node.ts:L1503-L1512` |
| image | metadata | Return metadata-focused response (download disabled for this action). | `nodes/DavixH2I/DavixH2I.node.ts:L120`, `nodes/DavixH2I/DavixH2I.node.ts:L1626` |
| image | multitask | Run multiple image operations in one image request. | `nodes/DavixH2I/DavixH2I.node.ts:L121`, `nodes/DavixH2I/DavixH2I.node.ts:L1513-L1616` |
| pdf | to-images | Convert PDF pages to images with format/size/DPI fields. | `nodes/DavixH2I/DavixH2I.node.ts:L134`, `nodes/DavixH2I/DavixH2I.node.ts:L1678-L1684` |
| pdf | merge | Merge uploaded PDF files; optional sortByName. | `nodes/DavixH2I/DavixH2I.node.ts:L135`, `nodes/DavixH2I/DavixH2I.node.ts:L1669-L1671` |
| pdf | split | Split PDF using ranges/prefix settings. | `nodes/DavixH2I/DavixH2I.node.ts:L136`, `nodes/DavixH2I/DavixH2I.node.ts:L1673-L1676` |
| pdf | compress | Send compress action through `/v1/pdf`. | `nodes/DavixH2I/DavixH2I.node.ts:L137`, `nodes/DavixH2I/DavixH2I.node.ts:L1774-L1779` |
| pdf | extract-images | Extract embedded images from PDF pages. | `nodes/DavixH2I/DavixH2I.node.ts:L138`, `nodes/DavixH2I/DavixH2I.node.ts:L1686-L1689` |
| pdf | watermark | Apply text/image watermark parameters on selected pages. | `nodes/DavixH2I/DavixH2I.node.ts:L139`, `nodes/DavixH2I/DavixH2I.node.ts:L1691-L1706` |
| pdf | rotate | Rotate pages by degree parameter. | `nodes/DavixH2I/DavixH2I.node.ts:L140`, `nodes/DavixH2I/DavixH2I.node.ts:L1708-L1711` |
| pdf | metadata | Set/clean PDF metadata fields. | `nodes/DavixH2I/DavixH2I.node.ts:L141`, `nodes/DavixH2I/DavixH2I.node.ts:L1713-L1721` |
| pdf | reorder | Reorder pages using order string/JSON array normalization. | `nodes/DavixH2I/DavixH2I.node.ts:L142`, `nodes/DavixH2I/DavixH2I.node.ts:L1723-L1747` |
| pdf | delete-pages | Delete selected pages by `pages` field. | `nodes/DavixH2I/DavixH2I.node.ts:L143`, `nodes/DavixH2I/DavixH2I.node.ts:L1749-L1751` |
| pdf | extract | Extract selected pages with mode/prefix controls. | `nodes/DavixH2I/DavixH2I.node.ts:L144`, `nodes/DavixH2I/DavixH2I.node.ts:L1753-L1759` |
| pdf | flatten | Flatten form fields via `flattenForms`. | `nodes/DavixH2I/DavixH2I.node.ts:L145`, `nodes/DavixH2I/DavixH2I.node.ts:L1761-L1763` |
| pdf | encrypt | Encrypt PDF using user/owner password fields. | `nodes/DavixH2I/DavixH2I.node.ts:L146`, `nodes/DavixH2I/DavixH2I.node.ts:L1765-L1768` |
| pdf | decrypt | Decrypt PDF using password field. | `nodes/DavixH2I/DavixH2I.node.ts:L147`, `nodes/DavixH2I/DavixH2I.node.ts:L1770-L1772` |
| tools | single | Run one selected analysis tool in `/v1/tools`. | `nodes/DavixH2I/DavixH2I.node.ts:L160`, `nodes/DavixH2I/DavixH2I.node.ts:L1819-L1824` |
| tools | multitask | Run multiple selected tools as CSV list in one `/v1/tools` request. | `nodes/DavixH2I/DavixH2I.node.ts:L161`, `nodes/DavixH2I/DavixH2I.node.ts:L1825-L1833` |

## Open Questions / Missing Evidence
- Whether PixLab supports additional endpoint families beyond `/v1/h2i`, `/v1/image`, `/v1/pdf`, and `/v1/tools` is not confirmed in this repository’s executable node code. Evidence: `nodes/DavixH2I/DavixH2I.node.ts:L1349-L1354`, `nodes/DavixH2I/DavixH2I.node.ts:L1619-L1624`, `nodes/DavixH2I/DavixH2I.node.ts:L1774-L1779`, `nodes/DavixH2I/DavixH2I.node.ts:L1903-L1908`.
- Server-side pagination behavior for any endpoint is not confirmed in code because this node does not expose pagination parameters or iterative page retrieval logic. Evidence: `nodes/DavixH2I/DavixH2I.node.ts:L1240-L1934`.
- Server-side quotas beyond the local 50 MB pre-upload guard are not confirmed in code. Evidence: `nodes/DavixH2I/DavixH2I.node.ts:L1238`, `nodes/DavixH2I/DavixH2I.node.ts:L1301-L1322`.

## Evidence Index
- `nodes/DavixH2I/DavixH2I.node.ts` — node metadata, resource/operation declarations, request construction for H2I/Image/PDF/Tools, binary upload/download behavior, per-item loop, and explicit upload-size guard.
- `nodes/DavixH2I/GenericFunctions.ts` — credential-based base URL validation, header authentication injection (`x-api-key`), and request/error wrapper behavior.
- `credentials/DavixH2IApi.credentials.ts` — credential field definitions, required status, and default base URL.
- `src/index.ts` — package index contains no additional runtime behavior beyond export stub.
- `README.md` — supplementary repository-declared endpoint listing and high-level feature text (used only as corroborative evidence where consistent with executable code).
