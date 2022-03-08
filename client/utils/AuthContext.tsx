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
import { addDoc, collection } from 'firebase/firestore'
import Router from 'next/router'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth, AuthType, db, UserType } from './Firebase'
import { injectUser } from './Users'

export const AuthContext = createContext<AuthType>({} as AuthType)

export const useAuth = () => {
	return useContext(AuthContext)
}

export const AuthProvider: React.FC = ({ children }) => {
	const [currentUser, setCurrentUser] = useState<UserType | null>(null)
	const [emailExists, setEmailExists] = useState<boolean>(false)
	const [googleUnlinkDisabled, setGoogleUnlinkDisabled] = useState<boolean>(
		currentUser?.providerData.length === 1 &&
			currentUser?.providerData[0] === 'google.com'
	)
	const [githubUnlinkDisabled, setGithubUnlinkDisabled] = useState<boolean>(
		currentUser?.providerData.length === 1 &&
			currentUser?.providerData[0] === 'github.com'
	)

	// converts User into custom UserType
	const createUserType = (user: User | null) => {
		if (user) {
			const userObject: UserType = {
				uid: user.uid,
				displayName: user.displayName!,
				email: user.email!,
				photoUrl: user.photoURL!,
				providerData: user.providerData!.map((u) => u.providerId),
				lastLogin: new Date(),
			}
			injectUser(userObject)
			setCurrentUser(userObject)
			return userObject
		} else {
			setCurrentUser(null)
			console.log('could not create user')
			Router.push('/')
			return null
		}
	}

	const googleProvider = new GoogleAuthProvider()
	const googleSignIn = async () => {
		return await signInWithPopup(auth, googleProvider)
			.then((result) => {
				return createUserType(result.user)
			})
			.then(() => Router.push('../dashboard'))
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
				setEmailExists(true)
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

	useEffect(() => {
		if (
			currentUser?.providerData.length === 1 &&
			currentUser.providerData[0] === 'github'
		) {
			setGithubUnlinkDisabled(true)
		}
		if (
			currentUser?.providerData.length === 1 &&
			currentUser.providerData[0] === 'google'
		) {
			setGoogleUnlinkDisabled(true)
		}
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
		emailExists,
		googleUnlinkDisabled,
		githubUnlinkDisabled,
	}
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
