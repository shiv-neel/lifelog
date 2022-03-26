import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'

const Layout: React.FC = ({ children }) => {
	return (
		<>
			<Navbar userId={0} />
			{children}
			<Footer />
		</>
	)
}

export default Layout
