import { zUpdatePasswordInput } from './input'
import { trpc } from '../../../lib/trpc'
import { getPasswordHash } from '../../../utils/getPasswordHash'

export const updatePasswordTrpcRoute = trpc.procedure.input(zUpdatePasswordInput).mutation(async ({ ctx, input }) => {
  if (!ctx.me) {
    throw new Error('UNAUTHORIZED')
  }
  if (ctx.me.password !== getPasswordHash(input.oldPassword)) {
    throw new Error('Wrong old password')
  }
  const updateMe = await ctx.prisma.user.update({
    where: {
      id: ctx.me.id,
    },
    data: {
      password: getPasswordHash(input.newPassword),
    },
  })
  ctx.me = updateMe
  return true
})
