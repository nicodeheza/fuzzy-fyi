import {createOrganization} from '@repositories/organizations'
import {createUser} from '@repositories/users'
import create, {authUser} from '@services/auth'
import {NextApiRequest, NextApiResponse} from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const handlers: Record<string, any> = {
		POST
	}
	return handlers[req.method as string](req, res)
}

async function POST(request: NextApiRequest, response: NextApiResponse) {
	const sessionUser = await authUser(request)
	if (!sessionUser) return response.status(401)

	const {body} = request
	if (!body.organizationName)
		return response.status(400).json({error: 'missing organizationName'})

	const apiKey = create()
	const organization = await createOrganization({apiKey, name: body.organizationName})
	await createUser({
		authId: sessionUser.id,
		organizationId: organization.id
	})

	response.status(200).json({apiKey})
}
