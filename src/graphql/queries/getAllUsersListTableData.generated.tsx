import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllUsersListTableQueryVariables = Types.Exact<{
  pageSize?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  pageNumber?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  sortBy?: Types.InputMaybe<Types.Scalars['String']['input']>;
  sortDirection?: Types.InputMaybe<Types.SortDirection>;
  statusFilter?: Types.InputMaybe<Types.UserBlockStatus>;
  searchTerm?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetAllUsersListTableQuery = { __typename?: 'Query', getUsers: { __typename?: 'UsersPaginationModel', users: Array<{ __typename?: 'User', id: number, userName: string, createdAt: any, userBan?: { __typename?: 'UserBan', reason: string, createdAt: any } | null, profile: { __typename?: 'Profile', userName?: string | null, firstName?: string | null, lastName?: string | null } }>, pagination: { __typename?: 'PaginationModel', pagesCount: number, page: number, pageSize: number, totalCount: number } } };


export const GetAllUsersListTableDocument = gql`
    query GetAllUsersListTable($pageSize: Int, $pageNumber: Int, $sortBy: String, $sortDirection: SortDirection, $statusFilter: UserBlockStatus, $searchTerm: String) {
  getUsers(
    pageSize: $pageSize
    pageNumber: $pageNumber
    sortBy: $sortBy
    sortDirection: $sortDirection
    statusFilter: $statusFilter
    searchTerm: $searchTerm
  ) {
    users {
      id
      userName
      userBan {
        reason
        createdAt
      }
      profile {
        userName
        firstName
        lastName
      }
      createdAt
    }
    pagination {
      pagesCount
      page
      pageSize
      totalCount
    }
  }
}
    `;

/**
 * __useGetAllUsersListTableQuery__
 *
 * To run a query within a React component, call `useGetAllUsersListTableQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersListTableQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersListTableQuery({
 *   variables: {
 *      pageSize: // value for 'pageSize'
 *      pageNumber: // value for 'pageNumber'
 *      sortBy: // value for 'sortBy'
 *      sortDirection: // value for 'sortDirection'
 *      statusFilter: // value for 'statusFilter'
 *      searchTerm: // value for 'searchTerm'
 *   },
 * });
 */
export function useGetAllUsersListTableQuery(baseOptions?: Apollo.QueryHookOptions<GetAllUsersListTableQuery, GetAllUsersListTableQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllUsersListTableQuery, GetAllUsersListTableQueryVariables>(GetAllUsersListTableDocument, options);
      }
export function useGetAllUsersListTableLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUsersListTableQuery, GetAllUsersListTableQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllUsersListTableQuery, GetAllUsersListTableQueryVariables>(GetAllUsersListTableDocument, options);
        }
export function useGetAllUsersListTableSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllUsersListTableQuery, GetAllUsersListTableQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllUsersListTableQuery, GetAllUsersListTableQueryVariables>(GetAllUsersListTableDocument, options);
        }
export type GetAllUsersListTableQueryHookResult = ReturnType<typeof useGetAllUsersListTableQuery>;
export type GetAllUsersListTableLazyQueryHookResult = ReturnType<typeof useGetAllUsersListTableLazyQuery>;
export type GetAllUsersListTableSuspenseQueryHookResult = ReturnType<typeof useGetAllUsersListTableSuspenseQuery>;
export type GetAllUsersListTableQueryResult = Apollo.QueryResult<GetAllUsersListTableQuery, GetAllUsersListTableQueryVariables>;