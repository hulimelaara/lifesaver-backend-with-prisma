export class HttpException extends Error {
    message: string
    statusCode: number
    error: object | undefined | null
    data: object | undefined | null

    constructor(
        message: string,
        statusCode: number,
        error: object | undefined | null,
        data: object | undefined | null
    ) {
        super(message)
        this.message = message
        this.statusCode = statusCode
        this.error = error
        this.data = data
    }
}
