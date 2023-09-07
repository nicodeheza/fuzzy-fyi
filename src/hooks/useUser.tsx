import {User} from '@prisma/client'
import {supabase} from '@services/supabase'
import {useState} from 'react'

type NewUser = Omit<User, 'id' | 'createdAt' | 'updatedAt'>

function useUser() {
	const [isLoading, setIsLoading] = useState(false)

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

	const createUser = async (newUser: NewUser) => {
		setIsLoading(true)
		const {error} = await supabase.from('users').insert(newUser)
		setIsLoading(false)
		if (error) throw error
	}

	const updateUser = async (authId: string, user: Partial<User>) => {
		setIsLoading(true)
		const {error} = await supabase.from('users').update(user).eq('authId', authId)
		setIsLoading(false)
		if (error) throw error
	}

	return {
		isLoading,
		getUser,
		createUser,
		updateUser
	}
}

export default useUser
