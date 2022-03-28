import React from 'react'
import { UserProvider } from '../utils/auth'
import Footer from './Footer'
import Navbar from './Navbar'

const Layout: React.FC = ({ children }) => {
	return (
		<UserProvider>
			<Navbar />
			{children}
			<Footer />
		</UserProvider>
	)
}

export default Layout
