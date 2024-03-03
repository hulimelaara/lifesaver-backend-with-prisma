import express, { Router } from "express"

import moduleRoutes from "./moduleRoutes"

const adminRoutes: Router = express.Router()

adminRoutes.use("/modules", moduleRoutes)

export default adminRoutes
