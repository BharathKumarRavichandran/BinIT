import React, { useState, useEffect } from "react";

import { useTheme } from "@material-ui/styles";
import { CircularProgress, Box, Grid, responsiveFontSizes } from "@material-ui/core";

import { toast } from 'react-toastify';
import MUIDataTable from "mui-datatables";

// styles
import useStyles from "./styles";

// components
import PageTitle from "../../components/PageTitle";

// Importing API utils
import { getPolybagsList } from '../../utils/api/polybag.helper';


const datatableData = [
	["12123", "Joe James", "+91 90909 90909", "20 KG", "Delivered", "Lat: 51.507351, Lon: -0.127758"],
	["12123", "John Walsh", "+91 90909 90909", "20 KG", "Not Delivered", "Lat: 51.507351, Lon: -0.127758"],
	["12123", "Bob Herm", "+91 90909 90909 ", "20 KG", "Delivered", "Lat: 51.507351, Lon: -0.127758"],
	["12123", "James Houston", "+91 90909 90909 ", "20 KG", "Not Delivered", "Lat: 51.507351, Lon: -0.127758"],
	["12123", "Prabhakar Linwood", "+91 90909 90909 ", "20 KG", "Not Delivered", "Lat: 51.507351, Lon: -0.127758"],
	["12123", "Kaui Ignace", "+91 90909 90909 ", "20 KG", "Delivered", "Lat: 51.507351, Lon: -0.127758"],
	["12123", "Esperanza Susanne", "+91 90909 90909 ", "20 KG", "Not Delivered", "Lat: 51.507351, Lon: -0.127758"],
	["12123", "Christian Birgitte", "+91 90909 90909 ", "20 KG", "Not Delivered", "Lat: 51.507351, Lon: -0.127758"],
];

export default function Transits() {
	var classes = useStyles();
	var theme = useTheme();
	//theme = responsiveFontSizes(theme);

	const [isLoading, setIsLoading] = useState(false);
	const [transitsList, setTransitsList] = useState(datatableData);

	const fetchTransits = async () => {
		try {
			const serverResponse = await getPolybagsList();
			if (serverResponse.data.status_code === 200 && serverResponse.data.data) {
				let reqData = serverResponse.data.data;
				let transitsListArray = [];
				reqData.forEach((transit) => {
					let individualTransit = new Array(6);
					individualTransit[0] = transit.polybag_id;
					individualTransit[1] = transit.handler_name;
					individualTransit[2] = transit.handler_phone_number;
					individualTransit[3] = transit.weight;
					individualTransit[4] = transit.status;
					individualTransit[5] = transit.location;
					transitsListArray.push(individualTransit);
				});
				setTransitsList(transitsListArray);
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
				//await fetchTransits();
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
				<PageTitle title="Waste Transits" />
				<Grid container spacing={4}>
					<Grid item xs={12}>
						<MUIDataTable
							title="DETAILS OF WASTES IN TRANSIT"
							data={transitsList}
							columns={["BAG ID", "HANDLER/DRIVER", "PHONE NUMBER", "WEIGHT CARRIED", "STATUS", "LOCATION"]}
							options={{
								pagination: true,
								selectableRows: false,
							}}
						/>
					</Grid>
				</Grid>
			</>
		);
	}
}
