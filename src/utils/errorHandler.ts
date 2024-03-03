/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from "express"
import { ZodError } from "zod"

import { HttpException } from "../exceptions"
import { InternalException } from "../exceptions/internalException"
import { BadRequestException } from "../exceptions/badRequests"
import { Prisma } from "@prisma/client"

// eslint-disable-next-line @typescript-eslint/ban-types
export default (method: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await method(req, res, next)
        } catch (error: any) {
            console.log(error)
            let exception: HttpException
            if (error instanceof HttpException) {
                exception = error
            } else {
                if (error instanceof ZodError) {
                    exception = new BadRequestException("Unprocessable entity.", 500, error, null)
                } else {
                    exception = new InternalException("Something went wrong!", 500, error)
                }
                if (error instanceof Prisma.PrismaClientKnownRequestError) {
                    exception = new InternalException(
                        "Database request error occurred.",
                        500,
                        error
                    )
                } else if (error instanceof Prisma.PrismaClientValidationError) {
                    exception = new InternalException(
                        "Database validation error occurred.",
                        500,
                        error
                    )
                }
            }
            next(exception)
        }
    }
}
