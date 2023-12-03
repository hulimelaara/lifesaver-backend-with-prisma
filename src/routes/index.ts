import express, { Router } from "express"

import userRoutes from "./user/userRoutes"

const routes: Router = express.Router()

routes.use("/users", userRoutes)

export default routes
