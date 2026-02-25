# Davix H2I

Davix H2I is an n8n community node for calling Davix PixLab APIs from workflows. It lets you render HTML to images/PDFs, process images, run PDF operations, and perform image analysis tools. It is designed for n8n users who want to automate media and document tasks directly inside workflow pipelines.

---

## Overview

This integration connects n8n to PixLab endpoints through a single node with multiple resources. You can choose a resource (H2I, Image, PDF, or Tools), then select an operation and provide either JSON fields or binary inputs depending on the operation. The node returns API JSON responses and can optionally download result files into n8n binary properties for downstream steps.

---

## Features

- H2I resource for rendering HTML to:
  - image output
  - PDF output
- Image resource operations:
  - Format, Resize, Crop, Transform, Compress, Enhance, Padding, Frame, Background, Watermark, PDF Export, Metadata, Multitask
- PDF resource operations:
  - To Images, Merge, Split, Compress, Extract Images, Watermark, Rotate, Metadata, Reorder, Delete Pages, Extract Pages, Flatten, Encrypt, Decrypt
- Tools resource operations:
  - Single Tool
  - Multitask
- Accepts multiple incoming binary properties for Image, PDF, and Tools resources.
- Optional binary download mode for H2I, Image (except metadata), and PDF operations.
- Continue On Fail support through standard n8n node behavior.

---

## Requirements

- n8n instance with Community Nodes enabled.
- PixLab API access (API key required).
- For development/build in this repository:
  - Node.js 20 is used in the repository publish workflow.

---

## Installation

### Option 1: Install via n8n Community Nodes

1. Open n8n.
2. Go to **Settings → Community Nodes**.
3. Click **Install**.
4. Enter package name: `n8n-nodes-davix-h2i`.
5. Install.

Documentation: https://docs.n8n.io/integrations/community-nodes/

---

### Option 2: Manual / Development Installation

```bash
git clone https://github.com/Davixlabs/n8n-nodes-davix-h2i.git
cd n8n-nodes-davix-h2i
npm install
npm run build
```

For local development with n8n, link the built package into your n8n environment using your preferred npm linking workflow.

---

## Credentials

Credential type in n8n:
- **Davix H2I (PixLab) API**

Fields:
- **Base URL**
  - Default: `https://pixlab.davix.dev`
  - Provide the PixLab API base URL (HTTPS, no trailing slash recommended).
- **API Key**
  - Your PixLab API key.

How credentials are used:
- The node validates the Base URL as an absolute HTTPS URL.
- Requests are sent to `Base URL + endpoint`.
- The API key is sent in the `x-api-key` request header.

---

## Usage

1. Add **Davix H2I** to your workflow.
2. Select a **Resource**.
3. Select an **Operation**.
4. Fill in required and optional fields.
5. Provide input:
   - H2I: HTML/CSS and render options.
   - Image/PDF/Tools: one or more binary properties from previous nodes.
6. Execute the node.
7. Use JSON output and, if enabled, binary output properties in later nodes.

---

### Supported Resources & Operations

