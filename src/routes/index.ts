import express, { Router, Request, Response } from "express"

import userRoutes from "./user/userRoutes"

const router: Router = express.Router()

router.get("/", (req: Request, res: Response) => {
    res.send("Hi")
})

// User Routes
router.use("/user", userRoutes)

export default router
