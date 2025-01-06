import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
  },
  cache: new InMemoryCache(),
});

export default client;
