import {config} from '@config'
import client from '@sendgrid/mail'

client.setApiKey(config.sendGrid.apiKey)

interface InvoiceEmailData {
	email: string
	organizationName: string
	date: string
	invoiceId: string
}

export async function sendInvoice(data: InvoiceEmailData) {
	const {email, organizationName, date, invoiceId} = data

	const message: client.MailDataRequired = {
		personalizations: [
			{
				to: [{email, name: organizationName}],
				dynamicTemplateData: {
					organizationName,
					date,
					invoiceId,
					invoiceUrl: `${config.backend.url}/api/invoice/${invoiceId}`
				}
			}
		],
		templateId: config.sendGrid.invoiceTemplateId,
		subject: 'Your Fuzzy Invoice',
		from: {
			email: config.sendGrid.emailAddress,
			name: 'Fuzzy'
		}
	}

	await client.send(message)
}
