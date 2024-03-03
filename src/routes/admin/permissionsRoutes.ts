import express, { Router } from "express"

import { permissionsController } from "../../controllers"
import withErrorHandler from "../../utils/errorHandler"

const permissionsRoutes: Router = express.Router()

// Create a new permission.
permissionsRoutes.post("/", withErrorHandler(permissionsController.createPermission))
// Retrieve all permission.
permissionsRoutes.get("/", withErrorHandler(permissionsController.getAllPermissions))
//Retrieve a permission by ID.
permissionsRoutes.get("/:id", withErrorHandler(permissionsController.getPermissionById))
//Update a permission by ID.
permissionsRoutes.put("/:id", withErrorHandler(permissionsController.updatePermission))
//Delete a permission by ID.
permissionsRoutes.delete("/:id", withErrorHandler(permissionsController.deletePermission))

export default permissionsRoutes
