import {supabase} from '@services/supabase'
import {useState} from 'react'

function useUser() {
	const [isLoading, setIsLoading] = useState(false)

	// check this
	const getUser = async (userId: string) => {
		setIsLoading(true)
		const {data, error} = await supabase
			.from('users')
			.select('organization')
			.eq('id', userId)
			.single()

		setIsLoading(false)
		if (error) throw error

		return data
	}

	const crateAccount = async (organizationName: string) => {
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
	}

	return {
		isLoading,
		getUser,
		crateAccount
	}
}

export default useUser
