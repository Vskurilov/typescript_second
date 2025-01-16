import InfiniteScroll from 'react-infinite-scroller'
import { Link } from 'react-router-dom'
import css from './index.module.scss'
import { Alert } from '../../../components/Alert'
import { layoutContentElRef } from '../../../components/Layout'
import { Segment } from '../../../components/Segment'
import { getViewIdeaRoute } from '../../../lib/routes'
import * as trpc from '../../../lib/trpc'

export const AllIdeasPage = () => {
  const { data, error, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage, isRefetching } =
    trpc.trpc.getIdeas.useInfiniteQuery(
      {
        limit: 2,
      },
      {
        getNextPageParam: (lastPage) => {
          return lastPage.nextCursor
        },
      }
    )

  return (
    <div>
      <Segment title="All ideas">
        {isLoading || isRefetching ? (
          <div>Loading...</div>
        ) : isError ? (
          <Alert color="red">{error.message}</Alert>
        ) : (
          <div className={css.ideas}>
            <InfiniteScroll
              threshold={250}
              loadMore={() => {
                if (!isFetchingNextPage && hasNextPage) {
                  void fetchNextPage()
                }
              }}
              hasMore={hasNextPage}
              loader={
                <div className={css.more} key="loader">
                  Loading...
                </div>
              }
              getScrollParent={() => layoutContentElRef.current}
              useWindow={
                (layoutContentElRef.current && getComputedStyle(layoutContentElRef.current).overflow) !== 'auto'
              }
            >
              {data?.pages
                .flatMap((page) => page.ideas)
                .map((idea) => (
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
            </InfiniteScroll>
          </div>
        )}
      </Segment>
    </div>
  )
}
