import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetPostsQueryVariables = Types.Exact<{
  endCursorPostId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  searchTerm?: Types.InputMaybe<Types.Scalars['String']['input']>;
  pageSize?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  sortBy?: Types.InputMaybe<Types.Scalars['String']['input']>;
  sortDirection?: Types.InputMaybe<Types.SortDirection>;
}>;


export type GetPostsQuery = { __typename?: 'Query', getPosts: { __typename?: 'PostsPaginationModel', pagesCount: number, pageSize: number, totalCount: number, items: Array<{ __typename?: 'Post', id: number, ownerId: number, description: string, createdAt: any, updatedAt: any, images?: Array<{ __typename?: 'ImagePost', id?: number | null, createdAt?: any | null, url?: string | null, width?: number | null, height?: number | null, fileSize?: number | null }> | null, postOwner: { __typename?: 'PostOwnerModel', id: number, userName: string, firstName?: string | null, lastName?: string | null, avatars?: Array<{ __typename?: 'Avatar', url?: string | null, width?: number | null, height?: number | null, fileSize?: number | null }> | null }, userBan?: { __typename?: 'UserBan', reason: string, createdAt: any } | null }> } };


export const GetPostsDocument = gql`
    query GetPosts($endCursorPostId: Int, $searchTerm: String, $pageSize: Int, $sortBy: String, $sortDirection: SortDirection) {
  getPosts(
    endCursorPostId: $endCursorPostId
    searchTerm: $searchTerm
    pageSize: $pageSize
    sortBy: $sortBy
    sortDirection: $sortDirection
  ) {
    pagesCount
    pageSize
    totalCount
    items {
      images {
        id
        createdAt
        url
        width
        height
        fileSize
      }
      id
      ownerId
      description
      createdAt
      updatedAt
      postOwner {
        id
        userName
        firstName
        lastName
        avatars {
          url
          width
          height
          fileSize
        }
      }
      userBan {
        reason
        createdAt
      }
    }
  }
}
    `;

/**
 * __useGetPostsQuery__
 *
 * To run a query within a React component, call `useGetPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsQuery({
 *   variables: {
 *      endCursorPostId: // value for 'endCursorPostId'
 *      searchTerm: // value for 'searchTerm'
 *      pageSize: // value for 'pageSize'
 *      sortBy: // value for 'sortBy'
 *      sortDirection: // value for 'sortDirection'
 *   },
 * });
 */
export function useGetPostsQuery(baseOptions?: Apollo.QueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
      }
export function useGetPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
        }
export function useGetPostsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
        }
export type GetPostsQueryHookResult = ReturnType<typeof useGetPostsQuery>;
export type GetPostsLazyQueryHookResult = ReturnType<typeof useGetPostsLazyQuery>;
export type GetPostsSuspenseQueryHookResult = ReturnType<typeof useGetPostsSuspenseQuery>;
export type GetPostsQueryResult = Apollo.QueryResult<GetPostsQuery, GetPostsQueryVariables>;