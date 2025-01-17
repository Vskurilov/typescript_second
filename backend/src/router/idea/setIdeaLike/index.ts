import { zSetIdeaLikeIdeaTrpcInput } from './input'
import { trpc } from '../../../lib/trpc'

export const setIdeaLikeTrpcRoute = trpc.procedure.input(zSetIdeaLikeIdeaTrpcInput).mutation(async ({ ctx, input }) => {
  const { ideaId, isLikedByMe } = input
  if (!ctx.me) {
    throw new Error('UNAUTHORIZED')
  }

  const idea = await ctx.prisma.idea.findUnique({
    where: {
      id: ideaId,
    },
  })
  if (!idea) {
    throw new Error('NOT_FOUND')
  }
  if (isLikedByMe) {
    await ctx.prisma.ideaLike.upsert({
      where: {
        ideaId_userId: {
          ideaId,
          userId: ctx.me.id,
        },
      },
      create: {
        userId: ctx.me.id,
        ideaId,
      },
      update: {},
    })
  } else {
    await ctx.prisma.ideaLike.delete({
      where: {
        ideaId_userId: {
          ideaId,
          userId: ctx.me.id,
        },
      },
    })
  }
  const likesCount = await ctx.prisma.ideaLike.count({
    where: {
      ideaId,
    },
  })
  return {
    Idea: {
      id: idea.id,
      likesCount,
      isLikedByMe,
    },
  }
})
