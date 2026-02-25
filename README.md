# Davix H2I
> Official n8n community node for DavixH2I workflows running on the Davix H2I Engine (PixLab).

This is the official DavixH2I node for n8n. It connects n8n workflows to the Davix H2I Engine (PixLab), enables programmatic access to supported rendering, image, PDF, and analysis operations, and is maintained by Davix Labs.

## Overview

DavixH2I is the workflow integration layer for using Davix H2I capabilities inside n8n. The node sends requests from n8n to the Davix H2I Engine (PixLab), which performs backend processing for the selected operation.

In practical terms:
- DavixH2I is the product and node integration used by n8n builders.
- Davix H2I Engine (PixLab) is the backend execution engine.
- DavixH2I and PixLab are owned by Davix Labs.

Davix Labs: https://davix.dev

## Features

- Single node with four resources: **H2I**, **Image**, **PDF**, and **Tools**.
- H2I operations:
  - Render HTML to Image
  - Render HTML to PDF
- Image operations:
  - Format, Resize, Crop, Transform, Compress, Enhance, Padding, Frame, Background, Watermark, PDF Export, Metadata, Multitask
- PDF operations:
  - To Images, Merge, Split, Compress, Extract Images, Watermark, Rotate, Metadata, Reorder, Delete Pages, Extract Pages, Flatten, Encrypt, Decrypt
- Tools operations:
  - Single Tool
  - Multitask
- Supports input binaries from prior nodes for Image/PDF/Tools operations.
- Optional binary download of returned file URL(s) for H2I, Image (except Metadata), and PDF operations.
- Supports standard n8n **Continue On Fail** behavior.

## Architecture

`n8n workflow` → `Davix H2I node` → `Davix H2I Engine (PixLab)`

The node handles parameter mapping, authentication headers, request submission, and optional file download into n8n binary properties.

## Requirements

- n8n with Community Nodes enabled.
- PixLab API key (configured through node credentials).
- Node.js 20 for repository CI/publishing workflow.
- n8n compatibility is declared via peer dependency `n8n-workflow: *`.

## Installation

### Install via n8n Community Nodes

1. Open n8n.
2. Go to **Settings → Community Nodes**.
3. Install package: `n8n-nodes-davix-h2i`.
4. Restart n8n if your deployment requires it.

Reference: https://docs.n8n.io/integrations/community-nodes/

---

### Local Development Installation

```bash
git clone https://github.com/Davixlabs/n8n-nodes-davix-h2i.git
cd n8n-nodes-davix-h2i
npm install
npm run build
```

Available repository scripts:
- `npm run build`
- `npm run dev`
- `npm run lint`
- `npm run lint:fix`
- `npm test`

## Credentials

Credential type:
- **Davix H2I (PixLab) API**

Required fields:
- **Base URL** (default: `https://pixlab.davix.dev`)
- **API Key**

Usage details:
- The Base URL is validated as an absolute HTTPS URL.
- The node appends operation paths such as `/v1/h2i`, `/v1/image`, `/v1/pdf`, and `/v1/tools`.
- The API key is sent as request header: `x-api-key`.

To obtain API access details, use your Davix Labs account/support channel.

## Supported Resources & Operations

