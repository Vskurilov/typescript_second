// @index('./**/index.ts', f => `import { ${f.path.split('/').slice(0, -1).pop()}TrpcRoute } from '${f.path.split('/').slice(0, -1).join('/')}'`)
import { createIdeaTrpcRoute } from './createIdea'
import { getIdeaTrpcRoute } from './getIdea'
import { getIdeasTrpcRoute } from './getIdeas'
import { getMeTrpcRoute } from './getMe'
import { sighUpTrpcRoute } from './sighUp'
import { signInTrpcRoute } from './signIn'
// @endindex
import { trpc } from '../lib/trpc'
export const trpcRouter = trpc.router({
  // @index('./**/index.ts', f => `${f.path.split('/').slice(0, -1).pop()}: ${f.path.split('/').slice(0, -1).pop()}TrpcRoute,`)
  createIdea: createIdeaTrpcRoute,
  getIdea: getIdeaTrpcRoute,
  getIdeas: getIdeasTrpcRoute,
  getMe: getMeTrpcRoute,
  sighUp: sighUpTrpcRoute,
  signIn: signInTrpcRoute,
  // @endindex
})

export type TrpcRouter = typeof trpcRouter
