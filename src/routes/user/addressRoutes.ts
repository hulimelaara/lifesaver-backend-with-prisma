import express, { Router } from "express"

import { addressControllers } from "../../controllers"
import withErrorHandler from "../../utils/errorHandler"

const addressRoutes: Router = express.Router()

addressRoutes.get("/:userId", withErrorHandler(addressControllers.getUserAddress))
addressRoutes.post("/:userId", withErrorHandler(addressControllers.addUserAddress))
addressRoutes.patch("/:addressId", withErrorHandler(addressControllers.updateUserAddress))
addressRoutes.delete("/:addressId", withErrorHandler(addressControllers.deleteUserAddress))

export default addressRoutes
