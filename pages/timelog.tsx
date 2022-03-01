import { Box, Heading } from '@chakra-ui/react'
import React from 'react'
import CreateLog from '../components/TimeLogging/CreateLog'
import LoggedTasks from '../components/TimeLogging/LoggedTasks'
import { injectTask } from '../utils/TimeLogUtils'

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
