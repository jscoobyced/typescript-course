import * as fs from 'fs';
import {  ICourse, ICallback, FailCallback, SuccessCallback } from './async-main';

export class NoAsyncCourses {
    public run(name: string, course: number, callback: number): void {
        console.log('Running NoAsync courses');
        const currentCourse: ICourse = course === 1 ? new CourseOne() : course === 2 ? new CourseTwo() : new CourseThree();
        const currentCallback: ICallback = callback === 1 ? new SuccessCallback() : new FailCallback();
        console.log('Testing ' + name + ' in ' + currentCourse.constructor.name
            + ' with ' + currentCallback.constructor.name);
        currentCourse.loadJson('./src/assets/' + name, currentCallback);
    }
}

class CourseOne implements ICourse {
    loadJson = (filename: string, callback: ICallback): void => {
        fs.readFile(filename, (error, data) => {
            if (error) {
                callback.error(error);
            } else {
                callback.success(JSON.parse(data.toString()));
            }

            console.log('Done.');
        });
    }
}

class CourseTwo implements ICourse {
    loadJson = (filename: string, callback: ICallback): void => {
        fs.readFile(filename, (error, data) => {
            if (error) {
                callback.error(error);
            } else {
                try {
                    callback.success(JSON.parse(data.toString()));
                } catch (parseError) {
                    callback.error(new Error('Invalid JSON: ' + parseError));
                }
            }

            console.log('Done.');
        });
    }
}

class CourseThree implements ICourse {
    loadJson = (filename: string, callback: ICallback): void => {
        fs.readFile(filename, (error, data) => {
            if (error) {
                callback.error(error);
            } else {
                let result: any;
                let errorResult: any;
                try {
                    result = JSON.parse(data.toString());
                } catch (parseError) {
                    errorResult = new Error('Invalid JSON: ' + parseError.message);
                }

                try {
                    if (errorResult) {
                        callback.error(errorResult);
                    } else {
                        callback.success(result);
                    }
                } catch (callbackError) {
                    console.error('Callback error: ' + callbackError.message);
                    console.error(callbackError.stack);
                }
            }

            console.log('Done.');
        });
    }
}
