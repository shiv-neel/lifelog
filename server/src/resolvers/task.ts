import { Task } from '../entities/Task'
import { MyContext } from '../types'
import { Arg, Ctx, Int, Mutation, Query, Resolver } from 'type-graphql'

@Resolver() // resolver defines what to return to graphql for a query or mutation
export class TaskResolver {
	@Query(() => [Task]) // query should return type Task[] (graphql reads it as [Task])
	tasks(@Ctx() { em }: MyContext): Promise<Task[]> {
		// destructuring the ctx obj
		return em.find(Task, {})
	}

	@Query(() => Task, { nullable: true })
	task(@Arg('id') id: number, @Ctx() { em }: MyContext): Promise<Task | null> {
		return em.findOne(Task, { id })
	}

	@Mutation(() => Task)
	async createTask(
		@Arg('title') title: string,
		@Arg('duration') duration: number,
		@Ctx() { em }: MyContext
	): Promise<Task> {
		const task = em.create(Task, { title, duration })
		await em.persistAndFlush(task)
		return task
	}

	@Mutation(() => Task, { nullable: true })
	async updateTaskTitle(
		@Arg('id') id: number,
		@Arg('title', () => String, { nullable: true }) title: string,
		@Ctx() { em }: MyContext
	): Promise<Task | null> {
		const task = await em.findOne(Task, { id })
		if (!task) {
			return null
		}
		if (typeof title !== 'undefined') {
			task.title = title
			await em.persistAndFlush(task)
		}
		return task
	}

	@Mutation(() => Task, { nullable: true })
	async updateTaskDuration(
		@Arg('id') id: number,
		@Arg('duration', () => Int, { nullable: true }) duration: number, // to make nullable true, must specify type
		@Ctx() { em }: MyContext
	): Promise<Task | null> {
		const task = await em.findOne(Task, { id })
		if (!task) {
			return null
		}
		if (typeof duration !== 'undefined') {
			task.duration = duration
			await em.persistAndFlush(task)
		}
		return task
	}

	@Mutation(() => Boolean) // return boolean for task deletion status
	async deleteTask(
		@Arg('id') id: number,
		@Ctx() { em }: MyContext
	): Promise<boolean> {
		try {
			await em.nativeDelete(Task, { id })
		} catch {
			return false
		}
		return true
	}
}

/*
QUERY in graphql:
e.g. get duration and createdAt date of task with id of 5
{
  task(id: 5) {
    duration
    createdAt
  }
}
*/

/*
MUTATION in graphql:
e.g. create new task
mutation {
  createTask(title: "my task", duration: 0) {
    id
    createdAt
  }
}
*/
