import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql, split, HttpLink
} from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient as createWSClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';

dayjs.extend(utc);

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URL || 'http://127.0.0.1:3001/'
});

const wsLink = new GraphQLWsLink(createWSClient({
  url: process.env.REACT_APP_GRAPHQL_WS_URL || 'ws://127.0.0.1:3001/ws',
}));

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);


export const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Order: {
        keyFields: ['id', 'kind'],
      }
    }
  })
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
