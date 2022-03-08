import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import { AppContext } from 'next/app'
import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../../utils/AuthContext'
import { db } from '../../utils/Firebase'
import { pullTasksFromDB, TaskType } from '../../utils/TimeLogUtils'
import TaskCard from './TaskCard'

const LoggedTasks = () => {
	const [tasks, setTasks] = useState<TaskType[]>([])
	const user = useAuth().currentUser

	const mounted = useRef(false)
	useEffect(() => {
		mounted.current = true
		return () => {
			mounted.current = false
		}
	}, [])

	useEffect(() => {
		const asyncPull = async () => {
			if (mounted.current) {
				await pullTasksFromDB(user).then((res) => (res ? setTasks(res) : null))
			}
		}
		asyncPull()
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

export const getServerSideProps = async (context: AppContext) => {
	const user = useAuth().currentUser
	const tasks = await pullTasksFromDB(user)
	return {
		props: {
			tasks: tasks,
		},
	}
}

export default LoggedTasks
