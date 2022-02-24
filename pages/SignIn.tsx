import { Box, Button, Divider, Heading } from '@chakra-ui/react'
import { useAuth } from '../utils/AuthContext'
import { FcGoogle } from 'react-icons/fc'
import { BsGithub } from 'react-icons/bs'

const SignIn = () => {
	const googleSignIn = useAuth().googleSignIn
	const githubSignIn = useAuth().githubSignIn
	console.log(useAuth().currentUser)
	return (
		<Box w={'lg'} className='flex flex-col justify-center mx-auto border-1 p-5'>
			<Heading as='h1' size='xl' className='flex justify-center mb-10'>
				Sign In
			</Heading>
			<p className='flex justify-center mb-5'>
				The world of organization awaits!
			</p>
			<Divider className='mb-10' />
			<div className='flex flex-col gap-5 my-5 w-80 mx-auto'>
				<Button
					className='gap-2 p-6 text-xl w-56 shadow-md items-center'
					onClick={googleSignIn}
				>
					<FcGoogle className='text-2xl' />{' '}
					<p className='text-xl font-normal'>Sign in with Google</p>
				</Button>
				<Button
					colorScheme={'whatsapp'}
					className='gap-2 p-6 text-xl w-56 shadow-md items-center'
					onClick={githubSignIn}
				>
					<BsGithub className='text-2xl' />{' '}
					<p className='text-xl font-normal'>Sign in with Github</p>
				</Button>
			</div>
		</Box>
	)
}

export default SignIn
