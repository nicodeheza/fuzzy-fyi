import {config} from '@config'
import {InvoiceStatus} from '@prisma/client'
import MicroInvoice from 'microinvoice'

interface InvoiceData {
	id: string
	status: InvoiceStatus
	date: Date
	organizationName: string
	organizationEmail: string
}

export async function generatePdfInvoice({
	id,
	status,
	date,
	organizationEmail,
	organizationName
}: InvoiceData): Promise<PDFKit.PDFDocument> {
	const logoBlob = await (await fetch(`${config.backend.url}/fuzzy-fyi.png`)).blob()
	const logo = await logoBlob.arrayBuffer()

	const invoice = new MicroInvoice({
		style: {
			header: {
				image: {
					path: logo,
					width: 50,
					height: 50
				}
			}
		},
		data: {
			invoice: {
				name: 'Fuzzy.fyi',

				header: [
					{
						label: 'Invoice Id',
						value: id
					},
					{
						label: 'Status',
						value: status
					},
					{
						label: 'Date',
						value: date.toLocaleDateString('en-us')
					}
				],

				currency: 'USD',

				customer: [
					{
						label: 'Bill To',
						value: [organizationName, organizationEmail]
					},
					{
						label: 'Information',
						value: 'Monthly Fuzzy pro plan payment'
					}
				],

				seller: [
					{
						label: 'Bill From',
						value: [
							'ANTONIO GUILHERME FERREIRA VIGGIANO TREINAMENTO E APOIO ADMINISTRATIVO LTDA',
							'Brazil'
						]
					},
					{
						label: 'Tax Identifier',
						value: '36.112.145/0001-21'
					}
				],

				details: {
					header: [
						{
							value: 'Description'
						},
						{
							value: 'Quantity'
						},
						{
							value: 'Subtotal'
						}
					],

					parts: [
						[
							{
								value: 'Fuzzy Pro Plan'
							},
							{
								value: 1
							},
							{
								value: '299',
								price: true
							}
						]
					],
					total: [
						{
							label: 'Total',
							value: '299',
							price: true
						}
					]
				}
			}
		}
	})

	return invoice.generate()
}