| Resource | Operation | Description |
|----------|----------|-------------|
| H2I (HTML → Image) | Render HTML to Image | Sends HTML/CSS render payload to H2I endpoint and returns JSON (optional downloaded image binary). |
| H2I (HTML → Image) | Render HTML to PDF | Sends HTML/CSS render payload for PDF output and returns JSON (optional downloaded PDF binary). |
| Image (Transform / Export PDF) | Format | Converts/exports image format with optional dimensions and metadata options. |
| Image (Transform / Export PDF) | Resize | Resizes input images with orientation/enlarge options. |
| Image (Transform / Export PDF) | Crop | Crops input images using crop coordinates and size fields. |
| Image (Transform / Export PDF) | Transform | Applies rotate/flip/colorspace style transform options. |
| Image (Transform / Export PDF) | Compress | Applies quality/target size compression options. |
| Image (Transform / Export PDF) | Enhance | Applies enhancement controls (blur, sharpen, grayscale, etc.). |
| Image (Transform / Export PDF) | Padding | Adds configurable padding and related style options. |
| Image (Transform / Export PDF) | Frame | Adds border/frame options around images. |
| Image (Transform / Export PDF) | Background | Applies background color/blur style options. |
| Image (Transform / Export PDF) | Watermark | Applies text/image watermark options. |
| Image (Transform / Export PDF) | PDF Export | Exports input images into PDF output. |
| Image (Transform / Export PDF) | Metadata (JSON only) | Returns metadata-oriented JSON response (binary download disabled). |
| Image (Transform / Export PDF) | Multitask | Runs multiple image actions in one request. |
| PDF (Merge/Split/Compress/Convert) | To Images | Converts PDF pages to images using conversion options. |
| PDF (Merge/Split/Compress/Convert) | Merge | Merges PDF files with optional sort behavior. |
| PDF (Merge/Split/Compress/Convert) | Split | Splits PDFs by ranges/prefix options. |
| PDF (Merge/Split/Compress/Convert) | Compress | Compresses PDF files. |
| PDF (Merge/Split/Compress/Convert) | Extract Images | Extracts embedded images from PDFs. |
| PDF (Merge/Split/Compress/Convert) | Watermark | Applies text/image watermark options to PDFs. |
| PDF (Merge/Split/Compress/Convert) | Rotate | Rotates PDF pages. |
| PDF (Merge/Split/Compress/Convert) | Metadata | Reads/updates PDF metadata fields. |
| PDF (Merge/Split/Compress/Convert) | Reorder | Reorders pages (CSV or JSON array input). |
| PDF (Merge/Split/Compress/Convert) | Delete Pages | Removes selected pages. |
| PDF (Merge/Split/Compress/Convert) | Extract Pages | Extracts pages with mode/prefix options. |
| PDF (Merge/Split/Compress/Convert) | Flatten | Flattens forms. |
| PDF (Merge/Split/Compress/Convert) | Encrypt | Encrypts PDF with user/owner passwords. |
| PDF (Merge/Split/Compress/Convert) | Decrypt | Decrypts PDF with password. |
| Tools (Analyze Images) | Single Tool | Runs one selected analysis tool against input images. |
| Tools (Analyze Images) | Multitask | Runs multiple selected analysis tools in one request. |

---

### Example Workflows

#### Example: Render HTML to Image

- Resource: H2I (HTML → Image)
- Operation: Render HTML to Image
- Required fields: HTML
- Optional fields: CSS, Width, Height, format, download options
- Expected output: JSON response with result URL(s); optional downloaded binary file in configured output property

#### Example: Resize Image and Return Binary

- Resource: Image (Transform / Export PDF)
- Operation: Resize
- Required fields: Input Binary Properties
- Common fields: image format, width/height, enlarge, normalize orientation
- Expected output: JSON response plus downloaded image binary when enabled

#### Example: Merge PDFs

- Resource: PDF (Merge/Split/Compress/Convert)
- Operation: Merge
- Required fields: Input Binary Properties
- Optional fields: sortByName, binary download options
- Expected output: JSON response with result URL(s); optional downloaded merged PDF binary

#### Example: Run Multiple Analysis Tools

- Resource: Tools (Analyze Images)
- Operation: Multitask
- Required fields: Input Binary Properties, Tools
- Optional fields: tool-specific parameters (for example palette size, similarity settings)
- Expected output: JSON analysis payload from the tools endpoint

---

## Output

- The node always returns JSON output from the API response.
- H2I can optionally download the first returned URL as binary.
- Image can optionally download returned result URL(s) as binary (metadata operation remains JSON-only).
- PDF can optionally download returned result URL(s) as binary.
- Tools operations return JSON output (no download toggle is implemented).

---

## Error Handling

- API and transport errors are surfaced in n8n as node errors.
- The request helper maps known status cases (for example 429, 503, 413) to clearer messages.
- Error details may include API error code/message, hint text, and request ID when available.
- With **Continue On Fail** enabled, the node returns an item containing error details instead of failing the entire execution.

Common causes of failure:
- Missing/invalid API key.
- Invalid Base URL (must be absolute HTTPS URL).
- Missing or incorrect binary property names.
- Total uploaded binary size over 50 MB.
- Operation-specific invalid field values (for example malformed page reorder JSON).

---

## Development

Repository structure (high level):
- `nodes/DavixH2I/` — main node implementation and request helper.
- `credentials/` — credential definition.
- `src/index.ts` — node/credential exports.
- `tests/` — helper function tests.

Build and checks:

```bash
npm install
npm run build
npm run lint
npm test
```

The build script compiles TypeScript and copies the node icon into `dist`.

Contribution:
- Submit changes through GitHub pull requests in this repository.

---

## Publishing Notes

This repository includes an npm publish workflow that:
- runs on version tags matching `v*.*.*` (and manual dispatch),
- verifies with install/lint/build/test and package checks,
- then publishes to npm.

---

## License

MIT

---

## Links

- n8n Documentation: https://docs.n8n.io/
- n8n Community Nodes: https://docs.n8n.io/integrations/community-nodes/
- PixLab / Davix H2I homepage: https://h2i.davix.dev
