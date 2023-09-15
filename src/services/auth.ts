import crypto from 'crypto'
import prisma from './prisma'
import {NextApiRequest} from 'next'
import {supabase} from './supabase'
import {Organization} from '@prisma/client'
import {config} from '@config'

export default function create(): string {
	return crypto.randomBytes(32).toString('hex')
}

export async function authOrganization(
	request: NextApiRequest
): Promise<Organization | null> {
	const apiKey = request.headers['x-api-key'] as string | undefined
	const authorization = request.headers['authorization'] as string | undefined
	if (apiKey) {
		const organization = await prisma.organization.findFirstOrThrow({
			where: {apiKey}
		})
		return organization
	} else if (authorization) {
		const accessToken = authorization.split('Bearer ')[1]
		const {data} = await supabase.auth.getUser(accessToken)
		const organization = await prisma.organization.findFirstOrThrow({
			where: {
				users: {
					some: {
						authId: data.user?.id
					}
				}
			}
		})
		return organization
	} else {
		throw new Error('Unauthorized')
	}
}

export async function authUser(request: NextApiRequest) {
	const authorization = request.headers['authorization'] as string | undefined
	if (authorization) {
		const accessToken = authorization.split('Bearer ')[1]
		const {
			data: {user}
		} = await supabase.auth.getUser(accessToken)
		return user
	} else {
		throw new Error('Unauthorized')
	}
}

export async function authCronJob(request: NextApiRequest) {
	const apiKey = request.headers['x-api-key'] as string | undefined
	if (!apiKey || apiKey !== config.cronJob.apiKey) {
		throw new Error('Unauthorized')
	}
}
