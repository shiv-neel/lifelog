import { Box, Button, FormLabel, Heading, Input } from '@chakra-ui/react'
import { doc, setDoc } from 'firebase/firestore'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { BsFillPauseFill, BsFillPlayFill, BsStopFill } from 'react-icons/bs'
import { AuthContext, useAuth } from '../../utils/AuthContext'
import { db } from '../../utils/Firebase'
import { createTask } from '../../utils/TimeLogUtils'

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
				uid: user.uid,
			}
			await createTask(user, taskToInject)
		}
	}

	return (
		<Box className='flex flex-col justify-center text-center'>
			<FormLabel htmlFor='input'>Take control of your time!</FormLabel>
			<Input
				id='input'
				placeholder='What are you working on?'
				w={'lg'}
				className='p-5 flex my-5 mx-auto justify-center'
				value={input}
				onChange={(e) => setInput(e.target.value)}
				isDisabled={isDisabled}
			/>
			<p className='text-3xl font-bold p-3'>{time}</p>
			<Box className='flex justify-center space-x-5'>
				<Button
					onClick={isActive ? pauseHandler : startHandler}
					variant='solid'
					className='shadow-md text-center active:-rotate-180 duration-200'
					colorScheme={isActive ? 'whiteAlpha' : 'linkedin'}
					borderRadius={'100'}
					w={50}
					h={50}
				>
					<p className='font-light text-4xl'>
						{!isActive ? (
							<BsFillPlayFill className='pl-1' />
						) : (
							<BsFillPauseFill color='#0072b1' />
						)}
					</p>
				</Button>
				<Button
					onClick={resetHandler}
					variant='solid'
					className='shadow-md text-center active:rotate-180 duration-200'
					colorScheme={'whiteAlpha'}
					borderRadius={'100'}
					w={50}
					h={50}
				>
					<p className='font-light text-4xl'>
						<BsStopFill color='#d11f2c' />
					</p>
				</Button>
			</Box>
			{task}
		</Box>
	)
}

export default CreateLog
