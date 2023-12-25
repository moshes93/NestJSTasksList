export class DatabaseActionError extends Error  {
    exceptionObject: any;

    constructor(message: string, exceptionObject) {
        super(message);
        this.exceptionObject = exceptionObject 
    }
}