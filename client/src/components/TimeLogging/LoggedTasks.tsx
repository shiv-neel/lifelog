import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import { AppContext } from 'next/app'
import React, { useEffect, useRef, useState } from 'react'
import { useUser } from '../../utils/auth'
import TaskCard from './TaskCard'

const LoggedTasks = () => {
	const user = useUser()

	const mounted = useRef(false)
	useEffect(() => {
		mounted.current = true
		return () => {
			mounted.current = false
		}
	}, [])

	return <ul></ul>
}

export const getServerSideProps = async (context: AppContext) => {}

export default LoggedTasks
