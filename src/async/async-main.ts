export interface ICourse {
    loadJson(filename: string, callback: ICallback): void;
}

export interface ICallback {
    success(data?: string): void;
    error(error: Error): void;
}

export class SuccessCallback implements ICallback {
    public error = (error: Error): void => {
        console.error('Callback Error: ' + error);
        console.log('Callback complete.');
    }

    public success = (data: string): void => {
        console.log('Callback Data: ' + data);
        console.log('Callback complete.');
    }
}

export class FailCallback implements ICallback {
    public error = (error: Error): void => {
        console.error('Callback Error: ' + error);
        console.log('Callback complete.');
    }

    public success = (data: string): void => {
        throw new Error('This is the end.');
    }
}
