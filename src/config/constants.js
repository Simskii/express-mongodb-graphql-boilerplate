const devConfig = {
    MONGO_URL: 'mongodb://localhost:27017',
};

const testConfig = {
    MONGO_URL: 'mongodb://localhost:27017',
};

const prodConfig = {
    MONGO_URL: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
};

const defaultConfig = {
    JWT_SECRET: process.env.JWT_SECRET || 'NIMscUiP1YTX9jGnySL5oRzBmeJuLRp5',
    PORT: process.env.PORT || 3001,
    GRAPHQL_PATH: '/graphql',
    SUBSCRIPTIONS_PATH: '/subscriptions',
};

function envConfig(env) {
    switch (env) {
    case 'test':
        return testConfig;
    case 'production':
        return prodConfig;
    default:
        return devConfig;
    }
}

export default {
    ...defaultConfig,
    ...envConfig(process.env.NODE_ENV),
};
