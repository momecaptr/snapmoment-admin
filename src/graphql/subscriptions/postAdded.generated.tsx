import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type PostAddedSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type PostAddedSubscription = { __typename?: 'Subscription', postAdded: { __typename?: 'Post', id: number, ownerId: number, description: string, createdAt: any, updatedAt: any, images?: Array<{ __typename?: 'ImagePost', url?: string | null, id?: number | null }> | null, postOwner: { __typename?: 'PostOwnerModel', id: number, firstName?: string | null, lastName?: string | null, userName: string, avatars?: Array<{ __typename?: 'Avatar', url?: string | null }> | null }, userBan?: { __typename?: 'UserBan', reason: string, createdAt: any } | null } };


export const PostAddedDocument = gql`
    subscription PostAdded {
  postAdded {
    images {
      url
      id
    }
    id
    ownerId
    description
    createdAt
    updatedAt
    postOwner {
      avatars {
        url
      }
      id
      firstName
      lastName
      userName
    }
    userBan {
      reason
      createdAt
    }
  }
}
    `;

/**
 * __usePostAddedSubscription__
 *
 * To run a query within a React component, call `usePostAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `usePostAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostAddedSubscription({
 *   variables: {
 *   },
 * });
 */
export function usePostAddedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<PostAddedSubscription, PostAddedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<PostAddedSubscription, PostAddedSubscriptionVariables>(PostAddedDocument, options);
      }
export type PostAddedSubscriptionHookResult = ReturnType<typeof usePostAddedSubscription>;
export type PostAddedSubscriptionResult = Apollo.SubscriptionResult<PostAddedSubscription>;