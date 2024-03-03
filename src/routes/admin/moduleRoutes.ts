import express, { Router } from "express"

import { modulesController } from "../../controllers"
import withErrorHandler from "../../utils/errorHandler"

const modulesRoutes: Router = express.Router()

// Create a new module.
modulesRoutes.post("/", withErrorHandler(modulesController.createModule))
// Retrieve all modules.
modulesRoutes.get("/", withErrorHandler(modulesController.getAllModules))
//Retrieve a module by ID.
modulesRoutes.get("/:id", withErrorHandler(modulesController.getModuleById))
//Update a module by ID.
modulesRoutes.put("/:id", withErrorHandler(modulesController.updateModule))
//Delete a module by ID.
modulesRoutes.delete("/:id", withErrorHandler(modulesController.deleteModule))

export default modulesRoutes
