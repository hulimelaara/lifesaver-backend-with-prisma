import { HttpException } from "./index"

export class BadRequestException extends HttpException {
    constructor(
        message: string,
        statusCode: number = 400,
        error: object | undefined | null,
        data: object | undefined | null
    ) {
        super(message, statusCode, error, data)
    }
}
