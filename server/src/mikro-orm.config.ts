import { __prod__ } from "./constants"
import { Task } from "./entities/Task"
import { MikroORM } from '@mikro-orm/core'
import path from 'path'
import { User } from './entities/User'

export default {
	migrations: {
		path: path.join(__dirname, './migrations'),
		pattern: /^[\w-]+\d+\.[jt]s$/,
	},
	dbName: 'lifelog',
	debug: !__prod__,
	type: 'postgresql',
	entities: [Task, User],
	allowGlobalContext: true,
} as Parameters<typeof MikroORM.init>[0]
// Type is Parameter 0 of the MikroORM.init() function