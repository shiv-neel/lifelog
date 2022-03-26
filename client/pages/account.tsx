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
import { MdDarkMode } from 'react-icons/md'
import { CgSun } from 'react-icons/cg'

const Account = () => {
	const [timeOfDay, setTimeOfDay] = useState('')
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
			<ul className='flex flex-col justify-center mx-auto gap-y-4 w-80'>
				<p className='mb-5 text-lg mx-auto'>Good {timeOfDay},</p>
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
					className='gap-2 p-5 mt-5 text-xl w-56 items-center'
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
