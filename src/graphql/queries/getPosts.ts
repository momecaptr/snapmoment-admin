import {gql} from '@apollo/client';

export const GET_POSTS = gql`
    query GetPosts(
        $endCursorPostId: Int
        $searchTerm: String
        $pageSize: Int
        $sortBy: String
        $sortDirection: SortDirection
    ) {
        getPosts(
            endCursorPostId: $endCursorPostId,
            searchTerm: $searchTerm,
            pageSize: $pageSize,
            sortBy: $sortBy,
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
`