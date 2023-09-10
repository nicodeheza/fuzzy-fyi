import {FC, useState} from 'react'
import {Box, Button, Card, TextField} from '@mui/material'

interface Prop {
	create: (name: string) => void
}

export const OrganizationForm: FC<Prop> = ({create}) => {
	const [name, setName] = useState('')
	return (
		<Box component="form">
			<Card
				variant="outlined"
				sx={{
					padding: '30px',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					gap: '30px',
					width: 'fit-content',
					maxWidth: '90vw'
				}}
			>
				<h1 style={{margin: '0px', fontSize: '20px'}}>Create your organization</h1>
				<TextField
					required
					label="Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					sx={{width: '100%'}}
				/>
				<Button variant="contained" onClick={() => create(name)}>
					Create
				</Button>
			</Card>
		</Box>
	)
}
