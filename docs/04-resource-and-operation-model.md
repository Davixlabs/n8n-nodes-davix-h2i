# 04. Resource and Operation Model

## 04.1 Resource Taxonomy

The node uses resource grouping via a `resource` options field in `description.properties`.

| Resource Internal Name | Display Name | Description in Code | Evidence |
|---|---|---|---|
| `h2i` | H2I (HTML → Image) | Resource option under `resource` field. | `nodes/DavixH2I/DavixH2I.node.ts:L73-L83` |
| `image` | Image (Transform / Export PDF) | Resource option under `resource` field. | `nodes/DavixH2I/DavixH2I.node.ts:L73-L83` |
| `pdf` | PDF (Merge/Split/Compress/Convert) | Resource option under `resource` field. | `nodes/DavixH2I/DavixH2I.node.ts:L73-L83` |
| `tools` | Tools (Analyze Images) | Resource option under `resource` field. | `nodes/DavixH2I/DavixH2I.node.ts:L73-L83` |

## 04.2 Operation Inventory by Resource

### Resource: H2I (HTML → Image)

| Operation Display Name | Internal Name | Description | Evidence |
|------------------------|--------------|-------------|----------|
| Render HTML to Image | `image` | H2I operation option. | `nodes/DavixH2I/DavixH2I.node.ts:L87-L98` |
| Render HTML to PDF | `pdf` | H2I operation option. | `nodes/DavixH2I/DavixH2I.node.ts:L87-L98` |

Note: This operation selector is shown only when `resource = h2i`. Evidence: `nodes/DavixH2I/DavixH2I.node.ts:L92`.

### Resource: Image (Transform / Export PDF)

| Operation Display Name | Internal Name | Description | Evidence |
|------------------------|--------------|-------------|----------|
| Format | `format` | Image operation option. | `nodes/DavixH2I/DavixH2I.node.ts:L101-L123` |
| Resize | `resize` | Image operation option. | `nodes/DavixH2I/DavixH2I.node.ts:L101-L123` |
| Crop | `crop` | Image operation option. | `nodes/DavixH2I/DavixH2I.node.ts:L101-L123` |
| Transform | `transform` | Image operation option. | `nodes/DavixH2I/DavixH2I.node.ts:L101-L123` |
| Compress | `compress` | Image operation option. | `nodes/DavixH2I/DavixH2I.node.ts:L101-L123` |
| Enhance | `enhance` | Image operation option. | `nodes/DavixH2I/DavixH2I.node.ts:L101-L123` |
| Padding | `padding` | Image operation option. | `nodes/DavixH2I/DavixH2I.node.ts:L101-L123` |
| Frame | `frame` | Image operation option. | `nodes/DavixH2I/DavixH2I.node.ts:L101-L123` |
| Background | `background` | Image operation option. | `nodes/DavixH2I/DavixH2I.node.ts:L101-L123` |
| Watermark | `watermark` | Image operation option. | `nodes/DavixH2I/DavixH2I.node.ts:L101-L123` |
| PDF Export | `pdf` | Image operation option. | `nodes/DavixH2I/DavixH2I.node.ts:L101-L123` |
| Metadata (JSON only) | `metadata` | Image operation option. | `nodes/DavixH2I/DavixH2I.node.ts:L101-L123` |
| Multitask | `multitask` | Image operation option. | `nodes/DavixH2I/DavixH2I.node.ts:L101-L123` |

Note: This operation selector is shown only when `resource = image`. Evidence: `nodes/DavixH2I/DavixH2I.node.ts:L106`.

### Resource: PDF (Merge/Split/Compress/Convert)

