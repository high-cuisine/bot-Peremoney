import { HttpException, HttpStatus } from "@nestjs/common";
import { error } from "console";

export class CustomException extends HttpException {
    constructor(message: string, statusCode = HttpStatus.BAD_REQUEST) {
        super({
            statusCode,
            error: 'custom error',
            message
        },
            statusCode
        )
    }
}