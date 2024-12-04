import {gql} from '@apollo/client';

export const GET_ALL_USERS_LIST_TABLE = gql`
    query GetAllUsersListTable(
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