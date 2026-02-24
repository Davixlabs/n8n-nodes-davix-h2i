	import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IHttpRequestOptions,
	IDataObject,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

import { davixRequest, downloadToBinary } from './GenericFunctions';

	type Resource = 'h2i' | 'image' | 'pdf' | 'tools';
	type PdfAction =
		| 'to-images'
		| 'merge'
		| 'split'
		| 'compress'
		| 'extract-images'
		| 'watermark'
		| 'rotate'
		| 'metadata'
		| 'reorder'
		| 'delete-pages'
		| 'extract'
		| 'flatten'
		| 'encrypt'
		| 'decrypt';
	type ImageAction =
		| 'format'
		| 'resize'
		| 'crop'
		| 'transform'
		| 'compress'
		| 'enhance'
		| 'padding'
		| 'frame'
		| 'background'
		| 'watermark'
		| 'pdf'
		| 'metadata'
		| 'multitask';
	type H2iAction = 'image' | 'pdf';
	type ToolsAction = 'single' | 'multitask';

function toBoolString(v: unknown): string {
	if (typeof v === 'boolean') return v ? 'true' : 'false';
	if (typeof v === 'number') return v === 1 ? 'true' : 'false';
	if (typeof v === 'string') return v;
	return 'false';
}

export class DavixH2I implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Davix H2I',
		name: 'davixH2I',
		icon: 'file:davixH2I.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["resource"] + " • " + ($parameter["operation"] || "")}}',
		description: 'Use Davix PixLab public API endpoints (H2I, Image, PDF, Tools).',
		defaults: {
			name: 'Davix H2I',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [{ name: 'davixH2IApi', required: true }],
		properties: [
				// -------------------------
				// Resource + Operation
				// -------------------------
				{
					displayName: 'Resource',
					name: 'resource',
					type: 'options',
					default: 'h2i',
					description: 'Choose which PixLab API group this node calls so only matching operations and fields are shown. Pick H2I for HTML rendering, Image for image edits, PDF for PDF tools, or Tools for analysis. e.g. PDF (Merge/Split/Compress/Convert).',
					options: [
						{ name: 'H2I (HTML → Image)', value: 'h2i' },
						{ name: 'Image (Transform / Export PDF)', value: 'image' },
						{ name: 'PDF (Merge/Split/Compress/Convert)', value: 'pdf' },
						{ name: 'Tools (Analyze Images)', value: 'tools' },
					],
				},

				// H2I actions
				{
					displayName: 'Operation',
					name: 'operation',
					type: 'options',
					default: 'image',
					displayOptions: { show: { resource: ['h2i'] } },
					description: 'Select whether H2I returns an image or a PDF from your HTML. This sets the action sent to /v1/h2i and controls which render fields appear. e.g. Render HTML to PDF.',
					options: [
						{ name: 'Render HTML to Image', value: 'image' },
						{ name: 'Render HTML to PDF', value: 'pdf' },
					],
				},

				// Image actions
				{
					displayName: 'Operation',
					name: 'operation',
					type: 'options',
					default: 'format',
					displayOptions: { show: { resource: ['image'] } },
					description: 'Select the image-processing action to send to /v1/image. Choose the action that matches the transform you need, then fill only that action’s fields. e.g. Resize.',
					options: [
						{ name: 'Format', value: 'format' },
						{ name: 'Resize', value: 'resize' },
						{ name: 'Crop', value: 'crop' },
						{ name: 'Transform', value: 'transform' },
						{ name: 'Compress', value: 'compress' },
						{ name: 'Enhance', value: 'enhance' },
						{ name: 'Padding', value: 'padding' },
						{ name: 'Frame', value: 'frame' },
						{ name: 'Background', value: 'background' },
						{ name: 'Watermark', value: 'watermark' },
						{ name: 'PDF Export', value: 'pdf' },
						{ name: 'Metadata (JSON only)', value: 'metadata' },
						{ name: 'Multitask', value: 'multitask' },
					],
				},

				// PDF actions
				{
					displayName: 'Operation',
					name: 'operation',
					type: 'options',
					default: 'merge',
					displayOptions: { show: { resource: ['pdf'] } },
					description: 'Select the PDF action to send to /v1/pdf. Choose based on your goal (merge, split, convert, watermark, and so on), then provide the required page or password fields. e.g. to-images.',
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

				// Tools actions
				{
					displayName: 'Operation',
					name: 'operation',
					type: 'options',
					default: 'single',
					displayOptions: { show: { resource: ['tools'] } },
					description: 'Select whether /v1/tools runs one analyzer or several in one request. Use Single for one tool, or Multitask to combine tools as a CSV list. e.g. Multitask.',
					options: [
						{ name: 'Single Tool', value: 'single' },
						{ name: 'Multitask', value: 'multitask' },
					],
				},

				// -------------------------
				// H2I
				// -------------------------
				{
					displayName: 'HTML',
					name: 'html',
					type: 'string',
					default: '',
					required: true,
					typeOptions: { rows: 6 },
					placeholder: '<div>Hello</div>',
					description: 'Enter the full HTML string to render with H2I. Keep content within API limits (large HTML can fail) and include complete markup needed for final output. e.g. <div style="padding:24px">Invoice #1001</div>.',
					displayOptions: { show: { resource: ['h2i'], operation: ['image', 'pdf'] } },
				},
				{
					displayName: 'CSS',
					name: 'css',
					type: 'string',
					default: '',
					typeOptions: { rows: 4 },
					placeholder: 'body { background: #fff; }',
					description: 'Enter CSS injected as a style block before rendering your HTML. Leave empty if styles are already inline or embedded. e.g. body { font-family: Arial; background: #ffffff; }.',
					displayOptions: { show: { resource: ['h2i'], operation: ['image', 'pdf'] } },
				},
				{
					displayName: 'Width',
					name: 'width',
					type: 'number',
					default: 1000,
					description: 'Set the target render width in pixels for H2I output. PixLab may clamp oversized values to allowed limits. e.g. 1000.',
					displayOptions: { show: { resource: ['h2i'], operation: ['image', 'pdf'] } },
				},
				{
					displayName: 'Height',
					name: 'height',
					type: 'number',
					default: 1500,
					description: 'Set the target render height in pixels for H2I output. PixLab may clamp oversized values or reject renders that are too large. e.g. 1500.',
					displayOptions: { show: { resource: ['h2i'], operation: ['image', 'pdf'] } },
				},
				{
					displayName: 'Format',
					name: 'format',
					type: 'options',
					default: 'png',
					description: 'Choose the image format for H2I image output. Use png for lossless output or jpeg for smaller lossy output. e.g. PNG.',
					options: [
						{ name: 'PNG', value: 'png' },
						{ name: 'JPEG', value: 'jpeg' },
					],
					displayOptions: { show: { resource: ['h2i'], operation: ['image'] } },
				},
				{
					displayName: 'PDF Format',
					name: 'pdfFormat',
					type: 'options',
					default: 'a4',
					description: 'Choose the page size used when H2I action is PDF. A4 is default and Letter maps to US Letter on the API side. e.g. A4.',
					options: [
						{ name: 'A4', value: 'a4' },
						{ name: 'Letter', value: 'letter' },
					],
					displayOptions: { show: { resource: ['h2i'], operation: ['pdf'] } },
				},
				{
					displayName: 'PDF Landscape',
					name: 'pdfLandscape',
					type: 'boolean',
					default: false,
					description: 'Whether to render PDF pages in landscape orientation instead of portrait. Leave off for standard portrait documents. e.g. enabled for wide dashboards.',
					displayOptions: { show: { resource: ['h2i'], operation: ['pdf'] } },
				},
				{
					displayName: 'Prefer CSS Page Size',
					name: 'preferCSSPageSize',
					type: 'boolean',
					default: true,
					description: 'Whether to prefer CSS @page sizing from your HTML instead of the selected PDF Format value. Turn off to force the dropdown page size. e.g. enabled when your template defines @page { size: A5; }.',
					displayOptions: { show: { resource: ['h2i'], operation: ['pdf'] } },
				},
				{
					displayName: 'Scale',
					name: 'scale',
					type: 'number',
					default: 1,
					description: 'Set the PDF render scale multiplier for HTML content. Use values near 1; higher values enlarge content and may increase render size. e.g. 1.0.',
					displayOptions: { show: { resource: ['h2i'], operation: ['pdf'] } },
				},
				{
					displayName: 'Print Mode',
					name: 'printMode',
					type: 'boolean',
					default: false,
					description: 'Whether to emulate print media CSS during PDF rendering. Enable if your template uses @media print rules. e.g. enabled for print-specific styles.',
					displayOptions: { show: { resource: ['h2i'], operation: ['pdf'] } },
				},
				{
					displayName: 'Print Background',
					name: 'printBackground',
					type: 'boolean',
					default: true,
					description: 'Whether to include background colors and images in the generated PDF. Disable for ink-saving, text-focused output. e.g. enabled for branded reports.',
					displayOptions: { show: { resource: ['h2i'], operation: ['pdf'] } },
				},
				{
					displayName: 'Download Result as Binary',
					name: 'downloadBinary',
					type: 'boolean',
					default: false,
					description: 'Whether to download the first returned signed URL and attach it as n8n binary data. Disable to keep only JSON response fields such as url and request_id. e.g. enabled to pass the file to another node.',
					displayOptions: { show: { resource: ['h2i'], operation: ['image', 'pdf'] } },
				},
				{
					displayName: 'Output Binary Property',
					name: 'outputBinaryProperty',
					type: 'string',
					default: 'data',
					placeholder: 'data',
					description: 'Set the binary property name used when the downloaded file is attached to the item. Use a short stable key referenced by downstream nodes. e.g. data.',
					displayOptions: { show: { resource: ['h2i'], operation: ['image', 'pdf'], downloadBinary: [true] } },
				},

				// -------------------------
				// Image
				// -------------------------
			{
				displayName: 'Input Binary Properties',
					name: 'imageBinaryProps',
					type: 'string',
					default: 'data',
					placeholder: 'data OR image1,image2',
					description:
						'Provide incoming image binary property names as a comma-separated list. Use the name of the incoming binary property that contains the file, usually ‘data’ unless you renamed it. e.g. data,image1.',
						displayOptions: { show: { resource: ['image'] } },
					},
				{
					displayName: 'Format',
					name: 'imageFormat',
					type: 'options',
					default: 'webp',
					description: 'Choose output format for image actions other than multitask. The value is sent as format and may affect quality/size trade-offs. e.g. webp.',
					options: [
						{ name: 'JPEG', value: 'jpeg' },
						{ name: 'PNG', value: 'png' },
						{ name: 'WebP', value: 'webp' },
						{ name: 'AVIF', value: 'avif' },
						{ name: 'GIF', value: 'gif' },
						{ name: 'SVG', value: 'svg' },
						{ name: 'PDF', value: 'pdf' },
					],
					displayOptions: { show: { resource: ['image'] }, hide: { operation: ['multitask'] } },
				},
				{ displayName: 'Width', name: 'imageWidth', type: 'number', default: 0, description: 'Set output width in pixels for resize/format actions. Use 0 to let PixLab auto-calculate from height and aspect ratio. e.g. 1200.', displayOptions: { show: { resource: ['image'], operation: ['resize', 'format'] } } },
				{ displayName: 'Height', name: 'imageHeight', type: 'number', default: 0, description: 'Set output height in pixels for resize/format actions. Use 0 to auto-calculate from width and aspect ratio. e.g. 800.', displayOptions: { show: { resource: ['image'], operation: ['resize', 'format'] } } },
				{ displayName: 'Enlarge', name: 'enlarge', type: 'boolean', default: false, description: 'Whether to allow enlarging images beyond original dimensions during resize. Keep off to avoid quality loss from upscaling. e.g. disabled for thumbnails.', displayOptions: { show: { resource: ['image'], operation: ['resize'] } } },
				{ displayName: 'Normalize Orientation', name: 'normalizeOrientation', type: 'boolean', default: false, description: 'Whether to normalize image orientation using EXIF metadata before processing. Enable for photos from phones/cameras that may appear rotated. e.g. enabled for mobile uploads.', displayOptions: { show: { resource: ['image'], operation: ['resize', 'crop', 'enhance', 'metadata'] } } },
				{ displayName: 'Crop X', name: 'cropX', type: 'number', default: 0, description: 'Set crop start X coordinate in pixels from the left edge. Provide Crop Width and Crop Height so crop fields are applied. e.g. 120.', displayOptions: { show: { resource: ['image'], operation: ['crop'] } } },
				{ displayName: 'Crop Y', name: 'cropY', type: 'number', default: 0, description: 'Set crop start Y coordinate in pixels from the top edge. Provide Crop Width and Crop Height so crop fields are applied. e.g. 80.', displayOptions: { show: { resource: ['image'], operation: ['crop'] } } },
				{ displayName: 'Crop Width', name: 'cropWidth', type: 'number', default: 0, description: 'Set the crop box width in pixels. Use together with Crop X, Crop Y, and Crop Height for deterministic cropping. e.g. 600.', displayOptions: { show: { resource: ['image'], operation: ['crop'] } } },
				{ displayName: 'Crop Height', name: 'cropHeight', type: 'number', default: 0, description: 'Set the crop box height in pixels. Use together with Crop X, Crop Y, and Crop Width for deterministic cropping. e.g. 400.', displayOptions: { show: { resource: ['image'], operation: ['crop'] } } },
				{ displayName: 'Background Color', name: 'backgroundColor', type: 'string', default: '', description: 'Set the background fill color for actions that support it, using hex or CSS-like color values. Invalid color strings can cause invalid_parameter errors. e.g. #ffffff.', displayOptions: { show: { resource: ['image'], operation: ['crop', 'compress', 'background'] } } },
				{ displayName: 'Rotate (degrees)', name: 'rotate', type: 'number', default: 0, description: 'Set rotation in degrees for transform actions. Use positive or negative values as needed by your layout. e.g. 90.', displayOptions: { show: { resource: ['image'], operation: ['transform'] } } },
				{ displayName: 'Flip Horizontal', name: 'flipH', type: 'boolean', default: false, description: 'Whether to mirror the image left-to-right during transform. Combine with rotate when needed. e.g. enabled for selfie correction.', displayOptions: { show: { resource: ['image'], operation: ['transform'] } } },
				{ displayName: 'Flip Vertical', name: 'flipV', type: 'boolean', default: false, description: 'Whether to mirror the image top-to-bottom during transform. Use only when a vertical inversion is required. e.g. enabled for camera rig output.', displayOptions: { show: { resource: ['image'], operation: ['transform'] } } },
				{ displayName: 'Color Space', name: 'colorSpace', type: 'options', default: 'srgb', description: 'Choose output color space for transform/compress actions. cmyk may be rejected depending on PixLab build configuration. e.g. srgb.', options: [{ name: 'sRGB', value: 'srgb' }, { name: 'Grayscale', value: 'grayscale' }, { name: 'CMYK', value: 'cmyk' }], displayOptions: { show: { resource: ['image'], operation: ['transform', 'compress'] } } },
				{ displayName: 'Target Size (KB)', name: 'targetSizeKB', type: 'number', default: 0, description: 'Set target file size in kilobytes for compress action guidance. Leave 0 to skip target-size tuning. e.g. 250.', displayOptions: { show: { resource: ['image'], operation: ['compress'] } } },
				{ displayName: 'Quality', name: 'quality', type: 'number', default: 82, description: 'Set encoder quality used by compression/output format paths. Higher values keep detail but produce larger files. e.g. 82.', displayOptions: { show: { resource: ['image'], operation: ['compress'] } } },
				{
					displayName: 'Keep Metadata',
					name: 'keepMetadata',
					type: 'boolean',
					default: false,
					description: 'Whether to keep metadata (such as EXIF) in compatible image outputs. Disable to strip metadata and reduce output size. e.g. disabled for privacy-sensitive files.',
					displayOptions: {
						show: {
							resource: ['image'],
							operation: ['format', 'resize', 'crop', 'transform', 'compress', 'enhance', 'padding', 'frame', 'background', 'watermark', 'pdf'],
						},
					},
				},
				{ displayName: 'Blur', name: 'blur', type: 'number', default: 0, description: 'Set blur strength for enhance action; the API clamps to valid range. Use 0 to skip blurring. e.g. 2.', displayOptions: { show: { resource: ['image'], operation: ['enhance'] } } },
				{ displayName: 'Sharpen', name: 'sharpen', type: 'number', default: 0, description: 'Set sharpen amount for enhance action; the API clamps to valid range. Use 0 to skip sharpening. e.g. 1.5.', displayOptions: { show: { resource: ['image'], operation: ['enhance'] } } },
				{ displayName: 'Grayscale', name: 'grayscale', type: 'boolean', default: false, description: 'Whether to convert output to grayscale in enhance action. Keep off to preserve color. e.g. enabled for monochrome previews.', displayOptions: { show: { resource: ['image'], operation: ['enhance'] } } },
				{ displayName: 'Sepia', name: 'sepia', type: 'boolean', default: false, description: 'Whether to apply a sepia color effect in enhance action. Use with moderate contrast/brightness for vintage look. e.g. enabled for retro style.', displayOptions: { show: { resource: ['image'], operation: ['enhance'] } } },
				{ displayName: 'Brightness', name: 'brightness', type: 'number', default: 0, description: 'Adjust image brightness for the enhance action. Leave 0 to omit this field and let the API default apply. e.g. 0.9.', displayOptions: { show: { resource: ['image'], operation: ['enhance'] } } },
				{ displayName: 'Contrast', name: 'contrast', type: 'number', default: 0, description: 'Adjust image contrast for the enhance action. Leave 0 to omit this field and let the API default apply. e.g. 1.1.', displayOptions: { show: { resource: ['image'], operation: ['enhance'] } } },
				{ displayName: 'Saturation', name: 'saturation', type: 'number', default: 0, description: 'Adjust image saturation for the enhance action. Leave 0 to omit this field and let the API default apply. e.g. 1.2.', displayOptions: { show: { resource: ['image'], operation: ['enhance'] } } },
				{ displayName: 'Pad', name: 'pad', type: 'number', default: 0, description: 'Set uniform padding (pixels) applied to all sides when padding/frame is used. Side-specific values can override this in padding mode. e.g. 24.', displayOptions: { show: { resource: ['image'], operation: ['padding', 'frame'] } } },
				{ displayName: 'Pad Top', name: 'padTop', type: 'number', default: 0, description: 'Set top padding in pixels for padding action. Use with other side fields for asymmetric spacing. e.g. 10.', displayOptions: { show: { resource: ['image'], operation: ['padding'] } } },
				{ displayName: 'Pad Right', name: 'padRight', type: 'number', default: 0, description: 'Set right padding in pixels for padding action. Use with other side fields for asymmetric spacing. e.g. 20.', displayOptions: { show: { resource: ['image'], operation: ['padding'] } } },
				{ displayName: 'Pad Bottom', name: 'padBottom', type: 'number', default: 0, description: 'Set bottom padding in pixels for padding action. Use with other side fields for asymmetric spacing. e.g. 10.', displayOptions: { show: { resource: ['image'], operation: ['padding'] } } },
				{ displayName: 'Pad Left', name: 'padLeft', type: 'number', default: 0, description: 'Set left padding in pixels for padding action. Use with other side fields for asymmetric spacing. e.g. 20.', displayOptions: { show: { resource: ['image'], operation: ['padding'] } } },
				{ displayName: 'Pad Color', name: 'padColor', type: 'string', default: '', description: 'Set pad fill color using hex/CSS-like syntax when padding or framing is applied. Leave empty to let API defaults apply where supported. e.g. #ffffff.', displayOptions: { show: { resource: ['image'], operation: ['padding', 'frame', 'background'] } } },
				{ displayName: 'Border', name: 'border', type: 'number', default: 0, description: 'Set border thickness in pixels for frame action. Use 0 to remove border. e.g. 4.', displayOptions: { show: { resource: ['image'], operation: ['frame'] } } },
				{ displayName: 'Border Color', name: 'borderColor', type: 'string', default: '', description: 'Set border color for frame action using hex/CSS-like color syntax. e.g. #000000.', displayOptions: { show: { resource: ['image'], operation: ['frame'] } } },
				{ displayName: 'Border Radius', name: 'borderRadius', type: 'number', default: 0, description: 'Set border radius in pixels for rounded corners on frame/background actions. Use 0 for square corners. e.g. 12.', displayOptions: { show: { resource: ['image'], operation: ['padding', 'background'] } } },
				{ displayName: 'Background Blur', name: 'backgroundBlur', type: 'number', default: 0, description: 'Set background blur strength for background action; API clamps large values. Use 0 to disable blur. e.g. 15.', displayOptions: { show: { resource: ['image'], operation: ['background'] } } },
				{ displayName: 'Watermark Text', name: 'watermarkText', type: 'string', default: '', description: 'Enter watermark text to overlay for image watermark action. Leave empty if you are using only an image watermark file. e.g. Confidential.', displayOptions: { show: { resource: ['image'], operation: ['watermark'] } } },
				{ displayName: 'Watermark Font Size', name: 'watermarkFontSize', type: 'number', default: 24, description: 'Set text watermark font size in pixels. Increase for high-resolution images. e.g. 24.', displayOptions: { show: { resource: ['image'], operation: ['watermark'] } } },
				{ displayName: 'Watermark Color', name: 'watermarkColor', type: 'string', default: '#000000', description: 'Set text watermark color using hex/CSS-like syntax. e.g. #000000.', displayOptions: { show: { resource: ['image'], operation: ['watermark'] } } },
				{ displayName: 'Watermark Opacity', name: 'watermarkOpacity', type: 'number', default: 0.35, description: 'Set text/image watermark opacity from 0 (transparent) to 1 (solid). Use lower values for subtle marks. e.g. 0.35.', displayOptions: { show: { resource: ['image'], operation: ['watermark'] } } },
				{
					displayName: 'Watermark Position',
					name: 'watermarkPosition',
					type: 'options',
					default: 'center',
					description: 'Choose watermark placement for PDF watermark action. Start with center or corner positions for predictable layout. e.g. top-right.',
						options: [
							{ name: 'Center', value: 'center' },
							{ name: 'Top', value: 'top' },
							{ name: 'Bottom', value: 'bottom' },
							{ name: 'Left', value: 'left' },
							{ name: 'Right', value: 'right' },
							{ name: 'Top Left', value: 'top-left' },
							{ name: 'Top Right', value: 'top-right' },
							{ name: 'Bottom Left', value: 'bottom-left' },
							{ name: 'Bottom Right', value: 'bottom-right' },
						],
						description: 'Choose watermark placement keyword supported by PixLab. Start with center or corner values for predictable results. e.g. bottom-right.',
						displayOptions: { show: { resource: ['image'], operation: ['watermark'] } },
					},
				{ displayName: 'Watermark Margin', name: 'watermarkMargin', type: 'number', default: 8, description: 'Set spacing around watermark placement in pixels. Increase to pull marks away from edges. e.g. 16.', displayOptions: { show: { resource: ['image'], operation: ['watermark'] } } },
				{ displayName: 'Watermark Scale', name: 'watermarkScale', type: 'number', default: 1, description: 'Set watermark scaling multiplier for image watermark action. Use 1 for original size and adjust cautiously for readability. e.g. 1.2.', displayOptions: { show: { resource: ['image'], operation: ['watermark'] } } },
				{
					displayName: 'Watermark Image Binary Property',
					name: 'watermarkImageBinaryProp',
					type: 'string',
					default: '',
					placeholder: 'watermarkImage',
					description: 'Use the name of the incoming binary property that contains the watermark image, usually ‘data’ unless you renamed it. Leave empty to use text-only watermark settings. e.g. data.',
					displayOptions: { show: { resource: ['image'], operation: ['watermark'] } },
				},
				{
					displayName: 'PDF Mode',
					name: 'pdfMode',
					type: 'options',
					default: 'single',
					description: 'Choose whether image-to-PDF export creates one combined PDF or separate PDFs per input image. Use Multi when you want one output file per image. e.g. single.',
					options: [
						{ name: 'Single', value: 'single' },
						{ name: 'Multi', value: 'multi' },
					],
					displayOptions: { show: { resource: ['image'], operation: ['pdf'] } },
				},
				{
					displayName: 'PDF Page Size',
					name: 'pdfPageSize',
					type: 'options',
					default: 'auto',
					description: 'Choose PDF page size for image-to-PDF export. This is sent as pdfPageSize when action is image→pdf. e.g. A4.',
					options: [
						{ name: 'Auto', value: 'auto' },
						{ name: 'A4', value: 'a4' },
						{ name: 'Letter', value: 'letter' },
					],
					displayOptions: { show: { resource: ['image'], operation: ['pdf'] } },
				},
				{
					displayName: 'PDF Orientation',
					name: 'pdfOrientation',
					type: 'options',
					default: 'portrait',
					description: 'Choose page orientation for image-to-PDF export. Use portrait for typical documents and landscape for wide visuals. e.g. portrait.',
					options: [
						{ name: 'Portrait', value: 'portrait' },
						{ name: 'Landscape', value: 'landscape' },
					],
					displayOptions: { show: { resource: ['image'], operation: ['pdf'] } },
				},
				{
					displayName: 'PDF Margin',
					name: 'pdfMargin',
					type: 'number',
					default: 24,
					description: 'Set page margin in pixels for image-to-PDF export. Increase to add whitespace around embedded images. e.g. 24.',
					displayOptions: { show: { resource: ['image', 'h2i'], operation: ['pdf'] } },
				},
				{
					displayName: 'PDF Embed Format',
					name: 'pdfEmbedFormat',
					type: 'options',
					default: 'png',
					description: 'Choose the internal image encoding used inside the generated PDF. JPEG is smaller; PNG keeps lossless quality/transparency where supported. e.g. jpeg.',
					options: [
						{ name: 'PNG', value: 'png' },
						{ name: 'JPEG', value: 'jpeg' },
					],
					displayOptions: { show: { resource: ['image'], operation: ['pdf'] } },
				},
				{
					displayName: 'PDF JPEG Quality',
					name: 'pdfJpegQuality',
					type: 'number',
					default: 85,
					description: 'Set JPEG quality (commonly 20–100) when PDF embed format is JPEG. Higher values increase quality and file size. e.g. 85.',
					displayOptions: { show: { resource: ['image'], operation: ['pdf'] } },
				},
					{ displayName: 'Include Raw EXIF', name: 'includeRawExif', type: 'boolean', default: false, description: 'Whether to include raw EXIF blocks in metadata responses when supported. Disable for smaller payloads. e.g. enabled when forensic metadata is needed.', displayOptions: { show: { resource: ['image'], operation: ['metadata'] } } },
				{
					displayName: 'Actions',
					name: 'actions',
					type: 'multiOptions',
					default: [],
					description: 'Select one or more image actions to run in a single multitask request. Fill the shared fields that correspond to the selected actions. e.g. resize + watermark.',
					displayOptions: { show: { resource: ['image'], operation: ['multitask'] } },
					options: [
						{ name: 'Format', value: 'format' },
						{ name: 'Resize', value: 'resize' },
						{ name: 'Crop', value: 'crop' },
						{ name: 'Transform', value: 'transform' },
						{ name: 'Compress', value: 'compress' },
						{ name: 'Enhance', value: 'enhance' },
						{ name: 'Frame', value: 'frame' },
						{ name: 'Background', value: 'background' },
						{ name: 'Watermark', value: 'watermark' },
					],
				},
				{
					displayName: 'Format',
					name: 'format',
					type: 'options',
					default: 'webp',
					description: 'Choose output format returned by image multitask processing. Pick a format compatible with your downstream workflow. e.g. png.',
					options: [
						{ name: 'JPEG', value: 'jpeg' },
						{ name: 'PNG', value: 'png' },
						{ name: 'WebP', value: 'webp' },
						{ name: 'AVIF', value: 'avif' },
						{ name: 'GIF', value: 'gif' },
						{ name: 'SVG', value: 'svg' },
						{ name: 'PDF', value: 'pdf' },
					],
					displayOptions: {
						show: {
							resource: ['image'],
							operation: ['multitask'],
							actions: ['format', 'resize', 'crop', 'transform', 'compress', 'enhance', 'frame', 'background', 'watermark'],
						},
					},
				},
				{
					displayName: 'Keep Metadata',
					name: 'keepMetadata',
					type: 'boolean',
					default: false,
					description: 'Whether to keep metadata across multitask image output when the chosen format supports it. Disable to strip metadata. e.g. disabled for public files.',
					displayOptions: {
						show: {
							resource: ['image'],
							operation: ['multitask'],
							actions: ['format', 'resize', 'crop', 'transform', 'compress', 'enhance', 'frame', 'background', 'watermark'],
						},
					},
				},
				{
					displayName: 'Width',
					name: 'width',
					type: 'number',
					default: 0,
					description: 'Set target width in pixels. Use 0 to leave width automatic where supported by the current action. e.g. 1200.',
					displayOptions: { show: { resource: ['image'], operation: ['multitask'], actions: ['format', 'resize'] } },
				},
				{
					displayName: 'Height',
					name: 'height',
					type: 'number',
					default: 0,
					description: 'Set target height in pixels. Use 0 to leave height automatic where supported by the current action. e.g. 800.',
					displayOptions: { show: { resource: ['image'], operation: ['multitask'], actions: ['format', 'resize'] } },
				},
				{
					displayName: 'Enlarge',
					name: 'enlarge',
					type: 'boolean',
					default: false,
					description: 'Whether to allow enlarging images beyond original dimensions during resize. Keep off to avoid quality loss from upscaling. e.g. disabled for thumbnails.',
					displayOptions: { show: { resource: ['image'], operation: ['multitask'], actions: ['resize'] } },
				},
				{
					displayName: 'Normalize Orientation',
					name: 'normalizeOrientation',
					type: 'boolean',
					default: false,
					description: 'Whether to normalize image orientation using EXIF metadata before processing. Enable for photos from phones/cameras that may appear rotated. e.g. enabled for mobile uploads.',
					displayOptions: { show: { resource: ['image'], operation: ['multitask'], actions: ['resize', 'crop', 'enhance'] } },
				},
				{
					displayName: 'Crop X',
					name: 'cropX',
					type: 'number',
					default: 0,
					description: 'Set crop X offset in pixels from the left edge for multitask crop. Provide crop width/height values as well. e.g. 50.',
					displayOptions: { show: { resource: ['image'], operation: ['multitask'], actions: ['crop'] } },
				},
				{
					displayName: 'Crop Y',
					name: 'cropY',
					type: 'number',
					default: 0,
					description: 'Set crop Y offset in pixels from the top edge for multitask crop. Provide crop width/height values as well. e.g. 40.',
					displayOptions: { show: { resource: ['image'], operation: ['multitask'], actions: ['crop'] } },
				},
				{
					displayName: 'Crop Width',
					name: 'cropWidth',
					type: 'number',
					default: 0,
					description: 'Set the crop box width in pixels. Use together with Crop X, Crop Y, and Crop Height for deterministic cropping. e.g. 600.',
					displayOptions: { show: { resource: ['image'], operation: ['multitask'], actions: ['crop'] } },
				},
				{
					displayName: 'Crop Height',
					name: 'cropHeight',
					type: 'number',
					default: 0,
					description: 'Set the crop box height in pixels. Use together with Crop X, Crop Y, and Crop Width for deterministic cropping. e.g. 400.',
					displayOptions: { show: { resource: ['image'], operation: ['multitask'], actions: ['crop'] } },
				},
				{
					displayName: 'Background Color',
					name: 'backgroundColor',
					type: 'string',
					default: '',
					description: 'Set background color used by selected multitask actions that accept it. Use hex/CSS-like values. e.g. #ffffff.',
					displayOptions: { show: { resource: ['image'], operation: ['multitask'], actions: ['crop', 'compress', 'background'] } },
				},
				{
					displayName: 'Rotate (degrees)',
					name: 'rotate',
					type: 'number',
					default: 0,
					description: 'Set rotation in degrees for transform actions. Use positive or negative values as needed by your layout. e.g. 90.',
					displayOptions: { show: { resource: ['image'], operation: ['multitask'], actions: ['transform'] } },
				},
				{
					displayName: 'Flip Horizontal',
					name: 'flipH',
					type: 'boolean',
					default: false,
					description: 'Whether to mirror the image left-to-right during transform. Combine with rotate when needed. e.g. enabled for selfie correction.',
					displayOptions: { show: { resource: ['image'], operation: ['multitask'], actions: ['transform'] } },
				},
				{
					displayName: 'Flip Vertical',
					name: 'flipV',
					type: 'boolean',
					default: false,
					description: 'Whether to mirror the image top-to-bottom during transform. Use only when a vertical inversion is required. e.g. enabled for camera rig output.',
					displayOptions: { show: { resource: ['image'], operation: ['multitask'], actions: ['transform'] } },
				},
				{
					displayName: 'Color Space',
					name: 'colorSpace',
					type: 'options',
					default: 'srgb',
					description: 'Choose output color space for multitask transform/compress steps. cmyk can be unsupported in some environments. e.g. grayscale.',
					options: [
						{ name: 'sRGB', value: 'srgb' },
						{ name: 'Grayscale', value: 'grayscale' },
						{ name: 'CMYK', value: 'cmyk' },
					],
					displayOptions: { show: { resource: ['image'], operation: ['multitask'], actions: ['transform', 'compress'] } },
				},
				{
					displayName: 'Target Size (KB)',
					name: 'targetSizeKB',
					type: 'number',
					default: 0,
					description: 'Set target file size in kilobytes for compress action guidance. Leave 0 to skip target-size tuning. e.g. 250.',
					displayOptions: { show: { resource: ['image'], operation: ['multitask'], actions: ['compress'] } },
				},
				{
					displayName: 'Quality',
					name: 'quality',
					type: 'number',
					default: 82,
					description: 'Set encoder quality used by compression/output format paths. Higher values keep detail but produce larger files. e.g. 82.',
					displayOptions: { show: { resource: ['image'], operation: ['multitask'], actions: ['compress'] } },
				},
				{
					displayName: 'Blur',
					name: 'blur',
					type: 'number',
					default: 0,
					description: 'Set blur strength for enhance action; the API clamps to valid range. Use 0 to skip blurring. e.g. 2.',
					displayOptions: { show: { resource: ['image'], operation: ['multitask'], actions: ['enhance'] } },
				},
				{
					displayName: 'Sharpen',
					name: 'sharpen',
					type: 'number',
					default: 0,
					description: 'Set sharpen amount for enhance action; the API clamps to valid range. Use 0 to skip sharpening. e.g. 1.5.',
					displayOptions: { show: { resource: ['image'], operation: ['multitask'], actions: ['enhance'] } },
				},
				{
					displayName: 'Grayscale',
					name: 'grayscale',
					type: 'boolean',
					default: false,
					description: 'Whether to convert output to grayscale in enhance action. Keep off to preserve color. e.g. enabled for monochrome previews.',
					displayOptions: { show: { resource: ['image'], operation: ['multitask'], actions: ['enhance'] } },
				},
				{
					displayName: 'Sepia',
					name: 'sepia',
					type: 'boolean',
					default: false,
					description: 'Whether to apply a sepia color effect in enhance action. Use with moderate contrast/brightness for vintage look. e.g. enabled for retro style.',
					displayOptions: { show: { resource: ['image'], operation: ['multitask'], actions: ['enhance'] } },
				},
				{
					displayName: 'Brightness',
					name: 'brightness',
					type: 'number',
					default: 0,
					description: 'Adjust image brightness for the enhance action. Leave 0 to omit this field and let the API default apply. e.g. 0.9.',
					displayOptions: { show: { resource: ['image'], operation: ['multitask'], actions: ['enhance'] } },
				},
				{
					displayName: 'Contrast',
					name: 'contrast',
					type: 'number',
					default: 0,
					description: 'Adjust image contrast for the enhance action. Leave 0 to omit this field and let the API default apply. e.g. 1.1.',
					displayOptions: { show: { resource: ['image'], operation: ['multitask'], actions: ['enhance'] } },
				},
				{
					displayName: 'Saturation',
					name: 'saturation',
					type: 'number',
					default: 0,
					description: 'Adjust image saturation for the enhance action. Leave 0 to omit this field and let the API default apply. e.g. 1.2.',
					displayOptions: { show: { resource: ['image'], operation: ['multitask'], actions: ['enhance'] } },
				},
				{
					displayName: 'Pad',
					name: 'pad',
					type: 'number',
					default: 0,
					description: 'Set uniform padding (pixels) applied to all sides when padding/frame is used. Side-specific values can override this in padding mode. e.g. 24.',
					displayOptions: { show: { resource: ['image'], operation: ['multitask'], actions: ['frame'] } },
				},
				{
					displayName: 'Pad Color',
					name: 'padColor',
					type: 'string',
					default: '',
					description: 'Set pad fill color using hex/CSS-like syntax when padding or framing is applied. Leave empty to let API defaults apply where supported. e.g. #ffffff.',
					displayOptions: { show: { resource: ['image'], operation: ['multitask'], actions: ['frame', 'background'] } },
				},
				{
					displayName: 'Border',
					name: 'border',
					type: 'number',
					default: 0,
					description: 'Set border thickness in pixels for frame action. Use 0 to remove border. e.g. 4.',
					displayOptions: { show: { resource: ['image'], operation: ['multitask'], actions: ['frame'] } },
				},
				{
					displayName: 'Border Color',
					name: 'borderColor',
					type: 'string',
					default: '',
					description: 'Set border color for frame action using hex/CSS-like color syntax. e.g. #000000.',
					displayOptions: { show: { resource: ['image'], operation: ['multitask'], actions: ['frame'] } },
				},
				{
					displayName: 'Border Radius',
					name: 'borderRadius',
					type: 'number',
					default: 0,
					description: 'Set border radius in pixels for rounded corners on frame/background actions. Use 0 for square corners. e.g. 12.',
					displayOptions: { show: { resource: ['image'], operation: ['multitask'], actions: ['frame', 'background'] } },
				},
				{
					displayName: 'Background Blur',
					name: 'backgroundBlur',
					type: 'number',
					default: 0,
					description: 'Set background blur strength for background action; API clamps large values. Use 0 to disable blur. e.g. 15.',
					displayOptions: { show: { resource: ['image'], operation: ['multitask'], actions: ['background'] } },
				},
				{
					displayName: 'Watermark Text',
					name: 'watermarkText',
					type: 'string',
					default: '',
					description: 'Enter watermark text to overlay for image watermark action. Leave empty if you are using only an image watermark file. e.g. Confidential.',
					displayOptions: { show: { resource: ['image'], operation: ['multitask'], actions: ['watermark'] } },
				},
				{
					displayName: 'Watermark Font Size',
					name: 'watermarkFontSize',
					type: 'number',
					default: 24,
					description: 'Set text watermark font size in pixels. Increase for high-resolution images. e.g. 24.',
					displayOptions: { show: { resource: ['image'], operation: ['multitask'], actions: ['watermark'] } },
				},
				{
					displayName: 'Watermark Color',
					name: 'watermarkColor',
					type: 'string',
					default: '#000000',
					description: 'Set text watermark color using hex/CSS-like syntax. e.g. #000000.',
					displayOptions: { show: { resource: ['image'], operation: ['multitask'], actions: ['watermark'] } },
				},
				{
					displayName: 'Watermark Opacity',
					name: 'watermarkOpacity',
					type: 'number',
					default: 0.35,
					description: 'Set text/image watermark opacity from 0 (transparent) to 1 (solid). Use lower values for subtle marks. e.g. 0.35.',
					displayOptions: { show: { resource: ['image'], operation: ['multitask'], actions: ['watermark'] } },
				},
				{
					displayName: 'Watermark Position',
					name: 'watermarkPosition',
					type: 'options',
					default: 'center',
					description: 'Choose watermark placement for PDF watermark action. Start with center or corner positions for predictable layout. e.g. top-right.',
					options: [
						{ name: 'Center', value: 'center' },
						{ name: 'Top', value: 'top' },
						{ name: 'Bottom', value: 'bottom' },
						{ name: 'Left', value: 'left' },
						{ name: 'Right', value: 'right' },
						{ name: 'Top Left', value: 'top-left' },
						{ name: 'Top Right', value: 'top-right' },
						{ name: 'Bottom Left', value: 'bottom-left' },
						{ name: 'Bottom Right', value: 'bottom-right' },
					],
					description: 'Choose watermark placement keyword supported by PixLab. Start with center or corner values for predictable results. e.g. bottom-right.',
					displayOptions: { show: { resource: ['image'], operation: ['multitask'], actions: ['watermark'] } },
				},
				{
					displayName: 'Watermark Margin',
					name: 'watermarkMargin',
					type: 'number',
					default: 8,
					description: 'Set spacing around watermark placement in pixels. Increase to pull marks away from edges. e.g. 16.',
					displayOptions: { show: { resource: ['image'], operation: ['multitask'], actions: ['watermark'] } },
				},
				{
					displayName: 'Watermark Scale',
					name: 'watermarkScale',
					type: 'number',
					default: 1,
					description: 'Set watermark scaling multiplier for image watermark action. Use 1 for original size and adjust cautiously for readability. e.g. 1.2.',
					displayOptions: { show: { resource: ['image'], operation: ['multitask'], actions: ['watermark'] } },
				},
				{
					displayName: 'Watermark Image Binary Property',
					name: 'watermarkImageBinaryProp',
					type: 'string',
					default: '',
					placeholder: 'watermarkImage',
					description: 'Use the name of the incoming binary property that contains the watermark image, usually ‘data’ unless you renamed it. Leave empty to use text-only watermark settings. e.g. data.',
					displayOptions: { show: { resource: ['image'], operation: ['multitask'], actions: ['watermark'] } },
				},

				{
					displayName: 'Download Result(s) as Binary',
					name: 'imageDownloadBinary',
					type: 'boolean',
					default: false,
					description: 'Whether to download returned result URLs into binary data for image operations that output files. For multiple outputs, binary keys are suffixed with _0, _1, and so on. e.g. enabled for direct file handoff.',
					displayOptions: {
						show: {
							resource: ['image'],
							operation: ['format', 'resize', 'crop', 'transform', 'compress', 'enhance', 'padding', 'frame', 'background', 'watermark', 'pdf', 'multitask'],
						},
					},
				},
				{
					displayName: 'Output Binary Property',
					name: 'imageOutputBinaryProperty',
					type: 'string',
					default: 'data',
					placeholder: 'data',
					description: 'Set the binary property name used for downloaded image outputs. If multiple result URLs are returned, the node appends suffixes like _0 and _1. e.g. data.',
					displayOptions: {
						show: {
							resource: ['image'],
							operation: ['format', 'resize', 'crop', 'transform', 'compress', 'enhance', 'padding', 'frame', 'background', 'watermark', 'pdf', 'multitask'],
							imageDownloadBinary: [true],
						},
					},
				},

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
						'Provide one or more incoming PDF binary property names, separated by commas. Use the property names present on each input item, usually ‘data’ unless renamed. e.g. data,attachment1.',
					displayOptions: { show: { resource: ['pdf'] } },
				},
				{
					displayName: 'Sort By Name',
					name: 'sortByName',
					type: 'boolean',
					default: false,
					description: 'Whether to sort uploaded PDFs by filename before merge. Disable to preserve the order from your binary property list. e.g. enabled for predictable alphabetical merges.',
					displayOptions: { show: { resource: ['pdf'], operation: ['merge'] } },
				},
				{
					displayName: 'Ranges',
					name: 'ranges',
					type: 'string',
					default: '',
					placeholder: '1-3,4-5',
					description: 'Enter split ranges as CSV page intervals. Use positive 1-based pages and commas between ranges. e.g. 1-3,5.',
					displayOptions: { show: { resource: ['pdf'], operation: ['split'] } },
				},
				{
					displayName: 'Prefix',
					name: 'prefix',
					type: 'string',
					default: 'split_',
					description: 'Set filename prefix for split outputs returned by the API. Keep it short for easier downstream naming. e.g. split_.',
					displayOptions: { show: { resource: ['pdf'], operation: ['split', 'extract'] } },
				},
				{
					displayName: 'Mode',
					name: 'mode',
					type: 'options',
					default: 'single',
					description: 'Choose extract output mode for /v1/pdf extract action. Single creates one PDF from selected pages; Multiple creates one file per selected page. e.g. multiple.',
					displayOptions: { show: { resource: ['pdf'], operation: ['extract'] } },
					options: [
						{ name: 'Single', value: 'single' },
						{ name: 'Multiple', value: 'multiple' },
					],
				},
				{
					displayName: 'Pages',
					name: 'pages',
					type: 'string',
					default: 'all',
					placeholder: 'all OR 1-3,5,7',
					description: 'Enter pages as all, first, or CSV ranges depending on action support. Invalid page syntax can cause invalid_parameter errors. e.g. 1,3-5.',
					displayOptions: {
						show: { resource: ['pdf'], operation: ['to-images', 'extract-images', 'watermark', 'rotate', 'delete-pages', 'extract'] },
					},
				},
				{
					displayName: 'To Format',
					name: 'toFormat',
					type: 'options',
					default: 'png',
					description: 'Choose image format for PDF to-images output. Use png for quality or jpeg/webp for smaller files. e.g. png.',
					options: [
						{ name: 'PNG', value: 'png' },
						{ name: 'JPEG', value: 'jpeg' },
						{ name: 'WebP', value: 'webp' },
					],
					displayOptions: { show: { resource: ['pdf'], operation: ['to-images'] } },
				},
				{ displayName: 'Width', name: 'pdfWidth', type: 'number', default: 0, description: 'Set optional output width in pixels for PDF page image conversion. Leave 0 to keep API/default sizing. e.g. 1200.', displayOptions: { show: { resource: ['pdf'], operation: ['to-images'] } } },
				{ displayName: 'Height', name: 'pdfHeight', type: 'number', default: 0, description: 'Set optional output height in pixels for PDF page image conversion. Leave 0 to keep API/default sizing. e.g. 1600.', displayOptions: { show: { resource: ['pdf'], operation: ['to-images'] } } },
				{ displayName: 'DPI', name: 'dpi', type: 'number', default: 150, description: 'Set render density (DPI) for PDF page rasterization. Higher DPI improves detail but increases processing time and output size. e.g. 300.', displayOptions: { show: { resource: ['pdf'], operation: ['to-images'] } } },

				{
					displayName: 'Extract Image Format',
					name: 'extractImageFormat',
					type: 'options',
					default: 'png',
					description: 'Choose output format for images extracted from PDF content. Use png for lossless extraction where needed. e.g. jpeg.',
					options: [
						{ name: 'PNG', value: 'png' },
						{ name: 'JPEG', value: 'jpeg' },
						{ name: 'WebP', value: 'webp' },
					],
					displayOptions: { show: { resource: ['pdf'], operation: ['extract-images'] } },
				},
				{ displayName: 'Watermark Text', name: 'watermarkText', type: 'string', default: '', placeholder: 'Internal use only', description: 'Enter optional text watermark for PDF watermark action. Leave empty when only image watermark is needed. e.g. Internal use only.', displayOptions: { show: { resource: ['pdf'], operation: ['watermark'] } } },
				{ displayName: 'Watermark Opacity', name: 'watermarkOpacity', type: 'number', default: 0.35, description: 'Set watermark opacity from 0 to 1 for PDF watermark action. Lower values create subtler overlays. e.g. 0.25.', displayOptions: { show: { resource: ['pdf'], operation: ['watermark'] } } },
				{
					displayName: 'Watermark Position',
					name: 'watermarkPosition',
					type: 'options',
					default: 'center',
					description: 'Choose watermark placement for PDF watermark action. Start with center or corner positions for predictable layout. e.g. top-right.',
					options: [
						{ name: 'Center', value: 'center' },
						{ name: 'Top Left', value: 'top-left' },
						{ name: 'Top Right', value: 'top-right' },
						{ name: 'Bottom Left', value: 'bottom-left' },
						{ name: 'Bottom Right', value: 'bottom-right' },
					],
					displayOptions: { show: { resource: ['pdf'], operation: ['watermark'] } },
				},
				{ displayName: 'Watermark Margin', name: 'watermarkMargin', type: 'number', default: 8, description: 'Set spacing around the PDF watermark placement in pixels. Increase to keep the mark away from page edges. e.g. 12.', displayOptions: { show: { resource: ['pdf'], operation: ['watermark'] } } },
				{
					displayName: 'Watermark X',
					name: 'watermarkX',
					type: 'number',
					default: 0,
					description: 'Set optional horizontal watermark offset in pixels. Use 0 to skip sending x and rely on position/margin. e.g. 12.',
					displayOptions: { show: { resource: ['pdf'], operation: ['watermark'] } },
				},
				{
					displayName: 'Watermark Y',
					name: 'watermarkY',
					type: 'number',
					default: 0,
					description: 'Set optional vertical watermark offset in pixels. Use 0 to skip sending y and rely on position/margin. e.g. -8.',
					displayOptions: { show: { resource: ['pdf'], operation: ['watermark'] } },
				},
				{ displayName: 'Watermark Font Size', name: 'watermarkFontSize', type: 'number', default: 24, description: 'Set text watermark font size for PDF watermark action. Increase for high-resolution or large-page documents. e.g. 24.', displayOptions: { show: { resource: ['pdf'], operation: ['watermark'] } } },
				{ displayName: 'Watermark Color', name: 'watermarkColor', type: 'string', default: '#000000', placeholder: '#000000', description: 'Set text watermark color for PDF watermark action using hex or CSS-like color values. e.g. #000000.', displayOptions: { show: { resource: ['pdf'], operation: ['watermark'] } } },
				{ displayName: 'Watermark Scale', name: 'watermarkScale', type: 'number', default: 1, description: 'Set watermark scaling multiplier for PDF/image watermark operations. Use 1 for default size. e.g. 0.8.', displayOptions: { show: { resource: ['pdf'], operation: ['watermark'] } } },
				{
					displayName: 'Watermark Image Binary Property',
					name: 'watermarkImageBinaryProp',
					type: 'string',
					default: '',
					placeholder: 'data',
					description: 'Use the name of the incoming binary property that contains the watermark image, usually ‘data’ unless you renamed it. Leave empty to use text-only watermark settings. e.g. data.',
					displayOptions: { show: { resource: ['pdf'], operation: ['watermark'] } },
				},
				{ displayName: 'Degrees', name: 'degrees', type: 'options', default: 90, description: 'Select clockwise rotation angle applied to selected PDF pages. Use together with Pages field to target specific pages. e.g. 90.', options: [{ name: '90', value: 90 }, { name: '180', value: 180 }, { name: '270', value: 270 }], displayOptions: { show: { resource: ['pdf'], operation: ['rotate'] } } },
				{ displayName: 'Title', name: 'title', type: 'string', default: '', description: 'Set PDF Title metadata value in metadata action. Leave empty to keep existing title unless clean is enabled. e.g. Q1 Report.', displayOptions: { show: { resource: ['pdf'], operation: ['metadata'] } } },
				{ displayName: 'Author', name: 'author', type: 'string', default: '', description: 'Set PDF Author metadata value in metadata action. e.g. Finance Team.', displayOptions: { show: { resource: ['pdf'], operation: ['metadata'] } } },
				{ displayName: 'Subject', name: 'subject', type: 'string', default: '', description: 'Set PDF Subject metadata value in metadata action. e.g. Quarterly performance.', displayOptions: { show: { resource: ['pdf'], operation: ['metadata'] } } },
				{ displayName: 'Keywords', name: 'keywords', type: 'string', default: '', description: 'Set PDF Keywords metadata as a comma-separated text string. e.g. finance,quarterly,kpi.', displayOptions: { show: { resource: ['pdf'], operation: ['metadata'] } } },
				{ displayName: 'Creator', name: 'creator', type: 'string', default: '', description: 'Set PDF Creator metadata value in metadata action. e.g. n8n workflow.', displayOptions: { show: { resource: ['pdf'], operation: ['metadata'] } } },
				{ displayName: 'Producer', name: 'producer', type: 'string', default: '', description: 'Set PDF Producer metadata value in metadata action. e.g. Davix PixLab API.', displayOptions: { show: { resource: ['pdf'], operation: ['metadata'] } } },
				{ displayName: 'Clean All Metadata', name: 'cleanAllMetadata', type: 'boolean', default: false, description: 'Whether to clear existing PDF metadata before applying new metadata fields. Enable when you need a clean metadata set. e.g. enabled for document sanitization.', displayOptions: { show: { resource: ['pdf'], operation: ['metadata'] } } },
				{ displayName: 'Order (CSV or JSON Array)', name: 'order', type: 'string', default: '', placeholder: '2,1,3', description: 'Enter page order as CSV or JSON array of positive page numbers. The node converts JSON arrays to CSV before sending to the API. e.g. 2,1,3.', displayOptions: { show: { resource: ['pdf'], operation: ['reorder'] } } },
				{ displayName: 'Flatten Forms', name: 'flattenForms', type: 'boolean', default: true, description: 'Whether to flatten interactive form fields into static page content. Enable when recipients should not edit form fields. e.g. enabled before archival.', displayOptions: { show: { resource: ['pdf'], operation: ['flatten'] } } },
				{ displayName: 'User Password', name: 'userPassword', type: 'string', typeOptions: { password: true }, default: '', description: 'Set required user password for PDF encryption. Use a strong value and store it securely outside workflow logs. e.g. user-pass-2026.', displayOptions: { show: { resource: ['pdf'], operation: ['encrypt'] } } },
				{ displayName: 'Owner Password', name: 'ownerPassword', type: 'string', typeOptions: { password: true }, default: '', description: 'Set optional owner password for PDF encryption; if blank, API may default to user password. Use a separate value for admin permissions. e.g. owner-pass-2026.', displayOptions: { show: { resource: ['pdf'], operation: ['encrypt'] } } },
				{ displayName: 'Password', name: 'password', type: 'string', typeOptions: { password: true }, default: '', description: 'Enter the current password required to decrypt a protected PDF. Decryption fails if this value is incorrect. e.g. current-doc-pass.', displayOptions: { show: { resource: ['pdf'], operation: ['decrypt'] } } },

				{
					displayName: 'Download Result(s) as Binary',
					name: 'pdfDownloadBinary',
					type: 'boolean',
					default: false,
					description: 'Whether to download every returned PDF result URL into binary data. When multiple files are returned, the node names them as <property>_0, <property>_1, and so on. e.g. enabled for split outputs.',
					displayOptions: { show: { resource: ['pdf'] } },
				},
				{
					displayName: 'Output Binary Property',
					name: 'pdfOutputBinaryProperty',
					type: 'string',
					default: 'data',
					placeholder: 'data',
					description: 'Set the base binary property name for downloaded PDF operation outputs. Multi-file responses append numeric suffixes to this base name. e.g. data.',
					displayOptions: { show: { resource: ['pdf'], pdfDownloadBinary: [true] } },
				},

				// -------------------------
				// Tools
				// -------------------------
				{
					displayName: 'Input Binary Properties',
					name: 'toolsBinaryProps',
					type: 'string',
					default: 'data',
					placeholder: 'data OR img1,img2',
					description: 'Provide incoming image binary property names separated by commas for Tools analysis. Use the names present on each item, usually ‘data’ unless renamed. e.g. data,image2.',
					displayOptions: { show: { resource: ['tools'] } },
				},
				{
					displayName: 'Tool',
					name: 'tool',
					type: 'options',
					default: 'metadata',
					description: 'Choose exactly one analysis tool for Tools Single mode. The node sends this value as tools to /v1/tools. e.g. metadata.',
					options: [
						{ name: 'Metadata', value: 'metadata' },
						{ name: 'Colors', value: 'colors' },
						{ name: 'Detect Format', value: 'detect-format' },
						{ name: 'Orientation', value: 'orientation' },
						{ name: 'Hash', value: 'hash' },
						{ name: 'Similarity', value: 'similarity' },
						{ name: 'Dimensions', value: 'dimensions' },
						{ name: 'Palette', value: 'palette' },
						{ name: 'Transparency', value: 'transparency' },
						{ name: 'Quality', value: 'quality' },
						{ name: 'Efficiency', value: 'efficiency' },
					],
					displayOptions: { show: { resource: ['tools'], operation: ['single'] } },
				},
				{
					displayName: 'Tools',
					name: 'tools',
					type: 'multiOptions',
					default: ['metadata'],
					description: 'Choose multiple analysis tools to run in one Tools Multitask request. The node sends a comma-separated list in the tools field. e.g. metadata,colors.',
					options: [
						{ name: 'Metadata', value: 'metadata' },
						{ name: 'Colors', value: 'colors' },
						{ name: 'Detect Format', value: 'detect-format' },
						{ name: 'Orientation', value: 'orientation' },
						{ name: 'Hash', value: 'hash' },
						{ name: 'Similarity', value: 'similarity' },
						{ name: 'Dimensions', value: 'dimensions' },
						{ name: 'Palette', value: 'palette' },
						{ name: 'Transparency', value: 'transparency' },
						{ name: 'Quality', value: 'quality' },
						{ name: 'Efficiency', value: 'efficiency' },
					],
					displayOptions: { show: { resource: ['tools'], operation: ['multitask'] } },
				},
				{
					displayName: 'Include Raw EXIF',
					name: 'metadataIncludeRawExifSingle',
					type: 'boolean',
					default: false,
					description: 'Whether to include raw EXIF blocks in metadata responses when supported. Disable for smaller payloads. e.g. enabled when forensic metadata is needed.',
					displayOptions: { show: { resource: ['tools'], operation: ['single'], tool: ['metadata'] } },
				},
				{
					displayName: 'Palette Size',
					name: 'paletteSizeSingle',
					type: 'number',
					default: 5,
					description: 'Set palette size for color analysis. PixLab supports a small bounded range, so keep values modest. e.g. 5.',
					displayOptions: { show: { resource: ['tools'], operation: ['single'], tool: ['palette'] } },
				},
				{
					displayName: 'Hash Type',
					name: 'hashTypeSingle',
					type: 'options',
					default: 'phash',
					description: 'Choose hash algorithm for hash tool output. Use phash for perceptual matching or cryptographic hashes for exact-byte identity checks. e.g. phash.',
					displayOptions: { show: { resource: ['tools'], operation: ['single'], tool: ['hash'] } },
					options: [
						{ name: 'pHash', value: 'phash' },
						{ name: 'MD5', value: 'md5' },
						{ name: 'SHA1', value: 'sha1' },
						{ name: 'SHA256', value: 'sha256' },
					],
				},
				{
					displayName: 'Similarity Mode',
					name: 'similarityModeSingle',
					type: 'string',
					default: 'pairs',
					description: 'Choose how similarity comparisons are computed. pairs compares every pair, while tofirst compares each image to the first image. e.g. pairs.',
					displayOptions: { show: { resource: ['tools'], operation: ['single'], tool: ['similarity'] } },
				},
				{
					displayName: 'Similarity Threshold',
					name: 'similarityThresholdSingle',
					type: 'number',
					default: 8,
					description: 'Set similarity threshold used by the similarity tool (API clamps to valid range). Lower values are stricter matches. e.g. 8.',
					displayOptions: { show: { resource: ['tools'], operation: ['single'], tool: ['similarity'] } },
				},
				{
					displayName: 'Quality Sample',
					name: 'qualitySampleSingle',
					type: 'number',
					default: 256,
					description: 'Set sampling resolution for quality analysis (higher can improve precision but costs more processing). e.g. 256.',
					displayOptions: { show: { resource: ['tools'], operation: ['single'], tool: ['quality'] } },
				},
				{
					displayName: 'Transparency Sample',
					name: 'transparencySampleSingle',
					type: 'number',
					default: 64,
					description: 'Set sampling resolution for transparency analysis. Use moderate values for faster processing on large images. e.g. 64.',
					displayOptions: { show: { resource: ['tools'], operation: ['single'], tool: ['transparency'] } },
				},
				{
					displayName: 'Efficiency Format',
					name: 'efficiencyFormatSingle',
					type: 'string',
					default: '',
					description: 'Choose target format used by efficiency analysis simulation. Pick the format you want to evaluate for size/quality trade-offs. e.g. webp.',
					displayOptions: { show: { resource: ['tools'], operation: ['single'], tool: ['efficiency'] } },
				},
				{
					displayName: 'Efficiency Quality',
					name: 'efficiencyQualitySingle',
					type: 'number',
					default: 0,
					description: 'Set quality value used by efficiency analysis when format supports quality controls. Leave 0 to let API defaults apply. e.g. 80.',
					displayOptions: { show: { resource: ['tools'], operation: ['single'], tool: ['efficiency'] } },
				},
				{
					displayName: 'Include Raw EXIF',
					name: 'metadataIncludeRawExifMulti',
					type: 'boolean',
					default: false,
					description: 'Whether to include raw EXIF blocks in metadata responses when supported. Disable for smaller payloads. e.g. enabled when forensic metadata is needed.',
					displayOptions: { show: { resource: ['tools'], operation: ['multitask'], tools: ['metadata'] } },
				},
				{
					displayName: 'Palette Size',
					name: 'paletteSizeMulti',
					type: 'number',
					default: 5,
					description: 'Set palette size for color analysis. PixLab supports a small bounded range, so keep values modest. e.g. 5.',
					displayOptions: { show: { resource: ['tools'], operation: ['multitask'], tools: ['palette'] } },
				},
				{
					displayName: 'Hash Type',
					name: 'hashTypeMulti',
					type: 'options',
					default: 'phash',
					description: 'Choose hash algorithm for hash tool output. Use phash for perceptual matching or cryptographic hashes for exact-byte identity checks. e.g. phash.',
					displayOptions: { show: { resource: ['tools'], operation: ['multitask'], tools: ['hash'] } },
					options: [
						{ name: 'pHash', value: 'phash' },
						{ name: 'MD5', value: 'md5' },
						{ name: 'SHA1', value: 'sha1' },
						{ name: 'SHA256', value: 'sha256' },
					],
				},
				{
					displayName: 'Similarity Mode',
					name: 'similarityModeMulti',
					type: 'string',
					default: 'pairs',
					description: 'Choose how similarity comparisons are computed. pairs compares every pair, while tofirst compares each image to the first image. e.g. pairs.',
					displayOptions: { show: { resource: ['tools'], operation: ['multitask'], tools: ['similarity'] } },
				},
				{
					displayName: 'Similarity Threshold',
					name: 'similarityThresholdMulti',
					type: 'number',
					default: 8,
					description: 'Set similarity threshold used by the similarity tool (API clamps to valid range). Lower values are stricter matches. e.g. 8.',
					displayOptions: { show: { resource: ['tools'], operation: ['multitask'], tools: ['similarity'] } },
				},
				{
					displayName: 'Quality Sample',
					name: 'qualitySampleMulti',
					type: 'number',
					default: 256,
					description: 'Set sampling resolution for quality analysis (higher can improve precision but costs more processing). e.g. 256.',
					displayOptions: { show: { resource: ['tools'], operation: ['multitask'], tools: ['quality'] } },
				},
				{
					displayName: 'Transparency Sample',
					name: 'transparencySampleMulti',
					type: 'number',
					default: 64,
					description: 'Set sampling resolution for transparency analysis. Use moderate values for faster processing on large images. e.g. 64.',
					displayOptions: { show: { resource: ['tools'], operation: ['multitask'], tools: ['transparency'] } },
				},
				{
					displayName: 'Efficiency Format',
					name: 'efficiencyFormatMulti',
					type: 'string',
					default: '',
					description: 'Choose target format used by efficiency analysis simulation. Pick the format you want to evaluate for size/quality trade-offs. e.g. webp.',
					displayOptions: { show: { resource: ['tools'], operation: ['multitask'], tools: ['efficiency'] } },
				},
				{
					displayName: 'Efficiency Quality',
					name: 'efficiencyQualityMulti',
					type: 'number',
					default: 0,
					description: 'Set quality value used by efficiency analysis when format supports quality controls. Leave 0 to let API defaults apply. e.g. 80.',
					displayOptions: { show: { resource: ['tools'], operation: ['multitask'], tools: ['efficiency'] } },
				},
			],
		};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const out: INodeExecutionData[] = [];
		const maxUploadBytes = 52_428_800;

			for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
				const resource = this.getNodeParameter('resource', itemIndex) as Resource;
				const operation = this.getNodeParameter('operation', itemIndex) as string;

				const gatherAllUrls = (response: any): string[] => {
					const urls: string[] = [];
					if (typeof response?.url === 'string') urls.push(String(response.url));
					if (Array.isArray(response?.results)) {
						for (const r of response.results) {
							if (typeof r === 'string') {
								urls.push(r);
							} else if (r?.url) {
								urls.push(String(r.url));
							}
						}
					}
					return urls;
				};

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

					const checkTotalBinarySize = async (propList: string) => {
						const names = propList
							.split(',')
							.map((s) => s.trim())
							.filter(Boolean);

						let total = 0;
						for (const name of names) {
							const meta = items[itemIndex].binary?.[name];
							const metaSize = meta?.fileSize ? Number(meta.fileSize) : 0;
							if (Number.isFinite(metaSize) && metaSize > 0) {
								total += metaSize;
							} else {
								const buffer = await this.helpers.getBinaryDataBuffer(itemIndex, name);
								total += buffer.length;
							}
							if (total > maxUploadBytes) {
								throw new NodeOperationError(
									this.getNode(),
									'Total upload size exceeds 50 MB. Please reduce file size or number of files.',
								);
							}
						}
					};

				// ---- H2I (JSON)
				if (resource === 'h2i') {
					const action = operation as H2iAction;
					const body: Record<string, any> = {
						action,
						html: this.getNodeParameter('html', itemIndex) as string,
						css: this.getNodeParameter('css', itemIndex) as string,
						width: this.getNodeParameter('width', itemIndex) as number,
						height: this.getNodeParameter('height', itemIndex) as number,
					};

					if (action === 'image') {
						body.format = this.getNodeParameter('format', itemIndex) as string;
					} else {
						body.pdfFormat = this.getNodeParameter('pdfFormat', itemIndex) as string;
						body.pdfLandscape = this.getNodeParameter('pdfLandscape', itemIndex) as boolean;
						body.pdfMargin = this.getNodeParameter('pdfMargin', itemIndex) as number;
						body.preferCSSPageSize = this.getNodeParameter('preferCSSPageSize', itemIndex) as boolean;
						body.scale = this.getNodeParameter('scale', itemIndex) as number;
						body.printMode = this.getNodeParameter('printMode', itemIndex) as boolean;
						body.printBackground = this.getNodeParameter('printBackground', itemIndex) as boolean;
					}

					const response = await davixRequest.call(this, {
						method: 'POST',
						url: '/v1/h2i',
						json: true,
						body,
					});

					const downloadBinary = this.getNodeParameter('downloadBinary', itemIndex) as boolean;
					if (downloadBinary) {
						const urls = gatherAllUrls(response);
						if (urls.length === 0) throw new Error('No URL returned to download.');
						const binName = this.getNodeParameter('outputBinaryProperty', itemIndex) as string;
						const url = urls[0];
						const dl = await downloadToBinary.call(
							this,
							url,
							action === 'pdf' ? 'h2i.pdf' : `h2i.${(body.format as string) === 'jpeg' ? 'jpg' : body.format ?? 'png'}`,
						);
						const binary = await this.helpers.prepareBinaryData(dl.data, dl.fileName, dl.mimeType);
						out.push({ json: response as any, binary: { [binName]: binary } });
					} else {
						out.push({ json: response as any });
					}
					continue;
				}

				// ---- IMAGE (multipart)
				if (resource === 'image') {
					const action = operation as ImageAction;
					const imageBinaryProps = this.getNodeParameter('imageBinaryProps', itemIndex) as string;
					const format =
						action === 'multitask' ? undefined : (this.getNodeParameter('imageFormat', itemIndex) as string);
					const formData: Record<string, any> = { action };

					await checkTotalBinarySize(imageBinaryProps);
					await attachFiles('images', imageBinaryProps, formData);

					const setNumber = (name: string, value: number) => {
						if (value !== undefined && value !== null && value !== 0) formData[name] = String(value);
					};
					const setString = (name: string, value: string) => {
						if (value !== undefined && value !== null && value !== '') formData[name] = value;
					};
					const setBool = (name: string, value: boolean) => {
						formData[name] = toBoolString(value);
					};

					const includePdfFields = () => {
						formData.pdfMode = this.getNodeParameter('pdfMode', itemIndex) as string;
						formData.pdfPageSize = this.getNodeParameter('pdfPageSize', itemIndex) as string;
						formData.pdfOrientation = this.getNodeParameter('pdfOrientation', itemIndex) as string;
						setNumber('pdfMargin', this.getNodeParameter('pdfMargin', itemIndex) as number);
						formData.pdfEmbedFormat = this.getNodeParameter('pdfEmbedFormat', itemIndex) as string;
						setNumber('pdfJpegQuality', this.getNodeParameter('pdfJpegQuality', itemIndex) as number);
					};

					const includeWatermarkFile = async (propName: string) => {
						if (propName) await attachSingleFile('watermarkImage', propName, formData);
					};

					switch (action) {
						case 'format':
							formData.format = format;
							setBool('keepMetadata', this.getNodeParameter('keepMetadata', itemIndex) as boolean);
							setNumber('width', this.getNodeParameter('imageWidth', itemIndex) as number);
							setNumber('height', this.getNodeParameter('imageHeight', itemIndex) as number);
							break;
						case 'resize':
							formData.format = format;
							setNumber('width', this.getNodeParameter('imageWidth', itemIndex) as number);
							setNumber('height', this.getNodeParameter('imageHeight', itemIndex) as number);
							setBool('enlarge', this.getNodeParameter('enlarge', itemIndex) as boolean);
							setBool('normalizeOrientation', this.getNodeParameter('normalizeOrientation', itemIndex) as boolean);
							setBool('keepMetadata', this.getNodeParameter('keepMetadata', itemIndex) as boolean);
							break;
						case 'crop':
							formData.format = format;
							setNumber('cropX', this.getNodeParameter('cropX', itemIndex) as number);
							setNumber('cropY', this.getNodeParameter('cropY', itemIndex) as number);
							setNumber('cropWidth', this.getNodeParameter('cropWidth', itemIndex) as number);
							setNumber('cropHeight', this.getNodeParameter('cropHeight', itemIndex) as number);
							setBool('normalizeOrientation', this.getNodeParameter('normalizeOrientation', itemIndex) as boolean);
							setString('backgroundColor', this.getNodeParameter('backgroundColor', itemIndex) as string);
							setBool('keepMetadata', this.getNodeParameter('keepMetadata', itemIndex) as boolean);
							break;
						case 'transform':
							formData.format = format;
							setNumber('rotate', this.getNodeParameter('rotate', itemIndex) as number);
							setBool('flipH', this.getNodeParameter('flipH', itemIndex) as boolean);
							setBool('flipV', this.getNodeParameter('flipV', itemIndex) as boolean);
							formData.colorSpace = this.getNodeParameter('colorSpace', itemIndex) as string;
							setBool('keepMetadata', this.getNodeParameter('keepMetadata', itemIndex) as boolean);
							break;
						case 'compress':
							formData.format = format;
							setNumber('targetSizeKB', this.getNodeParameter('targetSizeKB', itemIndex) as number);
							setNumber('quality', this.getNodeParameter('quality', itemIndex) as number);
							formData.colorSpace = this.getNodeParameter('colorSpace', itemIndex) as string;
							setString('backgroundColor', this.getNodeParameter('backgroundColor', itemIndex) as string);
							setBool('keepMetadata', this.getNodeParameter('keepMetadata', itemIndex) as boolean);
							break;
						case 'enhance':
							formData.format = format;
							setNumber('blur', this.getNodeParameter('blur', itemIndex) as number);
							setNumber('sharpen', this.getNodeParameter('sharpen', itemIndex) as number);
							setBool('grayscale', this.getNodeParameter('grayscale', itemIndex) as boolean);
							setBool('sepia', this.getNodeParameter('sepia', itemIndex) as boolean);
							setNumber('brightness', this.getNodeParameter('brightness', itemIndex) as number);
							setNumber('contrast', this.getNodeParameter('contrast', itemIndex) as number);
							setNumber('saturation', this.getNodeParameter('saturation', itemIndex) as number);
							setBool('normalizeOrientation', this.getNodeParameter('normalizeOrientation', itemIndex) as boolean);
							setBool('keepMetadata', this.getNodeParameter('keepMetadata', itemIndex) as boolean);
							break;
						case 'padding':
							formData.format = format;
							setNumber('pad', this.getNodeParameter('pad', itemIndex) as number);
							if (this.getNodeParameter('padTop', itemIndex) || this.getNodeParameter('padRight', itemIndex) || this.getNodeParameter('padBottom', itemIndex) || this.getNodeParameter('padLeft', itemIndex)) {
								setNumber('padTop', this.getNodeParameter('padTop', itemIndex) as number);
								setNumber('padRight', this.getNodeParameter('padRight', itemIndex) as number);
								setNumber('padBottom', this.getNodeParameter('padBottom', itemIndex) as number);
								setNumber('padLeft', this.getNodeParameter('padLeft', itemIndex) as number);
							}
							setString('padColor', this.getNodeParameter('padColor', itemIndex) as string);
							setNumber('borderRadius', this.getNodeParameter('borderRadius', itemIndex) as number);
							setBool('keepMetadata', this.getNodeParameter('keepMetadata', itemIndex) as boolean);
							break;
						case 'frame':
							formData.format = format;
							setNumber('border', this.getNodeParameter('border', itemIndex) as number);
							setString('borderColor', this.getNodeParameter('borderColor', itemIndex) as string);
							setNumber('pad', this.getNodeParameter('pad', itemIndex) as number);
							setString('padColor', this.getNodeParameter('padColor', itemIndex) as string);
							setBool('keepMetadata', this.getNodeParameter('keepMetadata', itemIndex) as boolean);
							break;
						case 'background':
							formData.format = format;
							setString('backgroundColor', this.getNodeParameter('backgroundColor', itemIndex) as string);
							setNumber('backgroundBlur', this.getNodeParameter('backgroundBlur', itemIndex) as number);
							setNumber('borderRadius', this.getNodeParameter('borderRadius', itemIndex) as number);
							setString('padColor', this.getNodeParameter('padColor', itemIndex) as string);
							setBool('keepMetadata', this.getNodeParameter('keepMetadata', itemIndex) as boolean);
							break;
						case 'watermark':
							formData.format = format;
							setString('watermarkText', this.getNodeParameter('watermarkText', itemIndex) as string);
							setNumber('watermarkFontSize', this.getNodeParameter('watermarkFontSize', itemIndex) as number);
							setString('watermarkColor', this.getNodeParameter('watermarkColor', itemIndex) as string);
							setNumber('watermarkOpacity', this.getNodeParameter('watermarkOpacity', itemIndex) as number);
							formData.watermarkPosition = this.getNodeParameter('watermarkPosition', itemIndex) as string;
							setNumber('watermarkMargin', this.getNodeParameter('watermarkMargin', itemIndex) as number);
							setNumber('watermarkScale', this.getNodeParameter('watermarkScale', itemIndex) as number);
							await includeWatermarkFile(this.getNodeParameter('watermarkImageBinaryProp', itemIndex) as string);
							setBool('keepMetadata', this.getNodeParameter('keepMetadata', itemIndex) as boolean);
							break;
						case 'pdf':
							formData.format = 'pdf';
							includePdfFields();
							setBool('keepMetadata', this.getNodeParameter('keepMetadata', itemIndex) as boolean);
							break;
						case 'metadata':
							setBool('normalizeOrientation', this.getNodeParameter('normalizeOrientation', itemIndex) as boolean);
							setBool('keepMetadata', this.getNodeParameter('keepMetadata', itemIndex) as boolean);
							setBool('includeRawExif', this.getNodeParameter('includeRawExif', itemIndex) as boolean);
							break;
						case 'multitask': {
							const selectedActions = (this.getNodeParameter('actions', itemIndex, []) as string[]) || [];
							if (selectedActions.length === 0) throw new Error('Select at least one action for multitask.');

							const setNumberOnce = (name: string, value: number) => {
								if (value !== undefined && value !== null && value !== 0 && formData[name] === undefined) formData[name] = String(value);
							};
							const setStringOnce = (name: string, value: string) => {
								if (value && formData[name] === undefined) formData[name] = value;
							};
							const setBoolOnce = (name: string, value: boolean) => {
								if (value !== undefined && value !== null && formData[name] === undefined) formData[name] = toBoolString(value);
							};

							setStringOnce('format', this.getNodeParameter('format', itemIndex) as string);
							setBoolOnce('keepMetadata', this.getNodeParameter('keepMetadata', itemIndex) as boolean);

							for (const a of selectedActions) {
								switch (a) {
									case 'format':
										{
											setNumberOnce('width', this.getNodeParameter('width', itemIndex) as number);
											setNumberOnce('height', this.getNodeParameter('height', itemIndex) as number);
										}
										break;
									case 'resize':
										{
											setNumberOnce('width', this.getNodeParameter('width', itemIndex) as number);
											setNumberOnce('height', this.getNodeParameter('height', itemIndex) as number);
											setBoolOnce('enlarge', this.getNodeParameter('enlarge', itemIndex) as boolean);
											setBoolOnce('normalizeOrientation', this.getNodeParameter('normalizeOrientation', itemIndex) as boolean);
										}
										break;
									case 'crop':
										{
											setNumberOnce('cropX', this.getNodeParameter('cropX', itemIndex) as number);
											setNumberOnce('cropY', this.getNodeParameter('cropY', itemIndex) as number);
											setNumberOnce('cropWidth', this.getNodeParameter('cropWidth', itemIndex) as number);
											setNumberOnce('cropHeight', this.getNodeParameter('cropHeight', itemIndex) as number);
											setBoolOnce('normalizeOrientation', this.getNodeParameter('normalizeOrientation', itemIndex) as boolean);
											setStringOnce('backgroundColor', this.getNodeParameter('backgroundColor', itemIndex) as string);
										}
										break;
									case 'transform':
										{
											setNumberOnce('rotate', this.getNodeParameter('rotate', itemIndex) as number);
											setBoolOnce('flipH', this.getNodeParameter('flipH', itemIndex) as boolean);
											setBoolOnce('flipV', this.getNodeParameter('flipV', itemIndex) as boolean);
											setStringOnce('colorSpace', this.getNodeParameter('colorSpace', itemIndex) as string);
										}
										break;
									case 'compress':
										{
											setNumberOnce('quality', this.getNodeParameter('quality', itemIndex) as number);
											setNumberOnce('targetSizeKB', this.getNodeParameter('targetSizeKB', itemIndex) as number);
											setStringOnce('backgroundColor', this.getNodeParameter('backgroundColor', itemIndex) as string);
											setStringOnce('colorSpace', this.getNodeParameter('colorSpace', itemIndex) as string);
										}
										break;
									case 'enhance':
										{
											setNumberOnce('blur', this.getNodeParameter('blur', itemIndex) as number);
											setNumberOnce('sharpen', this.getNodeParameter('sharpen', itemIndex) as number);
											setBoolOnce('grayscale', this.getNodeParameter('grayscale', itemIndex) as boolean);
											setBoolOnce('sepia', this.getNodeParameter('sepia', itemIndex) as boolean);
											setNumberOnce('brightness', this.getNodeParameter('brightness', itemIndex) as number);
											setNumberOnce('contrast', this.getNodeParameter('contrast', itemIndex) as number);
											setNumberOnce('saturation', this.getNodeParameter('saturation', itemIndex) as number);
											setBoolOnce('normalizeOrientation', this.getNodeParameter('normalizeOrientation', itemIndex) as boolean);
										}
										break;
									case 'frame':
										{
											setNumberOnce('pad', this.getNodeParameter('pad', itemIndex) as number);
											setStringOnce('padColor', this.getNodeParameter('padColor', itemIndex) as string);
											setNumberOnce('border', this.getNodeParameter('border', itemIndex) as number);
											setStringOnce('borderColor', this.getNodeParameter('borderColor', itemIndex) as string);
											setNumberOnce('borderRadius', this.getNodeParameter('borderRadius', itemIndex) as number);
										}
										break;
									case 'background':
										{
											setStringOnce('backgroundColor', this.getNodeParameter('backgroundColor', itemIndex) as string);
											setNumberOnce('backgroundBlur', this.getNodeParameter('backgroundBlur', itemIndex) as number);
											setNumberOnce('borderRadius', this.getNodeParameter('borderRadius', itemIndex) as number);
											setStringOnce('padColor', this.getNodeParameter('padColor', itemIndex) as string);
										}
										break;
									case 'watermark':
										{
											setStringOnce('watermarkText', this.getNodeParameter('watermarkText', itemIndex) as string);
											setNumberOnce('watermarkOpacity', this.getNodeParameter('watermarkOpacity', itemIndex) as number);
											formData.watermarkPosition = formData.watermarkPosition ?? (this.getNodeParameter('watermarkPosition', itemIndex) as string);
											setNumberOnce('watermarkMargin', this.getNodeParameter('watermarkMargin', itemIndex) as number);
											setNumberOnce('watermarkScale', this.getNodeParameter('watermarkScale', itemIndex) as number);
											setStringOnce('watermarkColor', this.getNodeParameter('watermarkColor', itemIndex) as string);
											setNumberOnce('watermarkFontSize', this.getNodeParameter('watermarkFontSize', itemIndex) as number);
											await includeWatermarkFile(this.getNodeParameter('watermarkImageBinaryProp', itemIndex) as string);
										}
										break;
								}
							}
							break;
						}
					}

					const response = await davixRequest.call(this, {
						method: 'POST',
						url: '/v1/image',
						formData,
						json: true,
					} as IHttpRequestOptions);

					const downloadBinary = ['metadata'].includes(action) ? false : (this.getNodeParameter('imageDownloadBinary', itemIndex) as boolean);
					if (downloadBinary) {
						const urls = gatherAllUrls(response);
						if (urls.length === 0) throw new Error('No URL returned to download.');
						const binName = this.getNodeParameter('imageOutputBinaryProperty', itemIndex) as string;
						const selectedFormat =
							action === 'multitask'
								? (this.getNodeParameter('format', itemIndex) as string)
								: (format as string);
						const ext = selectedFormat === 'jpeg' ? 'jpg' : selectedFormat;
						const binaries: Record<string, any> = {};
						for (let i = 0; i < urls.length; i++) {
							const name = urls.length === 1 ? binName : `${binName}_${i}`;
							const dl = await downloadToBinary.call(this, urls[i], `pixlab-image.${ext}`);
							binaries[name] = await this.helpers.prepareBinaryData(dl.data, dl.fileName, dl.mimeType);
						}
						out.push({ json: response as any, binary: binaries });
					} else {
						out.push({ json: response as any });
					}

					continue;
				}

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
					const setBool = (name: string, value: boolean) => {
						formData[name] = toBoolString(value);
					};

					if (action === 'merge') {
						setBool('sortByName', this.getNodeParameter('sortByName', itemIndex) as boolean);
					}

					if (action === 'split') {
						setString('ranges', this.getNodeParameter('ranges', itemIndex) as string);
						setString('prefix', this.getNodeParameter('prefix', itemIndex) as string);
					}

					if (action === 'to-images') {
						setString('pages', this.getNodeParameter('pages', itemIndex) as string);
						setString('toFormat', this.getNodeParameter('toFormat', itemIndex) as string);
						setNumber('width', this.getNodeParameter('pdfWidth', itemIndex) as number);
						setNumber('height', this.getNodeParameter('pdfHeight', itemIndex) as number);
						setNumber('dpi', this.getNodeParameter('dpi', itemIndex) as number);
					}

					if (action === 'extract-images') {
						setString('pages', this.getNodeParameter('pages', itemIndex) as string);
						setString('imageFormat', this.getNodeParameter('extractImageFormat', itemIndex) as string);
					}

					if (action === 'watermark') {
						const watermarkX = this.getNodeParameter('watermarkX', itemIndex) as number;
						const watermarkY = this.getNodeParameter('watermarkY', itemIndex) as number;

						setString('pages', this.getNodeParameter('pages', itemIndex) as string);
						setString('watermarkText', this.getNodeParameter('watermarkText', itemIndex) as string);
						setNumber('opacity', this.getNodeParameter('watermarkOpacity', itemIndex) as number);
						setString('position', this.getNodeParameter('watermarkPosition', itemIndex) as string);
						setNumber('margin', this.getNodeParameter('watermarkMargin', itemIndex) as number);
						setNumber('x', watermarkX);
						setNumber('y', watermarkY);
						setNumber('fontSize', this.getNodeParameter('watermarkFontSize', itemIndex) as number);
						setString('color', this.getNodeParameter('watermarkColor', itemIndex) as string);
						setNumber('watermarkScale', this.getNodeParameter('watermarkScale', itemIndex) as number);
						await attachSingleFile('watermarkImage', this.getNodeParameter('watermarkImageBinaryProp', itemIndex) as string, formData);
					}

					if (action === 'rotate') {
						setNumber('degrees', this.getNodeParameter('degrees', itemIndex) as number);
						setString('pages', this.getNodeParameter('pages', itemIndex) as string);
					}

					if (action === 'metadata') {
						setString('title', this.getNodeParameter('title', itemIndex) as string);
						setString('author', this.getNodeParameter('author', itemIndex) as string);
						setString('subject', this.getNodeParameter('subject', itemIndex) as string);
						setString('keywords', this.getNodeParameter('keywords', itemIndex) as string);
						setString('creator', this.getNodeParameter('creator', itemIndex) as string);
						setString('producer', this.getNodeParameter('producer', itemIndex) as string);
						setBool('cleanAllMetadata', this.getNodeParameter('cleanAllMetadata', itemIndex) as boolean);
					}

					if (action === 'reorder') {
						const orderRaw = (this.getNodeParameter('order', itemIndex) as string).trim();
						if (orderRaw) {
							let orderNormalized = orderRaw;
							if (orderRaw.startsWith('[') && orderRaw.endsWith(']')) {
								let parsed: unknown;
								try {
									parsed = JSON.parse(orderRaw);
								} catch {
									throw new NodeOperationError(this.getNode(), 'Invalid order JSON. Please provide a valid JSON array like [3,1,2].', {
										itemIndex,
									});
								}

								if (!Array.isArray(parsed) || parsed.length === 0 || !parsed.every((v) => Number.isInteger(v) && (v as number) >= 1)) {
									throw new NodeOperationError(this.getNode(), 'Invalid order array. Use positive integers only, for example [3,1,2].', {
										itemIndex,
									});
								}

								orderNormalized = (parsed as number[]).join(',');
							}
							setString('order', orderNormalized);
						}
					}

					if (action === 'delete-pages') {
						setString('pages', this.getNodeParameter('pages', itemIndex) as string);
					}

					if (action === 'extract') {
						setString('pages', this.getNodeParameter('pages', itemIndex) as string);
						const modeParam = this.getNodeParameter('mode', itemIndex) as string;
						const normalizedMode = modeParam === 'range' ? 'single' : modeParam;
						setString('mode', normalizedMode);
						setString('prefix', this.getNodeParameter('prefix', itemIndex) as string);
					}

					if (action === 'flatten') {
						setBool('flattenForms', this.getNodeParameter('flattenForms', itemIndex) as boolean);
					}

					if (action === 'encrypt') {
						setString('userPassword', this.getNodeParameter('userPassword', itemIndex) as string);
						setString('ownerPassword', this.getNodeParameter('ownerPassword', itemIndex) as string);
					}

					if (action === 'decrypt') {
						setString('password', this.getNodeParameter('password', itemIndex) as string);
					}

					const response = await davixRequest.call(this, {
						method: 'POST',
						url: '/v1/pdf',
						formData,
						json: true,
					} as IHttpRequestOptions);

					const downloadBinary = this.getNodeParameter('pdfDownloadBinary', itemIndex) as boolean;
					if (downloadBinary) {
						const urls = gatherAllUrls(response);
						if (urls.length === 0) throw new Error('No URL returned to download.');
						const binName = this.getNodeParameter('pdfOutputBinaryProperty', itemIndex) as string;
						const binaries: Record<string, any> = {};
						for (let i = 0; i < urls.length; i++) {
							const name = urls.length === 1 ? binName : `${binName}_${i}`;
							const dl = await downloadToBinary.call(this, urls[i], `pixlab-pdf-result.bin`);
							binaries[name] = await this.helpers.prepareBinaryData(dl.data, dl.fileName, dl.mimeType);
						}
						out.push({ json: response as any, binary: binaries });
					} else {
						out.push({ json: response as any });
					}

					continue;
				}

				// ---- TOOLS (multipart)
					if (resource === 'tools') {
					const action = operation as ToolsAction;
					const toolsBinaryProps = this.getNodeParameter('toolsBinaryProps', itemIndex) as string;
					const formData: Record<string, any> = { action };
					await checkTotalBinarySize(toolsBinaryProps);
					await attachFiles('images', toolsBinaryProps, formData);

					const setString = (name: string, value: string) => {
						if (value) formData[name] = value;
					};
					const setNumber = (name: string, value: number) => {
						if (value !== undefined && value !== null && value !== 0) formData[name] = String(value);
					};
					const setBool = (name: string, value: boolean) => {
						formData[name] = toBoolString(value);
					};

					let selectedTools: string[] = [];
					if (action === 'single') {
						const tool = this.getNodeParameter('tool', itemIndex) as string;
						if (!tool) throw new Error('Select one tool for single action.');
						selectedTools = [tool];
						formData.tools = tool;
					} else {
						const tools = this.getNodeParameter('tools', itemIndex) as string[];
						if (tools.length === 0) {
							throw new NodeOperationError(this.getNode(), 'Please select at least one tool for Multitask.', {
								itemIndex,
							});
						}
						selectedTools = tools;
						formData.tools = tools.join(',');
					}

						const hasTool = (toolName: string) => selectedTools.includes(toolName);

						if (hasTool('metadata')) {
							const includeRawExif =
								action === 'single'
									? (this.getNodeParameter('metadataIncludeRawExifSingle', itemIndex, false) as boolean)
									: (this.getNodeParameter('metadataIncludeRawExifMulti', itemIndex, false) as boolean);
							if (includeRawExif) setBool('includeRawExif', includeRawExif);
						}

						if (hasTool('palette')) {
							const val =
								action === 'single'
									? (this.getNodeParameter('paletteSizeSingle', itemIndex, 0) as number)
									: (this.getNodeParameter('paletteSizeMulti', itemIndex, 0) as number);
							if (val) setNumber('paletteSize', Number(val));
						}

						if (hasTool('hash')) {
							const val =
								action === 'single'
									? (this.getNodeParameter('hashTypeSingle', itemIndex, '') as string)
									: (this.getNodeParameter('hashTypeMulti', itemIndex, '') as string);
							if (val) setString('hashType', String(val));
						}

						if (hasTool('quality')) {
							const val =
								action === 'single'
									? (this.getNodeParameter('qualitySampleSingle', itemIndex, 0) as number)
									: (this.getNodeParameter('qualitySampleMulti', itemIndex, 0) as number);
							if (val) setNumber('qualitySample', Number(val));
						}

						if (hasTool('transparency')) {
							const val =
								action === 'single'
									? (this.getNodeParameter('transparencySampleSingle', itemIndex, 0) as number)
									: (this.getNodeParameter('transparencySampleMulti', itemIndex, 0) as number);
							if (val) setNumber('transparencySample', Number(val));
						}

						if (hasTool('similarity')) {
							const mode =
								action === 'single'
									? (this.getNodeParameter('similarityModeSingle', itemIndex, '') as string)
									: (this.getNodeParameter('similarityModeMulti', itemIndex, '') as string);
							const threshold =
								action === 'single'
									? (this.getNodeParameter('similarityThresholdSingle', itemIndex, 0) as number)
									: (this.getNodeParameter('similarityThresholdMulti', itemIndex, 0) as number);
							if (mode) setString('similarityMode', String(mode));
							if (threshold) setNumber('similarityThreshold', Number(threshold));
						}

						if (hasTool('efficiency')) {
							const formatVal =
								action === 'single'
									? (this.getNodeParameter('efficiencyFormatSingle', itemIndex, '') as string)
									: (this.getNodeParameter('efficiencyFormatMulti', itemIndex, '') as string);
							const qualityVal =
								action === 'single'
									? (this.getNodeParameter('efficiencyQualitySingle', itemIndex, 0) as number)
									: (this.getNodeParameter('efficiencyQualityMulti', itemIndex, 0) as number);
							if (formatVal) setString('efficiencyFormat', String(formatVal));
							if (qualityVal) setNumber('efficiencyQuality', Number(qualityVal));
						}

					const response = await davixRequest.call(this, {
						method: 'POST',
						url: '/v1/tools',
						formData,
						json: true,
					} as IHttpRequestOptions);

					out.push({ json: response as any });
					continue;
				}
			}

			return [out];
		}
	}
