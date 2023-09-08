import Loading from '@components/Loading'
import {ApiKey} from '@components/createAccount/ApiKey'
import {OrganizationForm} from '@components/createAccount/OrganizationFrom'
import useUser from '@hooks/useUser'
import {useRouter} from 'next/router'
import {useState} from 'react'

// move this to index
const CreateAccount = () => {
	const [apiKey, setApiKey] = useState('')
	const {crateAccount, isLoading} = useUser()

	const router = useRouter()

	const create = (name: string) => {
		if (!name) return
		crateAccount(name).then(setApiKey).catch(console.error)
	}

	const next = () => {
		router.push('/dashboard/projects')
	}

	if (isLoading) return <Loading />

	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100vh'
			}}
		>
			{!apiKey ? (
				<OrganizationForm create={create} />
			) : (
				<ApiKey apiKey={apiKey} next={next} />
			)}
		</div>
	)
}

export default CreateAccount
