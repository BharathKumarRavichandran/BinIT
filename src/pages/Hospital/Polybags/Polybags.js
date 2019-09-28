import React, { useState, useEffect } from "react";
import { withRouter } from 'react-router-dom';

import { toast } from 'react-toastify';

import path from 'path';
import { CircularProgress, Box, Grid, Button, Tabs, Tab, TextField, Paper } from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import { useTheme } from "@material-ui/styles";

// styles
import useStyles from "./styles";

// components
import Widget from "../../../components/Widget/Widget";
import PageTitle from "../../../components/PageTitle/PageTitle";
import { Typography } from "../../../components/Wrappers/Wrappers";

// Importing API utils
import { addNewPolybag } from '../../../utils/api/polybag.helper';


const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
  });

const Polybags = (props) => {
	var classes = useStyles();
	var theme = useTheme();
	// theme = responsiveFontSizes(theme);

	
	// local
	const [isLoading, setIsLoading] = useState(false);
	const [centerId, setCenterId] = useState(null);
	const [handlerId, setHandlerId] = useState(null);
	const [type, setType] = useState(null);
	const [weight, setWeight] = useState(null);
	const [barcodeImagePath, setBarcodeImagePath] = useState('/images/barcode/1_Red_3_2019-09-28-12:44:47.png');
	const [open, setOpen] = useState(true);

	function handleClickOpen() {
		setOpen(true);
	}

	function handleClose() {
		setOpen(false);
	}


	const handleAddPolybag = async () => {
		try {
			if (centerId && handlerId && type && weight) {
				setIsLoading(true);
				const serverResponse = await addNewPolybag(
					centerId,
					handlerId,
					type,
					weight
				);
				setIsLoading(false);
				console.log(serverResponse.data.status_code);
				if (serverResponse.data.status_code == 200) {
					console.log(serverResponse.data.data);
					const responseData = serverResponse.data.data;
					setBarcodeImagePath(responseData.barcode_image_path);
					setOpen(true);
					toast.success(serverResponse.data.message);
				}
				else {
					if (serverResponse.data.message)
						toast.error(serverResponse.data.message);
					else
						toast.error(serverResponse.statusText);
				}
				setCenterId(null);
				setHandlerId(null);
				setType(null);
				setWeight(null);
			}
			else {
				toast.error('Please fill all details.');
			}
		} catch (error) {
			toast.error(error.toString());
		}
	};

	useEffect(() => {
		async function fetchAPI() {
			try {
				// Check status 200 otherwise redirect to Bins page
				setIsLoading(true);
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
				<PageTitle title="Polybags" />

				<Grid container spacing={4}>
					<Grid item xs={12} sm={12} md={12} lg={4}>
						<Widget title="Add Polybag" upperTitle className={classes.card} disableWidgetMenu>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={9} md={3} lg={9}>
									<TextField
										id="centerId"
										InputProps={{
											classes: {
												underline: classes.textFieldUnderline,
												input: classes.textField,
											},
										}}
										value={centerId}
										onChange={e => setCenterId(e.target.value)}
										margin="normal"
										placeholder="WMC Center Id"
										type="text"
										fullWidth
									/>
									<TextField
										id="handlerId"
										InputProps={{
											classes: {
												underline: classes.textFieldUnderline,
												input: classes.textField,
											},
										}}
										value={handlerId}
										onChange={e => setHandlerId(e.target.value)}
										margin="normal"
										placeholder="Handler Id"
										type="text"
										fullWidth
									/>
									<TextField
										id="Waste Type"
										InputProps={{
											classes: {
												underline: classes.textFieldUnderline,
												input: classes.textField,
											},
										}}
										value={type}
										onChange={e => setType(e.target.value)}
										margin="normal"
										placeholder="Waste Type"
										type="text"
										fullWidth
									/>
									<TextField
										id="weight"
										InputProps={{
											classes: {
												underline: classes.textFieldUnderline,
												input: classes.textField,
											},
										}}
										value={weight}
										onChange={e => setWeight(e.target.value)}
										margin="normal"
										placeholder="Weight of Polybag"
										type="text"
										fullWidth
									/>
									<Button
										type="button"
										variant="contained"
										color="primary"
										fullWidth
										className={classes.submit}
										onClick={handleAddPolybag}
									>
										<Typography variant="button">Add Polybag</Typography>
									</Button>
								</Grid>
							</Grid>
						</Widget>
					</Grid>
				</Grid>
				<Dialog fullScreen open={open} onClose={handleClose} >
					<AppBar className={classes.appBar}>
						<Toolbar>
							<IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
								<CloseIcon />
							</IconButton>
							<Typography variant="h6" className={classes.title}>
								Barcode
            				</Typography>
						</Toolbar>
					</AppBar>
					<img src={barcodeImagePath} alt={'Barcode'}/>
				</Dialog>
			</>
		);
	}
}

export default withRouter(Polybags);