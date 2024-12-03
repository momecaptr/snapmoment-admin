import {gql} from '@apollo/client';

export const GET_ALL_USERS = gql`
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
                profile {
                    id
                    userName
                    firstName
                    lastName
                    city
                    country
                    region
                    dateOfBirth
                    aboutMe
                    createdAt
                    avatars {
                        url
                        width
                        height
                        fileSize
                    }
                }
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