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
import { getHospiAccessLogs } from '../../../utils/api/hospi.helper';

const datatableData = [
	["Joe James", "Accident and emergency (A&E)", "16 KG", "2019-09-21 00:00:00"],
	["John Walsh", "Admissions", "13 KG", "2019-09-21 00:00:00"],
	["Bob Herm", "Anesthetics", "12 KG", "2019-09-21 00:00:00"],
	["James Houston", "Cardiology", "10 KG", "2019-09-21 00:00:00"],
	["Prabhakar Linwood", "Coronary Care Unit (CCU)", "8 KG", "2019-09-21 00:00:00"],
	["Kaui Ignace", "Diagnostic Imaging", "7KG", "2019-09-21 00:00:00"],
	["Esperanza Susanne", "Discharge Lounge", "4 KG", "2019-09-21 00:00:00"],
	["Christian Birgitte", "Finance Department", "1 KG", "2019-09-21 00:00:00"]
];

export default function Logs() {
	var classes = useStyles();
	var theme = useTheme();
	//theme = responsiveFontSizes(theme);

	const [isLoading, setIsLoading] = useState(false);

	const fetchRecentAccessLogs = async () => {
		try {
			const serverResponse = await getHospiAccessLogs();
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
