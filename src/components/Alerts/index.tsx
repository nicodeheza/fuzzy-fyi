import {Alert} from '@mui/material'
import React, {FC, useEffect, useState} from 'react'

interface Props {
	type?: 'error' | 'warning' | 'info' | 'success'
	message: string
	showTimeInSec?: number
}

export const Alerts: FC<Props> = ({type = 'success', showTimeInSec = 10, message}) => {
	const [show, setShow] = useState(true)

	useEffect(() => {
		setTimeout(() => {
			setShow(false)
		}, 1000 * showTimeInSec)
	}, [showTimeInSec])

	if (!show) return <></>
	return (
		<Alert
			severity={type}
			sx={{
				position: 'fixed',
				top: '90px',
				right: '10px'
			}}
		>
			{message}
		</Alert>
	)
}
