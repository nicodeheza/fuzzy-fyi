import {updateById} from '@repositories/organizations'
import {getUserByAuthId} from '@repositories/users'

export async function updateStripeIdByUserAuthId(authId: string, stripeId: string) {
	const orgData = await getUserByAuthId(authId)
	if (!orgData) throw new Error("authId don't exist")
	await updateById(orgData.organizationId, {stripeId, subscription: 'ACTIVE'})
}