| Operation Display Name | Internal Name | Description | Evidence |
|------------------------|--------------|-------------|----------|
| To Images | `to-images` | PDF operation option. | `nodes/DavixH2I/DavixH2I.node.ts:L126-L149` |
| Merge | `merge` | PDF operation option. | `nodes/DavixH2I/DavixH2I.node.ts:L126-L149` |
| Split | `split` | PDF operation option. | `nodes/DavixH2I/DavixH2I.node.ts:L126-L149` |
| Compress | `compress` | PDF operation option. | `nodes/DavixH2I/DavixH2I.node.ts:L126-L149` |
| Extract Images | `extract-images` | PDF operation option. | `nodes/DavixH2I/DavixH2I.node.ts:L126-L149` |
| Watermark | `watermark` | PDF operation option. | `nodes/DavixH2I/DavixH2I.node.ts:L126-L149` |
| Rotate | `rotate` | PDF operation option. | `nodes/DavixH2I/DavixH2I.node.ts:L126-L149` |
| Metadata | `metadata` | PDF operation option. | `nodes/DavixH2I/DavixH2I.node.ts:L126-L149` |
| Reorder | `reorder` | PDF operation option. | `nodes/DavixH2I/DavixH2I.node.ts:L126-L149` |
| Delete Pages | `delete-pages` | PDF operation option. | `nodes/DavixH2I/DavixH2I.node.ts:L126-L149` |
| Extract Pages | `extract` | PDF operation option. | `nodes/DavixH2I/DavixH2I.node.ts:L126-L149` |
| Flatten | `flatten` | PDF operation option. | `nodes/DavixH2I/DavixH2I.node.ts:L126-L149` |
| Encrypt | `encrypt` | PDF operation option. | `nodes/DavixH2I/DavixH2I.node.ts:L126-L149` |
| Decrypt | `decrypt` | PDF operation option. | `nodes/DavixH2I/DavixH2I.node.ts:L126-L149` |

Note: This operation selector is shown only when `resource = pdf`. Evidence: `nodes/DavixH2I/DavixH2I.node.ts:L131`.

### Resource: Tools (Analyze Images)

| Operation Display Name | Internal Name | Description | Evidence |
|------------------------|--------------|-------------|----------|
| Single Tool | `single` | Tools operation option. | `nodes/DavixH2I/DavixH2I.node.ts:L152-L163` |
| Multitask | `multitask` | Tools operation option. | `nodes/DavixH2I/DavixH2I.node.ts:L152-L163` |

Note: This operation selector is shown only when `resource = tools`. Evidence: `nodes/DavixH2I/DavixH2I.node.ts:L157`.

No operations are marked as deprecated in the node definition.

## 04.3 Operation → Endpoint Mapping

All runtime API calls use `davixRequest`, which builds a full URL as `baseUrl + ensureLeadingSlash(options.url)` and injects `x-api-key` header.

Evidence: `nodes/DavixH2I/GenericFunctions.ts:L39-L52`, `nodes/DavixH2I/GenericFunctions.ts:L102-L114`.

