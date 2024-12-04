import {gql} from '@apollo/client';

export const GET_ONE_USER = gql`
    query GetOneUser(
        $userId: Int!
    ) {
        getUser(
            userId: $userId
        ) {
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
    }
`