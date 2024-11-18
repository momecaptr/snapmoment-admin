import {ApolloClient, createHttpLink, InMemoryCache, split} from "@apollo/client" // Это чо за хуита????
import { setContext } from '@apollo/client/link/context' // Это зачем?
import { GraphQLWsLink } from '@apollo/client/link/subscriptions' // Это зачем?
import { createClient } from 'graphql-ws' // Это зачем?
import { getMainDefinition } from '@apollo/client/utilities'

const httpLink = createHttpLink({
  uri: 'https://inctagram.work/api/v1/graphql'
})

const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://inctagram.work/api/v1/graphql', // ЭТО НАХУЯ??? Говорит в видосе пока не обращать внимания
}))

const authLink = setContext((_, {headers, base64UsernamePassword}) => {
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: `Basic ${base64UsernamePassword}`
    }
  }
})

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  link: authLink.concat(splitLink),
  cache: new InMemoryCache(),
  // defaultOptions: {
  //   watchQuery: {
  //     nextFetchPolicy: 'cache-only',
  //   },
  // },
})

export default client