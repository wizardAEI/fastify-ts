import fastify from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';

import {
    jsonSchemaTransform,
    serializerCompiler,
    validatorCompiler,
} from 'fastify-type-provider-zod';

import handlers from './handlers';
import databasePlugin from './database';

const app = fastify({
    logger: true,
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifySwagger, {
    openapi: {
        info: {
            title: 'SampleApi',
            description: 'Sample backend service',
            version: '1.0.0',
        },
        servers: [],
    },
    transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUI, {
    routePrefix: '/apidocs',
});

app.after(() => {
    // mongodb
    app.register(databasePlugin);
    // routes
    app.register(handlers, {
        prefix: '/api',
    });
});

async function run() {
    await app.ready();
    await app.listen({
        port: 8111,
    });
    console.info('Documentation running at http://localhost:8111/apidocs');
}

run();
