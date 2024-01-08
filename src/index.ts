import { app, port } from "./configs/server"
import { prisma } from "./configs/prisma"
import config from "./configs/environment"
import { logger } from "./configs/logger"

const server = app.listen(port, () => {
    logger.info(`Server is running on ${config.port}`)
})

process.on("exit", () => {
    logger.info("Exiting Server...")
    prisma.$disconnect()
})

server.on("error", (error) => {
    logger.error("Express server error:", error.message)

    prisma.$disconnect()

    process.exit(1)
})
;["SIGINT", "SIGTERM"].forEach((signal) => {
    process.on(signal, () => {
        logger.info(`Received ${signal}. Shutting down gracefully...`)

        server.close(() => {
            logger.info("Express server closed")

            prisma.$disconnect()

            process.exit(0)
        })
    })
})
