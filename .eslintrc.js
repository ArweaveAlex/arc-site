module.exports = {
	parser: '@typescript-eslint/parser',
	plugins: ['import', '@typescript-eslint', 'simple-import-sort', 'react-hooks'],
	extends: [],
	rules: {
		'import/no-duplicates': 'error',
		'simple-import-sort/imports': 'error',
		'simple-import-sort/exports': 'error',
	},
	overrides: [
		{
			files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
			rules: {
				'simple-import-sort/imports': [
					'error',
					{
						groups: [
							['^react', '^@?\\w'],
							['^(@|arcframework)(/.*|$)', '^(@|permaweb-orderbook)(/.*|$)'],
							[
								'^(@|app)(/.*|$)',
								'^(@|assets)(/.*|$)',
								'^(@|clients)(/.*|$)',
								'^(@|components)(/.*|$)',
								'^(@|filters)(/.*|$)',
								'^(@|gql)(/.*|$)',
								'^(@|helpers)(/.*|$)',
								'^(@|hooks)(/.*|$)',
								'^(@|lib)(/.*|$)',
								'^(@|navigation)(/.*|$)',
								'^(@|providers)(/.*|$)',
								'^(@|root)(/.*|$)',
								'^(@|routes)(/.*|$)',
								'^(@|search)(/.*|$)',
								'^(@|state)(/.*|$)',
								'^(@|views)(/.*|$)',
								'^(@|wallet)(/.*|$)',
								'^(@|workers)(/.*|$)',
								'^(@|wrappers)(/.*|$)',
							],
							['^\\u0000'],
							['^\\.\\.(?!/?$)', '^\\.\\./?$'],
							['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
						],
					},
				],
				'react-hooks/exhaustive-deps': 'off',
			},
		},
	],
};
