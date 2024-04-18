import { z } from "zod";

export default z.object({
  users: z.object({
    id: z.string().optional(),
    key: z.string(),
    name: z.string(),
    info: z.object({
      age: z.number().int(),
      address: z.union([z.string(), z.null()]).optional(),
      friends: z.array(z.string()),
    }),
  }),
});
