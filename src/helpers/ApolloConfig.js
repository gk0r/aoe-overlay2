import { ApolloClient, InMemoryCache, from } from '@apollo/client'

// Configure Links
const { createUploadLink } = require('apollo-upload-client')
const uploadLink = createUploadLink({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
})

// Instantiate link
const link = from([uploadLink])

// Export the client configuration to application root
export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
})