| Resource | Operation | HTTP Method | Endpoint Path | Evidence |
|----------|-----------|------------|---------------|----------|
| H2I | `image` | POST | `/v1/h2i` | `nodes/DavixH2I/DavixH2I.node.ts:L1327-L1354` |
| H2I | `pdf` | POST | `/v1/h2i` | `nodes/DavixH2I/DavixH2I.node.ts:L1327-L1354` |
| Image | `format` | POST | `/v1/image` | `nodes/DavixH2I/DavixH2I.node.ts:L1376-L1415`, `nodes/DavixH2I/DavixH2I.node.ts:L1619-L1624` |
| Image | `resize` | POST | `/v1/image` | `nodes/DavixH2I/DavixH2I.node.ts:L1416-L1423`, `nodes/DavixH2I/DavixH2I.node.ts:L1619-L1624` |
| Image | `crop` | POST | `/v1/image` | `nodes/DavixH2I/DavixH2I.node.ts:L1424-L1433`, `nodes/DavixH2I/DavixH2I.node.ts:L1619-L1624` |
| Image | `transform` | POST | `/v1/image` | `nodes/DavixH2I/DavixH2I.node.ts:L1434-L1441`, `nodes/DavixH2I/DavixH2I.node.ts:L1619-L1624` |
| Image | `compress` | POST | `/v1/image` | `nodes/DavixH2I/DavixH2I.node.ts:L1442-L1449`, `nodes/DavixH2I/DavixH2I.node.ts:L1619-L1624` |
| Image | `enhance` | POST | `/v1/image` | `nodes/DavixH2I/DavixH2I.node.ts:L1450-L1461`, `nodes/DavixH2I/DavixH2I.node.ts:L1619-L1624` |
| Image | `padding` | POST | `/v1/image` | `nodes/DavixH2I/DavixH2I.node.ts:L1462-L1474`, `nodes/DavixH2I/DavixH2I.node.ts:L1619-L1624` |
| Image | `frame` | POST | `/v1/image` | `nodes/DavixH2I/DavixH2I.node.ts:L1475-L1482`, `nodes/DavixH2I/DavixH2I.node.ts:L1619-L1624` |
| Image | `background` | POST | `/v1/image` | `nodes/DavixH2I/DavixH2I.node.ts:L1483-L1490`, `nodes/DavixH2I/DavixH2I.node.ts:L1619-L1624` |
| Image | `watermark` | POST | `/v1/image` | `nodes/DavixH2I/DavixH2I.node.ts:L1491-L1502`, `nodes/DavixH2I/DavixH2I.node.ts:L1619-L1624` |
| Image | `pdf` | POST | `/v1/image` | `nodes/DavixH2I/DavixH2I.node.ts:L1503-L1507`, `nodes/DavixH2I/DavixH2I.node.ts:L1619-L1624` |
| Image | `metadata` | POST | `/v1/image` | `nodes/DavixH2I/DavixH2I.node.ts:L1508-L1512`, `nodes/DavixH2I/DavixH2I.node.ts:L1619-L1624` |
| Image | `multitask` | POST | `/v1/image` | `nodes/DavixH2I/DavixH2I.node.ts:L1513-L1617`, `nodes/DavixH2I/DavixH2I.node.ts:L1619-L1624` |
| PDF | `to-images` | POST | `/v1/pdf` | `nodes/DavixH2I/DavixH2I.node.ts:L1678-L1684`, `nodes/DavixH2I/DavixH2I.node.ts:L1774-L1779` |
| PDF | `merge` | POST | `/v1/pdf` | `nodes/DavixH2I/DavixH2I.node.ts:L1669-L1671`, `nodes/DavixH2I/DavixH2I.node.ts:L1774-L1779` |
| PDF | `split` | POST | `/v1/pdf` | `nodes/DavixH2I/DavixH2I.node.ts:L1673-L1676`, `nodes/DavixH2I/DavixH2I.node.ts:L1774-L1779` |
| PDF | `compress` | POST | `/v1/pdf` | `nodes/DavixH2I/DavixH2I.node.ts:L1651-L1773`, `nodes/DavixH2I/DavixH2I.node.ts:L1774-L1779` |
| PDF | `extract-images` | POST | `/v1/pdf` | `nodes/DavixH2I/DavixH2I.node.ts:L1686-L1689`, `nodes/DavixH2I/DavixH2I.node.ts:L1774-L1779` |
| PDF | `watermark` | POST | `/v1/pdf` | `nodes/DavixH2I/DavixH2I.node.ts:L1691-L1706`, `nodes/DavixH2I/DavixH2I.node.ts:L1774-L1779` |
| PDF | `rotate` | POST | `/v1/pdf` | `nodes/DavixH2I/DavixH2I.node.ts:L1708-L1711`, `nodes/DavixH2I/DavixH2I.node.ts:L1774-L1779` |
| PDF | `metadata` | POST | `/v1/pdf` | `nodes/DavixH2I/DavixH2I.node.ts:L1713-L1721`, `nodes/DavixH2I/DavixH2I.node.ts:L1774-L1779` |
| PDF | `reorder` | POST | `/v1/pdf` | `nodes/DavixH2I/DavixH2I.node.ts:L1723-L1747`, `nodes/DavixH2I/DavixH2I.node.ts:L1774-L1779` |
| PDF | `delete-pages` | POST | `/v1/pdf` | `nodes/DavixH2I/DavixH2I.node.ts:L1749-L1751`, `nodes/DavixH2I/DavixH2I.node.ts:L1774-L1779` |
| PDF | `extract` | POST | `/v1/pdf` | `nodes/DavixH2I/DavixH2I.node.ts:L1753-L1759`, `nodes/DavixH2I/DavixH2I.node.ts:L1774-L1779` |
| PDF | `flatten` | POST | `/v1/pdf` | `nodes/DavixH2I/DavixH2I.node.ts:L1761-L1763`, `nodes/DavixH2I/DavixH2I.node.ts:L1774-L1779` |
| PDF | `encrypt` | POST | `/v1/pdf` | `nodes/DavixH2I/DavixH2I.node.ts:L1765-L1768`, `nodes/DavixH2I/DavixH2I.node.ts:L1774-L1779` |
| PDF | `decrypt` | POST | `/v1/pdf` | `nodes/DavixH2I/DavixH2I.node.ts:L1770-L1772`, `nodes/DavixH2I/DavixH2I.node.ts:L1774-L1779` |
| Tools | `single` | POST | `/v1/tools` | `nodes/DavixH2I/DavixH2I.node.ts:L1801-L1833`, `nodes/DavixH2I/DavixH2I.node.ts:L1903-L1908` |
| Tools | `multitask` | POST | `/v1/tools` | `nodes/DavixH2I/DavixH2I.node.ts:L1801-L1833`, `nodes/DavixH2I/DavixH2I.node.ts:L1903-L1908` |

