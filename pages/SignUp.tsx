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
import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../utils/AuthContext'

const SignUp = () => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [confirmPassword, setConfirmPassword] = useState<string>('')
	const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true)

	const [show, setShow] = useState(false)
	const handleClick = () => setShow(!show)

	const signup = useAuth().emailSignUp

	const submitHandler = (e: any) => {
		e.preventDefault()
		if (password !== confirmPassword) setPasswordsMatch(false)
		else {
			console.log(email, password)
			try {
				signup(email, password).then(res => console.log(res?.user)).catch(err => console.log(err))
			}
			catch (error) {
				console.log(error)
			}
		}
	}

	return (
		<Box w={'lg'} className='flex flex-col justify-center mx-auto border-1 p-5'>
			<Heading as='h1'>Sign Up</Heading>
			<FormControl className='mt-5 space-y-2'>
				<FormLabel htmlFor='email'>Email</FormLabel>
				<Input id='email' type='email' placeholder='johndoe@email.com' onChange={(e) => setEmail(e.target.value)}/>
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
				<FormLabel htmlFor='confirm-password'>Confirm Pasword</FormLabel>
					<Input
						pr='4.5rem'
						type={show ? 'text' : 'password'}
						placeholder='Confirm password'
					id='confirm-password'
					onChange={(e) => setConfirmPassword(e.target.value)}
					/>
				<Button type='submit' onClick={submitHandler}>Sign Up</Button>
				<p>
					Already have an account? <a href='/SignIn'>Sign In</a>
				</p>
				{ passwordsMatch ? <></> : <p>Passwords do not match. </p>}
			</FormControl>
		</Box>
	)
}

export default SignUp
