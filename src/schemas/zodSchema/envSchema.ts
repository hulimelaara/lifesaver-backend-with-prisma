import z from "zod"

export default z.object({
    environment: z.enum(["development", "production", "local"]).default("development"),
    port: z.string().transform((value) => {
        const parsedValue = Number(value)
        if (isNaN(parsedValue) || parsedValue <= 0) {
            throw new Error("PORT must be a positive number")
        }
        return parsedValue
    }),
    databaseUrl: z.string({
        required_error: "DATABASE URL is Mandatory"
    }),
    jwtSecret: z.string({
        required_error: "JWT Secret is required"
    }),
    accessTokenExpiresIn: z.string({
        required_error: "ACCESS TOKEN EXPIRES IN required"
    }),
    accessTokenCookieExpiresIn: z.string().transform((value) => {
        const parsedValue = Number(value)
        if (isNaN(parsedValue) || parsedValue <= 0) {
            throw new Error("Cookie Expires in must be in mminutes (number)")
        }
        return parsedValue
    }),
    refreshTokenExpiresIn: z.string({
        required_error: "REFRESH TOKEN EXPIRES IN required"
    })
})
