import {getInvoiceByIdWithOrganization} from '@repositories/invoice'
import {generatePdfInvoice} from '@services/invoice'
import {NextApiRequest, NextApiResponse} from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const handlers: Record<string, any> = {
		GET
	}
	return handlers[req.method as string](req, res)
}

async function GET(request: NextApiRequest, response: NextApiResponse) {
	const {id} = request.query as {id: string}

	const invoiceRecord = await getInvoiceByIdWithOrganization(id)

	if (!invoiceRecord) return response.status(404).json({error: 'Invoice not found'})

	const file = await generatePdfInvoice({
		id,
		status: invoiceRecord.status,
		date: invoiceRecord.createdAt,
		organizationName: invoiceRecord.organization.name,
		organizationEmail: invoiceRecord.organization.billingEmail || ''
	})

	file.pipe(response)
	file.end
}
