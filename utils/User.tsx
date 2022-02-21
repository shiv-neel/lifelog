import { doc, setDoc, Timestamp } from 'firebase/firestore'
import { db, UserType } from './Firebase'

const createUser = async (data: UserType) => {
	// adds a new document/json object to collection 'users'
	return await setDoc(
		doc(db, 'users', data.uid),
		{
			...data,
			time: Timestamp.now(),
		},
		{ merge: true }
	)
}

export default createUser
