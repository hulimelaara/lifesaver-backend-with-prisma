import express from "express"
import helmet from "helmet"
import compression from "compression"
import cors from "cors"
import dnsPrefetchControl from "dns-prefetch-control"
import hpp from "hpp"
import bodyParser from "body-parser"
import morgan from "morgan"

import config from "./environment"
import limiter from "./rateLimiterConfig"

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

// Use routes
app.use("/", routes)

const port = config.port

export { app, port }
