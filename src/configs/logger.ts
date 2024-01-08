import winston from "winston"

const logFormat = winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(
        ({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`
    )
)

const logger = winston.createLogger({
    level: "info",
    format: logFormat,
    transports: [new winston.transports.Console()]
})

// Function to create a child logger with additional context
const createChildLogger = (context: string): winston.Logger => {
    return logger.child({ context })
}

export { logger, createChildLogger }
