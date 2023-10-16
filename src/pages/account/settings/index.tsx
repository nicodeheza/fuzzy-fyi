import Footer from '@components/Footer'
import PageTitleWrapper from '@components/PageTitleWrapper'
import SettingsComponent from '@content/Account/Settings'
import SidebarLayout from '@layouts/SidebarLayout'
import {Container, Grid} from '@mui/material'
import Head from 'next/head'
import {ReactElement} from 'react'

function Settings() {
	return (
		<>
			<Head>
				<title>Settings</title>
			</Head>
			<PageTitleWrapper>
				<h1>Settings</h1>
			</PageTitleWrapper>
			<Container maxWidth="lg">
				<Grid
					container
					direction="row"
					justifyContent="center"
					alignItems="stretch"
					spacing={3}
				>
					<Grid item xs={12}>
						<SettingsComponent />
					</Grid>
				</Grid>
			</Container>
			<Footer />
		</>
	)
}

Settings.getLayout = (page: ReactElement) => <SidebarLayout>{page}</SidebarLayout>

export default Settings
