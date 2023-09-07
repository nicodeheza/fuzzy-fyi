import {Box, Card, TextField} from '@mui/material'

const CreateAccount = () => {
	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100vh'
			}}
		>
			<Box component="form" sx={{width: '80%'}}>
				<Card variant="outlined" sx={{padding: '20px'}}>
					<TextField required label="Name" />
				</Card>
			</Box>
		</div>
	)
}

export default CreateAccount
