const files = [
	'./tasks/build.ts',
	'./tasks/clean.ts',
	'./tasks/test.ts',
];

files.forEach(function (file) {
	// transpile TS code and evaluate them
	eval(require('typescript').transpile(require('fs').readFileSync(file).toString()));
});
