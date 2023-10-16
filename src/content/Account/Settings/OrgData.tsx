import {
	Card,
	CardContent,
	CardHeader,
	IconButton,
	List,
	ListItem,
	ListItemText
} from '@mui/material'
import {FC} from 'react'

interface Props {
	name: string
	apiKey: string
	subscription: string
}

const OrgData: FC<Props> = ({name, apiKey, subscription}) => {
	return (
		<Card>
			<CardContent>
				<h2>Organization:</h2>
				<List>
					<ListItem>
						<ListItemText primary="Name:" secondary={name} />
					</ListItem>
					<ListItem>
						<ListItemText primary="Api Key:" secondary={apiKey} />
					</ListItem>
					<ListItem>
						<ListItemText primary="Subscription:" secondary={subscription} />
					</ListItem>
				</List>
			</CardContent>
		</Card>
	)
}

export default OrgData
