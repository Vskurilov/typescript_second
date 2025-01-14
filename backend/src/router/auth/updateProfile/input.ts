import { z } from 'zod'

export const zUpdateProfileInput = z.object({
  nick: z
    .string()
    .min(1)
    .max(30)
    .regex(/^[a-z0-9-]+$/, 'Nick may contain only lowercase letters, number and dashes'),
  name: z.string().max(50).default(''),
})
