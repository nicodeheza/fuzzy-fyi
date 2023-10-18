import {config} from '@config'
import {getUserByAuthId} from '@repositories/users'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_API_KEY || '', {
	apiVersion: '2023-08-16'
})

export async function getCheckoutUrl(lookup_key: string) {
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
		success_url: `${config.backend.url}/account/settings?success=true&session_id={CHECKOUT_SESSION_ID}`,
		cancel_url: `${config.backend.url}/account/settings?canceled=true`
	})

	return session.url
}

export async function getPortalUrl(id: string) {
	const user = await getUserByAuthId(id)
	if (!user) throw new Error('user not exist')

	const session_id = user.organization.stripeId
	if (!session_id) throw new Error('not stripe id')

	const return_url = `${config.backend.url}/account/settings`

	const checkoutSession = await stripe.checkout.sessions.retrieve(session_id)
	if (!checkoutSession) throw new Error("can't find checkout session")

	const portalSession = await stripe.billingPortal.sessions.create({
		customer: checkoutSession.customer as string,
		return_url
	})

	return portalSession.url
}

export async function getEvent(
	payload: string | Buffer,
	endpointSecret: string,
	signature: string
) {
	return stripe.webhooks.constructEvent(payload, signature, endpointSecret)
}
