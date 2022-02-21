import { Button } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { SiNotion } from 'react-icons/si'
import { googleSignIn } from '../utils/Auth'

const Navbar = () => {
	return (
		<nav className='w-full'>
			<ul className='flex justify-end items-center gap-10 py-12 mr-12'>
				<li className='mr-auto ml-12'>
					<a href='/' className='flex items-center text-2xl'>
						<SiNotion className='text-6xl' />
						otion
					</a>
				</li>
				<li>
					<Link href='/dashboard'>Dashboard</Link>
				</li>
				<li>
					<Link href='/widgets'>Widgets</Link>
				</li>
				<li>
					<Link href='/templates'>Templates</Link>
				</li>
				<li>
					<Button>
						<Link href='/SignUp'>Sign In</Link>
					</Button>
				</li>
			</ul>
		</nav>
	)
}

export default Navbar
