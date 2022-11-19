export class GeneralError extends Error {

    public isCustomError = true;

    constructor(
        public message: string,
        public status = 400,
        public data: any = null) {
        super(message);
    }
}
