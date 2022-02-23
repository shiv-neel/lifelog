import {
	createUserWithEmailAndPassword,
	FacebookAuthProvider,
	GithubAuthProvider,
	GoogleAuthProvider,
	linkWithPopup,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	TwitterAuthProvider,
	User,
	UserCredential,
} from 'firebase/auth'
import Router from 'next/router'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth, AuthType, UserType } from './Firebase'

const AuthContext = createContext<AuthType>({} as AuthType)

export const useAuth = () => {
	return useContext(AuthContext)
}

export const AuthProvider: React.FC = ({ children }) => {
	const [currentUser, setCurrentUser] = useState<UserType | null>(null)

	// converts User into custom UserType
	const createUserType = (user: User | null) => {
		if (user) {
			const userObject: UserType = {
				uid: user.uid,
				displayName: user.displayName!,
				email: user.email!,
				providerData: user.providerData!.map((u) => u.providerId),
			}
			setCurrentUser(userObject)
			Router.push('/dashboard')
			return userObject
		} else {
			setCurrentUser(null)
			return null
		}
	}

	const emailSignUp = (email: string, password: string) => {
		return createUserWithEmailAndPassword(auth, email, password).then(
			(result) => {
				return createUserType(result.user)
			}
		)
	}

	const emailSignIn = (email: string, password: string) => {
		return signInWithEmailAndPassword(auth, email, password).then((result) => {
			return createUserType(result.user)
		})
	}

	const googleProvider = new GoogleAuthProvider()
	const googleSignIn = async () => {
		return await signInWithPopup(auth, googleProvider)
			.then((result) => {
				return createUserType(result.user)
			})
			.catch((err) => console.log(err))
	}

	const githubProvider = new GithubAuthProvider()
	const githubSignIn = async () => {
		return await signInWithPopup(auth, githubProvider)
			.then((result) => {
				return createUserType(result.user)
			})
			.catch((err) => console.log(err))
	}

	const linkAccounts = async () => {
		return await linkWithPopup(auth.currentUser!, githubProvider)
			.then((result) => {
				createUserType(result.user)
			})
			.catch((err) => console.log(err))
	}

	const logout = async () => {
		return await signOut(auth).then(() => {
			console.log('Sign out successful.')
			Router.push('/')
		})
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			createUserType(user)
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
		linkAccounts,
		logout,
	}
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
