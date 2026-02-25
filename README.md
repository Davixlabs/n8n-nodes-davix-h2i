# Davix H2I — n8n Community Node
> Official Davix H2I integration for n8n, powered by the Davix H2I Engine (PixLab).

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![npm version](https://img.shields.io/npm/v/n8n-nodes-davix-h2i.svg)](https://www.npmjs.com/package/n8n-nodes-davix-h2i)
[![n8n](https://img.shields.io/badge/integrates-n8n-orange.svg)](https://n8n.io)
[![Website](https://img.shields.io/badge/website-davix.dev-black.svg)](https://davix.dev)

## Overview

This package provides the **Davix H2I** node for n8n workflows. It connects n8n to the **Davix H2I Engine (PixLab)** API endpoints for HTML rendering, image processing, PDF processing, and image analysis tools.

- Product brand: **Davix H2I**
- Backend engine: **Davix H2I Engine (PixLab)**
- Organization: **Davix Labs**
- Website: https://davix.dev

## Features

This node exposes four resources and their implemented operations:

- **H2I**
  - Render HTML to Image
  - Render HTML to PDF
- **Image**
  - Format
  - Resize
  - Crop
  - Transform
  - Compress
  - Enhance
  - Padding
  - Frame
  - Background
  - Watermark
  - PDF Export
  - Metadata
  - Multitask
- **PDF**
  - To Images
  - Merge
  - Split
  - Compress
  - Extract Images
  - Watermark
  - Rotate
  - Metadata
  - Reorder
  - Delete Pages
  - Extract Pages
  - Flatten
  - Encrypt
  - Decrypt
- **Tools**
  - Single Tool
  - Multitask

Additional implemented behavior:

- Uploads binaries from configured input binary properties.
- Optional download of returned file URLs to n8n binary data (resource/operation dependent).
- Continue On Fail support (returns structured error JSON instead of stopping execution).

## Requirements

- n8n instance with Community Nodes enabled.
- A configured **Davix H2I (PixLab) API** credential (Base URL + API Key).
- Package compatibility declares `n8n-workflow` as a peer dependency (`*`).

> Note: No explicit `engines` field is defined in `package.json` for Node.js runtime pinning.

## Installation

### Install via n8n Community Nodes

1. Open n8n.
2. Go to **Settings → Community Nodes**.
3. Install package: `n8n-nodes-davix-h2i`.
4. Restart n8n if required by your deployment.

Community node docs: https://docs.n8n.io/integrations/community-nodes/

## Manual / Development Installation

```bash
git clone https://github.com/Davixlabs/n8n-nodes-davix-h2i.git
cd n8n-nodes-davix-h2i
npm install
npm run build
```

Repository scripts:

- `npm run build`
- `npm run copy:icons`
- `npm run dev`
- `npm run lint`
- `npm run lint:fix`
- `npm test`

## Credentials

Credential type in n8n:

- **Davix H2I (PixLab) API**

Required fields:

- **Base URL** (default: `https://pixlab.davix.dev`)
- **API Key**

Behavior from implementation:

- Base URL must be a valid absolute **HTTPS** URL.
- Base URL cannot contain embedded username/password.
- API key is sent in header: `x-api-key`.

### Configure credentials in n8n

1. In n8n, create a new credential of type **Davix H2I (PixLab) API**.
2. Keep the default Base URL unless your Davix environment uses a different PixLab endpoint.
3. Paste your API key.
4. Save and select this credential in the Davix H2I node.

## Supported Resources & Operations

| Resource | Operations |
|---|---|
| H2I | `image`, `pdf` |
| Image | `format`, `resize`, `crop`, `transform`, `compress`, `enhance`, `padding`, `frame`, `background`, `watermark`, `pdf`, `metadata`, `multitask` |
| PDF | `to-images`, `merge`, `split`, `compress`, `extract-images`, `watermark`, `rotate`, `metadata`, `reorder`, `delete-pages`, `extract`, `flatten`, `encrypt`, `decrypt` |
| Tools | `single`, `multitask` |

## Usage

### Example 1: Render HTML to PDF

Use this when you want to generate a PDF document from HTML.

- **Resource:** `h2i`
- **Operation:** `pdf`
- **Required field:** `HTML`
- **Common fields:** `CSS`, `Width`, `Height`, `PDF Format`, `PDF Landscape`, `Prefer CSS Page Size`, `Print Mode`, `Print Background`
- **Optional binary download:** `Download Result as Binary` + `Output Binary Property`

### Example 2: Resize an image from incoming binary

Use this when a previous node provides an image binary and you need a resized output.

- **Resource:** `image`
- **Operation:** `resize`
- **Required field:** `Input Binary Properties` (for example: `data`)
- **Common fields:** `Format`, `Width`, `Height`, `Enlarge`, `Normalize Orientation`
- **Optional binary download:** `Download Result as Binary` + `Output Binary Property`

### Example 3: Merge PDF files

Use this when an item contains multiple PDF binaries to combine.

- **Resource:** `pdf`
- **Operation:** `merge`
- **Required field:** `Input Binary Properties` (comma-separated, for example: `data,file2`)
- **Optional field:** `Sort By Name`
- **Optional binary download:** `Download Result as Binary` + `Output Binary Property`

## Output

- **All operations** return JSON in the n8n item `json` field.
- **H2I** can optionally download the first returned URL into one binary property.
- **Image** can optionally download one or multiple returned URLs into binary properties (except `metadata`, which is JSON-only by implementation).
- **PDF** can optionally download one or multiple returned URLs into binary properties.
- **Tools** returns JSON only (no binary download option in node properties).

## Error Handling

- Request errors are wrapped as n8n API errors with additional context.
- Error parsing supports envelope values such as `code`, `message`, `hint`, and `request_id` when present.
- Status-specific messaging is implemented for:
  - `429` (rate limit)
  - `503` (temporary unavailable)
  - `413` (upload too large)
- With **Continue On Fail**, the node outputs an item containing `error` and optional metadata instead of throwing.

Common issues:

- Missing or invalid API key.
- Invalid Base URL (must be HTTPS absolute URL).
- Input binary property names do not match incoming item binaries.
- Large uploads hitting API size constraints.

## Support

- Website: https://davix.dev
- Product/support entry point: https://davix.dev
- Bug reports: https://github.com/Davixlabs/n8n-nodes-davix-h2i/issues

## About Davix Labs

**Davix Labs** builds Davix H2I and maintains this n8n community node integration for the Davix H2I Engine (PixLab).

Learn more: https://davix.dev

## License

MIT

## Helpful Links

- n8n documentation: https://docs.n8n.io/
- n8n community nodes: https://docs.n8n.io/integrations/community-nodes/
- Davix Labs website: https://davix.dev
