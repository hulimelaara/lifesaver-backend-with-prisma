import { prisma } from "../../configs/prisma"
import { Request, Response } from "express"
import { AddressSchema, Address } from "../../schemas/zodSchema/userSchema"
import { NotFoundException } from "../../exceptions/notFoundException"

// Create a new address
export const addUserAddress = async (req: Request, res: Response) => {
    const parsedAddress: Address = AddressSchema.parse(req.body)
    const userId = req.params.userId
    const address = await prisma.address.create({
        data: { ...parsedAddress, userId }
    })

    res.json({
        status: true,
        message: "Address created successfully",
        data: address
    })
}

// Retrieve an address by User ID
export const getUserAddress = async (req: Request, res: Response) => {
    const userId = req.params.userId

    const address = await prisma.address.findMany({
        where: { userId }
    })

    if (!address) {
        throw new NotFoundException("Address not found", 404, null)
    }

    res.json({
        status: true,
        message: "Address fetched successfully",
        data: address
    })
}

// Update an existing address
export const updateUserAddress = async (req: Request, res: Response) => {
    const addressId = req.params.addressId

    const address = await prisma.address.update({
        where: { id: addressId },
        data: { ...req.body }
    })

    res.json({
        status: true,
        message: "Address updated successfully",
        data: address
    })
}

// Delete an address
export const deleteUserAddress = async (req: Request, res: Response) => {
    const addressId = req.params.addressId

    await prisma.address.delete({
        where: { id: addressId }
    })

    res.json({
        status: true,
        message: "Address deleted successfully"
    })
}