Endpoint path construction is static at call sites (literal `/v1/h2i`, `/v1/image`, `/v1/pdf`, `/v1/tools`), and full URL is dynamic because credentials provide `baseUrl`. Evidence: `nodes/DavixH2I/DavixH2I.node.ts:L1351`, `nodes/DavixH2I/DavixH2I.node.ts:L1621`, `nodes/DavixH2I/DavixH2I.node.ts:L1776`, `nodes/DavixH2I/DavixH2I.node.ts:L1905`, `nodes/DavixH2I/GenericFunctions.ts:L39-L52`.

## 04.4 Parameter Grouping and Shared Fields

- The node uses one top-level `resource` selector plus four separate `operation` selectors, each gated by `displayOptions.show.resource`.
  - Evidence: `nodes/DavixH2I/DavixH2I.node.ts:L87-L163`.
- Parameters are grouped conditionally by `displayOptions` tied to resource + operation combinations (for example, H2I PDF-only fields, image operation-specific fields, PDF action-specific fields, and tools single/multi tool-specific fields).
  - Evidence: `nodes/DavixH2I/DavixH2I.node.ts:L177-L285`, `nodes/DavixH2I/DavixH2I.node.ts:L315-L1229`.
- Shared fields exist across multiple operations, such as `pages` for several PDF operations, and `keepMetadata`/`normalizeOrientation` across multiple image operations.
  - Evidence: `nodes/DavixH2I/DavixH2I.node.ts:L320`, `nodes/DavixH2I/DavixH2I.node.ts:L337`, `nodes/DavixH2I/DavixH2I.node.ts:L904-L913`.
- Multi-operation grouping is implemented with `multiOptions` collections:
  - Image `actions` (for image `multitask`).
  - Tools `tools` (for tools `multitask`).
  - Evidence: `nodes/DavixH2I/DavixH2I.node.ts:L463-L480`, `nodes/DavixH2I/DavixH2I.node.ts:L1056-L1075`.
- No `collection` or `fixedCollection` UI fields are defined in this node file.
  - Evidence: `nodes/DavixH2I/DavixH2I.node.ts` (no `type: 'collection'` or `type: 'fixedCollection'` entries).

## 04.5 Operation Execution Flow

Runtime dispatch is implemented as a nested conditional flow inside `execute()`:

