# PixLab PDF Request Snippets Extract

## 1) /v1/pdf — watermark request construction

- **Source file path(s):** `nodes/DavixH2I/DavixH2I.node.ts`
- **Line ranges (approx):** 1209-1267, 1618-1718, 844-968, 125-149

```ts
				// PDF actions
				{
					displayName: 'Operation',
					name: 'operation',
					type: 'options',
					default: 'merge',
					displayOptions: { show: { resource: ['pdf'] } },
					description: 'Select the PixLab PDF action to run (sent as action=<value>).',
					options: [
						{ name: 'To Images', value: 'to-images' },
						{ name: 'Merge', value: 'merge' },
						{ name: 'Split', value: 'split' },
						{ name: 'Compress', value: 'compress' },
						{ name: 'Extract Images', value: 'extract-images' },
						{ name: 'Watermark', value: 'watermark' },
						{ name: 'Rotate', value: 'rotate' },
						{ name: 'Metadata', value: 'metadata' },
						{ name: 'Reorder', value: 'reorder' },
						{ name: 'Delete Pages', value: 'delete-pages' },
						{ name: 'Extract Pages', value: 'extract' },
						{ name: 'Flatten', value: 'flatten' },
						{ name: 'Encrypt', value: 'encrypt' },
						{ name: 'Decrypt', value: 'decrypt' },
					],
				},
```

```ts
				// -------------------------
				// PDF
				// -------------------------
				{
					displayName: 'Input Binary Properties',
					name: 'pdfBinaryProps',
					type: 'string',
					default: 'data',
					placeholder: 'data OR pdf1,pdf2',
					description:
						'Comma-separated binary property names (each will be sent as a `files` PDF). For merge, provide multiple.',
					displayOptions: { show: { resource: ['pdf'] } },
				},
				{
					displayName: 'Pages',
					name: 'pages',
					type: 'string',
					default: 'all',
					placeholder: 'all OR 1-3,5,7',
					description: 'Page selection, e.g. all or 1-3,5.',
					displayOptions: {
						show: { resource: ['pdf'], operation: ['to-images', 'extract-images', 'watermark', 'rotate', 'delete-pages', 'extract'] },
					},
				},
				{ displayName: 'Watermark Text', name: 'watermarkText', type: 'string', default: '', description: 'Optional text watermark to apply.', displayOptions: { show: { resource: ['pdf'], operation: ['watermark'] } } },
				{ displayName: 'Watermark Opacity', name: 'watermarkOpacity', type: 'number', default: 0.35, description: 'Watermark opacity (0-1).', displayOptions: { show: { resource: ['pdf'], operation: ['watermark'] } } },
				{
					displayName: 'Watermark Position',
					name: 'watermarkPosition',
					type: 'options',
					default: 'center',
					options: [
						{ name: 'Center', value: 'center' },
						{ name: 'Top Left', value: 'top-left' },
						{ name: 'Top Right', value: 'top-right' },
						{ name: 'Bottom Left', value: 'bottom-left' },
						{ name: 'Bottom Right', value: 'bottom-right' },
					],
					displayOptions: { show: { resource: ['pdf'], operation: ['watermark'] } },
				},
				{ displayName: 'Watermark Margin', name: 'watermarkMargin', type: 'number', default: 8, displayOptions: { show: { resource: ['pdf'], operation: ['watermark'] } } },
				{ displayName: 'Watermark Font Size', name: 'watermarkFontSize', type: 'number', default: 24, displayOptions: { show: { resource: ['pdf'], operation: ['watermark'] } } },
				{ displayName: 'Watermark Color', name: 'watermarkColor', type: 'string', default: '#000000', displayOptions: { show: { resource: ['pdf'], operation: ['watermark'] } } },
				{ displayName: 'Watermark Scale', name: 'watermarkScale', type: 'number', default: 1, description: 'Scale factor for watermark.', displayOptions: { show: { resource: ['pdf'], operation: ['watermark'] } } },
				{
					displayName: 'Watermark Image Binary Property',
					name: 'watermarkImageBinaryProp',
					type: 'string',
					default: '',
					description: 'Binary property containing an image watermark (optional).',
					displayOptions: { show: { resource: ['pdf'], operation: ['watermark'] } },
				},
```

```ts
				for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
					const resource = this.getNodeParameter('resource', itemIndex) as Resource;
					const operation = this.getNodeParameter('operation', itemIndex) as string;

					const attachFiles = async (
						fieldName: 'images' | 'files',
						propList: string,
						formData: Record<string, any>,
					) => {
						const names = propList
							.split(',')
							.map((s) => s.trim())
							.filter(Boolean);

						if (names.length === 0) throw new Error('No binary property names provided.');

						for (const name of names) {
							const buffer = await this.helpers.getBinaryDataBuffer(itemIndex, name);
							const meta = items[itemIndex].binary?.[name];
							const fileName = meta?.fileName ?? `${fieldName}-${name}`;
							const mimeType = meta?.mimeType;

							formData[fieldName] = formData[fieldName] || [];
							formData[fieldName].push({
								value: buffer,
								options: {
									filename: fileName,
									contentType: mimeType,
								},
							});
						}
					};

					const attachSingleFile = async (fieldName: string, propName: string, formData: Record<string, any>) => {
						if (!propName) return;
						const buffer = await this.helpers.getBinaryDataBuffer(itemIndex, propName);
						const meta = items[itemIndex].binary?.[propName];
						const fileName = meta?.fileName ?? fieldName;
						const mimeType = meta?.mimeType;
						formData[fieldName] = {
							value: buffer,
							options: { filename: fileName, contentType: mimeType },
						};
					};
```

