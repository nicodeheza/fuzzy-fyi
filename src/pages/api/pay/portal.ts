import {authUser} from '@services/auth'
import {NextApiRequest, NextApiResponse} from 'next'
import {getPortalUrl} from '@services/stripe'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const handlers: Record<string, any> = {
		POST
	}
	return handlers[req.method as string](req, res)
}

async function POST(request: NextApiRequest, response: NextApiResponse) {
	const sessionUser = await authUser(request)
	if (!sessionUser) return response.status(401).end()

	const url = await getPortalUrl(sessionUser.id)
	response.status(200).json({url})
}
