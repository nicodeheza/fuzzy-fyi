import usePay from '@hooks/usePay'
import {Button, Card, CardContent, CircularProgress, Paper} from '@mui/material'
import {FC} from 'react'

interface Props {
	isSuscribe: boolean
}

export const StripeButton: FC<Props> = ({isSuscribe}) => {
	const {checkout, isLoading} = usePay()
	const label = isSuscribe ? 'Update Payment' : 'Set Payment'
	return (
		<Card>
			<CardContent>
				<h2>Payment settings:</h2>
				<Button
					variant="contained"
					onClick={() => checkout('pro')}
					sx={{height: '40px', display: 'flex', alignItems: 'center', gap: '10px'}}
				>
					{label}
					{isLoading && <CircularProgress color="secondary" size={20} />}
				</Button>
			</CardContent>
		</Card>
	)
}
