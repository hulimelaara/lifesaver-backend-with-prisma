import express, { Router } from "express"

import { userControllers } from "../../controllers"
import withErrorHandler from "../../utils/errorHandler"
import addressRoutes from "./addressRoutes"

const userRoutes: Router = express.Router()

userRoutes.use("/address", addressRoutes)

userRoutes.get("/:id", withErrorHandler(userControllers.getUserProfile))
userRoutes.patch("/:id", withErrorHandler(userControllers.updateUserProfile))

// Admin Only Routes -
// Assign permissions to a user.
userRoutes.post("/:userId/permissions", withErrorHandler(userControllers.assignPermissionsToUser))
// Get all permissions for a user.
userRoutes.get("/:userId/permissions", withErrorHandler(userControllers.getPermissionsByUser))
//  Remove a permission from a user.
userRoutes.delete(
    "/:userId/permissions/:permissionId",
    withErrorHandler(userControllers.removePermissionFromUser)
)

export default userRoutes
