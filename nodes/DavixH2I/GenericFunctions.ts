import type {
	IDataObject,
	IExecuteFunctions,
	IHttpRequestOptions,
	JsonObject,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

function stripTrailingSlash(url: string): string {
	return url.endsWith('/') ? url.slice(0, -1) : url;
}

function ensureLeadingSlash(path: string): string {
	if (!path) return '/';
	return path.startsWith('/') ? path : `/${path}`;
}

export function validateBaseUrl(baseUrl: string): string {
	if (!baseUrl) throw new Error('Missing Base URL in credentials.');

	let parsed: URL;
	try {
		parsed = new URL(baseUrl);
	} catch {
		throw new Error('Base URL must be a valid absolute URL.');
	}

	if (parsed.protocol !== 'https:') {
		throw new Error('Base URL must use HTTPS.');
	}

	if (parsed.username || parsed.password) {
		throw new Error('Base URL must not include embedded credentials.');
	}

	return stripTrailingSlash(parsed.toString());
}

export function buildDavixRequestOptions(
	options: IHttpRequestOptions,
	baseUrl: string,
	apiKey: string,
): IHttpRequestOptions {
	return {
		...options,
		url: `${baseUrl}${ensureLeadingSlash(String(options.url || ''))}`,
		headers: {
			...(options.headers || {}),
			'x-api-key': apiKey,
		},
	};
}

export function parseDavixErrorEnvelope(responseBody: unknown): {
	code?: string;
	message?: string;
	hint?: string;
	requestId?: string;
} {
	if (typeof responseBody !== 'object' || responseBody === null) {
		return {};
	}

	const body = responseBody as IDataObject;
	const nestedError =
		typeof body.error === 'object' && body.error !== null
			? (body.error as IDataObject)
			: undefined;

	const code =
		typeof nestedError?.code === 'string'
			? nestedError.code
			: typeof body.code === 'string'
				? body.code
				: undefined;
	const message =
		typeof nestedError?.message === 'string'
			? nestedError.message
			: typeof body.message === 'string'
				? body.message
				: undefined;
	const hint =
		typeof nestedError?.hint === 'string'
			? nestedError.hint
			: typeof body.hint === 'string'
				? body.hint
				: undefined;
	const requestId =
		typeof body.request_id === 'string'
			? body.request_id
			: typeof body.requestId === 'string'
				? body.requestId
				: typeof nestedError?.request_id === 'string'
					? nestedError.request_id
					: typeof nestedError?.requestId === 'string'
						? nestedError.requestId
				: undefined;

	return { code, message, hint, requestId };
}

export async function davixRequest(
	this: IExecuteFunctions,
	options: IHttpRequestOptions,
): Promise<IDataObject> {
	const creds = await this.getCredentials('davixH2IApi');

	const baseUrl = validateBaseUrl(String(creds.baseUrl || ''));
	const apiKey = String(creds.apiKey || '');

	if (!apiKey) throw new Error('Missing API Key in credentials.');

	const requestOptions = buildDavixRequestOptions(options, baseUrl, apiKey);

	try {
		return await this.helpers.httpRequest(requestOptions);
	} catch (error) {
		const err = error as {
			statusCode?: number;
			response?: { statusCode?: number; body?: unknown };
			error?: unknown;
		};

		const statusCode = err.statusCode ?? err.response?.statusCode;
		const responseBody = err.error ?? err.response?.body;
		const parsed = parseDavixErrorEnvelope(responseBody);
		const statusMessage =
			statusCode === 429
				? 'PixLab API rate limit reached (429). Retry with backoff.'
				: statusCode === 503
					? 'PixLab API is temporarily unavailable (503). Retry shortly.'
					: statusCode === 413
						? 'Upload is too large for PixLab API (413). Reduce file size.'
						: undefined;
		const envelopeMessage =
			parsed.code && parsed.message
				? `${parsed.code}: ${parsed.message}`
				: parsed.message;

		const remediation = [
			statusMessage,
			'Check that your API key is valid and active.',
			'Check that the Base URL points to your PixLab instance.',
			'Check the binary property names configured in the node input.',
			'Check that total uploaded file size is within the 50 MB limit.',
			parsed.hint ? `Hint: ${parsed.hint}` : undefined,
			parsed.requestId ? `Provide request_id ${parsed.requestId} when contacting support.` : undefined,
		]
			.filter(Boolean)
			.join(' ');

		throw new NodeApiError(this.getNode(), { message: String(envelopeMessage || statusMessage || 'Request failed') } as JsonObject, {
			message: envelopeMessage || statusMessage,
			description: remediation,
			httpCode: statusCode ? String(statusCode) : undefined,
		});
	}
}

export async function downloadToBinary(
	this: IExecuteFunctions,
	url: string,
	fileName: string,
): Promise<{ data: Buffer; fileName: string; mimeType?: string }> {
	const res = await this.helpers.httpRequest({
		method: 'GET',
		url,
		encoding: 'arraybuffer',
		returnFullResponse: true,
	});

	const body = res.body as Buffer;
	const mimeType = (res.headers?.['content-type'] as string) || undefined;

	return { data: body, fileName, mimeType };
}
