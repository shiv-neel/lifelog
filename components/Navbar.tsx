import { Button, Image } from '@chakra-ui/react'
import Link from 'next/link'
import { SiNotion } from 'react-icons/si'
import { BsPlusSquare } from 'react-icons/bs'
import { useAuth } from '../utils/AuthContext'
import { useState } from 'react'
import { FaRegUserCircle } from 'react-icons/fa'

const Navbar = () => {
	const user = useAuth().currentUser
	const logout = useAuth().logout

	return (
		<nav className='w-full'>
			<ul className='flex justify-end items-center gap-10 py-12 mr-12'>
				<li className='mr-auto ml-12 cursor-pointer select-none'>
					<Link href='/' passHref>
						<div className='flex items-center gap-1'>
							<SiNotion className='text-6xl' />
							<BsPlusSquare className='text-4xl' />
							<BsPlusSquare className='text-4xl' />
						</div>
					</Link>
				</li>
				<li className='hover:scale-105 duration-100 hover:underline'>
					<Link href='/Dashboard'>Dashboard</Link>
				</li>
				<li className='hover:scale-105 duration-100 hover:underline'>
					<Link href='/widgets'>Widgets</Link>
				</li>
				<li className='hover:scale-105 duration-100 hover:underline'>
					<Link href='/templates'>Templates</Link>
				</li>
				<li>
					{user ? (  
						<Link href='/account' passHref>
							{user.photoUrl ? <Image style={{ borderRadius: '50%', width: '50px', height: '50px' }} src={useAuth().currentUser?.photoUrl
							} className='shadow-lg cursor-pointer hover:scale-110 duration-100 active:scale-100'></Image> :
							<div>
								<FaRegUserCircle className='text-4xl cursor-pointer hover:scale-105 duration-100' />
							</div>}
						</Link>
					) : (
						<Link href='/SignIn' passHref>
							<Button
								className='cursor-pointer shadow-lg hover:scale-110 duration-100 active:scale-100'
								style={{ background: 'none', border: '2px solid' }}
							>
								Sign In
							</Button>
						</Link>
					)}
				</li>
			</ul>
			<div></div>
		</nav>
	)
}

export default Navbar
