import {CircularProgress} from '@mui/material'
import React, {FC} from 'react'

interface Props {
	fullScreen?: boolean
}

const Loading: FC<Props> = ({fullScreen = true}) => (
	<div
		style={{
			width: fullScreen ? '100vw' : '100%',
			height: fullScreen ? '100vh' : '100%',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center'
		}}
	>
		<CircularProgress />
	</div>
)

export default Loading
