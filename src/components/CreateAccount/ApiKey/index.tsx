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
				gap: '30px',
				width: 'fit-content',
				maxWidth: '90vw'
			}}
		>
			<h1 style={{margin: 0, fontSize: '20px'}}>
				This is your API key, keep it in a safe place.
			</h1>
			<Card
				sx={{
					width: '100%',
					display: 'flex',
					gap: '20px',
					height: '35px',
					justifyContent: 'space-between',
					alignItems: 'center'
				}}
			>
				<p
					style={{
						paddingLeft: '20px',
						width: '90%',
						textOverflow: 'ellipsis',
						overflow: 'hidden'
					}}
				>
					{apiKey}
				</p>
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
