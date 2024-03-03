import express, { Router, Request, Response } from "express"

import authRoutes from "./auth/authRoutes"
import userRoutes from "./user/userRoutes"
import adminRoutes from "./admin/index"

const router: Router = express.Router()

router.get("/", (req: Request, res: Response) => {
    res.send("Hi")
})

// Auth Routes
router.use("/auth", authRoutes)
// User Routes
router.use("/user", userRoutes)
// Admin Routes
router.use("/admin", adminRoutes)

export default router
