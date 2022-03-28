import { Box, Heading } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useUser } from '../src/utils/auth'
import { UserType } from '../src/utils/types'

const Dashboard = () => {
	const [timeOfDay, setTimeOfDay] = useState('')
	const user = useUser()
	const hour = new Date().getHours()

	useEffect(() => {
		if (hour < 12) setTimeOfDay('Morning')
		else if (hour >= 12 && hour < 17) setTimeOfDay('Afternoon')
		else setTimeOfDay('Evening')
	}, [hour, user])

	return (
		<Box className='mx-20 mt-10'>
			<Heading as='h1'>
				Good {timeOfDay}, {user?.username}.
			</Heading>
		</Box>
	)
}

export default Dashboard
