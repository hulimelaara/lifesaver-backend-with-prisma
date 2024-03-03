import { HttpException } from "./index"

export class NotFoundException extends HttpException {
    constructor(message: string, statusCode: number = 404, error: object | undefined | null) {
        super(message, statusCode, error, {})
    }
}
