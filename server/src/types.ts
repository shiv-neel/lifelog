import { EntityManager, IDatabaseDriver, Connection } from '@mikro-orm/core'
import { Request, Response, Express } from 'express'
import { Session } from 'express-session'
import { Redis } from 'ioredis'

export interface MyContext {
	em: EntityManager<IDatabaseDriver<Connection>>
	req: Request
	res: Response
	redisClient: Redis
}

export interface CustomSessionData extends Session {
	userId: number | null
}