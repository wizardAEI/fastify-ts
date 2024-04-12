import {PrismaClient} from '@prisma/client';

export type Done = (err?: Error | undefined) => void

// Use TypeScript module augmentation to declare the type of server.prisma to be PrismaClient
declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient
  }
}