| Resource | Operation | Description |
|----------|----------|-------------|
| H2I | Render HTML to Image | Sends HTML/CSS payload to `/v1/h2i` with `action: image`. |
| H2I | Render HTML to PDF | Sends HTML/CSS payload to `/v1/h2i` with `action: pdf`. |
| Image | Format | Converts/export format and supports size/metadata options. |
| Image | Resize | Resizes input image(s) with resize options. |
| Image | Crop | Crops input image(s) with coordinate fields. |
| Image | Transform | Applies rotation/flip/colorspace style transforms. |
| Image | Compress | Applies compression-related options. |
| Image | Enhance | Applies enhancement options such as blur/sharpen/grayscale. |
| Image | Padding | Adds padding with side and color options. |
| Image | Frame | Adds border/frame options. |
| Image | Background | Applies background color/blur options. |
| Image | Watermark | Applies text/image watermark options. |
| Image | PDF Export | Exports images to PDF output. |
| Image | Metadata | Returns metadata JSON output (download disabled by implementation). |
| Image | Multitask | Runs multiple image actions in one request. |
| PDF | To Images | Converts PDF pages to images. |
| PDF | Merge | Merges PDF files. |
| PDF | Split | Splits PDF files by ranges. |
| PDF | Compress | Compresses PDF files. |
| PDF | Extract Images | Extracts embedded images from PDFs. |
| PDF | Watermark | Applies watermark options to PDFs. |
| PDF | Rotate | Rotates selected pages. |
| PDF | Metadata | Sends metadata fields to PDF endpoint. |
| PDF | Reorder | Reorders pages (CSV or JSON array input). |
| PDF | Delete Pages | Deletes selected pages. |
| PDF | Extract Pages | Extracts page ranges/pages. |
| PDF | Flatten | Flattens form fields. |
| PDF | Encrypt | Encrypts PDFs with passwords. |
| PDF | Decrypt | Decrypts PDFs with password. |
| Tools | Single Tool | Runs one selected analysis tool. |
| Tools | Multitask | Runs multiple analysis tools in one request. |

## Usage

1. Add **Davix H2I** to your n8n workflow.
2. Select **Resource**.
3. Select **Operation**.
4. Configure required fields.
5. For Image/PDF/Tools operations, set input binary property names from previous nodes.
6. Choose binary download options where applicable.
7. Execute and route JSON/binary output to downstream nodes.

### Example 1: HTML to Image

- Resource: `h2i`
- Operation: `image` (Render HTML to Image)
- Required field: `HTML`
- Common optional fields: `CSS`, `Width`, `Height`, `Format`, `Download Result as Binary`
- Output: JSON response, optionally plus binary in `Output Binary Property`

### Example 2: Image Resize

- Resource: `image`
- Operation: `resize`
- Required field: `Input Binary Properties`
- Common fields: `Image Format`, `Width`, `Height`, `Enlarge`, `Normalize Orientation`, `Download Result as Binary`
- Output: JSON response, optionally plus downloaded image binary

### Example 3: PDF Merge

- Resource: `pdf`
- Operation: `merge`
- Required field: `Input Binary Properties`
- Optional field: `Sort By Name`
- Output: JSON response, optionally plus downloaded PDF binary in `Output Binary Property`

## Output

- All operations return JSON in the item `json` object.
- H2I returns JSON and can optionally download the first result URL into one binary property.
- Image operations can download one or more result URLs into binary properties (except `metadata`, which is JSON-only by implementation).
- PDF operations can download one or more result URLs into binary properties.
- Tools operations return JSON output.

## Error Handling

- Errors are surfaced as n8n node execution errors.
- Request helper logic maps known response codes (including 429, 503, and 413) to clearer messages.
- When available, parsed API error details may include code, hint, and request ID.
- With **Continue On Fail**, the node returns error details in the output item instead of failing the full run.

Common misconfigurations:
- Invalid/missing API key.
- Invalid Base URL (non-HTTPS or malformed URL).
- Wrong binary property names.
- Total uploaded binary size exceeding the node’s 50 MB guardrail.
- Invalid operation-specific inputs (for example malformed reorder JSON).

## Support

For documentation and support:

- Website: https://davix.dev
- Support: https://davix.dev
- GitHub Issues (bug reports only): https://github.com/Davixlabs/n8n-nodes-davix-h2i/issues

Please use GitHub Issues for reproducible bugs in this node. For general usage, account, or product support, use official Davix Labs support channels.

## About Davix Labs

Davix Labs is the creator of DavixH2I and the Davix H2I Engine (PixLab).

Website: https://davix.dev

## License

MIT
