import {config} from '@config'
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
