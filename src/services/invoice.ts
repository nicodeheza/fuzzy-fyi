import {getSignedUrl} from './s3'

interface CostumerDetails {
	name: string
	billingEmail: string
}

export async function generateInvoice(id: string, costumer: CostumerDetails) {
	const fifteenDays = 1000 * 60 * 60 * 24 * 15

	const s3Url = await getSignedUrl(id)

	const invoiceData = {
		id,
		currency: '$',
		lang: 'en',
		date: Date.now() / 1000,
		due_date: (Date.now() * fifteenDays) / 1000,
		paid: false,
		decimals: 2,
		items: [
			{
				title: 'Fuzzy Pro Plan',
				description: 'monthly subscription',
				price: 299,
				quantity: 1
			}
		],
		customer: {
			summary: costumer.name,
			address_line_1: '',
			email: costumer.billingEmail
		},
		company: {
			summary:
				'ANTONIO GUILHERME FERREIRA VIGGIANO TREINAMENTO E APOIO ADMINISTRATIVO LTDA',
			phone: 'todo',
			email: 'todo@todo.todo',
			address_line_1: '',
			logo_url: 'http://via.placeholder.com/360x360', // change this
			other: [
				{
					title: 'wallet',
					content: '0xd0abDa6e05072A11aeBA4125962Be5CE94bc3577'
				}
			]
		},
		s3: {
			presigned_url: s3Url
		}
	}

	const invoiceResponse = await fetch(
		'https://invoice-as-a-service.cleverapps.io/api/invoice/generate',
		{
			method: 'POST',
			body: JSON.stringify(invoiceData),
			headers: {
				'content-type': 'application/json'
			}
		}
	)

	const invoiceResult = await invoiceResponse.json()

	return {
		invoiceResult,
		utl: s3Url
	}
}
