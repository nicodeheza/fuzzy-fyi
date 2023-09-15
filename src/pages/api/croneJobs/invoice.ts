import {createInvoice} from '@repositories/invoice'
import {getActiveOrganizations} from '@repositories/organizations'
import {authCronJob} from '@services/auth'
import {generateInvoice} from '@services/invoice'
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

	const invoiceRecords = await Promise.all(organizations.map(({id}) => createInvoice(id)))

	const invoices = Promise.all(
		organizations.map((organization, i) => {
			const id = invoiceRecords[i].id
			const {billingEmail, name} = organization
			return generateInvoice(id, {billingEmail: billingEmail || '', name})
		})
	)

	// test this.
	console.log(invoices)

	response.status(200)
}
