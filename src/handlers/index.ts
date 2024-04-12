import {FastifyInstance} from 'fastify';
import {Done} from '@src/hooks';
import {ZodTypeProvider} from 'fastify-type-provider-zod';

import {RouteOptions} from './type';
import users from './users';

export default function (app: FastifyInstance, options: RouteOptions, done: Done) {
    const route = app.withTypeProvider<ZodTypeProvider>();
    users(route);
    done();
}