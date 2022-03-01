import { UserType } from "./Firebase"
import { db } from "./Firebase"
import { setDoc, doc } from "firebase/firestore"

export const injectUser = async (user: UserType) => {
    await setDoc(doc(db, 'user', user.uid), {
        ...user,
        lastLogin: new Date()
    })
}