import { Box, Button, Divider, Heading } from '@chakra-ui/react'
import Link from 'next/link'
import React, { useState } from 'react'
import { Form, Formik, FormikErrors } from 'formik'
import { InputField } from '../src/components/InputField'
import { FieldError, useRegisterMutation } from '../src/generated/graphql'
import { useRouter } from 'next/router'
import { LoginProps } from './login'

interface RegisterProps extends LoginProps {
	email: string
	confirmPassword: string
}

export interface SetErrors {
	(
		errors: FormikErrors<{
			username: string
			email: string
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
	const [success, setSuccess] = useState<boolean>(false)

	const handleRegistration = async (
		values: RegisterProps,
		setErrors: SetErrors
	) => {
		setLoading(true)
		const { username, email, password, confirmPassword } = values
		if (password !== confirmPassword) {
			setPasswordsMatch(false)
			setErrors({ confirmPassword: 'Passwords do not match. ' })
			return
		} else setPasswordsMatch(true)

		const response = await register({ username, email, password })
		setLoading(false)

		const errs = response.data?.register.errors
		if (errs) {
			setSuccess(false)
			if (errs.filter((e) => e.field === 'username').length)
				setErrors({
					username: errs.filter((e) => e.field === 'username')[0].message,
				})
			if (errs.filter((e) => e.field === 'email').length)
				setErrors({
					email: errs.filter((e) => e.field === 'email')[0].message,
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
				Sign Up
			</Heading>
			<Divider my={5} />
			<Formik
				initialValues={{
					username: '',
					email: '',
					password: '',
					confirmPassword: '',
				}}
				onSubmit={async (values, { setErrors }) => {
					return await handleRegistration(values, setErrors)
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
							name='email'
							placeholder='Enter e-mail address'
							label='E-mail'
							type='email'
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
			{success ? <p>Success!</p> : <></>}
		</Box>
	)
}

export default SignUp
