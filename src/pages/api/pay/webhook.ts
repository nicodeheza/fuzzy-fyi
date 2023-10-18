import {getEvent} from '@services/stripe'
import {NextApiRequest, NextApiResponse} from 'next'
import {buffer} from 'micro'

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
}

async function POST(request: NextApiRequest, response: NextApiResponse) {
	const payload = await buffer(request)
	const endpointSecret = process.env.STRIPE_WEBHOOK_KEY || ''
	const signature = request.headers['stripe-signature'] as string

	const event = await getEvent(payload, endpointSecret, signature)

	console.log('>>>>type:', event.type)

	switch (event.type) {
		case 'customer.subscription.updated':
			const data = event.data.object as SubscriptionData
			if (data.canceled_at) {
				// handle cancel
				console.log(data.canceled_at)
			}
			break
	}

	response.status(200).end()
}
