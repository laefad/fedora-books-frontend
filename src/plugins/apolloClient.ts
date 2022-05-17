// Utilities 
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';

// https://www.apollographql.com/docs/react/api/link/apollo-link-http
const httpLink = createHttpLink({
    // You should use an absolute URL here
    uri: import.meta.env.VITE_SCHEMA_URL,
});

// https://www.apollographql.com/docs/react/api/link/apollo-link-context/
const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

// https://www.apollographql.com/docs/react/api/core/ApolloClient/
export const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});
