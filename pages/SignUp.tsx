import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Heading,
	Input,
	InputGroup,
	InputRightElement,
} from '@chakra-ui/react'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import Connections from '../components/Connections'
import { useAuth } from '../utils/AuthContext'

const SignUp = () => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [error, setError] = useState<string>('')
	const [confirmPassword, setConfirmPassword] = useState<string>('')
	const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true)

	const [show, setShow] = useState(false)
	const handleClick = () => setShow(!show)

	const signup = useAuth().emailSignUp

	const submitHandler = (e: any) => {
		e.preventDefault()
		if (password !== confirmPassword) setPasswordsMatch(false)
		else {
			setPasswordsMatch(true)
			console.log(email, password)
			try {
				signup(email, password)
					.then((res) => console.log(res?.user))
					.catch((error) => setError(error.toString()))
			} catch (error: any) {
				setError(error.toString())
				console.log(error)
			}
		}
	}

	return (
		<Box w={'lg'} className='flex flex-col justify-center mx-auto border-1 p-5'>
			<Heading as='h1' className='flex justify-center mb-10'>
				Sign Up
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
				<FormLabel htmlFor='confirm-password' className='mt-5'>
					Confirm Pasword
				</FormLabel>
				<Input
					pr='4.5rem'
					type={show ? 'text' : 'password'}
					placeholder='Confirm password'
					id='confirm-password'
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>{' '}
				{passwordsMatch ? (
					<></>
				) : (
					<p className='text-red-500 mt-2 font-semibold'>
						Passwords do not match.{' '}
					</p>
				)}
				<Button type='submit' onClick={submitHandler} className='my-5'>
					Sign Up
				</Button>
				<p>
					Already have an account?{' '}
					<Link href='/SignIn' passHref>
						<span className='text-blue-500 underline cursor-pointer'>
							Sign In
						</span>
					</Link>
				</p>
			</FormControl>
			<Connections />
		</Box>
	)
}

export default SignUp
