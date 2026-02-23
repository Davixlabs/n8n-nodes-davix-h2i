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

export async function davixRequest(
	this: IExecuteFunctions,
	options: IHttpRequestOptions,
): Promise<IDataObject> {
	const creds = await this.getCredentials('davixH2IApi');

	const baseUrl = stripTrailingSlash(String(creds.baseUrl || ''));
	const apiKey = String(creds.apiKey || '');

	if (!baseUrl) throw new Error('Missing Base URL in credentials.');
	if (!apiKey) throw new Error('Missing API Key in credentials.');

	const requestOptions: IHttpRequestOptions = {
		...options,
		url: `${baseUrl}${ensureLeadingSlash(String(options.url || ''))}`,
		headers: {
			...(options.headers || {}),
			// PixLab accepts x-api-key
			'x-api-key': apiKey,
		},
	};

	try {
		return await this.helpers.request(requestOptions);
	} catch (error) {
		const err = error as {
			statusCode?: number;
			response?: { statusCode?: number; body?: unknown };
			error?: unknown;
		};

		const statusCode = err.statusCode ?? err.response?.statusCode;
		const responseBody = err.error ?? err.response?.body;
		const pixlabError =
			typeof responseBody === 'object' && responseBody !== null
				? (responseBody as IDataObject)
				: undefined;

		const pixlabCode = typeof pixlabError?.code === 'string' ? pixlabError.code : undefined;
		const pixlabMessage = typeof pixlabError?.message === 'string' ? pixlabError.message : undefined;
		const requestId = typeof pixlabError?.request_id === 'string' ? pixlabError.request_id : undefined;

		const remediation = [
			'Check that your API key is valid and active.',
			'Check that the Base URL points to your PixLab instance.',
			'Check the binary property names configured in the node input.',
			'Check that total uploaded file size is within the 50 MB limit.',
			requestId ? `Provide request_id ${requestId} when contacting support.` : undefined,
		]
			.filter(Boolean)
			.join(' ');

		throw new NodeApiError(this.getNode(), error as JsonObject, {
			message:
				pixlabCode && pixlabMessage
					? `${pixlabCode}: ${pixlabMessage}`
					: pixlabMessage,
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
	const res = await this.helpers.request({
		method: 'GET',
		url,
		encoding: null, // IMPORTANT: Buffer
		resolveWithFullResponse: true,
	});

	const body = res.body as Buffer;
	const mimeType = (res.headers?.['content-type'] as string) || undefined;

	return { data: body, fileName, mimeType };
}
