import { Box, Button, Heading } from '@chakra-ui/react'
import React from 'react'
import { FaPlus } from 'react-icons/fa'

const Habits = () => {
	return (
		<Box className='mx-20 mt-10'>
			<Heading as='h1'>Habits</Heading>
			<Box>
				<Button className='text-3xl gap-2 mt-5 mb-10'>
					<FaPlus />
					Create New Habit
				</Button>
				<Heading as='h3' size='lg'>
					Daily
				</Heading>
			</Box>
		</Box>
	)
}

export default Habits
