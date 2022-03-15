import React from 'react'
import { AuthProvider } from '../../utils/AuthContext'
import Navbar from './Navbar'

const Layout: React.FC = ({ children }) => {
	return (
		<AuthProvider>
			<Navbar userId={0} />
			{children}
		</AuthProvider>
	)
}

export default Layout
