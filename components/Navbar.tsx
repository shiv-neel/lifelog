import { Button } from '@chakra-ui/react'
import Link from 'next/link'
import { SiNotion } from 'react-icons/si'
import { useAuth } from '../utils/AuthContext'

const Navbar = () => {
	const user = useAuth().currentUser
	const logout = useAuth().logout
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
					{user ? <Button onClick={logout}>Account</Button>:<Button>
						<Link href='/SignIn'>Sign In</Link>
					</Button>}
					
				</li>
			</ul>
		</nav>
	)
}

export default Navbar
