import {supabase} from '@services/supabase'
import {useCallback, useState} from 'react'

export default function usePay() {
	const [isLoading, setIsLoading] = useState(false)
	async function checkout(lookup_key: string) {
		setIsLoading(true)
		const {
			data: {session}
		} = await supabase.auth.getSession()
		if (!session) throw new Error('missing session')

		const response = await fetch('/api/pay/checkout', {
			method: 'POST',
			body: JSON.stringify({lookup_key}),
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${session.access_token}`
			}
		})

		const {url} = await response.json()
		window.location.replace(url)

		setIsLoading(false)
	}
	const setId = useCallback(async (session_id: string) => {
		setIsLoading(true)
		const {
			data: {session}
		} = await supabase.auth.getSession()
		if (!session) throw new Error('missing session')

		await fetch('/api/pay/checkout', {
			method: 'PATCH',
			body: JSON.stringify({session_id}),
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${session.access_token}`
			}
		})
		setIsLoading(false)
	}, [])

	return {
		checkout,
		setId,
		isLoading
	}
}
