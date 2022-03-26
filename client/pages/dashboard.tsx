import { Box, Heading } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useMeQuery } from '../src/generated/graphql'

const Dashboard = () => {
	const [timeOfDay, setTimeOfDay] = useState('')
	const hour = new Date().getHours()
	useEffect(() => {
		if (hour < 12) setTimeOfDay('Morning')
		else if (hour >= 12 && hour < 17) setTimeOfDay('Afternoon')
		else setTimeOfDay('Evening')
	}, [hour])

	return (
		<Box className='mx-20 mt-10'>
			<Heading as='h1'>
				Good {timeOfDay}, {}.
			</Heading>
		</Box>
	)
}

export default Dashboard
