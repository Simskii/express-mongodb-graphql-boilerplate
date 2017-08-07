/* eslint-disable no-console */

import express from 'express';
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';

import './config/db';
import config from './config/config';
// import mock from './mock';
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

const app = express();

app.use(
    '/graphiql',
    graphiqlExpress({
        endpointURL: config.GRAPHQL_PATH,
        subscriptionsEndpoint: `ws://localhost:${config.PORT}${config.SUBSCRIPTIONS_PATH}`,
    }),
);

app.use(
    config.GRAPHQL_PATH,
    graphqlExpress(req => ({
        schema,
        context: {
            user: req.user,
        },
    })),
);

const graphQLServer = createServer(app);

graphQLServer.listen(config.PORT, err => {
    if (err) {
        console.error(err);
    } else {
        new SubscriptionServer({ // eslint-disable-line
            schema,
            execute,
            subscribe,
        }, {
            server: graphQLServer,
            path: config.SUBSCRIPTIONS_PATH,
        });
        console.log(`Graphiql listen on: http://localhost:${config.PORT}/graphiql`);
    }
});
