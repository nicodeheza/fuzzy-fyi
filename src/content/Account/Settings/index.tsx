import Loading from '@components/Loading'
import useUser from '@hooks/useUser'
import {Box} from '@mui/material'
import {useEffect, useState} from 'react'
import OrgData from './OrgData'
import {Organization} from '@prisma/client'
import {StripeButton} from './StripeButton'
import {useRouter} from 'next/router'
import {Alerts} from '@components/Alerts'
import usePay from '@hooks/usePay'

export default function SettingsComponent() {
	const {getAccount, isLoading} = useUser()
	const {setId, isLoading: payIsLoading} = usePay()
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
		if (success === 'true' && session_id) {
			setId(session_id as string).then(() => {
				setOrganization((prev) => prev && {...prev, stripeId: session_id as string})
				router.replace('/account/settings', undefined, {shallow: true})
			})
		}
	}, [router.query, setId, router])

	if (isLoading || payIsLoading) return <Loading fullScreen={false} />
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
				<StripeButton isSuscribe={!!organization?.stripeId} />
			</Box>
		</>
	)
}
