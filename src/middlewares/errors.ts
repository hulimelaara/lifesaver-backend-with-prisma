import { NextFunction, Request, Response } from "express"
import { HttpException } from "../exceptions"

export const errorMiddleware = (
    error: HttpException,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.status(error.statusCode).json({
        status: false,
        message: error.message,
        error: error?.error,
        data: error?.data
    })

    next()
}
