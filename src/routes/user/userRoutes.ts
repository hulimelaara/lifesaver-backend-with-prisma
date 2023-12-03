import express, { Router } from "express"

import { userController } from "../../controller"

const userRoutes: Router = express.Router()

userRoutes.post("/register", userController.userRegister)
userRoutes.post("/login", userController.userLogin)

export default userRoutes
