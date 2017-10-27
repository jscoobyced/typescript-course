import * as fs from 'fs';

export class PromiseCourses {
    public run(name: string, course: number, callback: number): void {
        console.log('Running Promise courses');
        switch (course) {
            case 1:
                new PromiseOne().run(callback);
                break;
            case 2:
                new PromiseTwo().run(callback);
                break;
            case 3:
                new PromiseThree().run(callback);
                break;
            case 4:
                new PromiseFour().run(name, callback);
                break;
            case 5:
                new PromiseFive().run();
                break;
            default:
                break;
        }
    }
}

class PromiseOne {
    public run(callback: number): void {
        const promise = new Promise((resolve, reject) => {
            if (callback === 1) {
                resolve('Who\'s the good boy?');
            } else {
                reject('You failed me!');
            }
        })
            .then((res) => {
                console.log(res);
            }).catch((reason) => {
                console.error(reason);
            });
    }
}

class PromiseTwo {
    public run(callback: number): void {
        const promise = new Promise((resolve, reject) => {
            if (callback === 1) {
                resolve('Who\'s the good boy?');
            } else {
                reject('You failed me!');
            }
        })
            .then((res) => {
                console.log('First \'then\': ' + res);
                return 'I\'m the good boy.';
            })
            .then((res) => {
                console.log('Second \'then\': ' + res);
                throw new Error('Uh oooh...');
            }).catch((reason) => {
                console.log('First \'catch\': ' + reason.message);
                return 'We\'ve recovered!';
            })
            .then((res) => {
                console.log('Third \'then\': ' + res);
            }).catch((reason) => {
                console.log('Never called: second \'catch\': ' + reason);
            });
    }
}

class PromiseThree {
    public run(callback: number): void {
        // Promise.resolve('Who\'s the good boy?')

        new Promise<string>(resolve => {
            resolve('Who\'s the good boy?');
        })
            .then((res) => {
                return this.delayedResolve(res);
            })
            .then((res) => {
                console.log('First \'then\': ' + res);
                return 'I\'m the good boy.';
            })
            .then((res) => {
                console.log('Second \'then\': ' + res);
                throw new Error('Uh oooh...');
            }).catch((reason) => {
                console.log('First \'catch\': ' + reason.message);
                return 'We\'ve recovered!';
            })
            .then((res) => {
                console.log('Third \'then\': ' + res);
            }).catch((reason) => {
                console.log('Never called: second \'catch\': ' + reason);
            });
    }

    private delayedResolve(data: string): Promise<string> {
        return new Promise((resolve) => {
            setTimeout(() => resolve(data + ' I\'m asking you.'), 1000);
        });
    }
}

class PromiseFour {
    public run(name: string, callback: number): void {
        this.readFileAsync('./src/assets/' + name)
            .then((result) => {
                return JSON.parse(result.toString());
            }).catch((error) => {
                console.log('Error (' + error.message + ') and done.');
            }).then((result) => {
                console.log(result);
                console.log('Done.');
            });
    }

    private readFileAsync(filename: string): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            fs.readFile(filename, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

class PromiseFive {
    private intervalId: any;

    public run(): void {
        this.repeatMsInterval(this.myFunction, 1000)
            .then(() => {
                return this.stopAfterMs(5000);
            })
            .then(() => {
                console.log('Started.');
            });
    }

    private doSomeStuffAfterMs(ms: number): Promise<NodeJS.Timer> {
        return new Promise(resolve => resolve(setTimeout(() => {
            console.log('Doing some stuff.');
        }, ms)));
    }

    private repeatMsInterval(func: Function, ms: number): Promise<void> {
        return new Promise(resolve => {
            this.intervalId = setInterval(func, ms);
            this.doSomeStuffAfterMs(ms)
                .then(() => {
                    console.log('Prepared doing stuff.');
                });
            resolve();
        });
    }

    private stopAfterMs(ms: number): Promise<NodeJS.Timer> {
        return new Promise(
            resolve => resolve(setTimeout(() => (
                clearInterval(this.intervalId),
                console.log('Stopped.')), ms))
        );
    }

    private myFunction(): Promise<void> {
        return new Promise(
            resolve => resolve(
                console.log('Doing my function.')
            ));
    }
}
