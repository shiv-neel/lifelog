import { CustomSessionData, MyContext } from '../types'
import {
	Arg,
	Ctx,
	Field,
	InputType,
	Int,
	Mutation,
	ObjectType,
	Query,
	Resolver,
} from 'type-graphql'
import { User } from '../entities/User'
import argon from 'argon2'
import { EntityManager } from '@mikro-orm/postgresql'

@InputType()
class RegisterInput {
	@Field()
	username: string
	@Field()
	email: string
	@Field()
	password: string
}

@InputType()
class LoginInput {
	@Field()
	username: string
	@Field()
	password: string
}

@ObjectType()
class FieldError {
	@Field()
	field: string
	@Field()
	message: string
}

@ObjectType()
class UserResponse {
	@Field(() => [FieldError], { nullable: true })
	errors?: FieldError[] // return error stack if failure response

	@Field(() => User, { nullable: true })
	user?: User // return user if successful response
}

@Resolver()
export class UserResolver {
	@Query(() => [User])
	getAllUsers(@Ctx() { em }: MyContext): Promise<User[] | null> {
		return em.find(User, {})
	}

	@Query(() => User, { nullable: true })
	getUserById(
		@Arg('id') id: number,
		@Ctx() { em }: MyContext
	): Promise<User | null> {
		return em.findOne(User, { id }) // same as saying {id: id}
	}

	@Query(() => User, { nullable: true })
	async me(@Ctx() { em, req }: MyContext): Promise<User | null> {
		let sess = req.session as CustomSessionData
		// no cookie exists (no id prop for session)
		if (!sess.userId) return null
		// otherwise, fetch user with id = userId
		const user = await em.findOne(User, { id: sess.userId })
		return user
	}

	@Mutation(() => UserResponse)
	async register(
		@Arg('options') options: RegisterInput,
		@Ctx() { em, req }: MyContext
	): Promise<UserResponse | undefined> {
		const errors: FieldError[] = []
		const existingUsername = await em.findOne(User, {
			username: options.username.toLowerCase(),
		})
		if (existingUsername) {
			errors.push({
				field: 'username',
				message: `User with username ${options.username} already exists.`,
			})
		}

		const existingEmail = await em.findOne(User, {
			email: options.email!.toLowerCase(),
		})

		if (existingEmail)
			errors.push({
				field: 'email',
				message: `User with email ${options.email} already exists.`,
			})

		if (options.username.length <= 2)
			errors.push({
				field: 'username',
				message: 'Username must be longer than 2 characters.',
			})

		if (options.password.length <= 6)
			errors.push({
				field: 'password',
				message: 'Password must be longer than 6 characters.',
			})

		const hashedPassword = await argon.hash(options.password)
		if (errors.length) return { errors }
		try {
			const res = await (em as EntityManager)
				.createQueryBuilder(User)
				.getKnexQuery()
				.insert({
					username: options.username,
					email: options.email,
					password: hashedPassword,
					created_at: new Date(),
					updated_at: new Date(),
				})
				.returning('*')
			const user = res[0]
			let sess = req.session as CustomSessionData
			sess.userId = user.id
			return { user }
		} catch (err) {
			if (!errors.length)
				errors.push({
					field: 'username',
					message: 'Could not register user. Please try again.',
				})
			return { errors }
		}
	}

	@Mutation(() => UserResponse)
	async login(
		@Arg('options') options: LoginInput,
		@Ctx() { em, req }: MyContext
	): Promise<UserResponse> {
		const user = await em.findOne(User, {
			username: options.username.toLowerCase(),
		})
		if (!user) {
			return {
				errors: [{ field: 'username', message: 'Username does not exist.' }],
			}
		}

		const passwordIsValid = await argon.verify(user.password, options.password)
		if (!passwordIsValid) {
			return {
				errors: [{ field: 'password', message: 'Password is incorrect.' }],
			}
		}

		let sess = req.session as CustomSessionData
		sess.userId = user.id
		return { user }
	}

	@Mutation(() => User, { nullable: true })
	async logout(@Ctx() { em, req }: MyContext): Promise<User | null> {
		let sess = req.session as CustomSessionData
		// no cookie exists (no id prop for session)
		if (!sess.userId) return null
		// otherwise, fetch user with id = userId
		const user = await em.findOne(User, { id: sess.userId })
		sess.userId = null
		return user
	}
}
