import { Gulpclass, Task, SequenceTask } from 'gulpclass/Decorators';

let gulp = require('gulp');
let tsc = require('gulp-typescript');
let sourceMaps = require('gulp-sourcemaps');
let tsProject = tsc.createProject('tsconfig.json', {
	typescript: require('typescript')
});
let tslint = require('gulp-tslint');

@Gulpclass()
export class BuildTasks {
	readonly sourceDir = './core';
	readonly tsFiles = this.sourceDir + '/**/*.ts';

	@Task('build:transpile')
	transpile() {
		return gulp.src(this.tsFiles)
			.pipe(sourceMaps.init())
			.pipe(tsc(tsProject), undefined, tsc.reporter.fullReporter())
			.pipe(sourceMaps.write({
				sourceRoot: this.sourceDir,
			}))
			.pipe(gulp.dest(this.sourceDir));
	}

	@Task('build:lint', ['clean'])
	lint() {
		return gulp.src([
			this.tsFiles,
		])
			.pipe(tslint({
				formatter: 'verbose',
			}))
			.pipe(tslint.report({
				emitError: true,
			}));
	}

	@SequenceTask()
	build() {
		return ['build:lint', 'build:transpile'];
	}
}
