import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UnBanUserMutationVariables = Types.Exact<{
  userId: Types.Scalars['Int']['input'];
}>;


export type UnBanUserMutation = { __typename?: 'Mutation', unbanUser: boolean };


export const UnBanUserDocument = gql`
    mutation UnBanUser($userId: Int!) {
  unbanUser(userId: $userId)
}
    `;
export type UnBanUserMutationFn = Apollo.MutationFunction<UnBanUserMutation, UnBanUserMutationVariables>;

/**
 * __useUnBanUserMutation__
 *
 * To run a mutation, you first call `useUnBanUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnBanUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unBanUserMutation, { data, loading, error }] = useUnBanUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUnBanUserMutation(baseOptions?: Apollo.MutationHookOptions<UnBanUserMutation, UnBanUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnBanUserMutation, UnBanUserMutationVariables>(UnBanUserDocument, options);
      }
export type UnBanUserMutationHookResult = ReturnType<typeof useUnBanUserMutation>;
export type UnBanUserMutationResult = Apollo.MutationResult<UnBanUserMutation>;
export type UnBanUserMutationOptions = Apollo.BaseMutationOptions<UnBanUserMutation, UnBanUserMutationVariables>;