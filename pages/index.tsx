import { Box, Heading } from '@chakra-ui/react'
import type { NextPage } from 'next'

const Home: NextPage = () => {
	return (
		<Box>
			<Heading as='h1' className='text-3xl font-bold mx-20 mt-10'>
				Notion++
			</Heading>
		</Box>
	)
}

export default Home
