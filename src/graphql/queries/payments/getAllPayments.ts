import {gql} from '@apollo/client';

export const GET_ALL_PAYMENTS = gql`
    query GetAllPayments(
        $pageSize: Int
        $pageNumber: Int
        $sortBy: String
        $sortDirection: SortDirection
        $searchTerm: String
    ) {
        getPayments(
            pageSize: $pageSize
            pageNumber: $pageNumber
            sortBy: $sortBy
            sortDirection: $sortDirection
            searchTerm: $searchTerm
        ) {
            pagesCount
            page
            pageSize
            totalCount
            items {
                id
                userId
                paymentMethod
                amount
                currency
                createdAt
                endDate
                type
                userName
                avatars {
                    url
                    width
                    height
                    fileSize
                }
            }
        }
    }
`