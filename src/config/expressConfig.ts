import express, { Request, Response } from "express"
import helmet from "helmet"
import morgan from "morgan"
import compress from "compression"
import cors from "cors"
import dotenv from "dotenv"
import bodyParser from "body-parser"

import routes from "../routes"
import rateLimitterConfig from "../utils/expressRateLimiter"

export default () => {
    dotenv.config()

    const app = express()

    // Use Helmet!
    app.use(helmet())
    app.disable("x-powered-by")

    // Apply the rate limiting middleware to all requests.
    app.use(rateLimitterConfig)

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

    // Routes are redirected to routes folder
    app.use("/api", routes)

    return app
}
