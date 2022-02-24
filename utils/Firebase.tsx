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
	currentUser: UserType | null
	googleSignIn: () => Promise<void | UserType | null | boolean>
	githubSignIn: () => Promise<void | UserType | null | boolean>
	linkWithGoogle: () => Promise<void>
	linkWithGithub: () => Promise<void>
	unlinkFromGoogle: () => Promise<void>
	unlinkFromGithub: () => Promise<void>
	logout: () => Promise<void>
	emailExists: boolean
	googleUnlinkDisabled: boolean
	githubUnlinkDisabled: boolean
}

export interface UserType {
	uid: string
	displayName: string
	email: string
	photoUrl: string
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
