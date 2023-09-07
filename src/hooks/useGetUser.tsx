import {supabase} from '@services/supabase'
import {useState} from 'react'

function useGetUser() {
	const [isLoading, setIsLoading] = useState(false)

	const getUser = async (userId: string) => {
		setIsLoading(true)
		const {data, error} = await supabase
			.from('users')
			.select('organization')
			.eq('id', userId)
			.single()

		if (error) throw error

		return data
	}

	return {
		isLoading,
		getUser
	}
}

export default useGetUser
