import {CircularProgress} from '@mui/material'
import React from 'react'

const Loading = () => (
	<div
		style={{
			width: '100vw',
			height: '100vh',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center'
		}}
	>
		<CircularProgress />
	</div>
)

export default Loading
