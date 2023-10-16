import Loading from '@components/Loading'
import useUser from '@hooks/useUser'
import {Alert, Box, Paper} from '@mui/material'
import {useEffect, useState} from 'react'
import OrgData from './OrgData'
import {Organization} from '@prisma/client'
import {StripeButton} from './StripeButton'
import {useRouter} from 'next/router'
import {Alerts} from '@components/Alerts'
import usePay from '@hooks/usePay'

export default function SettingsComponent() {
	const {getAccount, isLoading} = useUser()
	const {setId} = usePay()
	const [organization, setOrganization] = useState<Organization>()
	const [success, setSuccess] = useState<boolean>()
	const router = useRouter()
	useEffect(() => {
		getAccount()
			.then((data) => {
				setOrganization(data.organization)
			})
			.catch(console.error)
	}, [getAccount])

	useEffect(() => {
		const {success, session_id} = router.query
		if (success === undefined) return
		setSuccess(success === 'true')
		if (success && session_id)
			setId(session_id as string).then(() => {
				router.replace('/account/settings', undefined, {shallow: true})
			})
	}, [router.query, setId, router])

	if (isLoading) return <Loading fullScreen={false} />
	return (
		<>
			{success !== undefined && (
				<>
					{success ? (
						<Alerts type="success" message="Payment method updated successfully" />
					) : (
						<Alerts type="error" message="Error updating payment method" />
					)}
				</>
			)}
			<Box sx={{display: 'flex', flexDirection: 'column', gap: '30px'}}>
				<OrgData
					name={organization?.name || ''}
					apiKey={organization?.apiKey || ''}
					subscription={organization?.subscription === 'ACTIVE' ? 'Pro Plan' : 'Inactive'}
				/>
				<StripeButton />
			</Box>
		</>
	)
}
