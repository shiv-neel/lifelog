import { Box, Heading } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import HydrationWidget from './widgets/Hydration/HydrationWidget'

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
