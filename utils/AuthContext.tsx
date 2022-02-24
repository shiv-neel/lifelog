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
	unlink,
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
				photoUrl: user.photoURL!,
				providerData: user.providerData!.map((u) => u.providerId),
			}
			setCurrentUser(userObject)
			console.log(userObject)
			return userObject
		} else {
			setCurrentUser(null)
			console.log('could not create user')
			return null
		}
	}

	const googleProvider = new GoogleAuthProvider()
	const googleSignIn = async () => {
		return await signInWithPopup(auth, googleProvider)
			.then((result) => {
				return createUserType(result.user)
			})
			.then(() => Router.push('../Dashboard'))
			.catch((err) => console.log(err))
	}

	const linkWithGoogle = async () => {
		return await linkWithPopup(auth.currentUser!, googleProvider)
			.then((result) => {
				createUserType(result.user)
			})
			.catch((err) => console.log(err))
	}

	const unlinkFromGoogle = async () => {
		return await unlink(auth.currentUser!, 'google.com').then(() => {
			console.log('unlinked account from google')
		})
	}

	const githubProvider = new GithubAuthProvider()
	const githubSignIn = async () => {
		return await signInWithPopup(auth, githubProvider)
			.then((result) => {
				return createUserType(result.user)
			})
			.then(() => Router.push('../Dashboard'))
			.catch((error) => {
				console.log(error)
				console.log(`an account already exists with your email.`)
				console.log(currentUser)
			})
	}

	const linkWithGithub = async () => {
		return await linkWithPopup(auth.currentUser!, githubProvider)
			.then((result) => {
				createUserType(result.user)
			})
			.catch((err) => console.log(err))
	}

	const unlinkFromGithub = async () => {
		return await unlink(auth.currentUser!, 'github.com').then(() => {
			console.log('unlinked account from github')
		})
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
		})
		return unsubscribe
	}, [])
	const value = {
		currentUser,
		googleSignIn,
		githubSignIn,
		linkWithGoogle,
		linkWithGithub,
		unlinkFromGoogle,
		unlinkFromGithub,
		logout,
	}
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
