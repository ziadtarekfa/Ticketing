import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
    statusCode = 400;
    constructor(public errors: ValidationError[]) {
        super("Error in request validation");
        // only because extending a built in type
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }


    serializeErrors() {
        return this.errors.map((error) => {
            return { message: error.msg, field: error.type }
        });
    }
}