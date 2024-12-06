import { gql } from '@apollo/client'

export const POST_ADDED_SUBSCRIPTION = gql`
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
`
