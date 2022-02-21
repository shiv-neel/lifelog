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
import React, { useState } from 'react'

const SignUp = () => {
	const [show, setShow] = useState(false)
	const handleClick = () => setShow(!show)
	return (
		<Box className='flex flex-col justify-center border-2 p-5'>
			<Heading as='h1'>Sign Up</Heading>
			<FormControl>
				<FormLabel htmlFor='email'>Email</FormLabel>
				<Input id='email' type='email' />
				<FormLabel htmlFor='password'>Password</FormLabel>
				<InputGroup size='md'>
					<Input
						pr='4.5rem'
						type={show ? 'text' : 'password'}
						placeholder='Enter password'
						id='password'
					/>

					<InputRightElement width='4.5rem'>
						<Button h='1.75rem' size='sm' onClick={handleClick}>
							{show ? 'Hide' : 'Show'}
						</Button>
					</InputRightElement>
				</InputGroup>
				<Button type='submit'>Sign Up</Button>
				<p>
					Already have an account? <a href='#'>Sign In</a>
				</p>
			</FormControl>
		</Box>
	)
}

export default SignUp