```ts
				// ---- PDF (multipart)
				if (resource === 'pdf') {
					const action = operation as PdfAction;

					const pdfBinaryProps = this.getNodeParameter('pdfBinaryProps', itemIndex) as string;
					const formData: Record<string, any> = { action };
					await checkTotalBinarySize(pdfBinaryProps);
					await attachFiles('files', pdfBinaryProps, formData);

					const setNumber = (name: string, value: number) => {
						if (value !== undefined && value !== null && value !== 0) formData[name] = String(value);
					};
					const setString = (name: string, value: string) => {
						if (value) formData[name] = value;
					};

					if (action === 'watermark') {
						setString('pages', this.getNodeParameter('pages', itemIndex) as string);
						setString('watermarkText', this.getNodeParameter('watermarkText', itemIndex) as string);
						setNumber('watermarkOpacity', this.getNodeParameter('watermarkOpacity', itemIndex) as number);
						setString('watermarkPosition', this.getNodeParameter('watermarkPosition', itemIndex) as string);
						setNumber('watermarkMargin', this.getNodeParameter('watermarkMargin', itemIndex) as number);
						setNumber('watermarkFontSize', this.getNodeParameter('watermarkFontSize', itemIndex) as number);
						setString('watermarkColor', this.getNodeParameter('watermarkColor', itemIndex) as string);
						setNumber('watermarkScale', this.getNodeParameter('watermarkScale', itemIndex) as number);
						await attachSingleFile('watermarkImage', this.getNodeParameter('watermarkImageBinaryProp', itemIndex) as string, formData);
					}

					const response = await davixRequest.call(this, {
						method: 'POST',
						url: '/v1/pdf',
						formData,
						json: true,
					} as IHttpRequestOptions);
```

## 2) /v1/pdf — reorder request construction

- **Source file path(s):** `nodes/DavixH2I/DavixH2I.node.ts`
- **Line ranges (approx):** 125-149, 968, 1618-1718

```ts
				// PDF actions
				{
					displayName: 'Operation',
					name: 'operation',
					type: 'options',
					default: 'merge',
					displayOptions: { show: { resource: ['pdf'] } },
					description: 'Select the PixLab PDF action to run (sent as action=<value>).',
					options: [
						{ name: 'Reorder', value: 'reorder' },
					],
				},
```

```ts
				{ displayName: 'Order (JSON array)', name: 'order', type: 'string', default: '', description: 'JSON array describing new page order (e.g. [2,1,3]).', displayOptions: { show: { resource: ['pdf'], operation: ['reorder'] } } },
```

```ts
				// ---- PDF (multipart)
				if (resource === 'pdf') {
					const action = operation as PdfAction;

					const pdfBinaryProps = this.getNodeParameter('pdfBinaryProps', itemIndex) as string;
					const formData: Record<string, any> = { action };
					await checkTotalBinarySize(pdfBinaryProps);
					await attachFiles('files', pdfBinaryProps, formData);

					const setString = (name: string, value: string) => {
						if (value) formData[name] = value;
					};

					if (action === 'reorder') {
						setString('order', this.getNodeParameter('order', itemIndex) as string);
					}

					const response = await davixRequest.call(this, {
						method: 'POST',
						url: '/v1/pdf',
						formData,
						json: true,
					} as IHttpRequestOptions);
```

## 3) /v1/pdf — extract-images request construction

- **Source file path(s):** `nodes/DavixH2I/DavixH2I.node.ts`
- **Line ranges (approx):** 125-149, 892-930, 1618-1718

```ts
				// PDF actions
				{
					displayName: 'Operation',
					name: 'operation',
					type: 'options',
					default: 'merge',
					displayOptions: { show: { resource: ['pdf'] } },
					description: 'Select the PixLab PDF action to run (sent as action=<value>).',
					options: [
						{ name: 'Extract Images', value: 'extract-images' },
					],
				},
```

```ts
				{
					displayName: 'Pages',
					name: 'pages',
					type: 'string',
					default: 'all',
					placeholder: 'all OR 1-3,5,7',
					description: 'Page selection, e.g. all or 1-3,5.',
					displayOptions: {
						show: { resource: ['pdf'], operation: ['to-images', 'extract-images', 'watermark', 'rotate', 'delete-pages', 'extract'] },
					},
				},
				{
					displayName: 'Extract Image Format',
					name: 'extractImageFormat',
					type: 'options',
					default: 'png',
					description: 'Image format for extracted images.',
					options: [
						{ name: 'PNG', value: 'png' },
						{ name: 'JPEG', value: 'jpeg' },
						{ name: 'WebP', value: 'webp' },
					],
					displayOptions: { show: { resource: ['pdf'], operation: ['extract-images'] } },
				},
```

```ts
				// ---- PDF (multipart)
				if (resource === 'pdf') {
					const action = operation as PdfAction;

					const pdfBinaryProps = this.getNodeParameter('pdfBinaryProps', itemIndex) as string;
					const formData: Record<string, any> = { action };
					await checkTotalBinarySize(pdfBinaryProps);
					await attachFiles('files', pdfBinaryProps, formData);

					const setString = (name: string, value: string) => {
						if (value) formData[name] = value;
					};

					if (action === 'extract-images') {
						setString('pages', this.getNodeParameter('pages', itemIndex) as string);
						setString('imageFormat', this.getNodeParameter('extractImageFormat', itemIndex) as string);
					}

					const response = await davixRequest.call(this, {
						method: 'POST',
						url: '/v1/pdf',
						formData,
						json: true,
					} as IHttpRequestOptions);
```
