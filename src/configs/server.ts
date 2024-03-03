import express from "express"
import helmet from "helmet"
import compression from "compression"
import cors from "cors"
import dnsPrefetchControl from "dns-prefetch-control"
import hpp from "hpp"
import bodyParser from "body-parser"
import morgan from "morgan"
import cookieParser from "cookie-parser"

import config from "./environment"
import limiter from "./rateLimiterConfig"

import { errorMiddleware } from "../middlewares/errors"

import routes from "../routes"

const app = express()

// Helmet middleware
app.use(helmet())
app.disable("x-powered-by")

// Compression middleware
app.use(compression())

// CORS middleware
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
    })
)

// Rate limiting middleware
app.use(limiter)

// Set X-DNS-Prefetch-Control: off
app.use(dnsPrefetchControl())

// Body parser middleware
app.use(bodyParser.json()) // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })) // Parse URL-encoded request bodies

// HTTP Parameter Pollution Protection middleware
app.use(hpp())

// Morgan middleware for logging
app.use(morgan("combined"))

// Initialize cookie Parser middleware
app.use(cookieParser())

// Use routes
app.use("/api", routes)

//Adding Error Middleware
app.use(errorMiddleware)

const port = config.port

export { app, port }
