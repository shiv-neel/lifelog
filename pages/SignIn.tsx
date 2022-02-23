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
import Connections from '../components/Connections'

const SignIn = () => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [error, setError] = useState<string>('')
	const [show, setShow] = useState(false)
	const handleClick = () => setShow(!show)

	const emailSignIn = useAuth().emailSignIn
	const googleSignIn = useAuth().googleSignIn

	const submitHandler = (e: any) => {
		e.preventDefault()
		emailSignIn(email, password)
			.then((res) => console.log(res?.user))
			.catch((err) => setError(err.toString()))
	}
	return (
		<Box w={'lg'} className='flex flex-col justify-center mx-auto border-1 p-5'>
			<Heading as='h1' size='xl' className='flex justify-center mb-10'>
				Sign In
			</Heading>
			<FormControl className='mt-5'>
				<FormLabel htmlFor='email'>Email</FormLabel>
				<Input
					id='email'
					type='email'
					placeholder='johndoe@email.com'
					onChange={(e) => setEmail(e.target.value)}
				/>
				<FormLabel htmlFor='password' className='mt-5'>
					Password
				</FormLabel>
				<InputGroup size='md'>
					<Input
						pr='4.5rem'
						type={show ? 'text' : 'password'}
						placeholder='Enter password'
						id='password'
						onChange={(e) => setPassword(e.target.value)}
					/>

					<InputRightElement width='4.5rem'>
						<Button
							h='1.75rem'
							size='sm'
							onClick={handleClick}
							colorScheme='blue'
						>
							{show ? 'Hide' : 'Show'}
						</Button>
					</InputRightElement>
				</InputGroup>
				<Button type='submit' onClick={submitHandler} className='my-5'>
					Sign In
				</Button>
				<p>
					Don&apos;t have an account?{' '}
					<Link href='/SignUp' passHref>
						<span className='text-blue-500 underline cursor-pointer'>
							Sign Up
						</span>
					</Link>
				</p>
			</FormControl>
			{<p className='text-red-600'>{error.slice(25)}</p>}
			<Connections />
		</Box>
	)
}

export default SignIn