1. Loop through all input items (`for itemIndex ...`).
2. Read `resource` and `operation` for each item.
3. Branch by `resource` using sequential `if` blocks (`h2i`, `image`, `pdf`, `tools`).
4. Inside each resource block:
   - Cast `operation` to a resource-specific action type.
   - Build either JSON body (`h2i`) or multipart `formData` (`image`, `pdf`, `tools`).
   - Apply operation-specific parameter mapping (`switch` in image; action-conditional `if` blocks in pdf/tools).
   - Send request via `davixRequest`.
5. Optionally download returned URL(s) to binary depending on resource-specific binary flags.

Evidence: `nodes/DavixH2I/DavixH2I.node.ts:L1240-L1912`.

## 04.6 Unsupported or Absent Capabilities

From repository code, only the following PixLab endpoint paths are called by this node: `/v1/h2i`, `/v1/image`, `/v1/pdf`, `/v1/tools`.

No additional PixLab endpoint categories are referenced in node execution code.

Evidence: `nodes/DavixH2I/DavixH2I.node.ts:L1351`, `nodes/DavixH2I/DavixH2I.node.ts:L1621`, `nodes/DavixH2I/DavixH2I.node.ts:L1776`, `nodes/DavixH2I/DavixH2I.node.ts:L1905`.

## 04.7 Capability Summary Matrix

| Resource | # of Operations | Uses File Upload | Returns Binary | Supports Multiple Items | Evidence |
|----------|----------------|-----------------|---------------|------------------------|----------|
| H2I | 2 | No (JSON body only) | Optional (`downloadBinary`) | Yes (`for` loop over items) | `nodes/DavixH2I/DavixH2I.node.ts:L87-L98`, `nodes/DavixH2I/DavixH2I.node.ts:L1329-L1354`, `nodes/DavixH2I/DavixH2I.node.ts:L1356-L1371`, `nodes/DavixH2I/DavixH2I.node.ts:L1240-L1243` |
| Image | 13 | Yes (`attachFiles('images', ...)`) | Optional, except forced off for `metadata` | Yes (`for` loop over items) | `nodes/DavixH2I/DavixH2I.node.ts:L101-L123`, `nodes/DavixH2I/DavixH2I.node.ts:L1383-L1385`, `nodes/DavixH2I/DavixH2I.node.ts:L1626-L1644`, `nodes/DavixH2I/DavixH2I.node.ts:L1240-L1243` |
| PDF | 14 | Yes (`attachFiles('files', ...)`) | Optional (`pdfDownloadBinary`) | Yes (`for` loop over items) | `nodes/DavixH2I/DavixH2I.node.ts:L126-L149`, `nodes/DavixH2I/DavixH2I.node.ts:L1654-L1657`, `nodes/DavixH2I/DavixH2I.node.ts:L1781-L1794`, `nodes/DavixH2I/DavixH2I.node.ts:L1240-L1243` |
| Tools | 2 | Yes (`attachFiles('images', ...)`) | Not confirmed in code (no tools binary download branch) | Yes (`for` loop over items) | `nodes/DavixH2I/DavixH2I.node.ts:L152-L163`, `nodes/DavixH2I/DavixH2I.node.ts:L1803-L1807`, `nodes/DavixH2I/DavixH2I.node.ts:L1910`, `nodes/DavixH2I/DavixH2I.node.ts:L1240-L1243` |

## Open Questions / Missing Evidence

- Whether PixLab exposes endpoint families beyond `/v1/h2i`, `/v1/image`, `/v1/pdf`, `/v1/tools` is not determinable from this repository alone.
- There is no dynamic operation loading logic in this node file; hidden operations from external metadata are not confirmed in code.
- No indirect endpoint resolution beyond `baseUrl + literal path` is present; alternate endpoint routing is not confirmed in code.

## Evidence Index

- `nodes/DavixH2I/DavixH2I.node.ts`
  - Resource options and operation options in `description.properties`.
  - Display option gating patterns for resource/operation fields.
  - Runtime operation dispatch in `execute()`.
  - Endpoint literals and HTTP methods.
  - Binary download behavior and per-item iteration.
- `nodes/DavixH2I/GenericFunctions.ts`
  - Full request URL assembly and API key header injection (`buildDavixRequestOptions`, `davixRequest`).
