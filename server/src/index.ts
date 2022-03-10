import 'reflect-metadata'
import { MikroORM } from '@mikro-orm/core'
import { __prod__ } from './constants'
import config from './mikro-orm.config'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { TaskResolver } from './resolvers/task'

const main = async () => {
	const orm = await MikroORM.init(config)
	await orm.getMigrator().up()

	const app = express()
	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [TaskResolver],
			validate: false,
		}),
		context: () => ({ em: orm.em }),
	})
	await apolloServer.start()
	apolloServer.applyMiddleware({ app })
	const PORT = process.env.PORT || 4000
	app.listen(PORT, () => {
		console.log(`Server is listening on port ${PORT}.`)
	})
}

main().catch((err) => console.error(err))

// to create task: orm.em.create(Task, { title: 'another task lol', duration: 5 })
// to push tasks to db: await orm.em.persistAndFlush(task)
// to query all tasks: await orm.em.find(Task, {})
