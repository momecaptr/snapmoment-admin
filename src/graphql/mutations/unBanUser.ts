import {gql} from '@apollo/client';

export const UNBAN_USER = gql`
    mutation UnBanUser($userId: Int!) {
        unbanUser(userId: $userId)
    }
`;