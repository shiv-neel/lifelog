import {
	Box,
	Button,
	ButtonGroup,
	Divider,
	FormControl,
	FormLabel,
	Heading,
	Input,
	InputGroup,
	InputRightElement,
} from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../utils/AuthContext'
import { IoLogoGoogle } from 'react-icons/io'
import { FaFacebookSquare } from 'react-icons/fa'
import { BsGithub } from 'react-icons/bs'
import Link from 'next/link'
import { Form, Formik } from 'formik'
import { InputField } from '../src/components/InputField'

const SignIn = () => {
	const [username, setUsername] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [isLoading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string>('')
	const [show, setShow] = useState(false)
	const handleClick = () => setShow(!show)

	const handleLogin = (e: any) => {
		e.preventDefault()
	}

	return (
		<Box w={'lg'} className='flex flex-col justify-center mx-auto border-1 p-5'>
			<Heading as='h1' className='flex justify-center'>
				Sign In
			</Heading>
			<Divider my={5} />
			<Formik
				initialValues={{ username: '', password: '', confirmPassword: '' }}
				onSubmit={(values) => handleLogin(values)}
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
