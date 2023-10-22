

import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {

    statusCode = 400;
    constructor(public message: string) {
        super(message);
        // only because extending a built in type
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    serializeErrors() {
        return [
            { message: this.message }
        ];
    }
}