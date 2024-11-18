import {gql} from '@apollo/client';

export const GET_USERS = gql`
    query GetUsers(
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
                userBan {
                    reason
                    createdAt
                }
                createdAt
                email
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