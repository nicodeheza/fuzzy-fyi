import Loading from '@components/Loading'
import {ApiKey} from '@components/CreateAccount/ApiKey'
import {OrganizationForm} from '@components/CreateAccount/OrganizationFrom'
import useUser from '@hooks/useUser'
import {useRouter} from 'next/router'
import {FC, useState} from 'react'

interface Prop {
	next: () => void
}

const CreateAccount: FC<Prop> = ({next}) => {
	const [apiKey, setApiKey] = useState('')
	const {crateAccount, isLoading} = useUser()

	const create = (name: string) => {
		if (!name) return
		crateAccount(name).then(setApiKey).catch(console.error)
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
