import { zCreateIdeaTrpcInput } from './input'

import { trpc } from '../../../lib/trpc'

export const createIdeaTrpcRoute = trpc.procedure.input(zCreateIdeaTrpcInput).mutation(async ({ input, ctx }) => {
  if (!ctx.me) {
    throw Error('UNAUTHORIZED')
  }
  const exIdea = await ctx.prisma.idea.findUnique({
    where: {
      nick: input.nick,
    },
  })
  if (exIdea) {
    throw Error('Idea with this nick already exists')
  }

  await ctx.prisma.idea.create({
    data: {
      ...(input as {
        name: string
        nick: string
        description: string
        text: string
      }),
      authorId: ctx.me.id,
    },
  })
  return true
})
