import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../utils/AuthContext'
import { db } from '../../utils/Firebase'
import { pullTasksFromDB, TaskType } from '../../utils/TimeLogUtils'
import TaskCard from './TaskCard'

const LoggedTasks = () => {
	const [tasks, setTasks] = useState<TaskType[]>([])
	const user = useAuth().currentUser
	useEffect(() => {
		if (user) pullTasksFromDB(user).then((res) => setTasks(res))
	}, [user, tasks])
	return (
		<ul>
			{tasks.map((t, i) => (
				<li key={i}>
					<TaskCard task={t} />
				</li>
			))}
		</ul>
	)
}

export default LoggedTasks
