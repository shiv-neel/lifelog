import { Box, Button, FormLabel, Input } from '@chakra-ui/react'
import { doc, setDoc } from 'firebase/firestore'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext, useAuth } from '../../utils/AuthContext'
import { db } from '../../utils/Firebase'
import {
	clearCurrentTask,
	injectTask,
	updateTask,
} from '../../utils/TimeLogUtils'

const CreateLog = () => {
	const [input, setInput] = useState<string>('')
	const [task, setTask] = useState<string>('')
	const [isDisabled, setDisabled] = useState<boolean>(false)
	const [isActive, setActive] = useState<boolean>(false)
	const [isPaused, setPaused] = useState<boolean>(true)
	const [time, setTime] = useState<number>(0)
	const user = useAuth().currentUser

	useEffect(() => {
		var interval: any
		if (isActive) {
			interval = setInterval(() => {
				setTime((oldTime) => oldTime + 1)
				updateTask(user, time, task)
			}, 1000)
		} else clearInterval(interval)
		return () => clearInterval(interval) // clear interval if component unmounts
	}, [isActive, isPaused, time])

	const startHandler = () => {
		if (!input && !task) return
		if (!task) {
			setTask(input)
			setInput('')
		}
		setActive(true)
		setPaused(false)
		setDisabled(true)
	}

	const pauseHandler = () => {
		setActive(false)
		setPaused(true)
		setDisabled(true)
	}
	const resetHandler = async () => {
		pauseHandler()
		setTime(0)
		setDisabled(false)
		setInput('')
		setTask('')

		if (user) {
			const taskToInject = {
				taskId: Math.random().toString(),
				taskname: task,
				duration: time,
				date: Number(new Date()),
				user: user,
			}
			await clearCurrentTask(user)
			await injectTask(user, taskToInject)
		}
	}

	return (
		<Box>
			<FormLabel htmlFor='input'></FormLabel>
			<Input
				id='input'
				placeholder='What are you working on?'
				w={'md'}
				className='p-5 flex my-5'
				value={input}
				onChange={(e) => setInput(e.target.value)}
				isDisabled={isDisabled}
			/>
			{time}
			<Button onClick={isActive ? pauseHandler : startHandler}>
				{!isActive ? 'start' : 'pause'}
			</Button>
			<Button onClick={resetHandler}>stop</Button>
			{task}
		</Box>
	)
}

export default CreateLog
