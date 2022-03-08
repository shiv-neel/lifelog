import firebase, {
	FirebaseApp,
	getApp,
	getApps,
	initializeApp,
} from 'firebase/app'

import 'firebase/auth'

import { Auth, getAuth, User, UserCredential } from 'firebase/auth'

import {
	collection,
	doc,
	Firestore,
	getDocs,
	getFirestore,
	setDoc,
} from 'firebase/firestore'

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
	lastLogin: Date | null
}

const firebaseConfig = {
	apiKey: 'AIzaSyBlzcUlfDSOdeknooVhs9sAzYBLCtHzuzc',
	authDomain: 'lifelog-app-189b8.firebaseapp.com',
	projectId: 'lifelog-app-189b8',
	storageBucket: 'lifelog-app-189b8.appspot.com',
	messagingSenderId: '1005865703931',
	appId: '1:1005865703931:web:75bd21aabbc3624b86535e',
	measurementId: 'G-QTRX0QNMWL',
}
export const app: FirebaseApp = !getApps().length
	? initializeApp(firebaseConfig)
	: getApp() // if already initialized, use that one

export const auth: Auth = getAuth(app)
export const db: Firestore = getFirestore(app)
