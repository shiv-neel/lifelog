import { Box, Heading } from '@chakra-ui/react'
import React from 'react'
import CreateLog from '../src/components/TimeLogging/CreateLog'
import LoggedTasks from '../src/components/TimeLogging/LoggedTasks'

const TimeLog = () => {
	return (
		<Box className='mx-20 mt-10'>
			<Heading as='h1'>Time Log</Heading>
			<CreateLog />
			<LoggedTasks />
		</Box>
	)
}

export default TimeLog
