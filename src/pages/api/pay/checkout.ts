import {authUser} from '@services/auth'
import {updateStripeIdByUserAuthId} from '@services/organization'
import {NextApiRequest, NextApiResponse} from 'next'
import Stripe from 'stripe'

// refactor
// todo add portal
// check dependencies
// check invoice and email
export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const handlers: Record<string, any> = {
		POST
	}
	return handlers[req.method as string](req, res)
}

async function POST(request: NextApiRequest, response: NextApiResponse) {
	const sessionUser = await authUser(request)
	if (!sessionUser) return response.status(401)

	const {lookup_key} = request.body
	const stripe = new Stripe(process.env.STRIPE_API_KEY || '', {
		apiVersion: '2023-08-16'
	})

	const prices = await stripe.prices.list({
		lookup_keys: [lookup_key],
		expand: ['data.product']
	})

	const session = await stripe.checkout.sessions.create({
		billing_address_collection: 'auto',
		line_items: [
			{
				price: prices.data[0].id,
				quantity: 1
			}
		],
		mode: 'subscription',
		success_url: `${process.env.BASE_URL}/account/settings?success=true&session_id={CHECKOUT_SESSION_ID}`,
		cancel_url: `${process.env.BASE_URL}/account/settings?canceled=true`
	})

	if (session.url) response.status(200).json({url: session.url})
	response.status(500)
}

async function PATCH(request: NextApiRequest, response: NextApiResponse) {
	const sessionUser = await authUser(request)
	if (!sessionUser) return response.status(401)

	const {session_id} = request.body

	await updateStripeIdByUserAuthId(sessionUser.id, session_id)

	response.status(200)
}
