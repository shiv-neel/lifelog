import { Button, Divider, Heading } from '@chakra-ui/react'
import React from 'react'
import { BsGithub } from 'react-icons/bs'
import { FaTwitter } from 'react-icons/fa'
import { IoLogoGoogle } from 'react-icons/io'
import { useAuth } from '../utils/AuthContext'

const Connections = () => {
	const googleSignIn = useAuth().googleSignIn
	const twitterSignIn = useAuth().twitterSignIn
	const githubSignIn = useAuth().githubSignIn

	return (
		<div>
			<Divider className='my-10' />
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
					onClick={twitterSignIn}
					className='hover:scale-105 duration-100'
					style={{
						width: 60,
						height: 60,
						borderRadius: '50%',
					}}
					colorScheme={'blue'}
				>
					<FaTwitter className='text-3xl' />
				</Button>
				<Button
					onClick={githubSignIn}
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
		</div>
	)
}

export default Connections
