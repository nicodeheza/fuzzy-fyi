import {createInvoice} from '@repositories/invoice'
import {getActiveOrganizations} from '@repositories/organizations'
import {authCronJob} from '@services/auth'
import {sendInvoice} from '@services/sendgrid'
import {NextApiRequest, NextApiResponse} from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const handlers: Record<string, any> = {
		POST
	}
	return handlers[req.method as string](req, res)
}

async function POST(request: NextApiRequest, response: NextApiResponse) {
	await authCronJob(request)

	const organizations = await getActiveOrganizations()

	const invoiceRecords = await Promise.all(
		organizations.map((organization) => createInvoice(organization.id))
	)

	await Promise.allSettled(
		organizations.map((organization, i) =>
			sendInvoice({
				email: organization.billingEmail || '',
				organizationName: organization.name,
				date: invoiceRecords[i].createdAt.toLocaleDateString('en-us'),
				invoiceId: invoiceRecords[i].id
			})
		)
	)

	response.status(200).end()
}
