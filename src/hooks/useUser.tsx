import {supabase} from '@services/supabase'
import {useCallback, useState} from 'react'

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

	return {
		isLoading,
		getUser,
		crateAccount
	}
}

export default useUser
