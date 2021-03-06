import 'reflect-metadata'
import { MikroORM } from '@mikro-orm/core'
import { __prod__ } from './constants'
import config from './mikro-orm.config'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { TaskResolver } from './resolvers/task'
import { UserResolver } from './resolvers/user'
import Redis from 'ioredis'
import session from 'express-session'
import connectRedis from 'connect-redis'
import { MyContext } from './types'
import cors from 'cors'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'

const main = async () => {
	const orm = await MikroORM.init(config)
	await orm.getMigrator().up()

	const app = express()

	const RedisStore = connectRedis(session)
	const redisClient = new Redis() // need to call redis-server in terminal to start the server

	app.get('/', (_, res) => {
		res.send('server is live!')
	})

	app.use(
		cors({
			origin: 'http://localhost:3000',
			credentials: true,
		})
	)

	app.use(
		session({
			name: 'sid',
			store: new RedisStore({
				client: redisClient,
				disableTouch: true,
			}),
			cookie: {
				maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
				httpOnly: true,
				sameSite: 'lax',
				secure: __prod__, // cookie only works in https (production)
			},
			secret: 'secret',
			resave: false,
			saveUninitialized: false,
		})
	)

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [TaskResolver, UserResolver],
			validate: false,
		}),
		context: ({ req, res }): MyContext => ({
			em: orm.em,
			req,
			res,
			redisClient,
		}),
		plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
	})

	await apolloServer.start().catch((err) => console.error(err))
	apolloServer.applyMiddleware({
		app,
		cors: false,
	})
	const PORT = process.env.PORT || 4000
	app.listen(PORT, () => {
		console.log(`Server is listening on port ${PORT}.`)
	})
}

main().catch((err) => console.error(err))

// to create task: orm.em.create(Task, { title: 'another task lol', duration: 5 })
// to push tasks to db: await orm.em.persistAndFlush(task)
// to query all tasks: await orm.em.find(Task, {})
