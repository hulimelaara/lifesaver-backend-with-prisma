import { Request, Response } from "express"

export const userRegister = async (req: Request, res: Response) => {
    res.send("Hello Register")
}

export const userLogin = async (req: Request, res: Response) => {
    res.send("Hello Login")
}
