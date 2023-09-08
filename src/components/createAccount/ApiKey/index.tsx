import {Button, Card} from '@mui/material'
import {FC} from 'react'

interface Prop {
	apiKey: string
	next: () => void
}

export const ApiKey: FC<Prop> = ({apiKey, next}) => {
	const copyToClipboard = () => {
		navigator.clipboard.writeText(apiKey)
	}
	return (
		<Card
			sx={{
				padding: '30px',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				gap: '30px'
			}}
		>
			<h1 style={{margin: 0}}>This is your API key, keep it in a safe place.</h1>
			<Card
				sx={{
					width: 'fit-content',
					display: 'flex',
					gap: '20px',
					height: '35px',
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<p style={{paddingLeft: '20px'}}>{apiKey}</p>
				<Button
					variant="contained"
					color="secondary"
					sx={{height: '35px'}}
					onClick={copyToClipboard}
				>
					Copy
				</Button>
			</Card>
			<Button variant="contained" onClick={next}>
				Continue
			</Button>
		</Card>
	)
}
