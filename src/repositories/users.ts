import {User} from '@prisma/client'
import prisma from '@services/prisma'

type EditUser = Omit<User, 'id' | 'createdAt' | 'updatedAt'>

export const createUser = (newUser: EditUser) => {
	return prisma.user.create({
		data: newUser
	})
}

export const updateUserByAuthId = (authId: string, user: Partial<EditUser>) => {
	return prisma.user.update({
		where: {
			authId
		},
		data: user
	})
}

export const getUserByAuthId = (authId: string) => {
	return prisma.user.findFirst({
		where: {authId},
		include: {
			organization: true
		}
	})
}
