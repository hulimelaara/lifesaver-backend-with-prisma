import { Request, Response } from "express"
import { prisma } from "../../configs/prisma"

export const createRole = async (req: Request, res: Response) => {
    const { name } = req.body
    const newRole = await prisma.role.create({
        data: {
            name
        }
    })
    res.status(201).json({ status: true, message: "Role created successfully", data: newRole })
}

export const getAllRoles = async (req: Request, res: Response) => {
    const roles = await prisma.role.findMany()
    res.status(200).json({ status: true, message: "Roles fetched successfully", data: roles })
}

export const getRoleById = async (req: Request, res: Response) => {
    const { id } = req.params
    const role = await prisma.role.findUnique({
        where: { id: parseInt(id) }
    })
    if (role) {
        res.status(200).json({ status: true, message: "Role fetched successfully", data: role })
    } else {
        res.status(404).json({ status: false, message: "Role not found" })
    }
}

export const updateRole = async (req: Request, res: Response) => {
    const { id } = req.params
    const { name } = req.body
    const updatedRole = await prisma.role.update({
        where: { id: parseInt(id) },
        data: {
            name
        }
    })
    res.status(200).json({ status: true, message: "Role updated successfully", data: updatedRole })
}

export const deleteRole = async (req: Request, res: Response) => {
    const { id } = req.params
    await prisma.role.delete({
        where: { id: parseInt(id) }
    })
    res.status(200).json({ status: true, message: "Role deleted successfully" })
}

// Assign permission(s) to a role
export const assignPermissionsToRole = async (req: Request, res: Response) => {
    const { roleId } = req.params
    const { permissions } = req.body // Expecting an array of permission IDs

    // Check if role exists
    const role = await prisma.role.findUnique({
        where: { id: parseInt(roleId) }
    })

    if (!role) {
        return res.status(404).json({ status: false, message: "Role not found" })
    }

    // Assign each permission to the role
    for (const permissionId of permissions) {
        await prisma.rolePermission.upsert({
            where: {
                roleId_permissionId: {
                    roleId: parseInt(roleId),
                    permissionId: permissionId
                }
            },
            update: {},
            create: {
                roleId: parseInt(roleId),
                permissionId: permissionId
            }
        })
    }

    res.status(200).json({ status: true, message: "Permissions assigned successfully" })
}

// Get all permissions of a specific role
export const getPermissionsByRole = async (req: Request, res: Response) => {
    const { roleId } = req.params

    const rolePermissions = await prisma.rolePermission.findMany({
        where: { roleId: parseInt(roleId) },
        include: {
            permission: true
        }
    })

    if (rolePermissions.length === 0) {
        return res
            .status(404)
            .json({ status: false, message: "No permissions found for this role" })
    }

    res.status(200).json({
        status: true,
        message: "Permissions fetched successfully",
        data: rolePermissions
    })
}

// Remove a permission from a role
export const removePermissionFromRole = async (req: Request, res: Response) => {
    const { roleId, permissionId } = req.params

    // Check if the rolePermission exists
    const rolePermission = await prisma.rolePermission.findUnique({
        where: {
            roleId_permissionId: {
                roleId: parseInt(roleId),
                permissionId: parseInt(permissionId)
            }
        }
    })

    if (!rolePermission) {
        return res.status(404).json({ status: false, message: "RolePermission not found" })
    }

    await prisma.rolePermission.delete({
        where: {
            roleId_permissionId: {
                roleId: parseInt(roleId),
                permissionId: parseInt(permissionId)
            }
        }
    })

    res.status(200).json({ status: true, message: "Permission removed from role successfully" })
}
