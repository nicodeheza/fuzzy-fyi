import prisma from '@services/prisma'

export async function createInvoice(organizationId: string) {
	return prisma.invoice.create({
		data: {
			status: 'PENDING',
			pdf: '',
			organizationId
		}
	})
}
