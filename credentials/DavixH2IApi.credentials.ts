import type { ICredentialType, INodeProperties } from 'n8n-workflow';

export class DavixH2IApi implements ICredentialType {
	name = 'davixH2IApi';
	displayName = 'Davix H2I (PixLab) API';
	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://h2i.davix.dev',
			placeholder: 'https://h2i.davix.dev',
			description: 'Your PixLab API base URL (no trailing slash). Example: https://h2i.davix.dev',
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];
}
