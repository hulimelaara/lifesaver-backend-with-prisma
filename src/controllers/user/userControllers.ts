import { NotFoundException } from "../../exceptions/notFoundException"
import { prisma } from "../../configs/prisma"
import { Request, Response } from "express"
import userFetchSchema from "../../schemas/fetchSchema/userFetchSchema"

export const getUserProfile = async (req: Request, res: Response) => {
    const userId = req.params.id // Assuming the user ID is passed as a URL parameter

    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: userFetchSchema
    })

    if (!user) {
        throw new NotFoundException("User not found", 404, null)
    }

    res.json({
        status: true,
        message: "User profile fetched successfully",
        data: user
    })
}

export const updateUserProfile = async (req: Request, res: Response) => {
    const userId = req.params.id

    const user = await prisma.user.update({
        where: { id: userId },
        data: {
            ...req.body
        }
    })

    res.json({
        status: true,
        message: "User profile updated successfully",
        data: user
    })
}

// Assign permission(s) to a user
export const assignPermissionsToUser = async (req: Request, res: Response) => {
    const { userId } = req.params
    const { permissions } = req.body // Expecting an array of permission IDs

    // Check if user exists
    const user = await prisma.user.findUnique({
        where: { id: userId }
    })

    if (!user) {
        return res.status(404).json({ status: false, message: "User not found" })
    }

    // Assign each permission to the user
    for (const permissionId of permissions) {
        await prisma.userPermission.upsert({
            where: {
                userId_permissionId: {
                    userId: userId,
                    permissionId: permissionId
                }
            },
            update: {},
            create: {
                userId: userId,
                permissionId: permissionId
            }
        })
    }

    res.status(200).json({ status: true, message: "Permissions assigned successfully" })
}

// Get all permissions of a specific user
export const getPermissionsByUser = async (req: Request, res: Response) => {
    const { userId } = req.params

    const userPermissions = await prisma.userPermission.findMany({
        where: { userId: userId },
        include: {
            permission: true
        }
    })

    if (userPermissions.length === 0) {
        return res
            .status(404)
            .json({ status: false, message: "No permissions found for this user" })
    }

    res.status(200).json({
        status: true,
        message: "Permissions fetched successfully",
        data: userPermissions
    })
}

// Remove a permission from a user
export const removePermissionFromUser = async (req: Request, res: Response) => {
    const { userId, permissionId } = req.params

    // Check if the userPermission exists
    const userPermission = await prisma.userPermission.findUnique({
        where: {
            userId_permissionId: {
                userId: userId,
                permissionId: parseInt(permissionId)
            }
        }
    })

    if (!userPermission) {
        return res.status(404).json({ status: false, message: "UserPermission not found" })
    }

    await prisma.userPermission.delete({
        where: {
            userId_permissionId: {
                userId: userId,
                permissionId: parseInt(permissionId)
            }
        }
    })

    res.status(200).json({ status: true, message: "Permission removed from user successfully" })
}
