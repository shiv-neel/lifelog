import firebase, {
	FirebaseApp,
	getApp,
	getApps,
	initializeApp,
} from 'firebase/app'

import 'firebase/auth'

import { getAuth, User, UserCredential } from 'firebase/auth'

import { getFirestore } from 'firebase/firestore'

export interface AuthType {
	currentUser: User | null
	emailSignUp: (
		email: string,
		password: string
	) => Promise<UserCredential | null>

	emailSignIn: (
		email: string,
		password: string
	) => Promise<UserCredential | void>

	googleSignIn: () => Promise<UserCredential | void>
	githubSignIn: () => Promise<UserCredential | void>
	twitterSignIn: () => Promise<UserCredential | void>
	logout: () => Promise<void>
}

export interface UserType {
	uid: string
	displayName: string
	email: string
	photoURL: string
	providerData: string[]
}

const firebaseConfig = {
	apiKey: 'AIzaSyCBJV8o38ddncta2brGPhpluAuTRSQ_n0k',
	authDomain: 'notion-2d1b1.firebaseapp.com',
	projectId: 'notion-2d1b1',
}
export const app: FirebaseApp = !getApps().length
	? initializeApp(firebaseConfig)
	: getApp() // if already initialized, use that one

export const auth = getAuth(app)
export const db = getFirestore(app)
