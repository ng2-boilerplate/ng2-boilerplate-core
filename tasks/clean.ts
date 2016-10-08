import { Gulpclass, Task, SequenceTask } from 'gulpclass/Decorators';

let gulp = require('gulp');
let clean = require('gulp-clean');

@Gulpclass()
export class CleanTasks {
	readonly sourceDir = './core';
	readonly coverageFolder = './coverage';
	readonly jsFiles = this.sourceDir + '/**/*.js';

	@Task('clean:output')
	output() {
		return gulp
			.src([this.jsFiles, this.coverageFolder], { read: false })
			.pipe(clean());
	}

	@SequenceTask()
	clean() {
		return ['clean:output'];
	}
}
