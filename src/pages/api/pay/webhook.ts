import {getEvent} from '@services/stripe'
import {NextApiRequest, NextApiResponse} from 'next'
import {buffer} from 'micro'
import {updateSubscription} from '@repositories/organizations'

export const config = {
	api: {
		bodyParser: false
	}
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const handlers: Record<string, any> = {
		POST
	}
	return handlers[req.method as string](req, res)
}

interface SubscriptionData {
	canceled_at: null | string | number
	customer: string
}

async function POST(request: NextApiRequest, response: NextApiResponse) {
	const payload = await buffer(request)
	const endpointSecret = process.env.STRIPE_WEBHOOK_KEY || ''
	const signature = request.headers['stripe-signature'] as string

	const event = await getEvent(payload, endpointSecret, signature)

	switch (event.type) {
		case 'customer.subscription.updated':
			const data = event.data.object as SubscriptionData
			await updateSubscription(data.customer, data.canceled_at ? 'INACTIVE' : 'ACTIVE')
			break
	}

	response.status(200).end()
}
