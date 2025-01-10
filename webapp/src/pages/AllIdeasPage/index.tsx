import { Link } from 'react-router-dom'
import css from './index.module.scss'
import { Segment } from '../../components/Segment'
import { getViewIdeaRoute } from '../../lib/routes'
import * as trpc from '../../lib/trpc'

export const AllIdeasPage = () => {
  const { data, error, isLoading, isFetching, isError } = trpc.trpc.getIdeas.useQuery()
  if (isLoading || isFetching) {
    return <h1>Loading...</h1>
  }

  if (isError) {
    return <h1>Error: {error.message}</h1>
  }

  return (
    <div>
      <Segment title="All ideas">
        <div className={css.ideas}>
          {data?.ideas.map((idea: { nick: string; name: string; description: string }) => (
            <div className={css.idea} key={idea.nick}>
              <Segment
                size={2}
                title={
                  <Link className={css.ideaLink} to={getViewIdeaRoute({ ideaNick: idea.nick })}>
                    {idea.name}
                  </Link>
                }
                description={idea.description}
              />
            </div>
          ))}
        </div>
      </Segment>
    </div>
  )
}
