import express, { Request, Response } from "express"
import helmet from "helmet"
import morgan from "morgan"
import compress from "compression"
import cors from "cors"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import rateLimit from "express-rate-limit"

import { logger } from "./utils/logger"
import config from "./config/environment"

dotenv.config()

const log = logger("server")

const app = express()

// Use Helmet!
app.use(helmet())
app.disable("x-powered-by")
// Apply the rate limiting middleware to all requests.
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: "Limit exceeded",
    statusCode: 429
})
app.use(limiter)

// Morgan middleware to show api requests in log
morgan("common")
// Compress middleware
app.use(compress())
// Body parser middleware
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)
app.use(bodyParser.json({}))
// CORS Middleware
app.use(cors())

app.get("/", (req: Request, res: Response) => {
    res.send("Hello, From LifeSaver!")
})

app.listen(config.port, () => {
    console.log(`Server is running on Port ${config.port}`)
    log.info(`Server is running on Port ${config.port}`)
})
