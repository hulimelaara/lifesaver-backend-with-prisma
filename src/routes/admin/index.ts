import express, { Router } from "express"

import moduleRoutes from "./moduleRoutes"
import rolesRoutes from "./rolesRoutes"
import permissionsRoutes from "./permissionsRoutes"

const adminRoutes: Router = express.Router()

adminRoutes.use("/modules", moduleRoutes)
adminRoutes.use("/roles", rolesRoutes)
adminRoutes.use("/permission", permissionsRoutes)

export default adminRoutes
