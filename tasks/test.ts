import { Gulpclass, Task } from 'gulpclass/Decorators';
import { Server } from 'karma';

declare var __dirname: string;

@Gulpclass()
export class TestTasks {
	@Task('test', ['build'])
	test(cb: Function) {
		new Server({
			configFile: __dirname + '/karma.conf.js',
			singleRun: true,
		}, cb).start();
	}
}
