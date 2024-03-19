import express, { Router } from "express"

import { rolesController } from "../../controllers"
import withErrorHandler from "../../utils/errorHandler"

const rolesRoutes: Router = express.Router()

// Create a new roles.
rolesRoutes.post("/", withErrorHandler(rolesController.createRole))
// Retrieve all roles.
rolesRoutes.get("/", withErrorHandler(rolesController.getAllRoles))
//Retrieve a roles by ID.
rolesRoutes.get("/:id", withErrorHandler(rolesController.getRoleById))
//Update a roles by ID.
rolesRoutes.put("/:id", withErrorHandler(rolesController.updateRole))
//Delete a roles by ID.
rolesRoutes.delete("/:id", withErrorHandler(rolesController.deleteRole))

// RolePermission Routes -> Assigning Pemrission to Roles
//Assign permissions to a role.
rolesRoutes.post("/:roleId/permissions", withErrorHandler(rolesController.assignPermissionsToRole))
// Get all permissions for a role.
rolesRoutes.get("/:roleId/permissions", withErrorHandler(rolesController.getPermissionsByRole))
// Remove a permission
rolesRoutes.delete(
    "/:roleId/permissions/",
    withErrorHandler(rolesController.removePermissionFromRole)
)
export default rolesRoutes
