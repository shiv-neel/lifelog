import {
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	setDoc,
	where,
} from 'firebase/firestore'
import { useAuth } from './AuthContext'
import { db, UserType } from './Firebase'

export interface TaskType {
	taskId: string
	taskname: string
	duration: number
	date: number
	uid: string
}

export const createTask = async (user: UserType, task: TaskType) => {
	return await setDoc(
		doc(db, 'tasks', 't' + Math.random().toString().slice(2)),
		task
	)
}

export const pullTasksFromDB = async (user: UserType | null) => {
	const tasksCollection = collection(db, 'tasks')
	if (user) {
		const queryTasks = query(tasksCollection, where('uid', '==', user.uid))
		var tasks: TaskType[] = []
		const querySnapshot = await getDocs(queryTasks)
		querySnapshot.forEach((doc) => {
			const taskToTaskType: TaskType = {
				taskId: doc.data().taskId,
				taskname: doc.data().taskname,
				duration: doc.data().duration,
				uid: user.uid,
				date: doc.data().date?.seconds * 1000,
			}
			tasks.push(taskToTaskType)
		})
		return tasks
	}
}
