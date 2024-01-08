import express, { Router } from "express"

import { userControllers } from "../../controllers"

const userRoutes: Router = express.Router()

userRoutes.get("/register", userControllers.userRegister)
userRoutes.post("/login", userControllers.userLogin)

export default userRoutes
