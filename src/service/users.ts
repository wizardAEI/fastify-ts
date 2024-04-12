import * as userRepo from "../database/users"

export async function getUsersSvc() {
    return await userRepo.findAll()
}