# Davix H2I (PixLab) — n8n Community Node

**Package:** `n8n-nodes-davix-h2i`  
**Homepage:** https://h2i.davix.dev  

Use Davix H2I (PixLab) API endpoints directly inside **n8n** workflows (H2I, Image, PDF, Tools) without building manual HTTP requests.

---

## Features

This node provides easy access to these API groups:

- **H2I** — HTML → Image rendering
- **Image** — Image transforms (resize/format/quality/etc.)
- **PDF** — PDF operations (merge/split/compress/extract/convert, depending on your API)
- **Tools** — Helper tools (metadata / detection / etc., depending on your API)

---

## Requirements

- An n8n instance (self-hosted or compatible environment for community nodes)
- A valid **Davix API key**
- Davix H2I API **Base URL** (default: `https://pixlab.davix.dev`)

---

## Installation

### Install via n8n UI (recommended)
1. Open **n8n**
2. Go to **Settings → Community Nodes**
3. Click **Install**
4. Enter:
   ```text
   n8n-nodes-davix-h2i
Restart n8n if prompted.

Install via npm (self-hosted)
Run inside your n8n installation environment:

bash
Copy code
npm install n8n-nodes-davix-h2i
Restart n8n.

Credentials
In n8n, go to Credentials

Create new credential: Davix H2I API

Fill:

API Key

Base URL (default: https://pixlab.davix.dev)

If you run a private/self-hosted Davix instance, set Base URL to your own domain.

Usage
Add node: Davix H2I

Select an Operation (H2I / Image / PDF / Tools)

Provide input (HTML, image, PDF, or tool parameters)

Execute workflow

Inputs & Outputs
Inputs (depends on operation)
Direct text (example: HTML string)

URLs (example: image/PDF URL)

Binary input (from nodes like HTTP Request, Google Drive, S3, etc.)

Outputs
JSON response (status/details)

Binary output when the API returns a file (image/PDF/extracted files)

Example workflows (high-level)
HTML → Image (H2I)
Create your HTML in a Set node

Pass it to Davix H2I (Operation: H2I)

Save binary output (local disk / S3 / Drive)

Resize/convert image (Image)
Download image as binary (HTTP Request node)

Pass binary to Davix H2I (Operation: Image)

Output resized/converted image

Merge/Split PDF (PDF)
Provide PDF(s) as binary input

Use Davix H2I (Operation: PDF)

Output processed PDF(s)

Icon
This package can include a custom SVG icon. If the icon does not appear:

restart n8n

update/reinstall the package

Versioning & Updates
This package uses semantic versioning.

Important: npm does not allow overwriting an already published version.
To publish an update:

bump the version (1.0.1, 1.0.2, ...)

create a GitHub Release tag vX.Y.Z

Support
Website: https://h2i.davix.dev

Brand: Davix

When reporting issues, include:

n8n version

node version

operation used

request parameters (remove API keys)

workflow error logs

License
MIT

makefile
Copy code
::contentReference[oaicite:0]{index=0}
