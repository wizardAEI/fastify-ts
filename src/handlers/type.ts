import {IncomingMessage, Server, ServerResponse} from 'http';

import {FastifyBaseLogger, FastifyInstance} from 'fastify';
import {z} from 'zod';
import {ZodTypeProvider} from 'fastify-type-provider-zod';

// eslint-disable-next-line max-len
export type Route = FastifyInstance<Server<typeof IncomingMessage, typeof ServerResponse>, IncomingMessage, ServerResponse<IncomingMessage>, FastifyBaseLogger, ZodTypeProvider>

export type RouteOptions = {
    prefix: string;
}

export const Res = z.object({
    code: z.literal(0),
});

// 4xx
export const FailRes = z.object({
    code: z.literal(1),
    data: z.string(),
});


