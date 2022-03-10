import { Entity, PrimaryKey, Property } from '@mikro-orm/core'
import { Field, Int, ObjectType } from 'type-graphql'

@ObjectType()
@Entity()
export class Task {
	// need to explicitly declare fields' types as () => Type
	// to hide any properties from graphql schema, omit @Field() decorator
	@Field(() => Int)
	@PrimaryKey()
	id!: number

	@Field(() => String)
	@Property()
	title!: string

	@Field(() => String)
	@Property({ type: 'date' })
	createdAt? = new Date()

	@Field(() => String)
	@Property({ type: 'date', onUpdate: () => new Date() })
	updatedAt? = new Date()

	@Field(() => Int)
	@Property()
	duration?: number
}
