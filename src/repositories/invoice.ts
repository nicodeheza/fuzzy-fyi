import prisma from '@services/prisma'

export async function createInvoice(organizationId: string) {
	return prisma.invoice.create({
		data: {
			status: 'PENDING',
			organizationId
		}
	})
}

export function getInvoiceByIdWithOrganization(id: string) {
	return prisma.invoice.findUnique({
		where: {
			id
		},
		include: {
			organization: true
		}
	})
}
