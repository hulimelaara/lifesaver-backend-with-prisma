import express, { Router } from "express"

import { authControllers } from "../../controllers"
import withErrorHandler from "../../utils/errorHandler"

const userRoutes: Router = express.Router()

userRoutes.post("/register", withErrorHandler(authControllers.authRegister))
userRoutes.post("/login", withErrorHandler(authControllers.authLogin))
userRoutes.post("/refresh", withErrorHandler(authControllers.authRefreshToken))

export default userRoutes
