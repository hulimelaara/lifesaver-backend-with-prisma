import { Request, Response } from "express"

const userRegister = async (req: Request, res: Response) => {
    res.send("Hello Register")
}

const userLogin = async (req: Request, res: Response) => {
    res.send("Hello Login")
}

export = { userRegister, userLogin }
