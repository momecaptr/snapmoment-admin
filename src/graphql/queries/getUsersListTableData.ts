import {gql} from '@apollo/client';

export const GET_USERS_LIST_TABLE = gql`
    query GetUsersListTable(
        $pageSize: Int
        $pageNumber: Int
        $sortBy: String
        $sortDirection: SortDirection
        $statusFilter: UserBlockStatus
        $searchTerm: String
    ) {
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
`