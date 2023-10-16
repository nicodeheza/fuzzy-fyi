import {Organization, User} from '@prisma/client'
import {supabase} from '@services/supabase'
import {useCallback, useState} from 'react'

export interface Account extends User {
	organization: Organization
}

function useUser() {
	const [isLoading, setIsLoading] = useState(false)

	const getUser = useCallback(async (authId: string) => {
		setIsLoading(true)
		const {data, error} = await supabase
			.from('User')
			.select('organizationId')
			.eq('authId', authId)
			.single()

		setIsLoading(false)
		if (error) throw error

		return data
	}, [])

	const crateAccount = useCallback(async (organizationName: string) => {
		setIsLoading(true)
		const {
			data: {session}
		} = await supabase.auth.getSession()
		if (!session) throw new Error('missing session')
		try {
			const response = await fetch('/api/account', {
				method: 'POST',
				body: JSON.stringify({organizationName}),
				headers: {
					'Content-Type': 'application/json',
					authorization: `Bearer ${session.access_token}`
				}
			})
			const {apiKey} = await response.json()

			setIsLoading(false)

			return apiKey
		} catch (error) {
			setIsLoading(false)
			throw error
		}
	}, [])

	const getAccount = useCallback(async () => {
		setIsLoading(true)
		const {
			data: {session}
		} = await supabase.auth.getSession()
		if (!session) throw new Error('missing session')
		try {
			const response = await fetch('/api/account', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					authorization: `Bearer ${session.access_token}`
				}
			})
			const data = await response.json()

			setIsLoading(false)

			return data as Account
		} catch (error) {
			setIsLoading(false)
			throw error
		}
	}, [])

	return {
		isLoading,
		getUser,
		crateAccount,
		getAccount
	}
}

export default useUser
