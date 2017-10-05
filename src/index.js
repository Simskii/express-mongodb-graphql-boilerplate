/* eslint-disable no-console */

import express from 'express';
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';

import './config/db';
import constants from './config/constants';
import { userMiddleware } from './services/auth.services';
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
        endpointURL: constants.GRAPHQL_PATH,
        subscriptionsEndpoint: `ws://localhost:${constants.PORT}${constants.SUBSCRIPTIONS_PATH}`,
    }),
);

app.use(
    constants.GRAPHQL_PATH,
    userMiddleware,
    graphqlExpress(req => ({
        schema,
        context: {
            user: req.user,
        },
    })),
);

const graphQLServer = createServer(app);

graphQLServer.listen(constants.PORT, err => {
    if (err) {
        console.error(err);
    } else {
        new SubscriptionServer({ // eslint-disable-line
            schema,
            execute,
            subscribe,
        }, {
            server: graphQLServer,
            path: constants.SUBSCRIPTIONS_PATH,
        });
        console.log(`Graphiql listen on: http://localhost:${constants.PORT}/graphiql`);
    }
});
