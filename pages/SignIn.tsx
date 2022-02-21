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
			<Heading as='h1' size='xl' className='flex justify-center'>
				Sign In
			</Heading>
			<FormControl className='mt-5 space-y-2'>
				<FormLabel htmlFor='email'>Email</FormLabel>
				<Input
					id='email'
					type='email'
					placeholder='johndoe@email.com'
					onChange={(e) => setEmail(e.target.value)}
				/>
				<FormLabel htmlFor='password'>Password</FormLabel>
				<InputGroup size='md'>
					<Input
						pr='4.5rem'
						type={show ? 'text' : 'password'}
						placeholder='Enter password'
						id='password'
						onChange={(e) => setPassword(e.target.value)}
					/>

					<InputRightElement width='4.5rem'>
						<Button h='1.75rem' size='sm' onClick={handleClick}>
							{show ? 'Hide' : 'Show'}
						</Button>
					</InputRightElement>
				</InputGroup>
				<Button type='submit' onClick={submitHandler}>
					Sign In
				</Button>
				<p>
					Don&apos;t have an account? <a href='/SignUp'>Sign Up</a>
				</p>
			</FormControl>
			{error}
			<Divider className='py-5' />
			<Heading as='h2' size='md' className='flex justify-center'>
				Or connect with
			</Heading>
			<div className='flex justify-center gap-10 py-6'>
				<Button
					onClick={googleSignIn}
					className='hover:scale-105 duration-100'
					style={{
						width: 60,
						height: 60,
						borderRadius: '50%',
					}}
					colorScheme={'red'}
				>
					<IoLogoGoogle className='text-3xl text-white' />
				</Button>
				<Button
					className='hover:scale-105 duration-100'
					style={{
						width: 60,
						height: 60,
						borderRadius: '50%',
					}}
					colorScheme={'blue'}
				>
					<FaFacebookSquare className='text-3xl' />
				</Button>
				<Button
					className='hover:scale-105 duration-100'
					style={{
						width: 60,
						height: 60,
						borderRadius: '50%',
						background: 'black',
					}}
				>
					<BsGithub className='text-3xl text-white' />
				</Button>
			</div>
		</Box>
	)
}

export default SignIn
