import { useContext, createContext, useState, useEffect } from 'react'
import { useMeQuery } from '../generated/graphql'
import { UserType } from './types'

export const UserContext = createContext<UserType | null>({} as UserType)

export const useUser = () => {
	return useContext(UserContext)
}

export const UserProvider: React.FC = ({ children }) => {
	const [{ data, fetching }] = useMeQuery()
	let body = null
	if (!fetching && data?.me) {
		body = data?.me
	} else {
		// no user logged in
		body = null
	}
	const value: UserType | null = body

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
