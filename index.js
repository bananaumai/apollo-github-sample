import ApolloClient from 'apollo-client';
import fetch from 'node-fetch';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';

const link = createHttpLink({ uri: 'https://api.github.com/graphql', fetch: fetch });
const authLink = setContext((_, { headers }) => {
    const token = process.env.GITHUB_TOKEN
    return {
        headers: {
            ...headers,
            authorization: `Bearer ${token}`    
        }
    };
});

const client = new ApolloClient({
    link: authLink.concat(link),
    cache: new InMemoryCache()
});

const query = client.query({
    query: gql`
        query {
            viewer { login }
        }
    `
});

query.then(data => console.log(data));