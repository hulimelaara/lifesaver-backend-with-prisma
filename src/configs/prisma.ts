// config/prisma.ts
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

prisma
    .$connect()
    .then(() => {
        console.log("Connected to the database")
    })
    .catch((error) => {
        console.error("Error connecting to the database:", error.message)
        process.exit(1)
    })

export { prisma }
