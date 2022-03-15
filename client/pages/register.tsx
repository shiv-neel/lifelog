import { Box, Button, Divider, Heading } from '@chakra-ui/react'
import Link from 'next/link'
import React, { useState } from 'react'
import { Form, Formik, FormikErrors } from 'formik'
import { InputField } from '../src/components/InputField'
import { FieldError, useRegisterMutation } from '../src/generated/graphql'
import { useRouter } from 'next/router'

export interface SubmitProps {
	username: string
	password: string
	confirmPassword: string
}

export interface SetErrors {
	(
		errors: FormikErrors<{
			username: string
			password: string
			confirmPassword: string
		}>
	): void
}
const SignUp = () => {
	const router = useRouter()
	const [, register] = useRegisterMutation()
	// use comma bc we only want the second value that useMutation() returns

	const [passwordsMatch, setPasswordsMatch] = useState<boolean>(false)
	const [isLoading, setLoading] = useState<boolean>(false)

	const handleRegistration = async (
		values: SubmitProps,
		setErrors: SetErrors
	) => {
		setLoading(true)
		const { username, password, confirmPassword } = values
		if (password !== confirmPassword) {
			setPasswordsMatch(false)
			setErrors({ confirmPassword: 'Passwords do not match. ' })
			return
		} else setPasswordsMatch(true)
		const submitResponse = await register({ username, password })
		setLoading(false)
		const errs = submitResponse.data?.register.errors
		if (errs) {
			if (errs.filter((e) => e.field === 'username').length)
				setErrors({
					username: errs.filter((e) => e.field === 'username')[0].message,
				})
			if (errs.filter((e) => e.field === 'password').length)
				setErrors({
					password: errs.filter((e) => e.field === 'password')[0].message,
				})
		} else if (submitResponse.data?.register.user) {
			router.push('/dashboard')
		}
	}

	return (
		<Box w={'lg'} className='flex flex-col justify-center mx-auto border-1 p-5'>
			<Heading as='h1' className='flex justify-center'>
				Sign Up
			</Heading>
			<Divider my={5} />
			<Formik
				initialValues={{ username: '', password: '', confirmPassword: '' }}
				onSubmit={async (values, { setErrors }) => {
					await handleRegistration(values, setErrors)
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
						<InputField
							name='confirmPassword'
							placeholder='Confirm password'
							label='Confirm Password'
							type='password'
						/>
						<Button
							my={4}
							type='submit'
							isLoading={isSubmitting && isLoading}
							colorScheme={'blue'}
						>
							Sign Up
						</Button>
					</Form>
				)}
			</Formik>
			<p>
				Already have an account?{' '}
				<Link href='/login' passHref>
					<a className='underline'>Sign In</a>
				</Link>
			</p>
		</Box>
	)
}

export default SignUp
