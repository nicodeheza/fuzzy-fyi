import {authUser} from '@services/auth'
import {updateStripeIdByUserAuthId} from '@services/organization'
import {getCheckoutUrl, getCostumerId} from '@services/stripe'
import {NextApiRequest, NextApiResponse} from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const handlers: Record<string, any> = {
		POST,
		PATCH
	}
	return handlers[req.method as string](req, res)
}

async function POST(request: NextApiRequest, response: NextApiResponse) {
	const sessionUser = await authUser(request)
	if (!sessionUser) return response.status(401).end()

	const {lookup_key} = request.body

	const url = await getCheckoutUrl(lookup_key)

	if (url) response.status(200).json({url})
	response.status(500).end()
}

async function PATCH(request: NextApiRequest, response: NextApiResponse) {
	const sessionUser = await authUser(request)
	if (!sessionUser) return response.status(401).end()

	const {session_id} = request.body

	const stripeId = await getCostumerId(session_id)

	await updateStripeIdByUserAuthId(sessionUser.id, stripeId)

	response.status(200).end()
}
