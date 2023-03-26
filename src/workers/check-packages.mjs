import * as fs from 'fs';

const packageJson = fs.readFileSync('./package.json');
const packageData = JSON.parse(packageJson);

console.log('Checking yalc packages ...');
for (let i = 0; i < Object.keys(packageData.dependencies).length; i++) {
	const dep = Object.keys(packageData.dependencies)[i];
	if (packageData.dependencies[dep].includes('file:.yalc')) {
		console.error('Local yalc link found in dependencies - aborting commit');
		process.exit(1);
	}
}
