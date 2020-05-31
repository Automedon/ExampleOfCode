import withApollo from "next-with-apollo";
import React from "react";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { setContext } from "apollo-link-context";
import { ApolloLink, Observable } from "apollo-link";
import { ApolloProvider } from "@apollo/react-hooks";

export default withApollo(
  ({ initialState }) => {
    return new ApolloClient({
      link: ApolloLink.from([
        onError(({ graphQLErrors, networkError }) => {
          if (graphQLErrors)
            graphQLErrors.forEach(({ message, locations, path }) =>
              console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
              )
            );
          if (networkError) console.log(`[Network error]: ${networkError}`);
        }),
        setContext((_, { headers }) => {
          return {
            headers: {
              ...headers,
              authorization: "hello",
            },
          };
        }),
        new HttpLink({
          uri:
            process.env.NODE_ENV === "production"
              ? "https://car-yard.now.sh/api/graphql"
              : "http://localhost:3000/api/graphql",
          credentials: "same-origin",
        }),
      ]),
      cache: new InMemoryCache().restore(initialState),
    });
  },
  {
    render: ({ Page, props }) => {
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      );
    },
  }
);
