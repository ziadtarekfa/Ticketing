// import { ValidationError } from "express-validator";

import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {

    statusCode = 404;
    reason = "Route does not exist";
    constructor() {
        super("Not found route");
        // only because extending a built in type
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeErrors() {
        return [
            { message: this.reason }
        ];
    }
}