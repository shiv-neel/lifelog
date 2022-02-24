import { Box, Button, Divider, Heading } from '@chakra-ui/react'
import { useAuth } from '../utils/AuthContext'
import { FcGoogle } from 'react-icons/fc'
import { BsGithub } from 'react-icons/bs'

const SignIn = () => {
	const googleSignIn = useAuth().googleSignIn
	const githubSignIn = useAuth().githubSignIn
	const emailExists = useAuth().emailExists
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
				<p className='font-semibold my-5 leading-relaxed text-center'>
					{emailExists ? (
						<>
							<p className='text-red-500 text-lg'>
								You already have a Google account with this email registered
								with us.
							</p>
							<br></br>
							<p className='font-thin italic text-gray-500'>
								Please log in to your Google account, and then connect your
								Github account.
							</p>
						</>
					) : (
						''
					)}
				</p>
			</div>
		</Box>
	)
}

export default SignIn
