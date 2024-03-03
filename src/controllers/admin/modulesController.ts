import { Request, Response } from "express"
import { prisma } from "../../configs/prisma"

export const createModule = async (req: Request, res: Response) => {
    const { name } = req.body
    const newModule = await prisma.module.create({
        data: {
            name
        }
    })
    res.status(201).json({
        status: true,
        message: "Module created successfully",
        data: newModule
    })
}

export const getAllModules = async (req: Request, res: Response) => {
    const modules = await prisma.module.findMany()
    res.status(200).json({
        status: true,
        message: "Modules fetched successfully",
        data: modules
    })
}

export const getModuleById = async (req: Request, res: Response) => {
    const { id } = req.params
    const module = await prisma.module.findUnique({
        where: { id: parseInt(id) }
    })
    if (module) {
        res.status(200).json({
            status: true,
            message: "Module fetched successfully",
            data: module
        })
    } else {
        res.status(404).json({ status: false, message: "Module not found" })
    }
}

export const updateModule = async (req: Request, res: Response) => {
    const { id } = req.params
    const { name } = req.body
    const updatedModule = await prisma.module.update({
        where: { id: parseInt(id) },
        data: {
            name
        }
    })
    res.status(200).json({
        status: true,
        message: "Module updated successfully",
        data: updatedModule
    })
}

export const deleteModule = async (req: Request, res: Response) => {
    const { id } = req.params
    await prisma.module.delete({
        where: { id: parseInt(id) }
    })
    res.status(200).json({ status: true, message: "Module deleted successfully" })
}
