import { Connection, EntityManager, IDatabaseDriver } from '@mikro-orm/core'
import { Request, Response } from 'express'
import { Session } from 'express-session'

export type MyContext = {
	em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>
	req: Request
	res: Response
}
export interface CustomSessionData extends Session {
	userId: number
}
