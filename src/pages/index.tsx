import {Auth} from '@supabase/auth-ui-react'
import {ThemeSupa} from '@supabase/auth-ui-shared'
import {useSession, useSupabaseClient} from '@supabase/auth-helpers-react'
import {useRouter} from 'next/router'
import {useCallback, useEffect, useState} from 'react'
import useUser from '@hooks/useUser'
import CreateAccount from '@components/CreateAccount'
import {Card} from '@mui/material'

const Home = () => {
	const router = useRouter()
	const session = useSession()
	const supabase = useSupabaseClient()

	const [display, setDisplay] = useState('none')
	const [showCreateAccount, setShowCreareAccount] = useState(false)

	const {getUser} = useUser()

	const next = useCallback(() => {
		router.push('/dashboard/projects')
	}, [router])

	useEffect(() => {
		let ts = setTimeout(() => setDisplay(''), 1000)

		return () => clearTimeout(ts)
	}, [])

	useEffect(() => {
		if (session) {
			getUser(session.user.id)
				.then(({organizationId}) => {
					if (organizationId) {
						next()
					} else {
						setShowCreareAccount(true)
					}
				})
				.catch((e) => {
					if (e.code === 'PGRST116') {
						setShowCreareAccount(true)
					} else {
						console.log(e)
					}
				})
		}
	}, [session, getUser, next])

	return (
		<>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh'
				}}
			>
				<div style={{display}}>
					{!session ? (
						<Card sx={{width: '350px', maxWidth: '90vw', padding: '30px'}}>
							<Auth
								supabaseClient={supabase}
								appearance={{theme: ThemeSupa}}
								theme="dark"
								providers={['github']}
							/>
						</Card>
					) : showCreateAccount ? (
						<CreateAccount next={next} />
					) : (
						<div style={{textAlign: 'center'}}>
							<span>Welcome {session.user.email}</span>
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export default Home
