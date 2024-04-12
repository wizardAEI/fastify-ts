import fp from 'fastify-plugin';
import {PrismaClient} from '@prisma/client';

export const prisma = new PrismaClient();

export default fp(async server => {
    await prisma.$connect();
    // Make Prisma Client available through the fastify server instance: server.prisma
    server.decorate('prisma', prisma);

    server.addHook('onClose', async server => {
        await server.prisma.$disconnect();
    });
});