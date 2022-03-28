import {
	Box,
	Button,
	Divider,
	Heading,
	Switch,
	useColorMode,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { MdDarkMode } from 'react-icons/md'
import { CgSun } from 'react-icons/cg'
import { useUser } from '../src/utils/auth'
import { useRouter } from 'next/router'

const Account = () => {
	const [timeOfDay, setTimeOfDay] = useState('')
	const user = useUser()
	const router = useRouter()
	if (!user) router.push('/login')
	const hour = new Date().getHours()
	useEffect(() => {
		if (hour < 12) setTimeOfDay('Morning')
		else if (hour >= 12 && hour < 17) setTimeOfDay('Afternoon')
		else setTimeOfDay('Evening')
	})

	const { colorMode, toggleColorMode } = useColorMode()

	return (
		<Box w='xl' className='flex flex-col justify-center mx-auto border-1 p-5'>
			<Heading as='h1' className='flex justify-center mb-10'>
				Account
			</Heading>
			<Divider className='mb-10' />
			<ul className='flex flex-col justify-center mx-auto gap-y-4 w-100'>
				<p className='mb-5 text-lg mx-auto'>
					Good {timeOfDay}, <strong>{user?.username}</strong>.
				</p>

				<Box className='mb-5 mx-auto space-x-3'>
					<span>{colorMode} mode</span>{' '}
					<Button onClick={toggleColorMode} borderRadius={'50'}>
						{colorMode === 'dark' ? (
							<MdDarkMode className='text-xl' />
						) : (
							<CgSun className='text-xl' />
						)}
					</Button>
				</Box>
				<p>
					You've committed to bettering yourself since{' '}
					{new Date(Number(user?.createdAt)).toLocaleDateString()}.
				</p>
				<Button
					className='gap-2 p-5 mt-2 text-xl w-56 items-center'
					variant={'ghost'}
					//onClick={logout}
				>
					Sign Out
				</Button>
			</ul>
		</Box>
	)
}

export default Account
