import { Box, Heading } from '@chakra-ui/react'
import { addDoc, collection } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../utils/AuthContext'

const Dashboard = () => {
	const [timeOfDay, setTimeOfDay] = useState('')
	const hour = new Date().getHours()
	useEffect(() => {
		if (hour < 12) setTimeOfDay('Morning')
		else if (hour >= 12 && hour < 17) setTimeOfDay('Afternoon')
		else setTimeOfDay('Evening')
	}, [])

	return (
		<Box className='mx-20 mt-10'>
			<Heading as='h1'>
				Good {timeOfDay}, {useAuth().currentUser?.displayName.split(' ')[0]}.
			</Heading>
		</Box>
	)
}

export default Dashboard
