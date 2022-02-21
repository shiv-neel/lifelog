import firebase, {
	FirebaseApp,
	getApp,
	getApps,
	initializeApp,
} from 'firebase/app'

import 'firebase/auth'

import {
	getAuth,
	getRedirectResult,
	connectAuthEmulator,
	GoogleAuthProvider,
	signOut,
	User,
	signInWithPopup,
} from 'firebase/auth'

import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyCBJV8o38ddncta2brGPhpluAuTRSQ_n0k',
	authDomain: 'notion-2d1b1.firebaseapp.com',
	projectId: 'notion-2d1b1',
}
export const app: FirebaseApp = !getApps().length
	? initializeApp(firebaseConfig)
	: getApp() // if already initialized, use that one

export const db = getFirestore(app)

export interface UserType {
	userId: string
	displayName: string
	email: string
	photoURL: string
	providerData: string[]
}

export interface AuthType {
	user: UserType | null
	googleSignIn: () => Promise<UserType | null>
	signout: () => Promise<void>
}

export const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export const googleSignIn = async () => {
	console.log('yo')
	return await signInWithPopup(auth, provider).then((res) => {
		// gives us google access token
		const credential = GoogleAuthProvider.credentialFromResult(res)
		const token = credential?.accessToken
		const user = res.user
		console.log(user)
	})
}
