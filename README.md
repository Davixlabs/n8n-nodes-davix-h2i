<div align="center">
  <img src="nodes/DavixH2I/davixH2I.svg" alt="Davix H2I logo" width="240" />
</div>

# Davix H2I - n8n Community Node
> Open-source n8n community node for H2I-powered HTML rendering, image processing, PDF workflows, and image analysis.

[![License: MIT](https://img.shields.io/badge/license-MIT-blue?labelColor=000000)](LICENSE)
[![npm version](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fregistry.npmjs.org%2F%40davixlabs%2Fn8n-nodes-davix-h2i&query=%24.version&label=npm&labelColor=000000&color=orange)](https://www.npmjs.com/package/@davixlabs/n8n-nodes-davix-h2i)
[![n8n](https://img.shields.io/badge/integrates-n8n-red?labelColor=000000)](https://n8n.io)
[![Website](https://img.shields.io/badge/website-h2i.davix.dev-fc0082?labelColor=000000)](https://h2i.davix.dev)

## What this package does

`@davixlabs/n8n-nodes-davix-h2i` adds the **Davix H2I** node to n8n. It connects self-hosted n8n workflows to the H2I service, backed by PixLab, for:

- HTML to image rendering
- HTML to PDF rendering
- Image processing and export
- PDF processing
- Image analysis tools

This package is maintained by **Davix Labs**. Service information is available at **https://h2i.davix.dev**.

## What the node can do

This node exposes four resource families inside n8n:

- **H2I**
  - Render HTML to image
  - Render HTML to PDF
- **Image**
  - Format conversion
  - Resize
  - Crop
  - Transform
  - Compress
  - Enhance
  - Padding
  - Frame
  - Background
  - Watermark
  - PDF export
  - Metadata
  - Multitask
- **PDF**
  - Convert PDF pages to images
  - Merge
  - Split
  - Compress
  - Extract embedded images
  - Watermark
  - Rotate
  - Metadata
  - Reorder pages
  - Delete pages
  - Extract pages
  - Flatten
  - Encrypt
  - Decrypt
- **Tools**
  - Single image analysis task
  - Multitask image analysis

This makes the node suitable for workflows such as:

- generating social images or documents from HTML templates
- resizing or transforming images from earlier n8n steps
- combining, splitting, or securing PDF files
- extracting metadata or analysis results into JSON for downstream automation

## Open-source package vs hosted service

- This repository and npm package are open source under the **MIT** license.
- The remote H2I/PixLab backend is a hosted service and is **not** included in this repository.
- Installing this package does **not** provide API access by itself.
- You need a valid **H2I API key** to use the node.

## Requirements

- A self-hosted n8n instance with community packages enabled
- Permission to install community nodes in your n8n environment
- An **H2I API key**
- A configured **Davix H2I (PixLab) API** credential in n8n

## Get an API key

Get your API key from the H2I service at **https://h2i.davix.dev**.

This node requires a valid **H2I API key** for every request. Installing the package alone is not enough to use the service.

The credential used by this node requires:

- **Base URL**: defaults to `https://pixlab.davix.dev`
- **API Key**: sent in the `x-api-key` header

## Installation

### Self-hosted n8n GUI install

1. Open n8n.
2. Go to **Settings > Community Nodes**.
3. Enter `@davixlabs/n8n-nodes-davix-h2i`.
4. Restart n8n if required by your deployment.

### Manual npm install for self-hosted environments

```bash
mkdir -p ~/.n8n/nodes
cd ~/.n8n/nodes
npm install @davixlabs/n8n-nodes-davix-h2i
```

Restart n8n after installing.

Installation availability depends on your n8n deployment mode, user permissions, and whether community packages are enabled.

## Configure credentials

1. Create a credential of type **Davix H2I (PixLab) API**.
2. Keep the default Base URL unless your H2I environment uses a different PixLab endpoint.
3. Paste your API key.
4. Save the credential and select it in the node.

Base URL validation in the node requires an absolute **HTTPS** URL and rejects embedded username/password credentials.

## Supported resources and operations

| Resource | Operations |
|---|---|
| H2I | `image`, `pdf` |
| Image | `format`, `resize`, `crop`, `transform`, `compress`, `enhance`, `padding`, `frame`, `background`, `watermark`, `pdf`, `metadata`, `multitask` |
| PDF | `to-images`, `merge`, `split`, `compress`, `extract-images`, `watermark`, `rotate`, `metadata`, `reorder`, `delete-pages`, `extract`, `flatten`, `encrypt`, `decrypt` |
| Tools | `single`, `multitask` |

Additional runtime behavior:

- Uploads binaries from configured input binary properties
- Optional download of returned file URLs into n8n binary data for supported H2I, Image, and PDF operations
- Continue On Fail support with structured error output

## How to judge fit for your workflow

This package is a good fit if you want to:

- call H2I from n8n without building raw HTTP requests by hand
- process incoming image or PDF binaries inside a workflow
- generate files and optionally attach the returned outputs as n8n binary data
- mix file-generation steps with downstream n8n logic, storage, notifications, or approvals

This package may not be the right fit if you:

- need offline/local-only rendering without calling the hosted H2I service
- do not have an H2I API key
- need backend source code for the hosted PixLab service itself

## Usage notes

- Use the **H2I** resource to render HTML to image or PDF.
- Use the **Image** resource when your workflow already has image binaries to transform or export.
- Use the **PDF** resource for PDF conversion and editing operations.
- Use the **Tools** resource for image analysis outputs returned as JSON.
- Enable the binary download options when you want returned file URLs attached directly to the n8n item as binary data.

## Practical examples

### Render HTML to PDF

Use **H2I** with the `pdf` operation when your workflow needs to turn HTML into a generated PDF document.

Typical inputs include:

- HTML markup
- optional CSS
- page size and print settings

### Resize or convert an incoming image

Use **Image** with operations such as `resize`, `format`, `compress`, or `watermark` when a previous node already provides image binary data.

Typical flow:

1. Receive an image from another n8n node.
2. Reference the incoming binary property.
3. Choose the image operation and output format.
4. Optionally download the result back into n8n binary data.

### Merge or split PDFs

Use **PDF** with `merge`, `split`, `extract`, `reorder`, `encrypt`, or related operations when your workflow needs document manipulation after upload or generation.

### Return analysis data as JSON

Use **Tools** when you want image analysis results to continue through the workflow as structured JSON instead of downloaded files.

## Output behavior

- All operations return data in the n8n item `json` field.
- H2I, Image, and PDF operations can optionally download returned file URLs into binary properties when the relevant download options are enabled.
- Tools operations return JSON only.

## Authentication and service model

- Credential type in n8n: **Davix H2I (PixLab) API**
- Authentication header: `x-api-key`
- Default service endpoint: `https://pixlab.davix.dev`
- Package maintainer: **Davix Labs**
- Public service website: **https://h2i.davix.dev**

The package code is open source under MIT. The hosted H2I/PixLab API service remains separate and requires API access from H2I.

## Development

```bash
git clone https://github.com/Davixlabs/n8n-nodes-davix-h2i.git
cd n8n-nodes-davix-h2i
npm install
npm run build
```

Available scripts:

- `npm run build`
- `npm run copy:icons`
- `npm run dev`
- `npm run lint`
- `npm run lint:fix`

## Maintainer

This package is owned and maintained by **Davix Labs**.

- Website: https://davix.dev

## Support

- Package bugs and release issues: https://github.com/Davixlabs/n8n-nodes-davix-h2i/issues
- H2I service and API information: https://h2i.davix.dev
- H2I service support: https://h2i.davix.dev/support
- Davix Labs: https://davix.dev

## Useful links

- H2I service: https://h2i.davix.dev
- Support: https://h2i.davix.dev/support
- GitHub repository: https://github.com/Davixlabs/n8n-nodes-davix-h2i
- npm package: https://www.npmjs.com/package/@davixlabs/n8n-nodes-davix-h2i

## License

MIT
