/* eslint-disable @typescript-eslint/no-explicit-any */
// services/authService.ts
import jwt, { VerifyErrors } from "jsonwebtoken"
import config from "../configs/environment"

type jwtPayload = {
    id: string
}

const generateTokens = (payload: jwtPayload): { accessToken: string; refreshToken: string } => {
    const accessToken = jwt.sign(payload, config.jwtSecret, {
        expiresIn: config.accessTokenExpiresIn
    })

    const refreshToken = jwt.sign(payload, config.jwtSecret, {
        expiresIn: config.refreshTokenExpiresIn
    })

    return { accessToken, refreshToken }
}

const generateAccessToken = (payload: jwtPayload): string => {
    const accessToken = jwt.sign(payload, config.jwtSecret, {
        expiresIn: config.accessTokenExpiresIn
    })

    return accessToken
}

const verifyJwtAccessToken = (token: string): Promise<jwtPayload> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.jwtSecret, (err: VerifyErrors | null, decoded: any) => {
            if (err) {
                reject(err)
            } else {
                if (decoded && typeof decoded === "object" && "id" in decoded) {
                    resolve(decoded as jwtPayload)
                } else {
                    reject(new Error("Invalid token payload"))
                }
            }
        })
    })
}

const verifyJwtRefreshToken = (token: string): Promise<jwtPayload> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.jwtSecret, (err: VerifyErrors | null, decoded: any) => {
            if (err) {
                reject(err)
            } else {
                if (decoded && typeof decoded === "object" && "id" in decoded) {
                    resolve(decoded as jwtPayload)
                } else {
                    reject(new Error("Invalid token payload"))
                }
            }
        })
    })
}

export { generateTokens, generateAccessToken, verifyJwtAccessToken, verifyJwtRefreshToken }
