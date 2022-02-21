import {
	Box,
	Button,
	ButtonGroup,
	FormControl,
	FormLabel,
	Heading,
	Input,
	InputGroup,
	InputRightElement,
} from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../utils/AuthContext'

const SignIn = () => {
	const [show, setShow] = useState(false)
	const handleClick = () => setShow(!show)


	const googleSignIn = useAuth().googleSignIn

	return (
		<Box w={'lg'} className='flex flex-col justify-center mx-auto border-1 p-5'>
			<Heading as='h1'>Log In</Heading>
			<FormControl className='mt-5 space-y-2'>
				<FormLabel htmlFor='email'>Email</FormLabel>
				<Input id='email' type='email' placeholder='johndoe@email.com'/>
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
				
				<Button type='submit'>Sign In</Button>
				<p>
					Don't have an account? <a href='/SignUp'>Sign Up</a>
				</p>
            </FormControl>
            <ButtonGroup>
                <Button onClick={googleSignIn}>Sign In With Google</Button>
            </ButtonGroup>
		</Box>
	)
}

export default SignIn
