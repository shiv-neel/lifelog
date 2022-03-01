import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore'
import { useAuth } from './AuthContext'
import { db, UserType } from './Firebase'

export interface TaskType {
	taskId: string
	taskname: string
	duration: number
	date: number
	user: UserType
}

export const updateTask = async (
	user: UserType | null,
	duration: number,
	taskname: string
) => {
	if (user) {
		await setDoc(doc(db, `user/${user?.uid}/tasks`, 'current'), {
			taskId: 'current',
			duration: duration,
			taskname: taskname,
			date: Number(new Date()),
			user: user,
		})
	}
}
export const clearCurrentTask = async (user: UserType) => {
	return await setDoc(doc(db, `user/${user?.uid}/tasks`, 'current'), {
		taskname: '',
		duration: 0,
	})
}

export const injectTask = async (user: UserType, task: TaskType) => {
	return await setDoc(doc(db, `user/${user?.uid}/tasks`, task.taskId), task)
}

export const pullTasksFromDB = async (user: UserType | null) => {
	const tasksCollection = collection(db, `user/${user?.uid}/tasks`)
	const queryTasks = await getDocs(tasksCollection)
	var tasks: TaskType[] = []
	queryTasks.forEach((doc) => {
		const taskToTaskType: TaskType = {
			taskId: doc.data().taskId,
			taskname: doc.data().taskname,
			duration: doc.data().duration,
			user: doc.data().user,
			date: doc.data().date?.seconds * 1000,
		}
		if (taskToTaskType.taskId !== 'current') tasks.push(taskToTaskType)
	})
	return tasks
}
