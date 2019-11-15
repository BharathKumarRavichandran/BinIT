import React, { useState, useEffect } from "react";

import { useTheme } from "@material-ui/styles";
import { CircularProgress, Box, Grid, responsiveFontSizes } from "@material-ui/core";

import { toast } from 'react-toastify';
import MUIDataTable from "mui-datatables";

// styles
import useStyles from "./styles";

// components
import PageTitle from "../../../components/PageTitle";

// Importing API utils
import { getHandlersList } from '../../../utils/api/handler.helper';

const datatableData = [
	["Joe James", "Accident and emergency (A&E)", "+91 90909 90909", "joe@example.com", "Medical Staff"],
	["John Walsh", "Admissions", "+91 90909 90909", "john@example.com", "Medical Staff"],
	["Bob Herm", "Anesthetics", "+91 90909 90909", "bob@example.com", "Medical Staff"],
	["James Houston", "Cardiology", "+91 90909 90909", "james@example.com", "Medical Staff"],
	["Prabhakar Linwood", "Coronary Care Unit (CCU)", "+91 90909 90909", "linwood@example.com", "Medical Staff"],
	["Kaui Ignace", "Diagnostic Imaging", "+91 90909 90909", "kaui@example.com", "Medical Staff"],
	["Esperanza Susanne", "Discharge Lounge", "+91 90909 90909", "susanne@example.com", "Medical Staff"],
	["Christian Birgitte", "Finance Department", "+91 90909 90909", "christian@example.com", "Medical Staff"],
	["Meral Elias", "Gastroenterology", "+91 90909 90909", "meral@example.com", "Medical Staff"],
	["Deep Pau", "General Surgery", "+91 90909 90909", "deep@example.com", "Medical Staff"],
	["Sebastiana Hani", "Haematology", "+91 90909 90909", "sebastiana@example.com", "Medical Staff"],
];

export default function Handlers() {
	var classes = useStyles();
	var theme = useTheme();
	// theme = responsiveFontSizes(theme);

	const [isLoading, setIsLoading] = useState(false);
	const [handlersList, setHandlersList] = useState(datatableData);

	const fetchHandlersList = async () => {
		try {
			const serverResponse = await getHandlersList();
			if (serverResponse.data.status_code === 200 && serverResponse.data.data) {
				let reqData = serverResponse.data.data;
				let handlersListArray = [];
				reqData.forEach((handler) => {
					let handlerDetails = new Array(6);
					handlerDetails[0] = handler.bin_id;
					handlerDetails[1] = handler.department;
					handlerDetails[2] = handler.handler_name;
					handlerDetails[3] = handler.type;
					handlerDetails[4] = handler.weight;
					handlerDetails[5] = handler.capacity;
					handlersListArray.push(handlerDetails);
				});
				setHandlersList(handlersListArray);
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
				//await fetchHandlersList();
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
				<PageTitle title="Handlers" />
				<Grid container spacing={4}>
					<Grid item xs={12}>
						<MUIDataTable
							title="LIST OF BIN HANDLERS"
							data={handlersList}
							columns={["NAME", "DEPARTMENT", "PHONE NUMBER", "EMAIL", "DESIGNATION"]}
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
