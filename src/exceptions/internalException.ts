import { HttpException } from "./index"

export class InternalException extends HttpException {
    constructor(message: string, statusCode: number = 500, error: object | undefined | null) {
        super(message, statusCode, error, {})
    }
}
