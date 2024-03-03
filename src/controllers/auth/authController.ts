import { Request, Response } from "express"
import { hashSync } from "bcrypt"
import { isEmpty, pick } from "lodash"
import moment from "moment"
import bcrypt from "bcrypt"

import config from "../../configs/environment"
import { prisma } from "../../configs/prisma"
import { User, UserLoginSchema, UserSchema } from "../../schemas/zodSchema/userSchema"
import { generateAccessToken, generateTokens, verifyJwtRefreshToken } from "../../utils/jwt"
import { BadRequestException } from "../../exceptions/badRequests"
import { NotFoundException } from "../../exceptions/notFoundException"

export const authRegister = async (req: Request, res: Response) => {
    const parsedUserData: User = UserSchema.parse(req.body)

    const user = await prisma.user.findFirst({
        where: {
            email: parsedUserData.email
        }
    })

    if (!isEmpty(user)) {
        new BadRequestException("User Already Existed with Email ID", 400, null, {
            ...pick(user, ["id", "email", "firstName", "lastName"])
        })
    }

    const createdUser = await prisma.user.create({
        data: {
            ...parsedUserData,
            password: hashSync(parsedUserData.password, 10)
        }
    })

    res.status(201).json({
        status: true,
        message: "User Created Successfully",
        data: {
            ...pick(createdUser, [
                "id",
                "firstName",
                "lastName",
                "email",
                "isActive",
                "isVerified",
                "createdAt"
            ])
        }
    })
}

export const authLogin = async (req: Request, res: Response) => {
    const parsedCredentials = await UserLoginSchema.parseAsync(req.body)

    const user = await prisma.user.findUnique({ where: { email: parsedCredentials.email } })

    if (!user) {
        throw new NotFoundException("User not found", 404, null)
    }

    const passwordMatch = await bcrypt.compareSync(parsedCredentials.password, user.password)

    if (!passwordMatch) {
        throw new BadRequestException("Invalid Credentials", 400, null, null)
    }

    const { accessToken, refreshToken } = generateTokens({
        id: user.id
    })

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: moment().add(config.accessTokenCookieExpiresIn, "minute").toDate()
    })

    res.json({
        status: true,
        message: "Login Successful",
        data: {
            id: user.id,
            firstName: user.firstName
        },
        refreshToken: refreshToken
    })
}

export const authRefreshToken = async (req: Request, res: Response) => {
    const { refreshToken } = req.body

    // Validate refresh token
    const { id } = await verifyJwtRefreshToken(refreshToken)
    console.log(id)
    if (!id) {
        throw new BadRequestException("Unauthorized User", 401, null, null)
    }
    const user = await prisma.user.findUnique({ where: { id } })

    if (!user) {
        throw new NotFoundException("User not found", 404, null)
    }

    const accessToken = generateAccessToken({
        id: user.id
    })

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: moment().add(config.accessTokenCookieExpiresIn, "minute").toDate()
    })

    res.json({
        status: true,
        message: "Token refreshed successfully"
    })
}
