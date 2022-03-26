import { Box, Button, Divider, Heading } from '@chakra-ui/react'
import React, { useState } from 'react'
import Link from 'next/link'
import { Form, Formik, FormikErrors } from 'formik'
import { InputField } from '../src/components/InputField'
import { useLoginMutation } from '../src/generated/graphql'
import { useRouter } from 'next/router'

export interface LoginProps {
	username: string
	password: string
}

export interface SetErrors {
	(
		errors: FormikErrors<{
			username: string
			password: string
		}>
	): void
}

const SignIn = () => {
	const router = useRouter()
	const [isLoading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string>('')
	const [show, setShow] = useState<boolean>(false)
	const handleClick = () => setShow(!show)
	const [success, setSuccess] = useState<boolean>(false)

	const [, login] = useLoginMutation()
	const handleLogin = async (values: LoginProps, setErrors: SetErrors) => {
		setLoading(true)
		const { username, password } = values
		const response = await login({ username, password })
		const errs = response.data?.login.errors
		if (errs) {
			if (errs.filter((e) => e.field === 'username').length)
				setErrors({
					username: errs.filter((e) => e.field === 'username')[0].message,
				})
			if (errs.filter((e) => e.field === 'password').length)
				setErrors({
					password: errs.filter((e) => e.field === 'password')[0].message,
				})
		} else {
			setSuccess(true)
			router.push('/dashboard')
		}
	}

	return (
		<Box w={'lg'} className='flex flex-col justify-center mx-auto border-1 p-5'>
			<Heading as='h1' className='flex justify-center'>
				Sign In
			</Heading>
			<Divider my={5} />
			<Formik
				initialValues={{ username: '', password: '' }}
				onSubmit={async (values, { setErrors }) => {
					return await handleLogin(values, setErrors)
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						<InputField
							name='username'
							placeholder='Enter username'
							label='Username'
							type='text'
						/>
						<InputField
							name='password'
							placeholder='Enter password'
							label='Password'
							type='password'
						/>
						<Button
							my={4}
							type='submit'
							isLoading={isSubmitting && isLoading}
							colorScheme={'blue'}
						>
							Sign In
						</Button>
					</Form>
				)}
			</Formik>
			<p>
				Don&apos;t have an account yet?{' '}
				<Link href='/register' passHref>
					<a className='underline'>Sign Up</a>
				</Link>
			</p>
		</Box>
	)
}

export default SignIn
