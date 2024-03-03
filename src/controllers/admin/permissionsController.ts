import { Request, Response } from "express"
import { prisma } from "../../configs/prisma"

export const createPermission = async (req: Request, res: Response) => {
    const { name, moduleId } = req.body
    const newPermission = await prisma.permission.create({
        data: {
            name,
            moduleId
        }
    })
    res.status(201).json({
        status: true,
        message: "Permission created successfully",
        data: newPermission
    })
}

export const getAllPermissions = async (req: Request, res: Response) => {
    const permissions = await prisma.permission.findMany()
    res.status(200).json({
        status: true,
        message: "Permissions fetched successfully",
        data: permissions
    })
}

export const getPermissionById = async (req: Request, res: Response) => {
    const { id } = req.params
    const permission = await prisma.permission.findUnique({
        where: { id: parseInt(id) }
    })
    if (permission) {
        res.status(200).json({
            status: true,
            message: "Permission fetched successfully",
            data: permission
        })
    } else {
        res.status(404).json({ status: false, message: "Permission not found" })
    }
}

export const updatePermission = async (req: Request, res: Response) => {
    const { id } = req.params
    const { name, moduleId } = req.body
    const updatedPermission = await prisma.permission.update({
        where: { id: parseInt(id) },
        data: {
            name,
            moduleId
        }
    })
    res.status(200).json({
        status: true,
        message: "Permission updated successfully",
        data: updatedPermission
    })
}

export const deletePermission = async (req: Request, res: Response) => {
    const { id } = req.params
    await prisma.permission.delete({
        where: { id: parseInt(id) }
    })
    res.status(200).json({ status: true, message: "Permission deleted successfully" })
}
