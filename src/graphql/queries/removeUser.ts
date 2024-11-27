import {gql} from '@apollo/client';

export const REMOVE_USER = gql`
    mutation removeUser($userId: Int!) {
        removeUser(userId: $userId)
    }
`;