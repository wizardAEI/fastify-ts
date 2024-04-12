import modelSchema from "@src/database/schema"
import { getUsersSvc } from "@src/service/users";
import z from 'zod'

import { FailRes, Res, Route } from "./type";
export default function(route: Route) {
    route.get('/users', {
        schema: {
            response: {
                200: Res.extend({
                    data: z.object({
                        users: z.array(modelSchema.shape.users)
                    })
                }),
                400: FailRes
            }
        }
    }, async (req, reply) => {
        try {
            const users = await getUsersSvc()
            return reply.code(200).send({
                code: 0,
                data: {
                    users
                }
            })
        }
        catch (error) {
            reply
                .code(400)
                .send({code: 1, data: (error as Error).message});
        }
    })
}