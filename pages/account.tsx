import { Box, Button } from '@chakra-ui/react'
import React from 'react'
import { useAuth } from '../utils/AuthContext'

const Account = () => {
	const user = useAuth().currentUser
	const logout = useAuth().logout
	return (
		<Box w='xl' className='flex justify-center'>
			<ul className=''>
				<li>Signed in as {user?.displayName}</li>
				<Button className='flex' onClick={logout}>
					Sign Out
				</Button>
			</ul>
		</Box>
	)
}

export default Account
