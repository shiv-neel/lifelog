import { Button, Image } from '@chakra-ui/react'
import Link from 'next/link'
import { SiNotion } from 'react-icons/si'
import { BsPlusSquare } from 'react-icons/bs'
import { useAuth } from '../../utils/AuthContext'
import { useState } from 'react'
import { FaRegUserCircle } from 'react-icons/fa'

interface NavbarProps {
	userId: number
}

const Navbar: React.FC<NavbarProps> = ({ userId }) => {
	return (
		<nav className='w-full'>
			<ul className='flex justify-end items-center gap-10 py-12 mr-12'>
				<li className='mr-auto ml-12 cursor-pointer select-none'>
					<Link href='/' passHref>
						<div className='flex items-center gap-1'>LOGO</div>
					</Link>
				</li>
				<li className='hover:scale-105 duration-100 hover:underline'>
					<Link href='/dashboard'>Dashboard</Link>
				</li>
				<li className='hover:scale-105 duration-100 hover:underline'>
					<Link href='/timelog'>Time Log</Link>
				</li>
				<li className='hover:scale-105 duration-100 hover:underline'>
					<Link href='/habits'>Habits</Link>
				</li>
				<li className='hover:scale-105 duration-100 hover:underline'>
					<Link href='/goals'>Goals</Link>
				</li>
				<li>
					{userId ? (
						<Link href='/account' passHref>
							<div>
								<FaRegUserCircle className='text-4xl cursor-pointer hover:scale-105 duration-100' />
							</div>
						</Link>
					) : (
						<Link href='/login' passHref>
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
