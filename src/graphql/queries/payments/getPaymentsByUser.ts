import {gql} from '@apollo/client';

export const GET_PAYMENTS_BY_USER = gql`
    query GetPaymentsByUser(
        $userId: Int!
        $pageSize: Int
        $pageNumber: Int
        $sortBy: String
        $sortDirection: SortDirection
    ) {
        getPaymentsByUser(
            userId: $userId
            pageSize: $pageSize
            pageNumber: $pageNumber
            sortBy: $sortBy
            sortDirection: $sortDirection
        ) {
            pagesCount
            page
            pageSize
            totalCount
            items {
                id
                businessAccountId
                status
                dateOfPayment
                startDate
                endDate
                type
                price
                paymentType
                payments {
                    id
                    userId
                    paymentMethod
                    amount
                    currency
                    createdAt
                    endDate
                    type
                }
            }
        }
    }
`