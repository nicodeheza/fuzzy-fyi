import {Organization} from '@prisma/client'
import {supabase} from '@services/supabase'
import {useState} from 'react'

type NewOrganization = Omit<Organization, 'id' | 'createdAt' | 'updatedAt'>

function useOrganization() {
	const [isLoading, setIsLoading] = useState(false)

	const createOrganization = async (organization: NewOrganization) => {
		setIsLoading(true)
		const {error} = await supabase.from('organizations').insert(organization)
		setIsLoading(false)
		if (error) throw error
	}

	return {
		isLoading,
		createOrganization
	}
}

export default useOrganization
