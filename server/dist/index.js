"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@mikro-orm/core");
const constants_1 = require("./constants");
const mikro_orm_config_1 = __importDefault(require("./mikro-orm.config"));
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const task_1 = require("./resolvers/task");
const user_1 = require("./resolvers/user");
const ioredis_1 = __importDefault(require("ioredis"));
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const apollo_server_core_1 = require("apollo-server-core");
const main = async () => {
    const orm = await core_1.MikroORM.init(mikro_orm_config_1.default);
    await orm.getMigrator().up();
    const app = (0, express_1.default)();
    const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
    const redisClient = new ioredis_1.default();
    app.get('/', (_, res) => {
        res.send('server is live!');
    });
    app.use((0, express_session_1.default)({
        name: 'sid',
        store: new RedisStore({
            client: redisClient,
            disableTouch: true,
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365,
            httpOnly: true,
            sameSite: 'lax',
            secure: constants_1.__prod__,
        },
        secret: 'secret',
        resave: false,
        saveUninitialized: false,
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [task_1.TaskResolver, user_1.UserResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({
            em: orm.em,
            req,
            res,
            redisClient,
        }),
        plugins: [(0, apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground)()],
    });
    await apolloServer.start().catch((err) => console.error(err));
    apolloServer.applyMiddleware({ app, cors: false });
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}.`);
    });
};
main().catch((err) => console.error(err));
//# sourceMappingURL=index.js.map