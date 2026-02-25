/* eslint-disable @n8n/community-nodes/no-restricted-imports */
const test = require('node:test');
const assert = require('node:assert/strict');

const {
	buildDavixRequestOptions,
	parseDavixErrorEnvelope,
	validateBaseUrl,
} = require('../dist/nodes/DavixH2I/GenericFunctions.js');

test('validateBaseUrl accepts absolute https URLs', () => {
	assert.equal(validateBaseUrl('https://api.example.com'), 'https://api.example.com');
});

test('validateBaseUrl rejects http URLs', () => {
	assert.throws(() => validateBaseUrl('http://api.example.com'), /Base URL must use HTTPS\./);
});

test('validateBaseUrl rejects embedded credentials', () => {
	assert.throws(
		() => validateBaseUrl('https://user:pass@api.example.com'),
		/Base URL must not include embedded credentials\./,
	);
});

test('parseDavixErrorEnvelope extracts nested envelope with request_id', () => {
	const parsed = parseDavixErrorEnvelope({
		error: {
			code: 'INVALID_IMAGE',
			message: 'Image payload is invalid',
			hint: 'Use a supported MIME type',
		},
		request_id: 'req_123',
	});

	assert.deepEqual(parsed, {
		code: 'INVALID_IMAGE',
		message: 'Image payload is invalid',
		hint: 'Use a supported MIME type',
		requestId: 'req_123',
	});
});


test('parseDavixErrorEnvelope reads nested request_id fallback', () => {
	const parsed = parseDavixErrorEnvelope({
		error: { code: 'BAD_INPUT', message: 'Invalid', request_id: 'req_nested' },
	});
	assert.equal(parsed.requestId, 'req_nested');
});

test('parseDavixErrorEnvelope extracts requestId and auth is placed in headers', () => {
	const parsed = parseDavixErrorEnvelope({
		error: { code: 'BAD', message: 'Bad request' },
		requestId: 'reqCamel',
	});
	assert.equal(parsed.requestId, 'reqCamel');

	const options = buildDavixRequestOptions(
		{ method: 'POST', url: '/v1/h2i', headers: { accept: 'application/json' } },
		'https://api.example.com',
		'secret-key',
	);
	assert.equal(options.headers['x-api-key'], 'secret-key');
	assert.equal(options.headers.accept, 'application/json');
});
