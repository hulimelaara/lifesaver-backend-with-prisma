import { z } from "zod"

export const AddressSchema = z.object({
    pinCode: z.number(),
    addressLine1: z.string(),
    addressLine2: z.string().optional(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    isPrimary: z.boolean().default(false),
    isResidential: z.boolean().default(false),
    isPermanent: z.boolean().default(false)
})

export const UserSchema = z.object({
    email: z.string().email(),
    userId: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    birthDay: z.string().optional(),
    mobile: z.string(),
    password: z.string(),
    bloodGroup: z.string(),
    isActive: z.boolean().default(true),
    isVerified: z.boolean().default(false),
    address: z.array(AddressSchema).optional()
})

export const UserLoginSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

export type Address = z.infer<typeof AddressSchema>
export type User = z.infer<typeof UserSchema>
export type UserLoginBody = z.infer<typeof UserLoginSchema>
