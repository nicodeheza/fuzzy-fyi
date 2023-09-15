import {Organization} from '@prisma/client'
import prisma from '@services/prisma'

type NewOrganization = Omit<Organization, 'id' | 'createdAt' | 'updatedAt'>

export const createOrganization = (newOrganization: NewOrganization) => {
	return prisma.organization.create({
		data: newOrganization
	})
}

export const getActiveOrganizations = () => {
	return prisma.organization.findMany({
		where: {
			subscription: 'ACTIVE'
		}
	})
}
