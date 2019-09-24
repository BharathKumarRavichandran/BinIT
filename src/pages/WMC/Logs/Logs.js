import React, { useState, useEffect } from "react";

import { useTheme } from "@material-ui/styles";
import { CircularProgress, Box, Grid, responsiveFontSizes } from "@material-ui/core";

import { toast } from 'react-toastify';
import MUIDataTable from "mui-datatables";

// styles
import useStyles from "./styles";

// components
import PageTitle from "../../../components/PageTitle/PageTitle";

// Importing API utils
import { getWmcAccessLogs } from '../../../utils/api/wmc.helper';

const datatableData = [
	["12123", "Joe James", "Example", "2019-09-21 00:00:00"],
	["12123", "John Walsh", "Example", "2019-09-21 00:00:00"],
	["12123", "Bob Herm", "Example ", "2019-09-21 00:00:00"],
	["12123", "James Houston", "Example ", "2019-09-21 00:00:00"],
	["12123", "Prabhakar Linwood", "Example ", "2019-09-21 00:00:00"],
	["12123", "Kaui Ignace", "Example ", "2019-09-21 00:00:00"],
	["12123", "Esperanza Susanne", "Example ", "2019-09-21 00:00:00"],
	["12123", "Christian Birgitte", "Example ", "2019-09-21 00:00:00"],
];

export default function Logs() {
	var classes = useStyles();
	var theme = useTheme();
	//theme = responsiveFontSizes(theme);

	const [isLoading, setIsLoading] = useState(false);

	const fetchRecentAccessLogs = async () => {
		try {
			const serverResponse = await getWmcAccessLogs();
			if (serverResponse.data.status_code === 200 && serverResponse.data.data) {
				let reqData = serverResponse.data.data;

			}
			else {
				if (serverResponse.data.message)
					toast.error(serverResponse.data.message);
				else
					toast.error(serverResponse.statusText);
			}
		} catch (error) {
			toast.error(error.toString());
		}
	};

	useEffect(() => {
		async function fetchAPI() {
			try {
				setIsLoading(true);
				//await fetchRecentAccessLogs();
				setIsLoading(false);
			} catch (error) {
				toast.error(error.toString());
			}
		};
		fetchAPI();
	}, []);

	if (isLoading) {
		return <Box className={classes.centeredContainer}><CircularProgress size={80} /></Box>;
	} else {
		return (
			<>
				<PageTitle title="Access Logs" />
				<Grid container spacing={4}>
					<Grid item xs={12}>
						<MUIDataTable
							title="RECENTLY ACCESSED BINS"
							data={datatableData}
							columns={["BIN ID", "ACCESSED BY", "DEPARTMENT", "TIME"]}
							options={{
								pagination: true,
								selectableRows: false
							}}
						/>
					</Grid>
				</Grid>
			</>
		);
	}
}
