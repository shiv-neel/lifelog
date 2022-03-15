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

@InputType()
class UsernamePasswordInput {
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
	async me(@Ctx() { req, em }: MyContext): Promise<User | null> {
		// must make function async to have promise return type
		const sess = req.session as CustomSessionData
		if (!sess.userId) return null // if no userId property on the session, user not logged in
		const user = await em.findOne(User, { id: sess.userId })
		return user
	}

	@Mutation(() => UserResponse)
	async register(
		@Arg('options') options: UsernamePasswordInput,
		@Ctx() { em, req }: MyContext
	): Promise<UserResponse> {
		const errors: FieldError[] = []
		const existingUser = await em.findOne(User, {
			username: options.username.toLowerCase(),
		})
		if (existingUser)
			errors.push({
				field: 'username',
				message: `User with username ${options.username} already exists.`,
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
		const user = em.create(User, {
			username: options.username,
			password: hashedPassword,
		})
		try {
			await em.persistAndFlush(user)
		} catch (err) {
			if (!errors.length)
			errors.push({
				field: 'username',
				message: 'Could not register user. Please try again.',
			})
		}
			if (errors) return { errors }
			const sess = req.session as CustomSessionData
			sess.userId = user.id

		
			return { user }
		
	}

	@Mutation(() => UserResponse)
	async login(
		@Arg('options') options: UsernamePasswordInput,
		@Ctx() { em, req }: MyContext
	): Promise<UserResponse> {
		const user = await em.findOne(User, {
			username: options.username.toLowerCase(),
		})
		if (!user) {
			return {
				errors: [{ field: 'username', message: 'username doesnt exist' }],
			}
		}

		const passwordIsValid = await argon.verify(user.password, options.password)
		if (!passwordIsValid) {
			return {
				errors: [{ field: 'password', message: 'password is incorrect' }],
			}
		}

		let sess = req.session as CustomSessionData
		sess.userId = user.id

		return { user }
	}
}
