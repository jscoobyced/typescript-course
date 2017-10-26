import * as fs from 'fs';

export class AsyncCourses {
    public run(name: string, course: number, isError: number): void {
        console.log('Running Async courses');
        switch (course) {
            case 1:
                new CourseOne().run();
                break;
            case 2:
                new CourseTwo().run();
                break;
            case 3:
                new CourseThree().run();
                break;
            case 4:
                new CourseFour().run(isError === 2);
                break;
            case 5:
                new CourseFive().run(isError === 2);
                break;
            default:
                break;
        }
    }
}

class DoPromise {
    public doStuffAsync(isError: boolean = false): Promise<string> {
        return new Promise(resolve => {
            if (isError) {
                throw new Error('Uh oooh...');
            }
            fs.readFile('./src/assets/valid.json',
                (error, data) => {
                    resolve(data.toString());
                });
        });
    }

}

class CourseOne {
    public run(): void {
        console.log('Starting...');
        const iterator = this.generator();
        iterator.next();
    }

    private *generator(): IterableIterator<Promise<void>> {
        yield new DoPromise().doStuffAsync().then((data) => {
            console.log(data);
            console.log('Complete.');
        });
    }
}

class CourseTwo {
    public run(): void {
        console.log('Starting...');
        new DoPromise().doStuffAsync()
            .then((data) => {
                console.log(data);
                console.log('Complete.');
            });
    }
}

class CourseThree {
    public async run(): Promise<void> {
        console.log('Starting...');
        const data = await new DoPromise().doStuffAsync();
        console.log(data);
        console.log('Complete.');
    }
}

class CourseFour {
    public run(isError: boolean): void {
        const b: boolean = false;
        console.log('Starting...');
        new DoPromise().doStuffAsync()
            .then(() => {
                if (b) {
                    console.log('Complete.');
                } else {
                    console.log('Need more stuff');
                    new DoPromise().doStuffAsync(isError)
                        .then((data) => {
                            console.log(data);
                            console.log('Really complete.');
                        })
                        .catch((error) => {
                            console.log('What happened?');
                            console.log(error);
                        });
                }
            });
    }
}

class CourseFive {
    public async run(isError: boolean): Promise<void> {
        const b: boolean = false;
        console.log('Starting...');
        await new DoPromise().doStuffAsync();
        if (b) {
            console.log('Complete.');
        } else {
            console.log('Need more stuff');
            const data = await new DoPromise().doStuffAsync(isError)
                .catch((error) => {
                    console.log('What happened?');
                    console.log(error);
                });
            console.log(data);
        }
        console.log('Really complete.');
    }
}
