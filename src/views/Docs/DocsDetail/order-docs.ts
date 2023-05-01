export const docsOrder = [
	{
		name: 'Introduction',
		path: 'introduction',
	},
	{
		name: 'Core Concepts',
		path: 'core-concepts',
	},
	{
		name: 'Creating a pool',
		path: 'creating-a-pool',
		children: [
			{
				name: 'Getting Started',
				path: 'getting-started',
			},
			{
				name: 'Pool Configuration',
				path: 'pool-configuration',
			},
			{
				name: 'Mining Artifacts',
				path: 'mining-artifacts',
			},
		],
	},
	{
		name: 'Accessing Artifacts',
		path: 'access-artifacts',
	},
	{
		name: 'Contributing',
		path: 'contributing',
	},
	{
		name: 'Interacting with Artifacts',
		path: 'interact-with-artifacts',
	},
	// {
	//   name: 'Create a pool',
	//   children: [
	//     {
	//       name: 'Guide1',
	//       files: ['Part1.md', 'Part2.md', 'Part3.md'],
	//     },
	//     {
	//       name: 'Guide2',
	//       files: ['Part1.md', 'Part2.md'],
	//     },
	//     'Guide3.md',
	//   ],
	// },
	// {
	//   name: 'Reference',
	//   files: ['API.md', 'Components.md'],
	// },
];
