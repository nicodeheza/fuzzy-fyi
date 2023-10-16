import usePay from '@hooks/usePay'
import {Button, Card, CardContent, CircularProgress, Paper} from '@mui/material'
import {FC} from 'react'

export const StripeButton: FC = () => {
	const {checkout, isLoading} = usePay()
	return (
		<Card>
			<CardContent>
				<h2>Payment settings:</h2>
				<Button
					variant="contained"
					onClick={() => checkout('pro')}
					sx={{width: '130px', height: '40px'}}
				>
					{isLoading ? <CircularProgress color="secondary" size={20} /> : 'Set Payment'}
				</Button>
			</CardContent>
		</Card>
	)
}
