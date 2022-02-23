import {
	createUserWithEmailAndPassword,
	GithubAuthProvider,
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	TwitterAuthProvider,
	User,
	UserCredential,
} from 'firebase/auth'
import Router from 'next/router'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth, AuthType } from './Firebase'

const AuthContext = createContext<AuthType>({} as AuthType)

export const useAuth = () => {
	return useContext(AuthContext)
}

export const AuthProvider: React.FC = ({ children }) => {
	const [currentUser, setCurrentUser] = useState<User | null>(null)

	const emailSignUp = (email: string, password: string) => {
		return createUserWithEmailAndPassword(auth, email, password).then(
			(result) => {
				setCurrentUser(result.user)
				Router.push('/dashboard')
				return result
			}
		)
	}

	const emailSignIn = (email: string, password: string) => {
		return signInWithEmailAndPassword(auth, email, password).then((result) => {
			setCurrentUser(result.user)
			Router.push('/Dashboard')
			return result
		})
	}

	const googleProvider = new GoogleAuthProvider()
	const googleSignIn = async () => {
		return await signInWithPopup(auth, googleProvider)
			.then((result) => {
				setCurrentUser(result.user)
				Router.push('/Dashboard')
				return result
			})
			.catch(() => alert('Error: Could not authenticate google account.'))
	}

	const githubProvider = new GithubAuthProvider()
	const githubSignIn = async () => {
		return await signInWithPopup(auth, githubProvider)
			.then((result) => {
				console.log(result)
				setCurrentUser(result.user)
				Router.push('/Dashboard')
				return result
			})
			.catch(() => alert('Error: Could not authenticate github account.'))
	}

	const twitterProvider = new TwitterAuthProvider()
	const twitterSignIn = async () => {
		return await signInWithPopup(auth, twitterProvider)
			.then((result) => {
				console.log(result)
				setCurrentUser(result.user)
				return result
			})
			.catch(() => alert('Error: Could not authenticate twitter account.'))
	}

	const logout = async () => {
		return await signOut(auth).then(() => {
			console.log('Sign out successful.')
			Router.push('/')
		})
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user)
			console.log(user)
		})
		return unsubscribe
	}, [])
	const value = {
		currentUser,
		emailSignUp,
		emailSignIn,
		googleSignIn,
		githubSignIn,
		twitterSignIn,
		logout,
	}
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
