import {prisma} from '.';

export async function findAll() {
    return await prisma.users.findMany();
}