export class GeneratorCourses {
    public run(name: string, course: number, callback: number): void {
        console.log('Running Generator courses');
        switch (course) {
            case 1:
                new GeneratorOne().run();
                break;
            case 2:
                new GeneratorTwo().run();
                break;
            default:
                break;
        }
    }
}

class GeneratorOne {
    public run(): void {
        const iterator = this.testGenerator();
        console.log(iterator.next().value);
        console.log(iterator.next().value);
        console.log(iterator.next().value);
        console.log(iterator.next().value);
        console.log(iterator.next().value);
        console.log(iterator.next().value);
    }

    private *testGenerator(): IterableIterator<number> {
        let count: number = 0;
        while (count < 5) {
            yield count++;
        }
    }
}

class GeneratorTwo {
    public run(): void {
        const iterator = this.testGenerator();
        console.log(iterator.next(true).value);
        console.log(iterator.next(true).value);
        console.log(iterator.next(true).value);
        console.log(iterator.next(false).value);
        console.log(iterator.next(true).value);
        console.log(iterator.next(true).value);
    }

    private *testGenerator(): IterableIterator<number> {
        let count: number = 0;
        let value: boolean = true;
        while (value) {
            console.log('Value is: ' + value);
            value = yield count++;
        }
    }
}
