import { NoAsyncCourses } from './async/no-async';
import { PromiseCourses } from './async/promise';
import { GeneratorCourses } from './async/generator';
import { AsyncCourses } from './async/async';

export class RunCourse {

    private commandArguments: string[];

    constructor(commandArguments: string[]) {
        this.commandArguments = commandArguments;
    }

    public run(): void {
        if (this.commandArguments !== undefined && this.commandArguments.length > 2) {
            this.runCommand(this.commandArguments);
        } else {
            console.log('No argument provided.');
        }
    }

    private runCommand(name: string[]): void {
        if (name[0] === 'noasync') {
            const noAsyncCourses = new NoAsyncCourses();
            try {
                noAsyncCourses.run(name[1], parseInt(name[2], 10), parseInt(name[3], 10));
            } catch (error) {
                console.error('Damnit! You crashed your app!');
            }
        } else if (name[0] === 'promise') {
            const promiseCourses = new PromiseCourses();
            try {
                promiseCourses.run(name[1], parseInt(name[2], 10), parseInt(name[3], 10));
            } catch (error) {
                console.error('Damnit! You crashed your app!');
            }
        } else if (name[0] === 'generator') {
            const generatorCourse = new GeneratorCourses();
            try {
                generatorCourse.run(name[1], parseInt(name[2], 10), parseInt(name[3], 10));
            } catch (error) {
                console.error('Damnit! You crashed your app!');
            }
        } else if (name[0] === 'async') {
            const asyncCourses = new AsyncCourses();
            try {
                asyncCourses.run(name[1], parseInt(name[2], 10), parseInt(name[3], 10));
            } catch (error) {
                console.error('Damnit! You crashed your app!');
            }
        }
    }
}

const args = process.argv.slice(2);
const course = new RunCourse(args);
course.run();
