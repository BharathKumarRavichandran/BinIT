import React, { useState, useEffect } from "react";
import { withRouter } from 'react-router-dom';

import { useTheme } from "@material-ui/styles";
import { CircularProgress, Box, Grid, responsiveFontSizes } from "@material-ui/core";

import { toast } from 'react-toastify';
import MUIDataTable from "mui-datatables";

// styles
import useStyles from "./styles";

// components
import PageTitle from "../../../components/PageTitle/PageTitle";

// Importing API utils
import { getBinsList } from '../../../utils/api/bin.helper';

const datatableData = [
	[1,"Accident and emergency (A&E)","Joe James", "Pathological waste", "17 KG", "20 KG"],
	[2,"Admissions", "Non-Risk Waste", "Non risk waste", "24 KG", "40 KG"],
	[3,"Anesthetics","Bob Herm", "Infectious waste", "6 KG", "10 KG"],
	[4,"Cardiology","James Houston", "Sharps", "8 KG", "10 KG"],
	[5,"Coronary Care Unit (CCU)","Prabhakar Linwood", "Sharps", "2 KG", "5 KG"],
	[6,"Diagnostic Imaging","Kaui Ignace", "Infectious waste", "6 KG", "20 KG"],
	[7,"Discharge Lounge","Esperanza Susanne", "Infectious waste", "25 KG", "30 KG"],
	[8,"Finance Department","Christian Birgitte", "Infectious waste", "13 KG", "15 KG"],
	[8,"Gastroenterology","Meral Elias", "Chemical waste", "6 KG", "10 KG"],
	[9,"General Surgery","Deep Pau", "Chemical waste", "9 KG", "18 KG"],
	[10,"Haematology","Sebastiana Hani", "Chemical waste", "4 KG", "5 KG"],
];

const Bins = (props) => {
	var classes = useStyles();
	var theme = useTheme();
	//theme = responsiveFontSizes(theme);

	const [isLoading, setIsLoading] = useState(false);
	const [binsList, setBinsList] = useState(datatableData);

	const fetchBinsList = async () => {
		try {
			const serverResponse = await getBinsList();
			if (serverResponse.data.status_code === 200 && serverResponse.data.data) {
				let reqData = serverResponse.data.data;
				let binsListArray = [];
				reqData.forEach((bin) => {
					let binParameters = new Array(6);
					binParameters[0] = bin.bin_id;
					binParameters[1] = bin.department;
					binParameters[2] = bin.handler_name;
					binParameters[3] = bin.type;
					binParameters[4] = bin.weight;
					binParameters[5] = bin.capacity;
					binsListArray.push(binParameters);
				});
				setBinsList(binsListArray);
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

	const handleRowClick = (rowData, rowMeta) => {
		const binId = rowData[0];
		props.history.push(`${props.location.pathname}/${binId}`);
	};

	useEffect(() => {
		async function fetchAPI() {
			try {
				setIsLoading(true);
				//await fetchBinsList();
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
				<PageTitle title="Smart Bin" />
				<Grid container spacing={4}>
					<Grid item xs={12}>
						<MUIDataTable
							title="LIST OF SMART BINS"
							data={binsList}
							columns={["ID", "DEPARTMENT", "HANDLER", "TYPE", "CURRENT WEIGHT", "CAPACITY"]}
							options={{
								pagination: true,
								selectableRows: false,
								onRowClick: (rowData, rowMeta) => handleRowClick(rowData,rowMeta),
							}}
						/>
					</Grid>
				</Grid>
			</>
		);
	}
}

export default withRouter(Bins);