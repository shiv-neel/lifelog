import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth, AuthType, googleSignIn, UserType } from './Auth'

const AuthContext = createContext<AuthType | null>(null)

export const useAuth = () => {
	return useContext(AuthContext)
}

export const AuthProvider: React.FC = ({ children }) => {
	const [currentUser, setCurrentUser] = useState<UserType | null>()

	const signIn = () => {
		return googleSignIn()
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			//setCurrentUser(user)
		})
	}, [])
	const value = {
		currentUser,
	}
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
