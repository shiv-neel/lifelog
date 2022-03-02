import {
	Box,
	Button,
	Divider,
	Heading,
	Switch,
	useColorMode,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BsGithub } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'
import { useAuth } from '../utils/AuthContext'
import { MdDarkMode } from 'react-icons/md'
import { CgSun } from 'react-icons/cg'

const Account = () => {
	const user = useAuth().currentUser
	const logout = useAuth().logout
	const linkGoogle = useAuth().linkWithGoogle
	const unlinkGoogle = useAuth().unlinkFromGoogle
	const linkGithub = useAuth().linkWithGithub
	const unlinkGithub = useAuth().unlinkFromGithub
	const [isLinkedWithGoogle, toggleLinkedWithGoogle] = useState<boolean>(
		user?.providerData.find((p: string) => p === 'google.com') ? true : false
	)
	const [isLinkedWithGithub, toggleLinkedWithGithub] = useState<boolean>(
		user?.providerData.find((p: string) => p === 'github.com') ? true : false
	)

	useEffect(() => {
		if (user) {
			toggleLinkedWithGoogle(
				user?.providerData.find((p: string) => p === 'google.com')
					? true
					: false
			)
			toggleLinkedWithGithub(
				user?.providerData.find((p: string) => p === 'github.com')
					? true
					: false
			)
		}
	}, [user])

	const [timeOfDay, setTimeOfDay] = useState('')
	const hour = new Date().getHours()
	useEffect(() => {
		if (hour < 12) setTimeOfDay('Morning')
		else if (hour >= 12 && hour < 17) setTimeOfDay('Afternoon')
		else setTimeOfDay('Evening')
	})

	const { colorMode, toggleColorMode } = useColorMode()

	const googleHandler = () => {
		if (isLinkedWithGoogle) {
			unlinkGoogle().then(() => alert('Successfully unlinked google account.'))
		} else {
			linkGoogle().then(() => alert('Successfully linked google account.'))
		}
		toggleLinkedWithGoogle((p) => !p)
	}

	const githubHandler = () => {
		if (isLinkedWithGithub) {
			unlinkGithub().then(() => alert('Successfully unlinked github account.'))
		} else {
			linkGithub().then(() => alert('Successfully linked github account.'))
		}
		toggleLinkedWithGithub((p) => !p)
	}

	return (
		<Box w='xl' className='flex flex-col justify-center mx-auto border-1 p-5'>
			<Heading as='h1' className='flex justify-center mb-10'>
				Account
			</Heading>
			<Divider className='mb-10' />
			<ul className='flex flex-col justify-center mx-auto gap-y-4 w-80'>
				<p className='mb-5 text-lg mx-auto'>
					Good {timeOfDay}, {user?.displayName}.
				</p>
				<Box className='mb-5 mx-auto space-x-3'>
					<span>{colorMode} mode</span>{' '}
					<Button onClick={toggleColorMode}>
						{colorMode === 'dark' ? (
							<MdDarkMode className='text-xl' />
						) : (
							<CgSun className='text-xl' />
						)}
					</Button>
				</Box>
				<Button
					onClick={googleHandler}
					className='gap-2 p-6 text-xl w-56 shadow-md items-center'
					disabled={isLinkedWithGoogle && !isLinkedWithGithub}
				>
					<FcGoogle className='text-2xl' />{' '}
					<p className='font-normal text-xl'>
						{isLinkedWithGoogle ? 'Unlink from' : 'Link with'} Google
					</p>
				</Button>
				<Button
					onClick={githubHandler}
					colorScheme={'whatsapp'}
					className='gap-2 p-6 text-xl w-56 shadow-md items-center'
					disabled={isLinkedWithGithub && !isLinkedWithGoogle}
				>
					<BsGithub className='text-2xl' />{' '}
					<p className='font-normal text-xl'>
						{isLinkedWithGithub ? 'Unlink from' : 'Link with'} Github
					</p>
				</Button>
				<Button
					className='gap-2 p-5 mt-5 text-xl w-56 items-center'
					variant={'ghost'}
					onClick={logout}
				>
					Sign Out
				</Button>
			</ul>
		</Box>
	)
}

export default Account
