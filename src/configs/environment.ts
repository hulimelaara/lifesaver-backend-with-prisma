import dotenv from "dotenv"
import path from "path"
import { ZodError, z } from "zod"

import envSchema from "../schemas/zodSchema/envSchema"

dotenv.config({ path: path.resolve(__dirname, "../../.env") })

type Config = z.infer<typeof envSchema>

const envStore = {
    environment: process.env.NODE_ENV,
    port: process.env.PORT,
    databaseUrl: process.env.DATABASE_URL,
    jwtSecret: process.env.JWT_SECRET,
    accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    accessTokenCookieExpiresIn: process.env.ACCESS_TOKEN_COOKIE_EXPIRES_IN,
    refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
}

const getConfig = (): Config => {
    try {
        return envSchema.parse(envStore)
    } catch (error) {
        if (error instanceof ZodError) {
            throw new Error(
                `Environment Values have error:  ${JSON.stringify(
                    error.errors.map((e) => e.message)
                )}`
            )
        }
        throw error
    }
}

const getSanitizedConfig = (config: Config): Config => {
    for (const [key, value] of Object.entries(config)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in config.env`)
        }
    }

    return config
}

const sanitizedConfig = getSanitizedConfig(getConfig())

export default sanitizedConfig
