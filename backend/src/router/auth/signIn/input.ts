import { z } from 'zod'

export const zSighInTrpcInput = z.object({
  nick: z.string().min(1),
  password: z.string().min(1),
})
