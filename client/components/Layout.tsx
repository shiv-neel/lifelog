import React from 'react'
import { AuthProvider } from '../utils/AuthContext'
import Navbar from './Navbar'

const Layout: React.FC = ({ children }) => {
	return (
		<AuthProvider>
			<Navbar />
			{children}
		</AuthProvider>
	)
}

export default Layout
