import gql from 'graphql-tag'
import * as Urql from 'urql'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
	[K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]: Maybe<T[SubKey]>
}
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string
	String: string
	Boolean: boolean
	Int: number
	Float: number
}

export type FieldError = {
	__typename?: 'FieldError'
	field: Scalars['String']
	message: Scalars['String']
}

export type Mutation = {
	__typename?: 'Mutation'
	createTask: Task
	deleteTask: Scalars['Boolean']
	login: UserResponse
	register: UserResponse
	updateTaskDuration?: Maybe<Task>
	updateTaskTitle?: Maybe<Task>
}

export type MutationCreateTaskArgs = {
	duration: Scalars['Float']
	title: Scalars['String']
}

export type MutationDeleteTaskArgs = {
	id: Scalars['Float']
}

export type MutationLoginArgs = {
	options: UsernamePasswordInput
}

export type MutationRegisterArgs = {
	options: UsernamePasswordInput
}

export type MutationUpdateTaskDurationArgs = {
	duration?: InputMaybe<Scalars['Int']>
	id: Scalars['Float']
}

export type MutationUpdateTaskTitleArgs = {
	id: Scalars['Float']
	title?: InputMaybe<Scalars['String']>
}

export type Query = {
	__typename?: 'Query'
	getAllTasks: Array<Task>
	getAllUsers: Array<User>
	getTaskById?: Maybe<Task>
	getUserById?: Maybe<User>
	me?: Maybe<User>
}

export type QueryGetTaskByIdArgs = {
	id: Scalars['Float']
}

export type QueryGetUserByIdArgs = {
	id: Scalars['Float']
}

export type Task = {
	__typename?: 'Task'
	createdAt: Scalars['String']
	duration: Scalars['Int']
	id: Scalars['Int']
	title: Scalars['String']
	updatedAt: Scalars['String']
}

export type User = {
	__typename?: 'User'
	createdAt: Scalars['String']
	email: Scalars['String']
	id: Scalars['Int']
	updatedAt: Scalars['String']
	username: Scalars['String']
}

export type UserResponse = {
	__typename?: 'UserResponse'
	errors?: Maybe<Array<FieldError>>
	user?: Maybe<User>
}

export type UsernamePasswordInput = {
	email: Scalars['String']
	password: Scalars['String']
	username: Scalars['String']
}

export type RegisterMutationVariables = Exact<{
	username: Scalars['String']
	email: Scalars['String']
	password: Scalars['String']
}>

export type RegisterMutation = {
	__typename?: 'Mutation'
	register: {
		__typename?: 'UserResponse'
		user?: { __typename?: 'User'; id: number; username: string } | null
		errors?: Array<{
			__typename?: 'FieldError'
			field: string
			message: string
		}> | null
	}
}

export const RegisterDocument = gql`
	mutation Register($username: String!, $email: String!, $password: String!) {
		register(
			options: { username: $username, email: $email, password: $password }
		) {
			user {
				id
				username
			}
			errors {
				field
				message
			}
		}
	}
`

export function useRegisterMutation() {
	return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(
		RegisterDocument
	)
}
